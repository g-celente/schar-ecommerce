"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useCartStore } from "@/features/cart/store/cart.store";
import type { Product } from "@/types";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

// ─── Star rating ─────────────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`${rating} de 5 estrelas`}
      >
        {Array.from({ length: 5 }, (_, i) => {
          const full = i + 1 <= Math.floor(rating);
          const half = !full && i < rating && rating - i < 1;
          return (
            <svg
              key={i}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {half && (
                <defs>
                  <linearGradient id={`hg-${i}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"
                fill={full ? "currentColor" : half ? `url(#hg-${i})` : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className={full || half ? "text-amber-400" : "text-border-strong"}
              />
            </svg>
          );
        })}
      </div>
      <span className="type-small text-foreground-muted tabular-nums">
        {rating.toFixed(1)}{" "}
        <span className="text-foreground-subtle">({count})</span>
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const hasSizes = !!product.sizes?.length;
  const activeImage = product.images[activeIndex];
  const isSoldOut = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setSelectedSize(null);
      setSizeError(false);
      setAdded(false);
    }
  }, [isOpen]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleKey]);

  function handleAddToCart() {
    if (hasSizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => {
      onClose();
      openCart();
    }, 750);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────── */}
          <motion.div
            key="qv-bd"
            className="fixed inset-0 z-[360] bg-black/70 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Shell ────────────────────────────────────────────────── */}
          <div className="fixed inset-0 z-[361] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              key="qv-panel"
              role="dialog"
              aria-modal="true"
              aria-label={`Vista rápida — ${product.name}`}
              className="relative w-full max-w-[1100px] bg-background border border-border rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90dvh]"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/90 text-foreground-muted transition-all duration-150 hover:border-foreground-muted hover:text-foreground backdrop-blur-sm"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M1 1l8 8M9 1L1 9" />
                </svg>
              </button>

              {/* ════════════════════════════════════════════════════════
                  LEFT — image gallery  (55%)
              ════════════════════════════════════════════════════════ */}
              <div className="relative md:w-[55%] flex-shrink-0 aspect-[3/4] md:aspect-auto">
                {/*
                 * This absolute-inset container fills the outer div
                 * regardless of whether its height comes from aspect-ratio
                 * (mobile) or flexbox stretch (desktop).
                 */}
                <div className="absolute inset-0 flex">

                  {/* Vertical thumbnail strip — desktop only */}
                  {product.images.length > 1 && (
                    <div className="hidden md:flex w-[76px] shrink-0 flex-col gap-2 overflow-y-auto no-scrollbar border-r border-border bg-surface p-2.5">
                      {product.images.map((img, i) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => setActiveIndex(i)}
                          aria-label={`Ver imagem ${i + 1}`}
                          aria-pressed={i === activeIndex}
                          className={cn(
                            "relative aspect-[3/4] w-full shrink-0 overflow-hidden border transition-all duration-200",
                            i === activeIndex
                              ? "border-foreground"
                              : "border-transparent opacity-50 hover:opacity-90 hover:border-border-strong"
                          )}
                        >
                          <Image
                            src={img.url}
                            alt={img.alt}
                            fill
                            sizes="76px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Main image */}
                  <div className="relative flex-1 bg-background overflow-hidden group cursor-zoom-in p-6 md:p-8">
                    {/*
                     * Inner container fills the CONTENT area (inside padding).
                     * The padding creates a visible "mat" of modal background
                     * around the product — the image never touches panel edges.
                     */}
                    <div className="relative w-full h-full">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={activeIndex}
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {activeImage && (
                            <div className="absolute inset-0 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]">
                              <Image
                                src={activeImage.url}
                                alt={activeImage.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 55vw"
                                className="object-contain"
                                priority
                              />
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Discount badge — over image */}
                    {hasDiscount && (
                      <span className="absolute left-3 top-3 z-10 type-label bg-accent px-2.5 py-1.5 text-background tracking-widest">
                        -{discountPct}%
                      </span>
                    )}

                    {/* Sold-out / low-stock badge */}
                    <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5 mt-7">
                      {isSoldOut && !hasDiscount && (
                        <span className="type-label bg-surface-3/90 px-2.5 py-1.5 text-foreground-muted tracking-widest backdrop-blur-sm">
                          ESGOTADO
                        </span>
                      )}
                      {!isSoldOut && isLowStock && (
                        <span className="type-label bg-black/75 px-2.5 py-1.5 text-accent tracking-widest backdrop-blur-sm">
                          {product.stock} RESTANTES
                        </span>
                      )}
                    </div>

                    {/* Mobile image indicators */}
                    {product.images.length > 1 && (
                      <div className="absolute bottom-3 left-0 right-0 z-10 flex items-center justify-center gap-1.5 md:hidden">
                        {product.images.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Imagem ${i + 1}`}
                            className={cn(
                              "h-px transition-all duration-300",
                              i === activeIndex
                                ? "w-8 bg-white"
                                : "w-4 bg-white/40 hover:bg-white/70"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ════════════════════════════════════════════════════════
                  RIGHT — product info (45%)
              ════════════════════════════════════════════════════════ */}
              <div className="flex-1 overflow-y-auto border-t border-border md:border-t-0 md:border-l">
                <div className="flex flex-col gap-5 p-7 sm:p-8">

                  {/* Category + name */}
                  <div className="flex flex-col gap-2 pr-10">
                    <p className="type-label text-foreground-subtle tracking-[0.22em]">
                      {product.category.name}
                    </p>
                    <h2 className="font-heading text-[1.625rem] sm:text-[1.875rem] font-bold leading-tight tracking-tight text-foreground">
                      {product.name}
                    </h2>
                  </div>

                  {/* Rating */}
                  <StarRating rating={product.rating} count={product.reviewCount} />

                  {/* Price */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={cn(
                        "type-price-lg",
                        hasDiscount ? "text-accent" : "text-foreground"
                      )}
                    >
                      {formatPrice(product.price)}
                    </span>
                    {hasDiscount && (
                      <>
                        <span className="type-price text-foreground-subtle line-through">
                          {formatPrice(product.compareAtPrice!)}
                        </span>
                        <span className="type-label bg-accent/10 text-accent px-2 py-1 tracking-wider">
                          -{discountPct}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <hr className="border-border" />

                  {/* Variation thumbnails */}
                  {product.images.length > 1 && (
                    <div className="flex flex-col gap-2.5">
                      <p className="type-label tracking-[0.18em] text-foreground-muted">
                        VARIAÇÕES{" "}
                        <span className="text-foreground normal-case tracking-normal font-normal ml-1">
                          — {activeIndex + 1}/{product.images.length}
                        </span>
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {product.images.map((img, i) => (
                          <button
                            key={img.id}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Variação ${i + 1}`}
                            aria-pressed={i === activeIndex}
                            className={cn(
                              "relative h-14 w-11 overflow-hidden border-2 transition-all duration-150",
                              i === activeIndex
                                ? "border-foreground"
                                : "border-transparent opacity-55 hover:opacity-100 hover:border-border-strong"
                            )}
                          >
                            <Image
                              src={img.url}
                              alt={img.alt}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size selector */}
                  {hasSizes && (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="type-label tracking-[0.18em] text-foreground-muted">
                          TAMANHO
                        </span>
                        <AnimatePresence>
                          {sizeError && (
                            <motion.span
                              initial={{ opacity: 0, x: 6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.18 }}
                              className="type-label text-[0.6rem] tracking-widest text-red-400"
                              role="alert"
                            >
                              SELECIONE UM TAMANHO
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div
                        className="flex flex-wrap gap-2"
                        role="group"
                        aria-label="Opções de tamanho"
                      >
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
                              "min-w-[3rem] border px-3 py-2.5 type-label tracking-widest transition-all duration-150",
                              selectedSize === size
                                ? "border-foreground bg-foreground text-background"
                                : sizeError
                                ? "border-red-400/50 text-foreground-muted hover:border-foreground hover:text-foreground"
                                : "border-border text-foreground-muted hover:border-foreground hover:text-foreground"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="type-small text-foreground-muted leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Low stock warning */}
                  {isLowStock && !isSoldOut && (
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <p
                        className="type-label tracking-[0.15em] text-accent"
                        role="status"
                      >
                        APENAS {product.stock} RESTANTES
                      </p>
                    </div>
                  )}

                  {/* ── Actions ────────────────────────────────────────── */}
                  <div className="flex flex-col gap-3 pt-1 border-t border-border mt-1">

                    {/* Cart + Wishlist row */}
                    <div className="flex gap-2.5 pt-4">
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={isSoldOut || added}
                        className={cn(
                          "flex-1 py-4 type-label tracking-[0.2em] transition-all duration-200",
                          isSoldOut
                            ? "cursor-not-allowed bg-surface text-foreground-subtle opacity-40"
                            : added
                            ? "bg-foreground text-background cursor-default"
                            : "bg-foreground text-background hover:bg-transparent hover:text-foreground border border-foreground"
                        )}
                      >
                        {isSoldOut
                          ? "ESGOTADO"
                          : added
                          ? "ADICIONADO ✓"
                          : "ADICIONAR À SACOLA"}
                      </button>

                      {/* Wishlist toggle */}
                      <button
                        type="button"
                        onClick={() => setWishlisted((w) => !w)}
                        aria-label={
                          wishlisted
                            ? "Remover da lista de desejos"
                            : "Adicionar à lista de desejos"
                        }
                        className={cn(
                          "flex shrink-0 items-center justify-center border py-4 px-4 transition-all duration-200",
                          wishlisted
                            ? "border-red-400/60 text-red-400"
                            : "border-border text-foreground-muted hover:border-foreground-muted hover:text-foreground"
                        )}
                      >
                        <AnimatePresence mode="wait">
                          <motion.svg
                            key={String(wishlisted)}
                            initial={{ scale: 0.6, rotate: -12 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.6, rotate: 12 }}
                            transition={{
                              duration: 0.22,
                              ease: [0.34, 1.56, 0.64, 1],
                            }}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill={wishlisted ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </motion.svg>
                        </AnimatePresence>
                      </button>
                    </div>

                    {/* Full product link */}
                    <Link
                      href={ROUTES.product(product.slug)}
                      onClick={onClose}
                      className="w-full py-3 text-center type-label tracking-[0.15em] text-foreground-subtle transition-colors hover:text-foreground"
                    >
                      VER PRODUTO COMPLETO →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
