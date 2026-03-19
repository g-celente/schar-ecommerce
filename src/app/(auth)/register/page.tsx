import Image from "next/image";
import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Criar Conta`,
  description: `Junte-se à ${SITE_NAME} e comece a comprar hoje`,
};

export default function RegisterPage() {
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
          <h1 className="type-display text-3xl">CRIAR CONTA</h1>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}