/**
 * Shared Framer Motion variants for the Schar design system.
 *
 * Usage:
 *   import { fadeUp, staggerContainer } from "@/lib/motion";
 *   <motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
 *     <motion.h2 variants={fadeUp}>...</motion.h2>
 *   </motion.div>
 */

import type { Variants } from "framer-motion";

/* ─── Fade up ────────────────────────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ─── Fade in (no translate) ─────────────────────────────────────────────── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ─── Slide in from left / right ─────────────────────────────────────────── */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ─── Stagger container ──────────────────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.0,
    },
  },
};

/* ─── Scale in ───────────────────────────────────────────────────────────── */
// Uses opacity + scale — both GPU composited, no layout thrashing.
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ─── Hero text (letter reveal) ──────────────────────────────────────────── */
export const heroReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ─── Clip wipe (left → right) ───────────────────────────────────────────── */
export const clipWipe: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.0, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ─── Viewport-aware defaults ────────────────────────────────────────────── */
export const viewportOnce = { once: true, margin: "-80px" } as const;
