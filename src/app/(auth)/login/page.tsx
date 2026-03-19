import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Entrar`,
  description: `Entre na sua conta ${SITE_NAME}`,
};

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-1">
          <Image
            src="/brand/logo.png"
            alt={SITE_NAME}
            width={160}
            height={54}
            className="h-11 w-auto object-contain"
          />
          <h1 className="type-display text-3xl">ENTRAR</h1>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}