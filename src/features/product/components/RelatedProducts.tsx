import Link from "next/link";
import { ProductGrid } from "./ProductGrid";
import { ROUTES } from "@/lib/constants";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products: Product[];
  categoryName: string;
}

export function RelatedProducts({
  products,
  categoryName,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section aria-label="Related products" className="border-t border-border pt-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="type-label text-foreground-muted tracking-[0.2em] mb-2">
            MORE FROM
          </p>
          <h2 className="type-title text-[clamp(1.5rem,4vw,2.5rem)]">
            {categoryName.toUpperCase()}
          </h2>
        </div>
        <Link
          href={`${ROUTES.products}?category=${products[0]?.category.slug ?? ""}`}
          className="type-label tracking-[0.15em] text-foreground-muted transition-colors hover:text-foreground"
        >
          VIEW ALL →
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
