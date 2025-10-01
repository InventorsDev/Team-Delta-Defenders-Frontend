// Secure token storage with encryption and security best practices

// Token storage keys
const TOKEN_KEY = 'agrilink_auth_token';
const REFRESH_TOKEN_KEY = 'agrilink_refresh_token';
const USER_KEY = 'agrilink_user_data';
const TOKEN_EXPIRY_KEY = 'agrilink_token_expiry';

// Simple encryption for local storage (basic obfuscation)
class SimpleEncryption {
  private static key = 'AgriLink2024SecureKey!'; // In production, use env variable

  static encrypt(text: string): string {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      const keyChar = this.key.charCodeAt(i % this.key.length);
      encrypted += String.fromCharCode(char ^ keyChar);
    }
    return btoa(encrypted); // Base64 encode
  }

  static decrypt(encrypted: string): string {
    try {
      const decoded = atob(encrypted); // Base64 decode
      let decrypted = '';
      for (let i = 0; i < decoded.length; i++) {
        const char = decoded.charCodeAt(i);
        const keyChar = this.key.charCodeAt(i % this.key.length);
        decrypted += String.fromCharCode(char ^ keyChar);
      }
      return decrypted;
    } catch {
      return '';
    }
  }
}

// Token validation
export interface TokenInfo {
  token: string;
  expiresAt: number;
  issuedAt: number;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'buyer' | 'admin';
  isVerified: boolean;
  avatar?: string;
}

// Check if we have secure storage available
const hasSecureStorage = (): boolean => {
  try {
    return typeof Storage !== 'undefined' && !!localStorage;
  } catch {
    return false;
  }
};

// Secure token storage functions
export const setAuthToken = (token: string, expiresIn?: number): void => {
  if (!hasSecureStorage()) {
    console.warn('Secure storage not available');
    return;
  }

  try {
    // Calculate expiry time (default 24 hours)
    const expiresInMs = (expiresIn || 24 * 60 * 60) * 1000;
    const expiresAt = Date.now() + expiresInMs;
    const issuedAt = Date.now();

    const tokenInfo: TokenInfo = {
      token,
      expiresAt,
      issuedAt,
    };

    // Encrypt and store
    const encryptedToken = SimpleEncryption.encrypt(JSON.stringify(tokenInfo));
    localStorage.setItem(TOKEN_KEY, encryptedToken);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt.toString());

    // Set automatic cleanup
    setTimeout(() => {
      if (isTokenExpired()) {
        removeAuthToken();
      }
    }, expiresInMs);

  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

export const getAuthToken = (): string | null => {
  if (!hasSecureStorage()) {
    return null;
  }

  try {
    const encryptedToken = localStorage.getItem(TOKEN_KEY);
    if (!encryptedToken) {
      return null;
    }

    const decrypted = SimpleEncryption.decrypt(encryptedToken);
    if (!decrypted) {
      removeAuthToken(); // Invalid token
      return null;
    }

    const tokenInfo: TokenInfo = JSON.parse(decrypted);

    // Check if token is expired
    if (Date.now() >= tokenInfo.expiresAt) {
      removeAuthToken();
      return null;
    }

    return tokenInfo.token;

  } catch (error) {
    console.error('Error retrieving auth token:', error);
    removeAuthToken(); // Clean up corrupted data
    return null;
  }
};

export const setRefreshToken = (refreshToken: string): void => {
  if (!hasSecureStorage()) return;

  try {
    const encrypted = SimpleEncryption.encrypt(refreshToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, encrypted);
  } catch (error) {
    console.error('Error storing refresh token:', error);
  }
};

export const getRefreshToken = (): string | null => {
  if (!hasSecureStorage()) return null;

  try {
    const encrypted = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!encrypted) return null;

    return SimpleEncryption.decrypt(encrypted);
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

export const setUserData = (userData: UserData): void => {
  if (!hasSecureStorage()) return;

  try {
    // Sanitize user data before storage
    const sanitizedData: UserData = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      isVerified: userData.isVerified,
      avatar: userData.avatar,
    };

    const encrypted = SimpleEncryption.encrypt(JSON.stringify(sanitizedData));
    localStorage.setItem(USER_KEY, encrypted);
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

export const getUserData = (): UserData | null => {
  if (!hasSecureStorage()) return null;

  try {
    const encrypted = localStorage.getItem(USER_KEY);
    if (!encrypted) return null;

    const decrypted = SimpleEncryption.decrypt(encrypted);
    if (!decrypted) return null;

    return JSON.parse(decrypted) as UserData;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  if (!hasSecureStorage()) return true;

  try {
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) return true;

    return Date.now() >= parseInt(expiryTime);
  } catch {
    return true;
  }
};

export const getTokenExpiryTime = (): number | null => {
  if (!hasSecureStorage()) return null;

  try {
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    return expiryTime ? parseInt(expiryTime) : null;
  } catch {
    return null;
  }
};

export const removeAuthToken = (): void => {
  if (!hasSecureStorage()) return;

  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);

    // Clear any cached user data from memory
    sessionStorage.clear();
  } catch (error) {
    console.error('Error removing auth data:', error);
  }
};

export const clearAllAuthData = (): void => {
  removeAuthToken();

  // Also clear any other app-specific data
  try {
    // Clear other potential sensitive data
    const keysToRemove = Object.keys(localStorage).filter(key =>
      key.startsWith('agrilink_') ||
      key.includes('auth') ||
      key.includes('token')
    );

    keysToRemove.forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Security: Check for suspicious activity
export const validateTokenIntegrity = (): boolean => {
  try {
    const token = getAuthToken();
    if (!token) return false;

    // Basic JWT validation (check format)
    const parts = token.split('.');
    if (parts.length !== 3) {
      removeAuthToken();
      return false;
    }

    // Validate base64 encoding
    try {
      atob(parts[0]);
      atob(parts[1]);
    } catch {
      removeAuthToken();
      return false;
    }

    return true;
  } catch {
    removeAuthToken();
    return false;
  }
};

// Auto-cleanup expired tokens on app start
export const initializeTokenCleanup = (): void => {
  if (isTokenExpired()) {
    removeAuthToken();
  }

  // Set up periodic cleanup (every 5 minutes)
  setInterval(() => {
    if (isTokenExpired()) {
      removeAuthToken();
    }
  }, 5 * 60 * 1000);
};