"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

/* ── Lookbook data — swap images & text freely ─────────────────────────────── */
const LOOKBOOK_ITEMS = [
  {
    id: "lb-1",
    src: "/products/tee-001/image1.jpeg",
    alt: "SCHAR Lookbook — Street",
    span: "large" as const,
    phrase: "NASCIDO NAS RUAS",
  },
  {
    id: "lb-2",
    src: "/products/IMG_1667.jpg",
    alt: "SCHAR Lookbook — Detail",
    span: "small" as const,
    phrase: null,
  },
  {
    id: "lb-3",
    src: "/products/andre-basquet.jpg",
    alt: "SCHAR Lookbook — Front",
    span: "small" as const,
    phrase: "SEM REGRAS",
  },
  {
    id: "lb-4",
    src: "/products/schar-skate2.jpg",
    alt: "SCHAR Lookbook — Editorial",
    span: "small" as const,
    phrase: null,
  },
  {
    id: "lb-5",
    src: "/products/IMG_1641.jpg",
    alt: "SCHAR Lookbook — Back",
    span: "small" as const,
    phrase: "VISTA A ATITUDE",
  },
  {
    id: "lb-6",
    src: "/products/tee-001/image4.jpeg",
    alt: "SCHAR Lookbook — Close",
    span: "large" as const,
    phrase: "CULTURA STREET",
  },
];

/* ── Card animation variants ─────────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const },
  },
};

function LookbookCard({
  item,
}: {
  item: (typeof LOOKBOOK_ITEMS)[number];
}) {
  const isLarge = item.span === "large";

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative overflow-hidden ${
        isLarge
          ? "col-span-1 md:col-span-2 aspect-[16/10]"
          : "col-span-1 aspect-[3/4]"
      }`}
    >
      {/* Image with hover effects */}
      <div className="absolute inset-0 will-change-transform transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06] group-hover:saturate-[1.15]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
          className="object-cover grayscale-[0.15] transition-[filter] duration-700 group-hover:grayscale-0"
        />
      </div>

      {/* Dark overlay on hover */}
      <div
        className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30"
        aria-hidden="true"
      />

      {/* Bottom gradient — always visible */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"
        aria-hidden="true"
      />

      {/* Phrase overlay */}
      {item.phrase && (
        <div className="absolute inset-0 flex items-end p-4 md:p-6">
          <span className="font-[family-name:var(--font-bebas-neue)] text-[clamp(1.5rem,4vw,2.5rem)] uppercase leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {item.phrase}
          </span>
        </div>
      )}

      {/* Corner tag — street sticker vibe */}
      <div className="absolute top-3 right-3 border border-white/20 bg-black/50 px-2 py-0.5 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="type-label text-white/80 tracking-[0.15em] text-[0.6rem]">
          SCHAR®
        </span>
      </div>

      {/* Scan line effect — subtle editorial overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export function LookbookSection() {
  return (
    <section className="section bg-background" aria-label="Lookbook">
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
            LIFESTYLE
          </motion.p>
          <motion.h2 variants={fadeUp} className="type-title text-foreground">
            LOOKBOOK
          </motion.h2>
        </motion.div>

        {/* ── Asymmetric grid ──
            Desktop: 3 columns, large items span 2 cols
            Mobile: 2 columns, large items span full width */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {LOOKBOOK_ITEMS.map((item) => (
            <LookbookCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* ── Manifesto line ── */}
        <motion.div
          className="mt-10 flex items-center gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <span className="h-px flex-1 bg-border" />
          <span className="type-label text-foreground-subtle tracking-[0.25em]">
            CADA PEÇA CONTA UMA HISTÓRIA
          </span>
          <span className="h-px flex-1 bg-border" />
        </motion.div>
      </Container>
    </section>
  );
}
