"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { useCartStore } from "@/features/cart/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

export function AccountView() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.itemCount());
  const subtotal = useCartStore((s) => s.subtotal());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(ROUTES.login);
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="min-h-dvh pt-16 md:pt-[72px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span
            className="inline-block h-5 w-5 rounded-full border-2 border-foreground border-t-transparent animate-spin"
            aria-hidden="true"
          />
          <span className="type-label tracking-widest text-foreground-muted">
            CARREGANDO…
          </span>
        </div>
      </main>
    );
  }

  if (!session?.user) return null;

  const { name, email } = session.user;
  const initial =
    name?.[0]?.toUpperCase() ?? email?.[0]?.toUpperCase() ?? "U";

  async function handleLogout() {
    await signOut({ callbackUrl: ROUTES.home });
  }

  return (
    <main className="min-h-dvh pt-16 md:pt-[72px] pb-24">
      <Container>
        {/* ── Page header ── */}
        <motion.div
          className="border-b border-border py-12 md:py-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 shrink-0 border border-border-strong bg-surface-2 flex items-center justify-center">
                <span className="type-heading text-2xl font-bold text-foreground">
                  {initial}
                </span>
              </div>
              <div>
                <p className="type-label tracking-[0.2em] text-foreground-muted mb-1">
                  MINHA CONTA
                </p>
                <h1 className="type-display text-2xl md:text-3xl leading-none">
                  {name?.toUpperCase() ?? "USUÁRIO"}
                </h1>
                <p className="type-small text-foreground-muted mt-1">{email}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="self-start sm:self-auto border border-border px-6 py-3 type-label tracking-[0.15em] text-foreground-muted hover:border-border-strong hover:text-foreground transition-colors"
            >
              SAIR
            </button>
          </motion.div>
        </motion.div>

        {/* ── Widgets grid ── */}
        <motion.div
          className="grid grid-cols-1 gap-4 pt-10 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* ── Cart widget ── */}
          <motion.div
            variants={fadeUp}
            className="border border-border p-6 flex flex-col gap-5"
          >
            <p className="type-label tracking-[0.2em] text-foreground-muted">
              SACOLA ATUAL
            </p>

            {itemCount === 0 ? (
              <div className="flex-1 flex flex-col gap-2 py-2">
                <p className="type-body text-foreground-muted">
                  Sua sacola está vazia.
                </p>
                <p className="type-small text-foreground-subtle">
                  Explore os drops e adicione peças.
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <p className="type-heading text-foreground font-semibold">
                    {itemCount} {itemCount === 1 ? "item" : "itens"}
                  </p>
                  <p className="type-price">{formatPrice(subtotal)}</p>
                </div>

                <ul className="space-y-2.5 border-t border-border pt-3">
                  {items.slice(0, 3).map((item) => (
                    <li
                      key={item.key}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="type-small text-foreground-muted truncate">
                        {item.product.name}
                        {item.size ? ` — ${item.size}` : ""} ×{item.quantity}
                      </span>
                      <span className="type-small text-foreground shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                  {items.length > 3 && (
                    <li className="type-label text-foreground-subtle tracking-widest">
                      +{items.length - 3} mais…
                    </li>
                  )}
                </ul>
              </div>
            )}

            <div className="mt-auto flex flex-col gap-2">
              <button
                type="button"
                onClick={openCart}
                className="w-full border border-foreground bg-foreground text-background type-label tracking-[0.15em] py-3 hover:bg-transparent hover:text-foreground transition-colors"
              >
                VER SACOLA
              </button>
              <Link
                href={ROUTES.products}
                className="w-full text-center border border-border type-label tracking-[0.15em] py-3 text-foreground-muted hover:border-border-strong hover:text-foreground transition-colors"
              >
                CONTINUAR COMPRANDO
              </Link>
            </div>
          </motion.div>

          {/* ── Orders widget ── */}
          <motion.div
            variants={fadeUp}
            className="border border-border p-6 flex flex-col gap-5"
          >
            <p className="type-label tracking-[0.2em] text-foreground-muted">
              PEDIDOS
            </p>

            <div className="flex-1 flex flex-col gap-3 py-2">
              <div className="flex items-center justify-center h-20 border border-dashed border-border">
                <p className="type-label text-foreground-subtle tracking-widest">
                  NENHUM PEDIDO
                </p>
              </div>
              <p className="type-small text-foreground-subtle">
                Após finalizar um pedido via WhatsApp, ele aparecerá aqui.
              </p>
            </div>

            <Link
              href={ROUTES.drops}
              className="w-full text-center border border-foreground bg-foreground text-background type-label tracking-[0.15em] py-3 hover:bg-transparent hover:text-foreground transition-colors"
            >
              EXPLORAR DROPS
            </Link>
          </motion.div>

          {/* ── Profile widget ── */}
          <motion.div
            variants={fadeUp}
            className="border border-border p-6 flex flex-col gap-5"
          >
            <p className="type-label tracking-[0.2em] text-foreground-muted">
              PERFIL
            </p>

            <div className="flex-1 space-y-5">
              <div>
                <p className="type-label tracking-widest text-foreground-subtle mb-1">
                  NOME
                </p>
                <p className="type-body text-foreground">{name ?? "—"}</p>
              </div>
              <div>
                <p className="type-label tracking-widest text-foreground-subtle mb-1">
                  E-MAIL
                </p>
                <p className="type-body text-foreground break-all">
                  {email ?? "—"}
                </p>
              </div>
              <div>
                <p className="type-label tracking-widest text-foreground-subtle mb-1">
                  MEMBRO DESDE
                </p>
                <p className="type-body text-foreground">2026</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-center border border-border type-label tracking-[0.15em] py-3 text-foreground-muted hover:border-red-500/50 hover:text-red-400 transition-colors"
            >
              SAIR DA CONTA
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </main>
  );
}
