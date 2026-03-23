"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { CATEGORIES } from "@/lib/mock/products";
import { ROUTES } from "@/lib/constants";

type Category = (typeof CATEGORIES)[number];

/**
 * CategoryCard — hover effects are pure CSS (no useState).
 * Uses Tailwind group-hover utilities for image scale, overlay, and CTA reveal.
 * The parent motion.div still handles the viewport entrance animation.
 */
function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div variants={fadeUp} className="group relative overflow-hidden">
      <Link
        href={`${ROUTES.products}?category=${category.slug}`}
        className="block relative aspect-editorial"
        aria-label={`Explorar ${category.name}`}
      >
        {/* Image — CSS scale on hover, GPU composited */}
        <div className="absolute inset-0 will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.07]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Bottom gradient — always visible */}
        <div className="absolute inset-0 overlay-bottom" aria-hidden="true" />

        {/* Hover overlay — CSS opacity */}
        <div
          className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-[0.35]"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
          <p className="type-label text-foreground-muted tracking-[0.18em] mb-1 transition-transform duration-300 group-hover:-translate-y-1">
            {category.count} PEÇAS
          </p>
          <h3 className="type-display text-[clamp(2.5rem,7vw,4.5rem)] text-white transition-transform duration-[350ms] delay-[30ms] group-hover:-translate-y-1">
            {category.name}
          </h3>

          {/* CTA — slides up on hover, CSS only */}
          <div className="mt-3 translate-y-3 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="type-label text-accent tracking-[0.18em] underline underline-offset-4">
              EXPLORAR →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryPreviewSection() {
  return (
    <section className="section bg-surface" aria-label="Explorar por categoria">
      <Container>
        <motion.div
          className="mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            className="type-label text-foreground-muted tracking-[0.2em] mb-2"
          >
            EXPLORAR POR
          </motion.p>
          <motion.h2 variants={fadeUp} className="type-title text-foreground">
            CATEGORIA
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-3 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
