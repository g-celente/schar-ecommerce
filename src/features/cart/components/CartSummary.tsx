"use client";

import Link from "next/link";
import { useCartStore } from "@/features/cart/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

interface CartSummaryProps {
  onClose?: () => void;
}

export function CartSummary({ onClose }: CartSummaryProps) {
  const subtotal = useCartStore((s) => s.subtotal());
  const FREE_SHIPPING_THRESHOLD = 150;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="border-t border-border-strong pt-6 space-y-4">
      {/* Shipping notice */}
      <div className="text-center py-3 border-y border-border">
        {remainingForFreeShipping > 0 ? (
          <p className="type-small text-foreground-muted">
            Add{" "}
            <span className="text-foreground font-medium">
              {formatPrice(remainingForFreeShipping)}
            </span>{" "}
            more for free shipping
          </p>
        ) : (
          <p className="type-small text-foreground">
            You qualify for{" "}
            <span className="font-medium tracking-wide">FREE SHIPPING</span>
          </p>
        )}
      </div>

      {/* Subtotal */}
      <div className="flex items-baseline justify-between">
        <span className="type-label tracking-widest text-foreground-muted">
          SUBTOTAL
        </span>
        <span className="type-price-lg">{formatPrice(subtotal)}</span>
      </div>

      <p className="type-small text-foreground-subtle">
        Taxes and shipping calculated at checkout
      </p>

      {/* Checkout CTA */}
      <Link
        href={ROUTES.cart}
        onClick={onClose}
        className="w-full block text-center bg-foreground text-background type-label tracking-[0.15em] py-4 hover:bg-accent hover:text-foreground transition-colors"
      >
        CHECKOUT
      </Link>

      <Link
        href={ROUTES.products}
        onClick={onClose}
        className="w-full block text-center border border-border type-label tracking-[0.15em] py-3 text-foreground-muted hover:text-foreground hover:border-border-strong transition-colors"
      >
        CONTINUE SHOPPING
      </Link>
    </div>
  );
}
