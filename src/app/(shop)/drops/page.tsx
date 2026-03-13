import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { DROP_001_PRODUCTS } from "@/lib/mock/products";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Drops — Schar",
  description: "Coleções exclusivas e limitadas da Schar. Cada drop é único.",
};

export default function DropsPage() {
  return (
    <main className="min-h-dvh pt-16 md:pt-[72px]">

      {/* ── PAGE HEADER ── */}
      <div className="border-b border-border">
        <Container className="py-16 md:py-20">
          <p className="type-label text-foreground-muted tracking-[0.25em] mb-3">
            COLEÇÕES EXCLUSIVAS
          </p>
          <h1 className="type-hero text-[clamp(3rem,10vw,7rem)] leading-none mb-4">DROPS</h1>
          <p className="type-body text-foreground-muted max-w-md">
            Peças limitadas lançadas em drops. Sem reposição. Quando acaba, acabou.
          </p>
        </Container>
      </div>

      {/* ── DROP 001 — ACTIVE ── */}
      <Container className="section">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-label text-foreground-muted tracking-[0.2em] mb-2">
              DROP 001 — PRIMAVERA 2026
            </p>
            <h2 className="type-title">COLEÇÃO ATUAL</h2>
          </div>
          <div className="flex items-center gap-2 border border-border-strong px-4 py-2 self-start">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="type-label text-foreground-muted tracking-widest">
              AO VIVO — ESTOQUE LIMITADO
            </span>
          </div>
        </div>

        <ProductGrid products={DROP_001_PRODUCTS} />

        <div className="mt-12 flex justify-center">
          <Link
            href={ROUTES.products}
            className="border border-border-strong px-12 py-4 type-label tracking-[0.18em] text-foreground hover:border-accent hover:text-accent transition-colors duration-300"
          >
            VER TODOS OS PRODUTOS →
          </Link>
        </div>
      </Container>

      {/* ── EM BREVE ── */}
      <div className="border-t border-border bg-surface">
        <Container className="section">
          <div className="mb-10">
            <p className="type-label text-foreground-muted tracking-[0.2em] mb-2">
              EM BREVE
            </p>
            <h2 className="type-title">DROP 002</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative aspect-product bg-surface-2 border border-border flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="type-label text-foreground-subtle tracking-[0.2em]">
                    EM BREVE
                  </span>
                  <p className="type-heading text-foreground-muted text-sm opacity-60">
                    DROP 002 — VERÃO 2026
                  </p>
                </div>
                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="type-body text-foreground-muted mb-4">
              Fique por dentro dos próximos lançamentos.
            </p>
            <Link
              href="/#newsletter"
              className="inline-block border border-foreground px-10 py-3 type-label tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              RECEBER AVISOS
            </Link>
          </div>
        </Container>
      </div>

    </main>
  );
}