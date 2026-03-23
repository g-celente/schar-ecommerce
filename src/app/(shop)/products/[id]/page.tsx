import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/features/product/components/ProductGallery";
import { ProductInfo } from "@/features/product/components/ProductInfo";
import { RelatedProducts } from "@/features/product/components/RelatedProducts";
import {
  ALL_PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/mock/products";

/**
 * Pre-render every available product page at build time.
 * TTFB drops to near-zero — no server compute per request.
 */
export async function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({
    id: p.slug,
  }));
}

// Since all params are known at build time, mark as fully static.
export const dynamic = "force-static";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductBySlug(id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — Schar`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0]
        ? [{ url: product.images[0].url, alt: product.images[0].alt }]
        : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = getProductBySlug(id);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <main className="min-h-dvh pt-16 md:pt-[72px] pb-24">
      <Container className="section">
        {/* Two-column layout: gallery left, info right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Left: gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Right: product info */}
          <ProductInfo product={product} />
        </div>

        {/* Related products */}
        <div className="mt-24">
          <RelatedProducts
            products={related}
            categoryName={product.category.name}
          />
        </div>
      </Container>
    </main>
  );
}