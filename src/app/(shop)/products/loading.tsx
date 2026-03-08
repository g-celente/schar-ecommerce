import { Container } from "@/components/ui/Container";

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="aspect-product bg-surface-2" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="h-2 w-14 bg-surface-3 rounded" />
          <div className="h-3 w-24 bg-surface-2 rounded" />
        </div>
        <div className="h-3 w-10 bg-surface-2 rounded shrink-0" />
      </div>
    </div>
  );
}

export default function ProductsLoading() {
  return (
    <main className="min-h-dvh pt-16 md:pt-[72px] pb-24">
      <Container className="section">
        {/* Header skeleton */}
        <div className="mb-10 flex flex-col gap-3 animate-pulse">
          <div className="h-2 w-40 bg-surface-3 rounded" />
          <div className="h-9 w-28 bg-surface-2 rounded" />
        </div>

        {/* Filter bar skeleton */}
        <div className="mb-10 flex gap-6 border-b border-border animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mb-[-1px] h-12 w-16 bg-surface-2 rounded" />
          ))}
        </div>

        {/* Product grid skeleton */}
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    </main>
  );
}
