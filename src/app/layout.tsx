import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSync } from "@/features/cart/components/CartSync";
import { CartDrawerLazy } from "@/features/cart/components/CartDrawerLazy";
import { AuthProvider } from "@/features/auth/components/AuthProvider";
import { ThemeProvider } from "@/features/theme/ThemeProvider";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light" suppressHydrationWarning>
      <head>
        {/* Preconnect to font origins — eliminates DNS + TCP latency for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preconnect to Unsplash CDN for hero image */}
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Blocking script: reads saved theme before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('schar-theme');if(t==='light'||t==='dark'){document.documentElement.classList.remove('dark','light');document.documentElement.classList.add(t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${fontVariables} antialiased flex min-h-dvh flex-col bg-background text-foreground`}
      >
        <AuthProvider>
          <ThemeProvider>
            <CartSync />
            <Navbar />
            {/* Lazy: only downloaded after user opens cart for the first time */}
            <CartDrawerLazy />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
