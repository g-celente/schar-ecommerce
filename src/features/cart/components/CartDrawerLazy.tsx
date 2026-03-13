"use client";

import dynamic from "next/dynamic";

/**
 * Thin client-component wrapper that lazy-loads CartDrawer.
 * `ssr: false` is only valid inside a Client Component — this file
 * acts as the boundary so layout.tsx (a Server Component) can import it safely.
 */
const CartDrawer = dynamic(
  () =>
    import("@/features/cart/components/CartDrawer").then((m) => ({
      default: m.CartDrawer,
    })),
  { ssr: false }
);

export function CartDrawerLazy() {
  return <CartDrawer />;
}
