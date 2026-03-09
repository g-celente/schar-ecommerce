"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/features/cart/store/cart.store";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/lib/constants";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <main className="min-h-[calc(100dvh-4rem)] pt-24 pb-20">
      <Container>
        {/* Page heading */}
        <div className="border-b border-border pb-6 mb-10">
          <p className="type-label tracking-[0.2em] text-foreground-muted mb-2">
            SCHAR
          </p>
          <h1 className="type-display text-4xl md:text-5xl">
            YOUR BAG{" "}
            <span className="text-foreground-subtle">({itemCount})</span>
          </h1>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-center justify-center py-32 gap-6 text-center"
          >
            <p className="type-heading text-foreground-muted text-xl">
              YOUR BAG IS EMPTY
            </p>
            <p className="type-body text-foreground-subtle max-w-xs">
              Looks like you haven&apos;t added anything yet. Explore the drop.
            </p>
            <Link
              href={ROUTES.products}
              className="mt-4 inline-block bg-foreground text-background type-label tracking-[0.2em] px-10 py-4 hover:bg-accent hover:text-foreground transition-colors"
            >
              SHOP ALL
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-20 items-start">
            {/* Line items */}
            <div>
              <AnimatePresence initial={false}>
                <ul>
                  {items.map((item) => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </ul>
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="lg:sticky lg:top-28">
              <h2 className="type-label tracking-[0.2em] text-foreground-muted mb-6">
                ORDER SUMMARY
              </h2>
              <CartSummary />
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}