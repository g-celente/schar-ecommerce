import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductFilters } from "@/features/product/components/ProductFilters";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { ALL_PRODUCTS, CATEGORIES } from "@/lib/mock/products";

// Products page uses searchParams for category filtering (dynamic by nature).
// Revalidate every hour so product data stays fresh without per-request compute.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Loja — Schar",
  description:
    "Compre todos os drops da Schar. Streetwear limitado, disponível enquanto durar o estoque.",
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category } = await searchParams;

  const filtered = category
    ? ALL_PRODUCTS.filter((p) => p.category.slug === category)
    : ALL_PRODUCTS;

  const filterCategories = CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    count: ALL_PRODUCTS.filter((p) => p.category.slug === c.slug).length,
  }));

  return (
    <main className="min-h-dvh pt-16 md:pt-[72px] pb-24">
      <Container className="section">
        {/* Page header */}
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-label text-foreground-muted tracking-[0.25em] mb-2">
              DROP 001 — PRIMAVERA 2026
            </p>
            <h1 className="type-title">LOJA</h1>
          </div>
          <p className="type-label text-foreground-subtle tracking-[0.1em]">
            {filtered.length} PRODUTO{filtered.length !== 1 ? "S" : ""}
          </p>
        </div>

        {/* Category filters */}
        <ProductFilters
          categories={filterCategories}
          activeCategory={category}
          totalCount={ALL_PRODUCTS.length}
        />

        {/* Product grid — re-keyed on filter change to replay entrance animation */}
        <ProductGrid key={category ?? "all"} products={filtered} />
      </Container>
    </main>
  );
}