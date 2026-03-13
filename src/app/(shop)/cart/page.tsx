"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/features/cart/store/cart.store";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { Container } from "@/components/ui/Container";
import { generateWhatsAppCheckout } from "@/lib/whatsapp";
import { ROUTES } from "@/lib/constants";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.itemCount());

  function handleWhatsAppCheckout() {
    const url = generateWhatsAppCheckout(items);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-[calc(100dvh-4rem)] pt-24 pb-20">
      <Container>
        {/* Page heading */}
        <div className="border-b border-border pb-6 mb-10">
          <p className="type-label tracking-[0.2em] text-foreground-muted mb-2">
            SCHAR
          </p>
          <h1 className="type-display text-4xl md:text-5xl">
            SUA SACOLA{" "}
            <span className="text-foreground-subtle">({itemCount})</span>
          </h1>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-center justify-center py-32 gap-6 text-center"
          >
            <p className="type-heading text-foreground-muted text-xl">
              SUA SACOLA ESTÁ VAZIA
            </p>
            <p className="type-body text-foreground-subtle max-w-xs">
              Parece que você ainda não adicionou nada. Explore o drop.
            </p>
            <Link
              href={ROUTES.products}
              className="mt-4 inline-block bg-foreground text-background type-label tracking-[0.2em] px-10 py-4 hover:bg-accent hover:text-foreground transition-colors"
            >
              VER TUDO
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 lg:gap-20 items-start">
            {/* Line items */}
            <div>
              <AnimatePresence initial={false}>
                <ul>
                  {items.map((item) => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </ul>
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="lg:sticky lg:top-28">
              <h2 className="type-label tracking-[0.2em] text-foreground-muted mb-6">
                RESUMO DO PEDIDO
              </h2>
              <CartSummary />
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full mt-3 flex items-center justify-center gap-3 bg-[#25D366] text-white type-label tracking-[0.15em] py-4 hover:bg-[#1ebe5d] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                FINALIZAR PEDIDO NO WHATSAPP
              </button>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}