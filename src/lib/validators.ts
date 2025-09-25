import { VALIDATION_RULES } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters long`
    };
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    };
  }

  return { isValid: true };
}

export function validatePhoneNumber(phone: string): ValidationResult {
  const phoneRegex = /^(\+234|0)[7-9][01]\d{8}$/;

  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  const cleaned = phone.replace(/\s/g, '');

  if (!phoneRegex.test(cleaned)) {
    return { isValid: false, error: 'Please enter a valid Nigerian phone number' };
  }

  return { isValid: true };
}

export function validateName(name: string, fieldName: string = 'Name'): ValidationResult {
  if (!name) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters long` };
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { isValid: false, error: `${fieldName} can only contain letters and spaces` };
  }

  return { isValid: true };
}

export function validatePrice(price: number | string): ValidationResult {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice)) {
    return { isValid: false, error: 'Price must be a valid number' };
  }

  if (numPrice < VALIDATION_RULES.PRICE_MIN) {
    return { isValid: false, error: 'Price must be greater than 0' };
  }

  if (numPrice > VALIDATION_RULES.PRICE_MAX) {
    return { isValid: false, error: `Price cannot exceed ${VALIDATION_RULES.PRICE_MAX.toLocaleString()}` };
  }

  return { isValid: true };
}

export function validateQuantity(quantity: number | string): ValidationResult {
  const numQuantity = typeof quantity === 'string' ? parseInt(quantity) : quantity;

  if (isNaN(numQuantity)) {
    return { isValid: false, error: 'Quantity must be a valid number' };
  }

  if (numQuantity < VALIDATION_RULES.QUANTITY_MIN) {
    return { isValid: false, error: 'Quantity must be at least 1' };
  }

  if (numQuantity > VALIDATION_RULES.QUANTITY_MAX) {
    return { isValid: false, error: `Quantity cannot exceed ${VALIDATION_RULES.QUANTITY_MAX.toLocaleString()}` };
  }

  return { isValid: true };
}

export function validateProductName(name: string): ValidationResult {
  if (!name) {
    return { isValid: false, error: 'Product name is required' };
  }

  if (name.trim().length < 3) {
    return { isValid: false, error: 'Product name must be at least 3 characters long' };
  }

  if (name.length > VALIDATION_RULES.PRODUCT_NAME_MAX_LENGTH) {
    return {
      isValid: false,
      error: `Product name cannot exceed ${VALIDATION_RULES.PRODUCT_NAME_MAX_LENGTH} characters`
    };
  }

  return { isValid: true };
}

export function validateDescription(description: string): ValidationResult {
  if (!description) {
    return { isValid: false, error: 'Description is required' };
  }

  if (description.trim().length < 10) {
    return { isValid: false, error: 'Description must be at least 10 characters long' };
  }

  if (description.length > VALIDATION_RULES.DESCRIPTION_MAX_LENGTH) {
    return {
      isValid: false,
      error: `Description cannot exceed ${VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} characters`
    };
  }

  return { isValid: true };
}

export function validateImageFile(file: File): ValidationResult {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Please upload a valid image file (JPEG, JPG, PNG, or WebP)'
    };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: 'Image file size must be less than 5MB' };
  }

  return { isValid: true };
}

export function validateLocation(location: string): ValidationResult {
  if (!location) {
    return { isValid: false, error: 'Location is required' };
  }

  if (location.trim().length < 3) {
    return { isValid: false, error: 'Location must be at least 3 characters long' };
  }

  return { isValid: true };
}