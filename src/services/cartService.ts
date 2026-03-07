import { api } from "./api";
import type { ApiResponse } from "@/types/api";
import type { Cart } from "@/types";

export const cartService = {
  getCart: () => api.get<ApiResponse<Cart>>("/cart"),

  addItem: (productId: string, quantity: number) =>
    api.post<ApiResponse<Cart>>("/cart/items", { productId, quantity }),

  updateItem: (itemId: string, quantity: number) =>
    api.patch<ApiResponse<Cart>>(`/cart/items/${itemId}`, { quantity }),

  removeItem: (itemId: string) =>
    api.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`),

  clearCart: () => api.delete<ApiResponse<Cart>>("/cart"),
};
