import type { Product } from "@/types";

/**
 * DROP 001 — PRIMAVERA 2026
 * Inaugural SCHAR collection.
 *
 * To update: replace name, description, price, and images per product.
 * Local images live in /public/products/{slug}/
 */

// ─── DROP 001 — Real products ─────────────────────────────────────────────────
export const DROP_001_PRODUCTS: Product[] = [
  {
    id: "schar-001",
    slug: "tee-001",
    name: "TEE 001",
    description:
      "Camiseta oversized premium. Modelagem estruturada com drop shoulder. Tecido de alta gramatura — toque macio e acabamento impecável. Qualidade que você sente no primeiro contato e percebe na durabilidade. Estampa exclusiva DROP 001.",
    price: 109.90,
    images: [
      {
        id: "s001-a",
        url: "/products/tee-001/front.jpeg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
      {
        id: "s002-a",
        url: "/products/tee-001/image1.jpeg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
      {
        id: "s003-a",
        url: "/products/tee-001/livia-car.jpg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
      {
        id: "s004-a",
        url: "/products/tee-001/image2.jpeg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
      {
        id: "s006-a",
        url: "/products/tee-001/IMG_1714.jpg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
      {
        id: "s007-a",
        url: "/products/tee-001/image4.jpeg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
    ],
    category: { id: "cat-camisetas", name: "CAMISETAS", slug: "camisetas" },
    tags: ["drop-1"],
    sizes: ["P", "M", "G", "GG"],
    stock: 20,
    rating: 5,
    reviewCount: 0,
  },
  {
    id: "schar-002",
    slug: "tee-002",
    name: "TEE 002",
    description:
      "Camiseta oversized premium. Modelagem estruturada com drop shoulder. Tecido de alta gramatura — toque macio e acabamento impecável. Qualidade que você sente no primeiro contato e percebe na durabilidade. Estampa exclusiva DROP 001.",
    price: 109.90,
    images: [
      {
        id: "s001-b",
        url: "/products/tee-002/front.jpeg",
        alt: "SCHAR TEE 002 — DROP 001",
      },
      {
        id: "s002-b",
        url: "/products/tee-002/20260322_162110.jpg",
        alt: "SCHAR TEE 002 — DROP 001",
      },
      {
        id: "s003-b",
        url: "/products/tee-002/back2.jpeg",
        alt: "SCHAR TEE 002 — DROP 001",
      },
      {
        id: "s004-b",
        url: "/products/tee-002/schar.jpg",
        alt: "SCHAR TEE 002 — DROP 001",
      },
      {
        id: "s005-b",
        url: "/products/tee-002/front2.jpeg",
        alt: "SCHAR TEE 002 — DROP 001",
      },
      {
        id: "s006-b",
        url: "/products/tee-002/20260322_162141.jpg",
        alt: "SCHAR TEE 002 — DROP 001",
      },
    ],
    category: { id: "cat-camisetas", name: "CAMISETAS", slug: "camisetas" },
    tags: ["drop-1"],
    sizes: ["P", "M", "G", "GG"],
    stock: 20,
    rating: 5,
    reviewCount: 0,
  }
];

// ─── Full catalogue ───────────────────────────────────────────────────────────
export const ALL_PRODUCTS: Product[] = [...DROP_001_PRODUCTS];

// ─── Featured subset — home page ──────────────────────────────────────────────
export const FEATURED_PRODUCTS: Product[] = DROP_001_PRODUCTS;

// ─── Category list ────────────────────────────────────────────────────────────
export const CATEGORIES = [
  {
    id: "cat-camisetas",
    name: "DROP 01",
    slug: "camisetas",
    image: "/products/tee-001/front.jpeg",
    count: 2,
  },
] as const;

// ─── Data-access helpers ──────────────────────────────────────────────────────
export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      p.category.id === product.category.id
  ).slice(0, limit);
}
