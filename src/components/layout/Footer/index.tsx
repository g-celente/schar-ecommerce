import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ROUTES, SITE_NAME } from "@/lib/constants";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: ROUTES.products },
      { label: "Cart", href: ROUTES.cart },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: ROUTES.login },
      { label: "Create account", href: ROUTES.register },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-3">
          {/* Brand column */}
          <div>
            <p className="text-base font-bold">{SITE_NAME}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Premium products crafted for everyday life.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
