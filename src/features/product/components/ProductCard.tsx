"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/motion";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { QuickViewModal } from "./QuickViewModal";
import type { Product } from "@/types";

/**
 * ProductCard — entrance animation via Framer Motion (scaleIn variant).
 * All hover effects use CSS group-hover utilities instead of useState.
 * This eliminates re-renders on every mouse-enter/leave event.
 */

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const image = product.images[0];
  const isSoldOut = !product.comingSoon && product.stock === 0;
  const isLowStock =
    !product.comingSoon && product.stock > 0 && product.stock <= 5;
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;

  // ── Coming soon — static locked card ──────────────────────────────────────
  if (product.comingSoon) {
    return (
      <article className="relative flex flex-col">
        <div className="relative overflow-hidden aspect-product bg-surface-2">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground-subtle"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="absolute left-2 top-2 z-10">
            <span className="type-label bg-surface-3/90 px-2 py-1 text-foreground-muted tracking-widest backdrop-blur-sm">
              EM BREVE
            </span>
          </div>
        </div>
        <div className="mt-3">
          <p className="type-label text-foreground-subtle tracking-[0.12em]">
            DROP 002
          </p>
          <h3 className="mt-0.5 type-heading text-[1rem] font-semibold text-foreground-subtle">
            EM BREVE
          </h3>
        </div>
      </article>
    );
  }

  // ── Available product ──────────────────────────────────────────────────────
  return (
    <motion.article variants={scaleIn} className="group relative flex flex-col">
      {/* ── Image wrapper ── */}
      <Link
        href={ROUTES.product(product.slug)}
        className="relative block overflow-hidden aspect-product bg-surface"
        aria-label={`Ver ${product.name}`}
      >
        {/* Image — CSS transform scale on hover, GPU composited */}
        {image && (
          <div className="absolute inset-0 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              priority={priority}
            />
          </div>
        )}

        {/* Overlay — CSS opacity on hover */}
        <div
          className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-25"
          aria-hidden="true"
        />

        {/* Quick-add CTA — CSS slide up from bottom on hover */}
        {!isSoldOut && (
          <div className="absolute bottom-0 left-0 right-0 z-10 p-3 translate-y-full opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewOpen(true); }}
              className="w-full border border-white/80 bg-black/70 py-3 type-label text-white tracking-[0.15em] backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
              aria-label={`Adicionar ${product.name} à sacola`}
            >
              ADICIONAR
            </button>
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {isSoldOut && (
            <span className="type-label bg-surface-3/90 px-2 py-1 text-foreground-muted tracking-widest backdrop-blur-sm">
              ESGOTADO
            </span>
          )}
          {!isSoldOut && isLowStock && (
            <span className="type-label bg-black/80 px-2 py-1 text-accent tracking-widest backdrop-blur-sm">
              {product.stock} RESTANTES
            </span>
          )}
          {!isSoldOut && product.tags.includes("new") && (
            <span className="type-label bg-white px-2 py-1 text-black tracking-widest">
              NOVO
            </span>
          )}
          {hasDiscount && (
            <span className="type-label bg-white/10 px-2 py-1 text-accent tracking-widest backdrop-blur-sm">
              PROMOÇÃO
            </span>
          )}
        </div>
      </Link>

      {/* Info row */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <Link href={ROUTES.product(product.slug)} className="flex-1 min-w-0">
          <p className="type-label text-foreground-muted tracking-[0.12em] truncate">
            {product.category.name}
          </p>
          <h3 className="mt-0.5 type-heading text-[1rem] font-semibold text-foreground truncate transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <div className="shrink-0 text-right">
          {hasDiscount && (
            <p className="type-small text-foreground-subtle line-through">
              {formatPrice(product.compareAtPrice!)}
            </p>
          )}
          <p
            className={`type-price ${hasDiscount ? "text-accent" : "text-foreground"}`}
          >
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </motion.article>
  );
}
