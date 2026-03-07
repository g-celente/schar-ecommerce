/**
 * Font definitions — Schar E-commerce
 *
 * Three typefaces, each with its own CSS variable injected by next/font.
 * These variables are consumed in globals.css @theme and in the .type-*
 * semantic typography classes in typography.css.
 *
 * Bebas Neue    → --font-bebas-neue  → display/hero (condensed capitals)
 * Space Grotesk → --font-space-grotesk → headings, labels, prices, UI
 * Inter         → --font-inter       → body copy, captions
 */

import { Bebas_Neue, Space_Grotesk, Inter } from "next/font/google";

export const bebasNeue = Bebas_Neue({
  weight: "400", // Only one weight available
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  preload: true,
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

/** All font variable classNames bundled for use on <body> */
export const fontVariables = [
  bebasNeue.variable,
  spaceGrotesk.variable,
  inter.variable,
].join(" ");
