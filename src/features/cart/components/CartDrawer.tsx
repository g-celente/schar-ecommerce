"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/features/cart/store/cart.store";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

const EASE = [0.19, 1, 0.22, 1] as const;

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const closeCart = useCartStore((s) => s.closeCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const itemCount = useCartStore((s) => s.itemCount());

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[var(--z-drawer)]"
            aria-hidden="true"
            onClick={closeCart}
          />

          {/* Drawer panel */}
          <motion.aside
            key="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface flex flex-col z-[var(--z-drawer)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
              <h2 className="type-label tracking-[0.2em]">
                BAG ({itemCount})
              </h2>
              <div className="flex items-center gap-4">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="type-label text-[0.6rem] tracking-[0.15em] text-foreground-subtle hover:text-foreground transition-colors"
                    aria-label="Clear all items"
                  >
                    CLEAR ALL
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close shopping bag"
                  className="w-8 h-8 flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-20 text-center">
                  <p className="type-heading text-foreground-muted">YOUR BAG IS EMPTY</p>
                  <p className="type-small text-foreground-subtle max-w-[220px]">
                    Add products to your bag to see them here.
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  <ul className="py-2">
                    {items.map((item) => (
                      <CartItem key={item.key} item={item} />
                    ))}
                  </ul>
                </AnimatePresence>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="px-6 pb-8 pt-2 shrink-0 bg-surface">
                <CartSummary onClose={closeCart} />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
