import type { Product } from "@/types";

/**
 * Static mock products — replaced by DB calls once Prisma/Supabase is wired.
 * Images point to Unsplash source URLs (no auth required, 800×1000 portrait).
 */
export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "oversized-tactical-tee",
    name: "TACTICAL TEE",
    description: "Heavyweight 340gsm cotton. Oversized cut. Drop shoulders.",
    price: 85,
    compareAtPrice: 110,
    images: [
      {
        id: "1a",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        alt: "Tactical Tee front",
      },
    ],
    category: { id: "cat-1", name: "T-Shirts", slug: "t-shirts" },
    tags: ["drop-1", "bestseller"],
    stock: 12,
    rating: 4.8,
    reviewCount: 94,
  },
  {
    id: "2",
    slug: "utility-cargo-hoodie",
    name: "CARGO HOODIE",
    description: "Washed fleece. Cargo pockets. Raw hem detail.",
    price: 165,
    images: [
      {
        id: "2a",
        url: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
        alt: "Cargo Hoodie front",
      },
    ],
    category: { id: "cat-2", name: "Hoodies", slug: "hoodies" },
    tags: ["drop-1", "new"],
    stock: 7,
    rating: 4.9,
    reviewCount: 61,
  },
  {
    id: "3",
    slug: "six-panel-logo-cap",
    name: "LOGO CAP",
    description: "Structured 6-panel. Leather strap back. Tonal embroidery.",
    price: 55,
    images: [
      {
        id: "3a",
        url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
        alt: "Logo Cap",
      },
    ],
    category: { id: "cat-3", name: "Caps", slug: "caps" },
    tags: ["drop-1"],
    stock: 20,
    rating: 4.7,
    reviewCount: 38,
  },
  {
    id: "4",
    slug: "washed-arch-tee",
    name: "ARCH TEE",
    description: "Acid-washed 100% cotton. Arch graphics. Relaxed fit.",
    price: 75,
    images: [
      {
        id: "4a",
        url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
        alt: "Arch Tee front",
      },
    ],
    category: { id: "cat-1", name: "T-Shirts", slug: "t-shirts" },
    tags: ["drop-1"],
    stock: 5,
    rating: 4.6,
    reviewCount: 27,
  },
];

export const CATEGORIES = [
  {
    id: "cat-1",
    name: "T-SHIRTS",
    slug: "t-shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    count: 24,
  },
  {
    id: "cat-2",
    name: "HOODIES",
    slug: "hoodies",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=900&q=80",
    count: 16,
  },
  {
    id: "cat-3",
    name: "CAPS",
    slug: "caps",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80",
    count: 12,
  },
];
