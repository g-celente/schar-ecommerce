"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { heroReveal, staggerContainer, fadeIn } from "@/lib/motion";
import { ROUTES } from "@/lib/constants";

const HERO_WORDS = ["SCHAR", "DROP", "001"];

// Unsplash hero — served via Next.js Image for WebP/AVIF conversion + preload
const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1800&q=85";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true });

  // Parallax — transforms run on the compositor thread (no re-renders)
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.55, 0.82]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-dvh min-h-[640px] w-full flex-col items-center justify-end overflow-hidden pb-16 md:pb-20"
      aria-label="Hero banner"
    >
      {/* ── Background image with parallax ──
          Uses Next.js Image (priority + fill) instead of CSS backgroundImage.
          Gains: automatic AVIF/WebP conversion, <link rel="preload">, srcSet.
          The motion.div applies the y-transform on the compositor thread.
          scale-[1.12] compensates for vertical parallax shift so edges stay hidden. */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY, scale: 1.12 }}
        aria-hidden="true"
      >
        <Image
          src={HERO_IMAGE_URL}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          draggable={false}
        />
      </motion.div>

      {/* ── Gradient overlay ── */}
      <motion.div
        className="absolute inset-0 will-change-[opacity]"
        style={{
          background: `linear-gradient(to top, var(--background) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.15) 100%)`,
          opacity: overlayOpacity,
        }}
        aria-hidden="true"
      />

      {/* ── Noise texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* ── Label overline ── */}
      <motion.div
        className="relative z-10 mb-5 flex items-center gap-3"
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.2 }}
      >
        <span className="h-px w-8 bg-accent/60" />
        <span className="type-label text-accent/80 tracking-[0.2em]">
          Drop Primavera — 2026
        </span>
        <span className="h-px w-8 bg-accent/60" />
      </motion.div>

      {/* ── Main headline ── */}
      <motion.div
        className="relative z-10 overflow-hidden text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {HERO_WORDS.map((word, i) => (
          <div key={word} className="overflow-hidden">
            <motion.h1
              className="type-hero block text-white"
              variants={heroReveal}
              transition={{ delay: i * 0.12 }}
            >
              {word}
            </motion.h1>
          </div>
        ))}
      </motion.div>

      {/* ── Sub copy ── */}
      <motion.p
        className="relative z-10 mt-5 max-w-xs text-center type-small text-foreground-muted md:max-w-sm"
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.65 }}
      >
        Peças limitadas. Sem reposição.
        <br />
        Envio mundial em 48 horas.
      </motion.p>

      {/* ── CTAs ── */}
      <motion.div
        className="relative z-10 mt-8 flex flex-col items-center gap-3 sm:flex-row"
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.8 }}
      >
        <Link
          href={ROUTES.products}
          className="group relative overflow-hidden border border-white bg-white px-10 py-4 type-label text-black tracking-[0.18em] transition-colors duration-300 hover:bg-transparent hover:text-white"
        >
          <span className="relative z-10">COMPRAR DROP</span>
          <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
        </Link>

        <Link
          href="#featured"
          className="type-label text-foreground-muted tracking-[0.15em] underline-offset-4 hover:text-accent hover:underline transition-colors duration-200"
        >
          SAIBA MAIS
        </Link>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <span className="type-label text-foreground-subtle tracking-[0.15em]">
            ROLAR
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 3v10M3 9l5 4 5-4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground-subtle"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
