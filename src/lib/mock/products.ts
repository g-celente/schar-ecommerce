import type { Product } from "@/types";

/**
 * Static mock products — replaced by DB calls once Prisma/Supabase is wired.
 * Images point to Unsplash source URLs (no auth required, 800×1000 portrait).
 */

// ─── All products (full catalogue) ───────────────────────────────────────────
export const ALL_PRODUCTS: Product[] = [
  // T-Shirts ──────────────────────────────────────────────────────────────────
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
  {
    id: "5",
    slug: "serif-logo-tee",
    name: "SERIF TEE",
    description: "230gsm ring-spun cotton. Serif logo print. Boxy silhouette.",
    price: 70,
    images: [
      {
        id: "5a",
        url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80",
        alt: "Serif Tee front",
      },
    ],
    category: { id: "cat-1", name: "T-Shirts", slug: "t-shirts" },
    tags: ["new"],
    stock: 18,
    rating: 4.5,
    reviewCount: 14,
  },
  {
    id: "6",
    slug: "utility-pocket-tee",
    name: "UTILITY TEE",
    description: "Single chest pocket. Military-spec cotton. Raw hem.",
    price: 65,
    images: [
      {
        id: "6a",
        url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
        alt: "Utility Tee front",
      },
    ],
    category: { id: "cat-1", name: "T-Shirts", slug: "t-shirts" },
    tags: [],
    stock: 0,
    rating: 4.4,
    reviewCount: 9,
  },
  // Hoodies ───────────────────────────────────────────────────────────────────
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
    id: "7",
    slug: "overdyed-zip-hoodie",
    name: "ZIP HOODIE",
    description: "Overdyed 450gsm fleece. Full-zip. Kangaroo pocket.",
    price: 185,
    compareAtPrice: 220,
    images: [
      {
        id: "7a",
        url: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80",
        alt: "Zip Hoodie front",
      },
    ],
    category: { id: "cat-2", name: "Hoodies", slug: "hoodies" },
    tags: ["bestseller"],
    stock: 4,
    rating: 4.8,
    reviewCount: 42,
  },
  {
    id: "8",
    slug: "cropped-arch-hoodie",
    name: "ARCH HOODIE",
    description: "Cropped silhouette. Embroidered arch logo. Ribbed cuffs.",
    price: 155,
    images: [
      {
        id: "8a",
        url: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80",
        alt: "Arch Hoodie front",
      },
    ],
    category: { id: "cat-2", name: "Hoodies", slug: "hoodies" },
    tags: ["new"],
    stock: 11,
    rating: 4.7,
    reviewCount: 23,
  },
  // Caps ──────────────────────────────────────────────────────────────────────
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
    id: "9",
    slug: "washed-camp-cap",
    name: "CAMP CAP",
    description: "Garment-washed twill. Unstructured. Brass buckle closure.",
    price: 48,
    images: [
      {
        id: "9a",
        url: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80",
        alt: "Camp Cap",
      },
    ],
    category: { id: "cat-3", name: "Caps", slug: "caps" },
    tags: ["new"],
    stock: 15,
    rating: 4.6,
    reviewCount: 19,
  },
  {
    id: "10",
    slug: "tactical-bucket-hat",
    name: "BUCKET HAT",
    description: "Ripstop nylon. Cargo pockets on brim. Cord cinch.",
    price: 60,
    images: [
      {
        id: "10a",
        url: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80",
        alt: "Bucket Hat",
      },
    ],
    category: { id: "cat-3", name: "Caps", slug: "caps" },
    tags: [],
    stock: 8,
    rating: 4.5,
    reviewCount: 11,
  },
  // Accessories ───────────────────────────────────────────────────────────────
  {
    id: "11",
    slug: "logo-tote-bag",
    name: "LOGO TOTE",
    description: "14oz canvas. Screen-printed logo. Reinforced handles.",
    price: 38,
    images: [
      {
        id: "11a",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        alt: "Logo Tote Bag",
      },
    ],
    category: { id: "cat-4", name: "Accessories", slug: "accessories" },
    tags: ["new"],
    stock: 30,
    rating: 4.8,
    reviewCount: 17,
  },
  {
    id: "12",
    slug: "arch-ribbed-socks",
    name: "ARCH SOCKS",
    description: "Ribbed cotton blend. Arch logo jacquard. Two-pack.",
    price: 22,
    images: [
      {
        id: "12a",
        url: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b38?w=800&q=80",
        alt: "Arch Socks",
      },
    ],
    category: { id: "cat-4", name: "Accessories", slug: "accessories" },
    tags: [],
    stock: 50,
    rating: 4.9,
    reviewCount: 33,
  },
];

// ─── Featured subset (drop hero / home page) ─────────────────────────────────
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
  {
    id: "cat-4",
    name: "ACCESSORIES",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
    count: 8,
  },
];
