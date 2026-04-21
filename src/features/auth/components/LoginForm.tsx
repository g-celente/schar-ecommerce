"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? ROUTES.home;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("E-mail ou senha inválidos.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    });
  }

  async function handleGoogleSignIn() {
    startTransition(async () => {
      await signIn("google", { callbackUrl });
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Error banner */}
      {error && (
        <div
          role="alert"
          className="border border-red-800/60 bg-red-950/40 px-4 py-3 type-small text-red-400"
        >
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="email" className="type-label tracking-widest text-foreground-muted block">
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isPending}
          className={cn(
            "w-full bg-surface-2 border border-border px-4 py-3 type-body text-foreground",
            "placeholder:text-foreground-subtle",
            "focus:outline-none focus:border-border-strong",
            "disabled:opacity-50"
          )}
          placeholder="voce@exemplo.com"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="type-label tracking-widest text-foreground-muted block">
          SENHA
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
          className={cn(
            "w-full bg-surface-2 border border-border px-4 py-3 type-body text-foreground",
            "placeholder:text-foreground-subtle",
            "focus:outline-none focus:border-border-strong",
            "disabled:opacity-50"
          )}
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-foreground text-background type-label tracking-[0.2em] py-4 hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "ENTRANDO…" : "ENTRAR"}
      </button>

      {/* Google */}
      <div className="relative flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="type-small text-foreground-subtle shrink-0">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-3 border border-border py-3 type-label tracking-[0.15em] text-foreground-muted hover:border-border-strong hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        CONTINUAR COM GOOGLE
      </button> */}

      <p className="text-center type-small text-foreground-subtle">
        Não tem conta?{" "}
        <Link
          href={ROUTES.register}
          className="text-foreground-muted hover:text-foreground transition-colors"
        >
          Criar uma
        </Link>
      </p>
    </form>
  );
}
