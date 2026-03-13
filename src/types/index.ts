export type { ApiResponse, PaginatedResponse, ApiError } from "./api";

// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: "customer" | "admin";
  createdAt: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  category: Category;
  tags: string[];
  sizes?: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  comingSoon?: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
}

// ─── Order ────────────────────────────────────────────────────────────────────
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  createdAt: string;
}
