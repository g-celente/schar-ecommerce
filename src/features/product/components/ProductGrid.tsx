"use client";

import { motion } from "framer-motion";
import { staggerContainerFast } from "@/lib/motion";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="type-label tracking-[0.25em] text-foreground-muted mb-3">
          NO PRODUCTS FOUND
        </p>
        <p className="type-small text-foreground-subtle max-w-xs">
          Try a different category or check back for new drops.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="product-grid"
      variants={staggerContainerFast}
      initial="hidden"
      animate="visible"
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </motion.div>
  );
}
