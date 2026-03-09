"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { Container } from "@/components/ui/Container";
import { ROUTES, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/features/cart/store/cart.store";

const NAV_LINKS = [
  { label: "STORE", href: ROUTES.products },
  { label: "DROPS", href: "/drops" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.itemCount());
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-sticky)] transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/95 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav
            className="flex h-16 items-center justify-between md:h-[72px]"
            aria-label="Main navigation"
          >
            {/* â”€â”€ Logo â”€â”€ */}
            <Link
              href={ROUTES.home}
              className="type-label text-white tracking-[0.3em] text-base font-bold hover:opacity-70 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              {SITE_NAME}
            </Link>

            {/* â”€â”€ Desktop nav â”€â”€ */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-label text-foreground-muted tracking-[0.15em] transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* â”€â”€ Desktop actions â”€â”€ */}
            <div className="hidden md:flex items-center gap-5">
              {isLoggedIn ? (
                <>
                  <Link
                    href={ROUTES.account}
                    className="type-label text-foreground-muted tracking-[0.12em] transition-colors hover:text-accent"
                  >
                    {session.user?.name?.split(" ")[0]?.toUpperCase() ?? "ACCOUNT"}
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: ROUTES.home })}
                    className="type-label text-foreground-subtle tracking-[0.12em] transition-colors hover:text-foreground"
                  >
                    SIGN OUT
                  </button>
                </>
              ) : (
                <Link
                  href={ROUTES.login}
                  className="type-label text-foreground-muted tracking-[0.12em] transition-colors hover:text-accent"
                >
                  ACCOUNT
                </Link>
              )}
              <button
                type="button"
                onClick={openCart}
                aria-label={`Open shopping bag, ${mounted ? itemCount : 0} items`}
                className="relative type-label text-foreground-muted tracking-[0.12em] transition-colors hover:text-accent"
              >
                BAG ({mounted ? itemCount : 0})
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 flex items-center justify-center rounded-full bg-foreground text-background text-[0.5rem] font-bold">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* â”€â”€ Mobile: cart + hamburger â”€â”€ */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                type="button"
                onClick={openCart}
                aria-label={`Open shopping bag, ${mounted ? itemCount : 0} items`}
                className="relative type-label text-foreground-muted tracking-widest transition-colors hover:text-accent"
              >
                BAG
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 flex items-center justify-center rounded-full bg-foreground text-background text-[0.5rem] font-bold">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <motion.span
                  className="block h-px w-6 bg-foreground origin-center"
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block h-px w-6 bg-foreground"
                  animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-px w-6 bg-foreground origin-center"
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                  transition={{ duration: 0.25 }}
                />
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* â”€â”€ Mobile menu overlay â”€â”€ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[calc(var(--z-sticky)-1)] flex flex-col bg-background pt-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          >
            <nav className="flex flex-1 flex-col justify-center px-6 pb-20">
              <ul className="flex flex-col gap-2" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.07, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 type-display text-[clamp(2.5rem,10vw,4rem)] text-foreground border-b border-border hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile footer links */}
              <motion.div
                className="mt-10 flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <Link
                  href={ROUTES.login}
                  onClick={() => setMenuOpen(false)}
                  className="type-label text-foreground-muted tracking-widest hover:text-accent transition-colors"
                >
                  ACCOUNT
                </Link>
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); openCart(); }}
                  className="type-label text-foreground-muted tracking-widest hover:text-accent transition-colors"
                >
                  BAG ({mounted ? itemCount : 0})
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
