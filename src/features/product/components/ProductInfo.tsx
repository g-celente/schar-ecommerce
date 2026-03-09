"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const isSoldOut = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const hasSizes = product.sizes && product.sizes.length > 0;

  function handleAddToCart() {
    if (hasSizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    // TODO: dispatch to Zustand cart store
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      initial="hidden"
      animate="visible"
    >
      {/* ── Breadcrumb ── */}
      <motion.nav variants={fadeUp} aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 type-label text-foreground-subtle tracking-[0.1em]">
          <li>
            <Link href={ROUTES.products} className="hover:text-foreground transition-colors">
              STORE
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`${ROUTES.products}?category=${product.category.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {product.category.name.toUpperCase()}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground-muted truncate max-w-[180px]">
            {product.name}
          </li>
        </ol>
      </motion.nav>

      {/* ── Title ── */}
      <motion.div variants={fadeUp}>
        <h1 className="type-title leading-none">{product.name}</h1>
      </motion.div>

      {/* ── Price ── */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <span
          className={cn(
            "type-price-lg",
            hasDiscount ? "text-accent" : "text-foreground"
          )}
        >
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <span className="type-price text-foreground-subtle line-through">
            {formatPrice(product.compareAtPrice!)}
          </span>
        )}
        {hasDiscount && (
          <span className="type-label bg-white/10 px-2 py-0.5 text-accent tracking-widest">
            SALE
          </span>
        )}
      </motion.div>

      {/* ── Description ── */}
      <motion.p
        variants={fadeUp}
        className="type-body text-foreground-muted leading-relaxed max-w-sm"
      >
        {product.description}
      </motion.p>

      {/* ── Size selector ── */}
      {hasSizes && (
        <motion.div variants={fadeUp} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="type-label tracking-[0.15em] text-foreground">
              SIZE
            </span>
            {sizeError && (
              <span
                className="type-label text-[0.6rem] tracking-widest text-red-400"
                role="alert"
              >
                SELECT A SIZE
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Size options">
            {product.sizes!.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
                aria-pressed={selectedSize === size}
                className={cn(
                  "min-w-[3rem] border px-3 py-2 type-label tracking-widest transition-all duration-150",
                  selectedSize === size
                    ? "border-foreground bg-foreground text-background"
                    : sizeError
                    ? "border-red-400/60 text-foreground-muted hover:border-foreground hover:text-foreground"
                    : "border-border text-foreground-muted hover:border-foreground hover:text-foreground"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Stock status ── */}
      {isLowStock && (
        <motion.p
          variants={fadeUp}
          className="type-label tracking-[0.15em] text-accent"
          role="status"
        >
          ONLY {product.stock} LEFT
        </motion.p>
      )}
      {isSoldOut && (
        <motion.p
          variants={fadeUp}
          className="type-label tracking-[0.15em] text-foreground-muted"
          role="status"
        >
          SOLD OUT
        </motion.p>
      )}

      {/* ── Add to cart ── */}
      <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isSoldOut}
          aria-label={
            isSoldOut
              ? "Sold out"
              : added
              ? "Added to cart"
              : "Add to cart"
          }
          className={cn(
            "flex-1 border py-4 type-label tracking-[0.2em] transition-all duration-200",
            isSoldOut
              ? "cursor-not-allowed border-border text-foreground-subtle opacity-40"
              : added
              ? "border-foreground bg-foreground text-background"
              : "border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground"
          )}
        >
          {isSoldOut ? "SOLD OUT" : added ? "ADDED ✓" : "ADD TO BAG"}
        </button>

        <Link
          href={ROUTES.cart}
          className="flex-1 border border-border py-4 text-center type-label tracking-[0.2em] text-foreground-muted transition-colors hover:border-foreground hover:text-foreground sm:flex-none sm:px-8"
        >
          VIEW BAG
        </Link>
      </motion.div>

      {/* ── Tags ── */}
      {product.tags.length > 0 && (
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="type-label tracking-widest text-foreground-subtle border border-border px-2 py-1"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
