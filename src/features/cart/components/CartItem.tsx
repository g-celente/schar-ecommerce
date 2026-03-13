"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCartStore } from "@/features/cart/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import type { CartLineItem } from "@/features/cart/store/cart.store";

interface CartItemProps {
  item: CartLineItem;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore();
  const image = item.product.images[0];

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0 }}
      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      className="flex gap-4 py-5 border-b border-border last:border-0"
    >
      {/* Thumbnail */}
      <Link
        href={ROUTES.product(item.product.slug)}
        className="relative shrink-0 overflow-hidden bg-surface w-20 aspect-product"
        tabIndex={-1}
        aria-label={`View ${item.product.name}`}
      >
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="80px"
            className="object-cover"
          />
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 min-w-0 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="type-label text-foreground-muted tracking-widest truncate">
              {item.product.category.name.toUpperCase()}
            </p>
            <Link
              href={ROUTES.product(item.product.slug)}
              className="type-heading text-[0.9rem] font-semibold hover:text-accent transition-colors truncate block"
            >
              {item.product.name}
            </Link>
            {item.size && (
              <p className="type-label text-foreground-subtle tracking-widest mt-0.5">
                TAMANHO: {item.size}
              </p>
            )}
          </div>

          {/* Price */}
          <p className="type-price shrink-0">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>

        {/* Qty + Remove */}
        <div className="flex items-center justify-between mt-2">
          <div
            className="flex items-center border border-border"
            role="group"
            aria-label={`Quantity for ${item.product.name}`}
          >
            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity - 1)}
              aria-label="Diminuir quantidade"
              className="w-8 h-8 flex items-center justify-center type-label text-foreground-muted hover:text-foreground transition-colors"
            >
              −
            </button>
            <span className="w-8 text-center type-label text-foreground tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.key, item.quantity + 1)}
              aria-label="Aumentar quantidade"
              className="w-8 h-8 flex items-center justify-center type-label text-foreground-muted hover:text-foreground transition-colors"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.key)}
            aria-label={`Remove ${item.product.name}`}
            className="type-label text-[0.6rem] tracking-[0.15em] text-foreground-subtle hover:text-foreground transition-colors"
          >
            REMOVER
          </button>
        </div>
      </div>
    </motion.li>
  );
}
