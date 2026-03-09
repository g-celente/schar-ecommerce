import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sign In`,
  description: `Sign in to your ${SITE_NAME} account`,
};

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-1">
          <p className="type-label tracking-[0.3em] text-foreground-muted">
            {SITE_NAME.toUpperCase()}
          </p>
          <h1 className="type-display text-3xl">SIGN IN</h1>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}