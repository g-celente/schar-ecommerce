import { Container } from "@/components/ui/Container";

export default function ProductDetailLoading() {
  return (
    <main className="min-h-dvh pt-16 md:pt-[72px] pb-24">
      <Container className="section">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 animate-pulse">
          {/* Gallery skeleton */}
          <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-5">
            <div className="flex gap-2 md:flex-col">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-16 h-20 md:w-20 md:h-24 bg-surface-2 shrink-0" />
              ))}
            </div>
            <div className="flex-1 aspect-product bg-surface-2" />
          </div>

          {/* Info skeleton */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <div className="h-2 w-12 bg-surface-3 rounded" />
              <div className="h-2 w-2 bg-surface-3 rounded" />
              <div className="h-2 w-16 bg-surface-3 rounded" />
            </div>
            <div className="h-10 w-48 bg-surface-2 rounded" />
            <div className="h-8 w-20 bg-surface-2 rounded" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-surface-3 rounded" />
              <div className="h-3 w-5/6 bg-surface-3 rounded" />
              <div className="h-3 w-4/6 bg-surface-3 rounded" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-2 w-10 bg-surface-3 rounded" />
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-11 w-14 bg-surface-2 rounded" />
                ))}
              </div>
            </div>
            <div className="h-14 w-full bg-surface-2 rounded" />
          </div>
        </div>
      </Container>
    </main>
  );
}
