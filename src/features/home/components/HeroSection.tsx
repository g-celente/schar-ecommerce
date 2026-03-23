"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { heroReveal, staggerContainer, fadeIn } from "@/lib/motion";
import { ROUTES } from "@/lib/constants";

const HERO_WORDS = ["SCHAR", "DROP", "001"];

/* ── Hero slides — add/remove images here ──────────────────────────────────── */
const HERO_SLIDES = [
  {
    desktop: "/brand/schar-principal.webp",
    mobile: "/brand/schar-principal.webp",
    alt: "Schar Drop 001 — Hero",
    objectPosition: "center 30%",
  },
  {
    desktop: "/brand/schar-andre.webp",
    mobile: "/brand/schar-andre.webp",
    alt: "Schar Drop 001 — Hero",
    objectPosition: "center 20%",
  },
  {
    desktop: "/brand/schar-skate.webp",
    mobile: "/brand/schar-skate.webp",
    alt: "Schar Drop 001 — top",
    objectPosition: "center 30%",
  },
  {
    desktop: "/brand/hero-desktop.webp",
    mobile: "/brand/hero-mobile.webp",
    alt: "Schar Drop 001 — top",
    objectPosition: "center 30%",
  }

];

/* ── Qual slide fixar no desktop (índice do array acima) ───────────────────── */
const DESKTOP_FIXED_SLIDE = 3;

const SLIDE_INTERVAL = 5000; // ms between auto-advance

/* ── Hook: detecta se estamos em mobile (<= 768px) ────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const hasMultiple = HERO_SLIDES.length > 1;

  // Parallax — transforms run on the compositor thread (no re-renders)
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.55, 0.82]);

  const goTo = useCallback(
    (index: number) => setCurrent((index + HERO_SLIDES.length) % HERO_SLIDES.length),
    []
  );

  // Auto-advance — only on mobile
  useEffect(() => {
    if (!isMobile || !hasMultiple) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % HERO_SLIDES.length), SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isMobile, hasMultiple]);

  // On desktop, always show the fixed slide
  const activeSlide = isMobile ? current : DESKTOP_FIXED_SLIDE;

  return (
    <section
      ref={containerRef}
      className="relative flex h-dvh min-h-[640px] w-full flex-col items-center justify-end overflow-hidden pb-16 md:pb-20"
      aria-label="Hero banner"
    >
      {/* ── Background slides with parallax ── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY, scale: 1.12 }}
        aria-hidden="true"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={HERO_SLIDES[activeSlide].mobile}
              />
              <Image
                src={HERO_SLIDES[activeSlide].desktop}
                alt={HERO_SLIDES[activeSlide].alt}
                fill
                priority={activeSlide === 0 || activeSlide === DESKTOP_FIXED_SLIDE}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: HERO_SLIDES[activeSlide].objectPosition ?? "center" }}
                draggable={false}
              />
            </picture>
          </motion.div>
        </AnimatePresence>
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
        Envio nacional em 48 horas.
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

      {/* ── Slide indicators (mobile only) ── */}
      {isMobile && hasMultiple && (
        <motion.div
          className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-[2px] transition-all duration-500 ${
                i === current
                  ? "w-8 bg-white"
                  : "w-4 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </motion.div>
      )}

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
