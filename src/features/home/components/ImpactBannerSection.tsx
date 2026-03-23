"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

/* ── Config — swap image & text freely ─────────────────────────────────────── */
const BANNER_IMAGE = "/brand/impartbanner.jpg";
const BANNER_IMAGE_POSITION = "center 35%"; // ajuste aqui: "center top", "center 30%", "center 70%", etc.
const BANNER_PHRASE = "VISTA A ATITUDE.";
const TICKER_WORDS = [
  "STREETWEAR",
  "SCHAR®",
  "DROP 001",
  "SEM REPOSIÇÃO",
  "CULTURA DE RUA",
  "EDIÇÃO LIMITADA",
  "ATITUDE",
  "ORIGINAL",
];

export function ImpactBannerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Build infinite ticker string (repeated for seamless loop)
  const tickerText = TICKER_WORDS.join(" — ");
  const tickerRepeated = `${tickerText} — ${tickerText} — ${tickerText} — `;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
      aria-label="Banner de impacto"
    >
      {/* ── Top ticker marquee ── */}
      <div className="relative z-20 overflow-hidden border-b border-white/10 bg-black/80 backdrop-blur-sm py-2.5">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="type-label text-[0.65rem] text-white/50 tracking-[0.3em] pr-4">
            {tickerRepeated}
          </span>
          <span className="type-label text-[0.65rem] text-white/50 tracking-[0.3em] pr-4">
            {tickerRepeated}
          </span>
        </div>
      </div>

      {/* ── Parallax background ── */}
      <div className="relative h-[50vh] min-h-[320px] max-h-[500px] overflow-hidden">
        <motion.div
          className="absolute inset-[-15%] will-change-transform"
          style={{ y: bgY }}
        >
          <Image
            src={BANNER_IMAGE}
            alt="SCHAR Impact Banner"
            fill
            sizes="100vw"
            className="object-cover brightness-[0.95] contrast-[1.15]"
            style={{ objectPosition: BANNER_IMAGE_POSITION }}
            draggable={false}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50"
          aria-hidden="true"
        />

        {/* Noise texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        {/* ── Center phrase ── */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
          <motion.h2
            className="font-[family-name:var(--font-bebas-neue)] text-[clamp(3rem,12vw,8rem)] uppercase leading-[0.9] text-white text-center tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {BANNER_PHRASE}
          </motion.h2>
        </div>

        {/* Decorative side lines */}
        <div className="absolute top-1/2 left-6 md:left-12 z-10 -translate-y-1/2 hidden md:flex flex-col items-center gap-2">
          <span className="w-px h-12 bg-white/20" />
          <span className="type-label text-white/30 text-[0.55rem] tracking-[0.3em] [writing-mode:vertical-lr]">
            SCHAR®
          </span>
          <span className="w-px h-12 bg-white/20" />
        </div>

        <div className="absolute top-1/2 right-6 md:right-12 z-10 -translate-y-1/2 hidden md:flex flex-col items-center gap-2">
          <span className="w-px h-12 bg-white/20" />
          <span className="type-label text-white/30 text-[0.55rem] tracking-[0.3em] [writing-mode:vertical-lr]">
            DROP 001
          </span>
          <span className="w-px h-12 bg-white/20" />
        </div>
      </div>

      {/* ── Bottom ticker marquee (reverse direction) ── */}
      <div className="relative z-20 overflow-hidden border-t border-white/10 bg-black/80 backdrop-blur-sm py-2.5">
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          <span className="type-label text-[0.65rem] text-white/50 tracking-[0.3em] pr-4">
            {tickerRepeated}
          </span>
          <span className="type-label text-[0.65rem] text-white/50 tracking-[0.3em] pr-4">
            {tickerRepeated}
          </span>
        </div>
      </div>
    </section>
  );
}
