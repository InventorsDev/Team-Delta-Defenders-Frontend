export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  MARKETPLACE: '/marketplace',
  FARMERS_SIGNUP: '/farmers-signup',
  BUYERS_SIGNUP: '/buyers-signup',
  FORGOT_PASSWORD: '/forgot-password',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    UPDATE: '/products',
    DELETE: '/products',
    SEARCH: '/products/search',
  },
  CHATS: {
    LIST: '/chats',
    MESSAGES: '/chats/messages',
    SEND: '/chats/send',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/read',
    MARK_ALL_READ: '/notifications/read-all',
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  PRODUCT_NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  PRICE_MIN: 0,
  PRICE_MAX: 10000000,
  QUANTITY_MIN: 1,
  QUANTITY_MAX: 10000,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

export const CATEGORIES = [
  'Vegetables',
  'Fruits',
  'Grains',
  'Tubers',
  'Legumes',
  'Spices',
  'Herbs',
  'Dairy',
  'Meat',
  'Fish',
] as const;

export const UNITS = [
  'kg',
  'g',
  'bag',
  'basket',
  'crate',
  'sack',
  'bunch',
  'piece',
  'liter',
  'tuber',
] as const;

export const SORT_OPTIONS = [
  { value: 'price', label: 'Price' },
  { value: 'date', label: 'Date Added' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'distance', label: 'Distance' },
] as const;

export const NOTIFICATION_TYPES = [
  'info',
  'success',
  'warning',
  'error',
] as const;

export const USER_ROLES = [
  'farmer',
  'buyer',
  'admin',
] as const;

export const PRODUCT_STATUS = [
  'available',
  'sold_out',
  'discontinued',
] as const;

export const LISTING_STATUS = [
  'active',
  'sold',
  'expired',
] as const;