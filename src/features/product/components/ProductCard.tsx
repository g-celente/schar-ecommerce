"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleIn } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const image = product.images[0];
  const isSoldOut = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <motion.article
      variants={scaleIn}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image wrapper ── */}
      <Link
        href={ROUTES.product(product.slug)}
        className="relative block overflow-hidden aspect-product bg-surface"
        tabIndex={0}
        aria-label={`View ${product.name}`}
      >
        {/* Primary image */}
        {image && (
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              priority={priority}
            />
          </motion.div>
        )}

        {/* Dark overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{ opacity: hovered ? 0.25 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        {/* ── Quick-add CTA (hover reveal) ── */}
        <AnimatePresence>
          {hovered && !isSoldOut && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-10 p-3"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            >
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="w-full border border-white/80 bg-black/70 py-3 type-label text-white tracking-[0.15em] backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                aria-label={`Quick add ${product.name} to cart`}
              >
                QUICK ADD
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Badges ── */}
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {isSoldOut && (
            <span className="type-label bg-surface-3/90 px-2 py-1 text-foreground-muted tracking-widest backdrop-blur-sm">
              SOLD OUT
            </span>
          )}
          {!isSoldOut && isLowStock && (
            <span className="type-label bg-black/80 px-2 py-1 text-accent tracking-widest backdrop-blur-sm">
              {product.stock} LEFT
            </span>
          )}
          {!isSoldOut && product.tags.includes("new") && (
            <span className="type-label bg-white px-2 py-1 text-black tracking-widest">
              NEW
            </span>
          )}
          {hasDiscount && (
            <span className="type-label bg-white/10 px-2 py-1 text-accent tracking-widest backdrop-blur-sm">
              SALE
            </span>
          )}
        </div>
      </Link>

      {/* ── Info row ── */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <Link
          href={ROUTES.product(product.slug)}
          className="flex-1 min-w-0"
        >
          <p className="type-label text-foreground-muted tracking-[0.12em] truncate">
            {product.category.name}
          </p>
          <h3 className="mt-0.5 type-heading text-[1rem] font-semibold text-foreground truncate transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="shrink-0 text-right">
          {hasDiscount && (
            <p className="type-small text-foreground-subtle line-through">
              {formatPrice(product.compareAtPrice!)}
            </p>
          )}
          <p className={`type-price ${hasDiscount ? "text-accent" : "text-foreground"}`}>
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
