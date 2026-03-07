import { api } from "./api";
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type { Product } from "@/types";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: "price_asc" | "price_desc" | "newest" | "rating";
}

export const productService = {
  getAll: (filters: ProductFilters = {}) => {
    const params = new URLSearchParams(
      Object.entries(filters)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    );
    return api.get<PaginatedResponse<Product>>(`/products?${params}`);
  },

  getBySlug: (slug: string) =>
    api.get<ApiResponse<Product>>(`/products/${slug}`),

  getFeatured: () =>
    api.get<ApiResponse<Product[]>>("/products/featured"),
};
