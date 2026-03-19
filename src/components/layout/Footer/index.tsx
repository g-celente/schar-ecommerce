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
              Streat wear limitada. Cada peça é um drop.
            </p>
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
            Feito com ♥ no Brasil
          </p>
        </div>
      </Container>
    </footer>
  );
}

