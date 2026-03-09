import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types";

export interface CartLineItem {
  /** Unique key: productId + size */
  key: string;
  product: Product;
  size: string | null;
  quantity: number;
}

interface CartStore {
  items: CartLineItem[];
  isOpen: boolean;

  // ── Actions ─────────────────────────────────────────────────────────────────
  addItem: (product: Product, size?: string | null, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // ── Selectors ────────────────────────────────────────────────────────────────
  itemCount: () => number;
  subtotal: () => number;
}

function makeKey(productId: string, size: string | null) {
  return size ? `${productId}__${size}` : productId;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem(product, size = null, quantity = 1) {
        const key = makeKey(product.id, size);
        set((state) => {
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { key, product, size, quantity }],
          };
        });
      },

      removeItem(key) {
        set((state) => ({
          items: state.items.filter((i) => i.key !== key),
        }));
      },

      updateQuantity(key, quantity) {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart() {
        set({ items: [] });
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      subtotal() {
        return get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        );
      },
    }),
    {
      name: "schar-cart",
      storage: createJSONStorage(() => localStorage),
      // Don't persist drawer open state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
