import type { Product } from "@/types";

/**
 * DROP 001 — PRIMAVERA 2026
 * Inaugural SCHAR collection. 4 products with real assets.
 * All other products are marked comingSoon: true.
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
        url: "/products/tee-001/back.jpeg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
      {
        id: "s003-a",
        url: "/products/tee-001/image1.jpeg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
      {
        id: "s004-a",
        url: "/products/tee-001/image2.jpeg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
      {
        id: "s005-a",
        url: "/products/tee-001/image3.jpeg",
        alt: "SCHAR TEE 001 — DROP 001",
      },
      {
        id: "s006-a",
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
        url: "/products/tee-002/back.jpeg",
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

// ─── Coming soon — future drops ───────────────────────────────────────────────
const COMING_SOON_PRODUCTS: Product[] = [
  {
    id: "cs-001",
    slug: "drop-002-tee-a",
    name: "DROP 002 — A",
    description: "Em breve.",
    price: 0,
    images: [],
    category: { id: "cat-camisetas", name: "CAMISETAS", slug: "camisetas" },
    tags: [],
    sizes: [],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    comingSoon: true,
  },
  {
    id: "cs-002",
    slug: "drop-002-tee-b",
    name: "DROP 002 — B",
    description: "Em breve.",
    price: 0,
    images: [],
    category: { id: "cat-camisetas", name: "CAMISETAS", slug: "camisetas" },
    tags: [],
    sizes: [],
    stock: 0,
    rating: 0,
    reviewCount: 0,
    comingSoon: true,
  }
];

// ─── Full catalogue ───────────────────────────────────────────────────────────
export const ALL_PRODUCTS: Product[] = [
  ...DROP_001_PRODUCTS,
  ...COMING_SOON_PRODUCTS,
];

// ─── Featured subset — home page ──────────────────────────────────────────────
export const FEATURED_PRODUCTS: Product[] = DROP_001_PRODUCTS;

// ─── Category list ────────────────────────────────────────────────────────────
export const CATEGORIES = [
  {
    id: "cat-camisetas",
    name: "DROP 01",
    slug: "camisetas",
    // Use first product image as category hero
    image: "/products/tee-001/front.jpeg",
    count: 2,
  },
  {
    id: "cat-moletons",
    name: "EM BREVE",
    slug: "EM BREVE",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=900&q=80",
    count: 0,
    comingSoon: true,
  },
  {
    id: "cat-bones",
    name: "EM BREVE",
    slug: "EM BREVE",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80",
    count: 0,
    comingSoon: true,
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
      p.category.id === product.category.id &&
      !p.comingSoon
  ).slice(0, limit);
}
