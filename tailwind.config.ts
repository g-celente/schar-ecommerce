/**
 * tailwind.config.ts — Schar E-commerce
 *
 * Tailwind CSS v4 is CSS-first: all design tokens (colors, typography,
 * spacing, radii) are defined in globals.css via the @theme directive.
 *
 * This file is kept for:
 *   - Plugin registration
 *   - Any future JS-side overrides that cannot live in CSS
 *
 * @see src/app/globals.css      — @theme tokens
 * @see src/styles/variables.css — raw CSS custom properties
 * @see src/styles/typography.css — semantic type classes
 */

import type { Config } from "tailwindcss";

const config: Config = {
  // Tailwind v4 auto-detects content via the PostCSS plugin.
  // Uncomment + override only if you need to add non-standard paths:
  // content: ["./src/**/*.{ts,tsx}"],

  plugins: [
    // Uncomment when needed:
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/container-queries"),
  ],
};

export default config;
