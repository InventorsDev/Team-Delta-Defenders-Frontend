// Authentication service with comprehensive security features

import { api, ApiResponse, ApiRequestError } from '../api';
import {
  setAuthToken,
  setRefreshToken,
  setUserData,
  getUserData,
  getRefreshToken,
  removeAuthToken,
  UserData,
  validateTokenIntegrity,
  getUserTypeFromToken,
  decodeJWTToken,
} from './tokenStorage';

// Authentication request/response types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: {
    userAgent: string;
    platform: string;
    ip?: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: 'farmer' | 'buyer';
  phoneNumber?: string;
  acceptTerms: boolean;
  marketingConsent?: boolean;
}

export interface AuthResponse {
  user: UserData;
  token: string;
  refreshToken: string;
  expiresIn: number; // seconds
  tokenType: 'Bearer';
  permissions?: string[];
}

export interface PasswordResetRequest {
  email: string;
  captcha?: string; // For bot protection
}

export interface PasswordResetConfirmRequest {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
  email: string;
}

// Password strength validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
  score: number; // 0-100
} => {
  const errors: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else {
    score += 20;
  }

  // Uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    score += 20;
  }

  // Lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    score += 20;
  }

  // Number
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    score += 20;
  }

  // Special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  } else {
    score += 20;
  }

  // Common password check
  const commonPasswords = [
    'password', '123456', 'password123', 'admin', 'qwerty',
    'letmein', 'welcome', 'monkey', '1234567890'
  ];

  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Password is too common');
    score = Math.max(0, score - 30);
  }

  return {
    isValid: errors.length === 0,
    errors,
    score: Math.min(100, score),
  };
};

// Input sanitization
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>\"'&]/g, '');
};

// Device fingerprinting for security
const getDeviceInfo = () => ({
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  screen: `${screen.width}x${screen.height}`,
});

