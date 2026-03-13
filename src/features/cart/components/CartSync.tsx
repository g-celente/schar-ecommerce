"use client";

/**
 * CartSync — runs on the client to persist cart items per-user in localStorage.
 * Strategy:
 *  - Logged-in users: cart stored under "schar-cart-{userId}"
 *  - Anonymous users: cart stored under "schar-cart" (default Zustand key)
 *
 * Bug fix: the merge on login uses replaceCart (set-semantics) instead of
 * addItem (additive). Zustand `persist` already hydrates from "schar-cart" on
 * every page load, so calling addItem on top of the already-hydrated state
 * would double every item's quantity. We merge using Math.max(current, saved)
 * and call replaceCart once — safe on both fresh login and page reload.
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

/**
 * Merge two item lists without doubling quantities.
 * For items present in both, takes Math.max(current, saved) — avoids
 * summing on top of an already-hydrated Zustand store.
 */
function mergeItems(
  current: CartLineItem[],
  saved: CartLineItem[]
): CartLineItem[] {
  const map = new Map(current.map((i) => [i.key, { ...i }]));
  for (const savedItem of saved) {
    const existing = map.get(savedItem.key);
    if (existing) {
      map.set(savedItem.key, {
        ...existing,
        quantity: Math.max(existing.quantity, savedItem.quantity),
      });
    } else {
      map.set(savedItem.key, savedItem);
    }
  }
  return Array.from(map.values());
}

export function CartSync() {
  const { data: session, status } = useSession();
  const prevUserIdRef = useRef<string | null>(null);

  /**
   * LOGIN / LOGOUT handler.
   * Intentionally depends only on [session, status] — NOT on items.
   * We read items via useCartStore.getState() to avoid the effect re-running
   * every time an item is added, which would cause repeated merges and
   * consequent quantity doubling.
   */
  useEffect(() => {
    if (status === "loading") return;

    const userId = session?.user?.id ?? null;
    const prevUserId = prevUserIdRef.current;

    // ── User just logged in (or page reloaded while logged in) ──
    if (userId && userId !== prevUserId) {
      prevUserIdRef.current = userId;

      const savedItems = readUserCart(userId);
      if (savedItems.length === 0) return;

      // Read current store state without adding it as a React dependency
      const { items: currentItems, replaceCart } = useCartStore.getState();
      const merged = mergeItems(currentItems, savedItems);
      replaceCart(merged);
    }

    // ── User logged out ──
    if (!userId && prevUserId) {
      const { items, clearCart } = useCartStore.getState();
      saveUserCart(prevUserId, items);
      clearCart();
      prevUserIdRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  // ── Persist user cart on every items change when logged in ──
  const items = useCartStore((s) => s.items);
  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;
    saveUserCart(userId, items);
  }, [items, session?.user?.id]);

  return null;
}

