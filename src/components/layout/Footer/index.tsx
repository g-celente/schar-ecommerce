import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ROUTES, SITE_NAME } from "@/lib/constants";

const footerLinks = [
  {
    title: "Loja",
    links: [
      { label: "Todos os Produtos", href: ROUTES.products },
      { label: "Drops", href: ROUTES.drops },
      { label: "Sacola", href: ROUTES.cart },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: ROUTES.about },
      { label: "Contato", href: ROUTES.contact },
    ],
  },
  {
    title: "Conta",
    links: [
      { label: "Entrar", href: ROUTES.login },
      { label: "Criar conta", href: ROUTES.register },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <Container>
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/brand/logo.png"
              alt={SITE_NAME}
              width={160}
              height={54}
              className="h-11 w-auto object-contain"
            />
            <p className="mt-3 type-small text-foreground-muted max-w-[180px]">
              Street wear limitada. Cada peça é um drop.
            </p>

            {/* Social media */}
            <div className="mt-5 flex items-center gap-4">
              <a href="https://www.instagram.com/_schar_?igsh=Z2N1cmdyYXpkbXRm" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground-subtle transition-colors hover:text-foreground">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.tiktok.com/@_scharr_?_r=1&_t=ZS-95hwp9v7qke" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-foreground-subtle transition-colors hover:text-foreground">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.41a8.16 8.16 0 0 0 4.77 1.52V7.48a4.85 4.85 0 0 1-1.01-.79Z" /></svg>
              </a>
              <a href="https://youtube.com/@scharrr?si=tJJmNGc4M_RJmWA4" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-foreground-subtle transition-colors hover:text-foreground">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.67 31.67 0 0 0 0 12a31.67 31.67 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.67 31.67 0 0 0 24 12a31.67 31.67 0 0 0-.5-5.81ZM9.75 15.56V8.44L15.88 12 9.75 15.56Z" /></svg>
              </a>
              <a href="https://x.com/_Schar_" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-foreground-subtle transition-colors hover:text-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
              </a>
              <a href="https://www.facebook.com/share/14bysngeDXA/" target="_blank" rel="noopener noreferrer" aria-label="Tiktok" className="text-foreground-subtle transition-colors hover:text-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="type-label tracking-widest text-foreground font-semibold">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="type-small text-foreground-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p className="type-small text-foreground-subtle">
            © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
          </p>
          <p className="type-small text-foreground-subtle">
            Feito no Brasil
          </p>
        </div>
      </Container>
    </footer>
  );
}

