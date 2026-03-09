"use client";

/**
 * CartSync — runs on the client to persist cart items per-user in localStorage.
 * Strategy:
 *  - Logged-in users: cart stored under "schar-cart-{userId}"
 *  - Anonymous users: cart stored under "schar-cart" (default Zustand key)
 * On login, any existing user cart is merged with the current anonymous cart.
 * On logout, the active cart is saved under the user key, then reset.
 */
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/features/cart/store/cart.store";
import type { CartLineItem } from "@/features/cart/store/cart.store";

function readUserCart(userId: string): CartLineItem[] {
  try {
    const raw = localStorage.getItem(`schar-cart-${userId}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { state?: { items?: CartLineItem[] } };
    return parsed?.state?.items ?? [];
  } catch {
    return [];
  }
}

function saveUserCart(userId: string, items: CartLineItem[]) {
  try {
    localStorage.setItem(
      `schar-cart-${userId}`,
      JSON.stringify({ state: { items }, version: 0 })
    );
  } catch {
    // Storage unavailable — ignore
  }
}

export function CartSync() {
  const { data: session, status } = useSession();
  const prevUserIdRef = useRef<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    if (status === "loading") return;

    const userId = session?.user?.id ?? null;
    const prevUserId = prevUserIdRef.current;

    // Logged in
    if (userId && userId !== prevUserId) {
      const savedItems = readUserCart(userId);
      // Merge saved user cart on top of current anonymous cart
      savedItems.forEach((item) => {
        addItem(item.product, item.size, item.quantity);
      });
      prevUserIdRef.current = userId;
    }

    // Logged out
    if (!userId && prevUserId) {
      saveUserCart(prevUserId, items);
      clearCart();
      prevUserIdRef.current = null;
    }
  }, [session, status, addItem, clearCart, items]);

  // Persist user cart on every items change when logged in
  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;
    saveUserCart(userId, items);
  }, [items, session?.user?.id]);

  return null;
}
