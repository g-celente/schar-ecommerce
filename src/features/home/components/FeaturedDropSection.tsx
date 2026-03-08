"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  scaleIn,
  viewportOnce,
} from "@/lib/motion";
import { ProductCard } from "@/features/product/components/ProductCard";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/lib/constants";
import { FEATURED_PRODUCTS } from "@/lib/mock/products";

export function FeaturedDropSection() {
  return (
    <section
      id="featured"
      className="section bg-background"
      aria-label="Featured drop"
    >
      <Container>
        {/* ── Section header ── */}
        <motion.div
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="type-label text-foreground-muted tracking-[0.2em] mb-2"
            >
              DROP 001 — SPRING 2026
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="type-title text-foreground"
            >
              FEATURED
            </motion.h2>
          </div>

          <motion.div variants={fadeUp}>
            <Link
              href={ROUTES.products}
              className="type-label text-foreground-muted tracking-[0.15em] underline underline-offset-4 transition-colors hover:text-accent"
            >
              VIEW ALL →
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Drop countdown pill ── */}
        <motion.div
          className="mb-8 inline-flex items-center gap-2 border border-border-strong px-4 py-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span className="type-label text-foreground-muted tracking-widest">
            LIVE NOW — LIMITED STOCK
          </span>
        </motion.div>

        {/* ── Product grid ── */}
        <motion.div
          className="product-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {FEATURED_PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < 2}
            />
          ))}
        </motion.div>

        {/* ── CTA row ── */}
        <motion.div
          className="mt-12 flex justify-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Link
            href={ROUTES.products}
            className="group relative overflow-hidden border border-border-strong px-12 py-4 type-label tracking-[0.18em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            SHOP ALL DROPS
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