// Authentication service class
export class AuthService {
  private static instance: AuthService;
  private refreshTokenTimeout: NodeJS.Timeout | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // User Registration
  async register(data: RegisterRequest): Promise<AuthResponse> {
    try {
      // Validate password strength
      const passwordValidation = validatePasswordStrength(data.password);
      if (!passwordValidation.isValid) {
        throw new ApiRequestError(
          'Password does not meet security requirements',
          400,
          { password: passwordValidation.errors }
        );
      }

      // Confirm password match
      if (data.password !== data.confirmPassword) {
        throw new ApiRequestError(
          'Passwords do not match',
          400,
          { confirmPassword: ['Passwords do not match'] }
        );
      }

      // Sanitize inputs
      const sanitizedData = {
        ...data,
        email: sanitizeInput(data.email.toLowerCase()),
        name: sanitizeInput(data.name),
        phoneNumber: data.phoneNumber ? sanitizeInput(data.phoneNumber) : undefined,
      };

      const response = await api.post<any>('/auth/register', sanitizedData);

      console.log('=== REGISTRATION DEBUG ===');
      console.log('Raw registration response:', response);

      // Extract token from response (handle both wrapped and direct formats)
      let token: string;
      let user: any;
      let refreshToken: string;
      let expiresIn: number;

      if (response.data && response.data.token) {
        // Wrapped format: { success: true, data: { token, user } }
        token = response.data.token;
        user = response.data.user || {};
        refreshToken = response.data.refreshToken || token;
        expiresIn = response.data.expiresIn || 3600;
      } else if (response.token) {
        // Direct format: { token, user }
        token = response.token;
        user = response.user || {};
        refreshToken = response.refreshToken || token;
        expiresIn = response.expiresIn || 3600;
      } else {
        console.error('No token found in registration response:', response);
        throw new Error('Invalid response format: missing token');
      }

      console.log('Extracted token:', token);

      // Decode JWT token to get user type/role
      const tokenPayload = decodeJWTToken(token);
      console.log('Decoded token payload:', tokenPayload);

      const userTypeFromToken = getUserTypeFromToken(token);
      console.log('User type from token:', userTypeFromToken);

      // Build user data, prioritizing token data
      const userData: UserData = {
        id: tokenPayload?.id || tokenPayload?.userId || user.id || '',
        email: tokenPayload?.email || user.email || sanitizedData.email,
        name: user.name || user.fullName || sanitizedData.name, // For farmers, this is their business name
        role: userTypeFromToken || user.role || user.currentRole || sanitizedData.role,
        isVerified: user.isVerified || user.emailVerified || false,
        avatar: user.avatar || user.profilePicture,
      };

      console.log('Final user data:', userData);

      if (!userData.role) {
        console.error('Could not determine user role from token or response');
        throw new Error('Unable to determine user type. Please contact support.');
      }

      const authData: AuthResponse = {
        token,
        user: userData,
        refreshToken,
        expiresIn,
        tokenType: 'Bearer',
        permissions: response.permissions || response.data?.permissions,
      };

      console.log('Final registration auth data:', authData);
      console.log('========================');

      await this.handleAuthSuccess(authData);

      return authData;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  // User Login
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      const sanitizedData = {
        email: sanitizeInput(data.email.toLowerCase()),
        password: data.password,
      };

      const response = await api.post<any>('/auth/signin', sanitizedData);

      console.log('=== LOGIN DEBUG ===');
      console.log('Raw API response:', JSON.stringify(response, null, 2));
      console.log('Response structure:', {
        hasData: !!response.data,
        hasToken: !!response.token,
        hasUser: !!response.user,
        hasSuccess: !!response.success,
        responseKeys: Object.keys(response),
      });
      console.log('User from response:', response.user || response.data?.user);
      if (response.user) {
        console.log('User properties:', {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          fullName: response.user.fullName,
          businessName: response.user.businessName,
          role: response.user.role,
          currentRole: response.user.currentRole,
          allKeys: Object.keys(response.user)
        });
      }

      // Extract token from response (handle both wrapped and direct formats)
      let token: string;
      let user: any;
      let refreshToken: string;
      let expiresIn: number;

      if (response.data && response.data.token) {
        // Wrapped format: { success: true, data: { token, user } }
        token = response.data.token;
        user = response.data.user || {};
        refreshToken = response.data.refreshToken || token;
        expiresIn = response.data.expiresIn || 3600;
      } else if (response.token) {
        // Direct format: { token, user }
        token = response.token;
        user = response.user || {};
        refreshToken = response.refreshToken || token;
        expiresIn = response.expiresIn || 3600;
      } else {
        console.error('No token found in response:', response);
        throw new Error('Invalid response format: missing token');
      }

      console.log('Extracted token:', token);
      console.log('User from response:', user);

      // PRIMARY APPROACH: Decode JWT token to get user type/role
      const tokenPayload = decodeJWTToken(token);
      console.log('Decoded token payload:', tokenPayload);

      // Get user type from token
      const userTypeFromToken = getUserTypeFromToken(token);
      console.log('User type from token:', userTypeFromToken);

      // Build user data, prioritizing token data over response data
      // Try multiple possible field names for name
      let userName = user.name || user.fullName || user.businessName ||
                     tokenPayload?.name || tokenPayload?.fullName || tokenPayload?.businessName || '';

      // WORKAROUND: If name is empty and user just signed up, use stored business name
      if (!userName || userName.trim() === '') {
        const signupBusinessName = sessionStorage.getItem('signupBusinessName');
        const signupEmail = sessionStorage.getItem('signupEmail');

        // Only use fallback if this is the same user who just signed up
        if (signupBusinessName && signupEmail === sanitizedData.email) {
          console.log('Using stored business name from signup:', signupBusinessName);
          userName = signupBusinessName;
          // Clear the stored values after using them
          sessionStorage.removeItem('signupBusinessName');
          sessionStorage.removeItem('signupEmail');
        }
      }

      console.log('Name field extraction:', {
        'user.name': user.name,
        'user.fullName': user.fullName,
        'user.businessName': user.businessName,
        'tokenPayload.name': tokenPayload?.name,
        'tokenPayload.fullName': tokenPayload?.fullName,
        'final userName': userName
      });

      const userData: UserData = {
        id: tokenPayload?.id || tokenPayload?.userId || user.id || '',
        email: tokenPayload?.email || user.email || sanitizedData.email,
        name: userName, // For farmers, this is their business name
        role: userTypeFromToken || user.role || user.currentRole,
        isVerified: user.isVerified || user.emailVerified || false,
        avatar: user.avatar || user.profilePicture,
      };

      console.log('Final user data:', userData);

      // Validate that we have a role
      if (!userData.role) {
        console.error('Could not determine user role from token or response');
        console.error('Token payload:', tokenPayload);
        console.error('User from response:', user);
        throw new Error('Unable to determine user type. Please contact support.');
      }

      const authData: AuthResponse = {
        token,
        user: userData,
        refreshToken,
        expiresIn,
        tokenType: 'Bearer',
        permissions: response.permissions || response.data?.permissions,
      };

      console.log('Final auth data:', authData);
      console.log('User role for routing:', authData.user.role);
      console.log('===================');

      await this.handleAuthSuccess(authData);

      // Extra workaround: Ensure user data is saved with the correct name
      // This handles cases where the backend doesn't properly store/return the name
      if (authData.user.name) {
        console.log('Manually saving user data with name:', authData.user.name);
        setUserData(authData.user);
      }

      return authData;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      // Clear local authentication data (no server logout endpoint available)
      this.clearAuthData();
    } catch (error) {
      console.warn('Logout error:', error);
    }
  }

