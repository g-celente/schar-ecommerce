import type { Product } from "@/types";

/**
 * Static mock products — replaced by DB calls once Prisma/Supabase is wired.
 */

// ─── All products (full catalogue) ───────────────────────────────────────────
export const ALL_PRODUCTS: Product[] = [
  // T-Shirts ──────────────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "oversized-tactical-tee",
    name: "TACTICAL TEE",
    description: "Heavyweight 340gsm cotton. Oversized cut. Drop shoulders. Pre-washed for a broken-in feel from day one. Ribbed collar and cuffs. Interior neck label printed for comfort.",
    price: 85,
    compareAtPrice: 110,
    images: [
      { id: "1a", url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", alt: "Tactical Tee front" },
      { id: "1b", url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80", alt: "Tactical Tee back" },
      { id: "1c", url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80", alt: "Tactical Tee detail" },
    ],
    category: { id: "cat-1", name: "T-Shirts", slug: "t-shirts" },
    tags: ["drop-1", "bestseller"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 12,
    rating: 4.8,
    reviewCount: 94,
  },
  {
    id: "4",
    slug: "washed-arch-tee",
    name: "ARCH TEE",
    description: "Acid-washed 100% cotton. Arch graphics. Relaxed fit. Each piece develops a unique washed character. Double-stitched seams for durability.",
    price: 75,
    images: [
      { id: "4a", url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80", alt: "Arch Tee front" },
      { id: "4b", url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80", alt: "Arch Tee back" },
    ],
    category: { id: "cat-1", name: "T-Shirts", slug: "t-shirts" },
    tags: ["drop-1"],
    sizes: ["S", "M", "L", "XL"],
    stock: 5,
    rating: 4.6,
    reviewCount: 27,
  },
  {
    id: "5",
    slug: "serif-logo-tee",
    name: "SERIF TEE",
    description: "230gsm ring-spun cotton. Serif logo print. Boxy silhouette. Garment-dyed in jet black. Screen-printed logo that fades gracefully over time.",
    price: 70,
    images: [
      { id: "5a", url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80", alt: "Serif Tee front" },
      { id: "5b", url: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80", alt: "Serif Tee styled" },
    ],
    category: { id: "cat-1", name: "T-Shirts", slug: "t-shirts" },
    tags: ["new"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    rating: 4.5,
    reviewCount: 14,
  },
  {
    id: "6",
    slug: "utility-pocket-tee",
    name: "UTILITY TEE",
    description: "Single chest pocket. Military-spec cotton. Raw hem. Cut from a stiff, workwear-weight fabric that softens with each wash.",
    price: 65,
    images: [
      { id: "6a", url: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80", alt: "Utility Tee front" },
      { id: "6b", url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", alt: "Utility Tee detail" },
    ],
    category: { id: "cat-1", name: "T-Shirts", slug: "t-shirts" },
    tags: [],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 0,
    rating: 4.4,
    reviewCount: 9,
  },
  // Hoodies ───────────────────────────────────────────────────────────────────
  {
    id: "2",
    slug: "utility-cargo-hoodie",
    name: "CARGO HOODIE",
    description: "Washed fleece. Cargo pockets. Raw hem detail. 480gsm French terry. Enzyme-washed for a tactile, premium hand feel. Four cargo pockets. Oversized cut with drop shoulder.",
    price: 165,
    images: [
      { id: "2a", url: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80", alt: "Cargo Hoodie front" },
      { id: "2b", url: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80", alt: "Cargo Hoodie back" },
      { id: "2c", url: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80", alt: "Cargo Hoodie pocket detail" },
    ],
    category: { id: "cat-2", name: "Hoodies", slug: "hoodies" },
    tags: ["drop-1", "new"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 7,
    rating: 4.9,
    reviewCount: 61,
  },
  {
    id: "7",
    slug: "overdyed-zip-hoodie",
    name: "ZIP HOODIE",
    description: "Overdyed 450gsm fleece. Full-zip. Kangaroo pocket. YKK zip. Overdyed twice for uneven, faded colour. Wears like a shell — layer over everything.",
    price: 185,
    compareAtPrice: 220,
    images: [
      { id: "7a", url: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80", alt: "Zip Hoodie front" },
      { id: "7b", url: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80", alt: "Zip Hoodie detail" },
    ],
    category: { id: "cat-2", name: "Hoodies", slug: "hoodies" },
    tags: ["bestseller"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 4,
    rating: 4.8,
    reviewCount: 42,
  },
  {
    id: "8",
    slug: "cropped-arch-hoodie",
    name: "ARCH HOODIE",
    description: "Cropped silhouette. Embroidered arch logo. Ribbed cuffs. 400gsm brushed-back fleece. Tonal embroidery. Cropped to pair with high-waist trousers.",
    price: 155,
    images: [
      { id: "8a", url: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80", alt: "Arch Hoodie front" },
      { id: "8b", url: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80", alt: "Arch Hoodie styled" },
    ],
    category: { id: "cat-2", name: "Hoodies", slug: "hoodies" },
    tags: ["new"],
    sizes: ["XS", "S", "M", "L"],
    stock: 11,
    rating: 4.7,
    reviewCount: 23,
  },
  // Caps ──────────────────────────────────────────────────────────────────────
  {
    id: "3",
    slug: "six-panel-logo-cap",
    name: "LOGO CAP",
    description: "Structured 6-panel. Leather strap back. Tonal embroidery. Premium wool-blend front panels. Adjustable leather strap with brass pin buckle.",
    price: 55,
    images: [
      { id: "3a", url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80", alt: "Logo Cap front" },
      { id: "3b", url: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80", alt: "Logo Cap side" },
    ],
    category: { id: "cat-3", name: "Caps", slug: "caps" },
    tags: ["drop-1"],
    sizes: ["ONE SIZE"],
    stock: 20,
    rating: 4.7,
    reviewCount: 38,
  },
  {
    id: "9",
    slug: "washed-camp-cap",
    name: "CAMP CAP",
    description: "Garment-washed twill. Unstructured. Brass buckle closure. Low profile. Pre-curved brim. Gets better with every wear.",
    price: 48,
    images: [
      { id: "9a", url: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80", alt: "Camp Cap front" },
      { id: "9b", url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80", alt: "Camp Cap back" },
    ],
    category: { id: "cat-3", name: "Caps", slug: "caps" },
    tags: ["new"],
    sizes: ["ONE SIZE"],
    stock: 15,
    rating: 4.6,
    reviewCount: 19,
  },
  {
    id: "10",
    slug: "tactical-bucket-hat",
    name: "BUCKET HAT",
    description: "Ripstop nylon. Cargo pockets on brim. Cord cinch. Fully packable. Interior mesh liner. Tactical meets utility.",
    price: 60,
    images: [
      { id: "10a", url: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80", alt: "Bucket Hat front" },
      { id: "10b", url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80", alt: "Bucket Hat detail" },
    ],
    category: { id: "cat-3", name: "Caps", slug: "caps" },
    tags: [],
    sizes: ["ONE SIZE"],
    stock: 8,
    rating: 4.5,
    reviewCount: 11,
  },
  // Accessories ───────────────────────────────────────────────────────────────
  {
    id: "11",
    slug: "logo-tote-bag",
    name: "LOGO TOTE",
    description: "14oz canvas. Screen-printed logo. Reinforced handles. Two interior pockets. Magnetic snap closure. Puff-print logo on front panel.",
    price: 38,
    images: [
      { id: "11a", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", alt: "Logo Tote front" },
      { id: "11b", url: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b38?w=800&q=80", alt: "Logo Tote detail" },
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
    description: "Ribbed cotton blend. Arch logo jacquard. Two-pack. Mid-calf height. 80% combed cotton, 17% nylon, 3% elastane. Logo knit-in — not printed.",
    price: 22,
    images: [
      { id: "12a", url: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b38?w=800&q=80", alt: "Arch Socks" },
      { id: "12b", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", alt: "Arch Socks detail" },
    ],
    category: { id: "cat-4", name: "Accessories", slug: "accessories" },
    tags: [],
    stock: 50,
    rating: 4.9,
    reviewCount: 33,
  },
];

// ─── Featured subset (home page / drop hero) ─────────────────────────────────
export const FEATURED_PRODUCTS: Product[] = ALL_PRODUCTS.filter((p) =>
  ["1", "2", "3", "4"].includes(p.id)
);

// ─── Category list ────────────────────────────────────────────────────────────
export const CATEGORIES = [
  {
    id: "cat-1",
    name: "T-SHIRTS",
    slug: "t-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    count: 24,
  },
  {
    id: "cat-2",
    name: "HOODIES",
    slug: "hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=900&q=80",
    count: 16,
  },
  {
    id: "cat-3",
    name: "CAPS",
    slug: "caps",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80",
    count: 12,
  },
  {
    id: "cat-4",
    name: "ACCESSORIES",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
    count: 8,
  },
];

// ─── Data-access helpers ──────────────────────────────────────────────────────
export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category.id === product.category.id
  ).slice(0, limit);
}