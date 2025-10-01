// Authentication hook with security monitoring and state management

import { useState, useEffect, useCallback, useContext, createContext } from 'react';
import { authService, AuthResponse, LoginRequest, RegisterRequest } from '../services/auth/authService';
import { getUserData, initializeTokenCleanup, UserData } from '../services/auth/tokenStorage';
import { ApiRequestError } from '../services/api';

// Authentication state interface
export interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

// Authentication context interface
export interface AuthContextType extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
  getCurrentUser: () => Promise<void>;
  updateProfile: (data: Partial<UserData>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  verifyEmail: (token: string, email: string) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isInRole: (role: string) => boolean;
}

// Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for authentication
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider hook
export const useAuthProvider = (): AuthContextType => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    isInitialized: false,
  });

  // Initialize authentication on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize token cleanup
        initializeTokenCleanup();

        // Check if user is already authenticated
        if (authService.isAuthenticated()) {
          const userData = getUserData();
          if (userData) {
            setState(prev => ({
              ...prev,
              user: userData,
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
            }));

            // Refresh user data from server
            try {
              await authService.getCurrentUser();
            } catch (error) {
              // If refresh fails, keep existing data but log the issue
              console.warn('Failed to refresh user data on init:', error);
            }
          } else {
            // Token exists but no user data - try to fetch from server
            try {
              await authService.getCurrentUser();
              const refreshedUserData = getUserData();
              setState(prev => ({
                ...prev,
                user: refreshedUserData,
                isAuthenticated: !!refreshedUserData,
                isLoading: false,
                isInitialized: true,
              }));
            } catch (error) {
              // Authentication failed
              setState(prev => ({
                ...prev,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isInitialized: true,
              }));
            }
          }
        } else {
          setState(prev => ({
            ...prev,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
          }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setState(prev => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Failed to initialize authentication',
          isInitialized: true,
        }));
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (data: LoginRequest): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response: AuthResponse = await authService.login(data);

      setState(prev => ({
        ...prev,
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }));

      // Log successful login for security monitoring
      console.info('User login successful:', response.user.email);
    } catch (error) {
      const errorMessage = error instanceof ApiRequestError
        ? error.message
        : 'Login failed. Please try again.';

      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      }));

      throw error;
    }
  }, []);

  // Register function
  const register = useCallback(async (data: RegisterRequest): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response: AuthResponse = await authService.register(data);

      setState(prev => ({
        ...prev,
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }));

      console.info('User registration successful:', response.user.email);
    } catch (error) {
      const errorMessage = error instanceof ApiRequestError
        ? error.message
        : 'Registration failed. Please try again.';

      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      }));

      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await authService.logout();

      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }));

      console.info('User logout successful');
    } catch (error) {
      // Even if server logout fails, clear local state
      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }));

      console.warn('Logout error (but cleared local state):', error);
    }
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async (): Promise<void> => {
    try {
      const response = await authService.refreshToken();
      if (response) {
        setState(prev => ({
          ...prev,
          user: response.user,
          isAuthenticated: true,
          error: null,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        error: 'Session expired. Please login again.',
      }));
      throw error;
    }
  }, []);

  // Get current user function
  const getCurrentUser = useCallback(async (): Promise<void> => {
    try {
      const userData = await authService.getCurrentUser();
      setState(prev => ({
        ...prev,
        user: userData,
        isAuthenticated: true,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch user data',
      }));
      throw error;
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(async (data: Partial<UserData>): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const updatedUser = await authService.updateProfile(data);
      setState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof ApiRequestError
        ? error.message
        : 'Failed to update profile';

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      throw error;
    }
  }, []);

  // Change password function
  const changePassword = useCallback(async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof ApiRequestError
        ? error.message
        : 'Failed to change password';

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      throw error;
    }
  }, []);

  // Request password reset function
  const requestPasswordReset = useCallback(async (email: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await authService.requestPasswordReset({ email });
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof ApiRequestError
        ? error.message
        : 'Failed to send password reset email';

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      throw error;
    }
  }, []);

  // Verify email function
  const verifyEmail = useCallback(async (token: string, email: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await authService.verifyEmail({ token, email });

      // Refresh user data to get updated verification status
      await getCurrentUser();

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof ApiRequestError
        ? error.message
        : 'Email verification failed';

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      throw error;
    }
  }, [getCurrentUser]);

  // Clear error function
  const clearError = useCallback((): void => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Permission checking
  const hasPermission = useCallback((permission: string): boolean => {
    return authService.hasPermission(permission);
  }, []);

  // Role checking
  const isInRole = useCallback((role: string): boolean => {
    return state.user?.role === role;
  }, [state.user]);

  return {
    ...state,
    login,
    register,
    logout,
    refreshToken,
    clearError,
    getCurrentUser,
    updateProfile,
    changePassword,
    requestPasswordReset,
    verifyEmail,
    hasPermission,
    isInRole,
  };
};

// Auth context provider component
export const AuthContext_ = AuthContext;

// Helper hook for protected routes
export const useRequireAuth = (redirectTo: string = '/login') => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isInitialized && !auth.isAuthenticated && !auth.isLoading) {
      window.location.href = redirectTo;
    }
  }, [auth.isInitialized, auth.isAuthenticated, auth.isLoading, redirectTo]);

  return auth;
};

// Helper hook for role-based access
export const useRequireRole = (requiredRole: string, redirectTo: string = '/') => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.isInitialized && auth.isAuthenticated && !auth.isInRole(requiredRole)) {
      window.location.href = redirectTo;
    }
  }, [auth.isInitialized, auth.isAuthenticated, requiredRole, redirectTo, auth]);

  return auth;
};