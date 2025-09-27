export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'buyer';
  avatar?: string;
  phoneNumber?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  images: string[];
  farmerId: string;
  farmerName: string;
  location: string;
  harvestDate?: string;
  expiryDate?: string;
  organic: boolean;
  featured: boolean;
  status: 'available' | 'sold_out' | 'discontinued';
  createdAt: string;
  updatedAt: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  image: string;
  farmerId: string;
  location: string;
  datePosted: string;
  status: 'active' | 'sold' | 'expired';
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage: Message;
  updatedAt: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface Stats {
  totalListings: number;
  activeListings: number;
  totalSales: number;
  revenue: number;
  views: number;
  favoriteCount: number;
}

export interface CategoryFilter {
  id: string;
  name: string;
  count: number;
}

export interface LocationFilter {
  id: string;
  name: string;
  state?: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  location: string;
  priceRange: [number, number];
  organic: boolean;
  sortBy: 'price' | 'date' | 'popularity' | 'distance';
  sortOrder: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type UserRole = 'farmer' | 'buyer' | 'admin';
export type ProductStatus = 'available' | 'sold_out' | 'discontinued';
export type ListingStatus = 'active' | 'sold' | 'expired';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type MessageType = 'text' | 'image' | 'file';
export type SortOption = 'price' | 'date' | 'popularity' | 'distance';
export type SortOrder = 'asc' | 'desc';