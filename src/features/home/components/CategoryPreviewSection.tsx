"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  clipWipe,
  viewportOnce,
} from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { CATEGORIES } from "@/lib/mock/products";
import { ROUTES } from "@/lib/constants";

/* Each category card has a subtle pan-zoom + overlay on hover */
function CategoryCard({
  category,
}: {
  category: (typeof CATEGORIES)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`${ROUTES.products}?category=${category.slug}`}
        className="block relative aspect-editorial"
        aria-label={`Shop ${category.name}`}
      >
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        {/* Persistent bottom gradient */}
        <div className="absolute inset-0 overlay-bottom" aria-hidden="true" />

        {/* Hover full overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{ opacity: hovered ? 0.35 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
          <motion.p
            className="type-label text-foreground-muted tracking-[0.18em] mb-1"
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {category.count} PIECES
          </motion.p>
          <motion.h3
            className="type-display text-[clamp(2.5rem,7vw,4.5rem)] text-white"
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.35, delay: 0.03 }}
          >
            {category.name}
          </motion.h3>

          {/* CTA — slides up on hover */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            <span className="type-label text-accent tracking-[0.18em] underline underline-offset-4">
              EXPLORE →
            </span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryPreviewSection() {
  return (
    <section
      className="section bg-surface"
      aria-label="Shop by category"
    >
      <Container>
        {/* Header */}
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
            SHOP BY
          </motion.p>
          <motion.h2 variants={fadeUp} className="type-title text-foreground">
            CATEGORY
          </motion.h2>
        </motion.div>

        {/* Category grid — 1 col mobile, 3 col md+ */}
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
