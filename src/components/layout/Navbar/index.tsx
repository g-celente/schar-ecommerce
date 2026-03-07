import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ROUTES, SITE_NAME } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            href={ROUTES.home}
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            {SITE_NAME}
          </Link>

          {/* Primary nav */}
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link
                href={ROUTES.products}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href={ROUTES.cart}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cart
              </Link>
            </li>
          </ul>

          {/* Auth actions */}
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.login}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href={ROUTES.register}
              className="rounded-(--radius) bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get started
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
