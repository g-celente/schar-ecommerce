"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { ROUTES } from "@/lib/constants";

/* ── Category data — rename / swap images freely ───────────────────────────── */
const GRID_CATEGORIES = [
  {
    id: "gc-1",
    name: "CAMISETAS",
    slug: "camisetas",
    image: "/products/tee-001/front.jpeg",
    tag: "CORE",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] as const },
  },
};

function CategoryGridCard({
  category,
}: {
  category: (typeof GRID_CATEGORIES)[number];
}) {
  return (
    <motion.div variants={cardVariants}>
      <Link
        href={`${ROUTES.products}?category=${category.slug}`}
        className="group relative block aspect-[3/4] overflow-hidden"
        aria-label={`Ver ${category.name}`}
      >
        {/* Image */}
        <div className="absolute inset-0 will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.08]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover brightness-[0.55] contrast-[1.1] transition-[filter] duration-500 group-hover:brightness-[0.7]"
          />
        </div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40"
          aria-hidden="true"
        />

        {/* Noise texture — street grit */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        {/* Street sticker tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 type-label text-[0.6rem] tracking-[0.2em] rotate-[-2deg] bg-white text-black">
            {category.tag}
          </span>
        </div>

        {/* Category name — centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4">
          <h3 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2rem,6vw,3.5rem)] uppercase leading-none text-white text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105">
            {category.name}
          </h3>
          <span className="mt-3 type-label text-white/70 tracking-[0.18em] translate-y-2 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
            VER COLEÇÃO →
          </span>
        </div>

        {/* Border glow on hover */}
        <div
          className="absolute inset-0 border border-white/0 transition-colors duration-500 group-hover:border-white/20"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

export function CategoryGridSection() {
  return (
    <section className="section bg-surface" aria-label="Categorias">
      <Container>
        {/* ── Section header ── */}
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

        {/* ── Grid ── */}
        <motion.div
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {GRID_CATEGORIES.map((cat) => (
            <CategoryGridCard key={cat.id} category={cat} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
