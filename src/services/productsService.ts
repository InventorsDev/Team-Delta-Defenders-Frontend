// Products service for Team Delta Defenders Backend API
import { api, ApiResponse } from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  farmer_id: string;
  farmer_name?: string;
  images?: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  images?: string[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export class ProductsService {
  private static instance: ProductsService;

  static getInstance(): ProductsService {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService();
    }
    return ProductsService.instance;
  }

  // Create a new product (farmer only)
  async createProduct(data: CreateProductRequest): Promise<Product> {
    try {
      const response = await api.post<Product>('/products', data);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error('Failed to create product');
    } catch (error) {
      throw error;
    }
  }

  // Get all products
  async getAllProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>('/products', params);

      if (response.success && response.data) {
        return response.data;
      }

      return [];
    } catch (error) {
      throw error;
    }
  }

  // Get product by ID
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get<Product>(`/products/${id}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error('Product not found');
    } catch (error) {
      throw error;
    }
  }

  // Update product (owner or admin only)
  async updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
    try {
      const response = await api.put<Product>(`/products/${id}`, data);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error('Failed to update product');
    } catch (error) {
      throw error;
    }
  }

  // Delete product (admin or owner only)
  async deleteProduct(id: string): Promise<void> {
    try {
      const response = await api.delete(`/products/${id}`);

      if (!response.success) {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const productsService = ProductsService.getInstance();