  // Password Reset Request
  async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    try {
      const sanitizedData = {
        email: sanitizeInput(data.email.toLowerCase()),
        captcha: data.captcha,
      };

      await api.post('/auth/password/reset-request', sanitizedData);
    } catch (error) {
      throw error;
    }
  }

  // Confirm Password Reset
  async confirmPasswordReset(data: PasswordResetConfirmRequest): Promise<void> {
    try {
      // Validate new password
      const passwordValidation = validatePasswordStrength(data.password);
      if (!passwordValidation.isValid) {
        throw new ApiRequestError(
          'Password does not meet security requirements',
          400,
          { password: passwordValidation.errors }
        );
      }

      if (data.password !== data.confirmPassword) {
        throw new ApiRequestError(
          'Passwords do not match',
          400,
          { confirmPassword: ['Passwords do not match'] }
        );
      }

      const sanitizedData = {
        ...data,
        email: sanitizeInput(data.email.toLowerCase()),
      };

      await api.post('/auth/password/reset-confirm', sanitizedData);
    } catch (error) {
      throw error;
    }
  }

  // Change Password (for authenticated users)
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      // Validate new password
      const passwordValidation = validatePasswordStrength(data.newPassword);
      if (!passwordValidation.isValid) {
        throw new ApiRequestError(
          'Password does not meet security requirements',
          400,
          { newPassword: passwordValidation.errors }
        );
      }

      if (data.newPassword !== data.confirmPassword) {
        throw new ApiRequestError(
          'Passwords do not match',
          400,
          { confirmPassword: ['Passwords do not match'] }
        );
      }

      await api.post('/auth/password/change', data);
    } catch (error) {
      throw error;
    }
  }

  // Email Verification
  async verifyEmail(data: VerifyEmailRequest): Promise<void> {
    try {
      const sanitizedData = {
        ...data,
        email: sanitizeInput(data.email.toLowerCase()),
      };

      await api.post('/auth/email/verify', sanitizedData);
    } catch (error) {
      throw error;
    }
  }

  // Resend Email Verification
  async resendEmailVerification(email: string): Promise<void> {
    try {
      await api.post('/auth/email/resend-verification', {
        email: sanitizeInput(email.toLowerCase()),
      });
    } catch (error) {
      throw error;
    }
  }

  // Refresh Token
  async refreshToken(): Promise<AuthResponse | null> {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new ApiRequestError('No refresh token available', 401);
      }

      const response = await api.post<AuthResponse>('/auth/refresh', {
        refreshToken,
        deviceInfo: getDeviceInfo(),
      });

      if (response.success && response.data) {
        await this.handleAuthSuccess(response.data);
        return response.data;
      }

      return null;
    } catch (error) {
      this.clearAuthData();
      throw error;
    }
  }

  // Get current user profile
  async getCurrentUser(): Promise<UserData> {
    try {
      const response = await api.get<UserData>('/auth/me');

      if (response.success && response.data) {
        setUserData(response.data);
        return response.data;
      }

      throw new ApiRequestError('Failed to fetch user data', 500);
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  async updateProfile(data: Partial<UserData>): Promise<UserData> {
    try {
      // Sanitize inputs
      const sanitizedData = {
        ...data,
        name: data.name ? sanitizeInput(data.name) : undefined,
        email: data.email ? sanitizeInput(data.email.toLowerCase()) : undefined,
      };

      const response = await api.put<UserData>('/auth/profile', sanitizedData);

      if (response.success && response.data) {
        setUserData(response.data);
        return response.data;
      }

      throw new ApiRequestError('Failed to update profile', 500);
    } catch (error) {
      throw error;
    }
  }

  // Handle successful authentication
  private async handleAuthSuccess(authData: AuthResponse): Promise<void> {
    try {
      // Store tokens securely
      setAuthToken(authData.token, authData.expiresIn);
      setRefreshToken(authData.refreshToken);
      setUserData(authData.user);

      // Set up automatic token refresh
      this.setupTokenRefresh(authData.expiresIn);

      // Log successful login for security monitoring
      console.info('Authentication successful for user:', authData.user.email);
    } catch (error) {
      console.error('Error handling auth success:', error);
    }
  }

  // Setup automatic token refresh
  private setupTokenRefresh(expiresIn: number): void {
    // Clear existing timeout
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }

    // Refresh token 5 minutes before expiry
    const refreshTime = (expiresIn - 300) * 1000;

    if (refreshTime > 0) {
      this.refreshTokenTimeout = setTimeout(async () => {
        try {
          await this.refreshToken();
        } catch (error) {
          console.warn('Auto token refresh failed:', error);
          // Don't automatically logout on refresh failure
          // Let the user continue and handle it on next API call
        }
      }, refreshTime);
    }
  }

  // Handle authentication errors
  private handleAuthError(error: any): void {
    if (error instanceof ApiRequestError) {
      // Log security events
      if (error.status === 401 || error.status === 403) {
        console.warn('Authentication failed:', error.message);
      }

      if (error.status === 429) {
        console.warn('Rate limit exceeded for authentication');
      }
    }
  }

  // Clear all authentication data
  private clearAuthData(): void {
    removeAuthToken();

    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return validateTokenIntegrity();
  }

  // Get user role
  getUserRole(): string | null {
    const userData = getUserData();
    return userData?.role || null;
  }

  // Check if user has specific permission
  hasPermission(permission: string): boolean {
    // Implement based on your permission system
    const userData = getUserData();
    return userData?.role === 'admin' || false;
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();