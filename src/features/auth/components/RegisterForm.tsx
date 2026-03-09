"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      // Call the register API route, then sign in automatically
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data: { error?: string } = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Registration failed. Try again.");
        return;
      }

      // Auto-login after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but sign-in failed. Please log in.");
        router.push(ROUTES.login);
      } else {
        router.push(ROUTES.home);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <div
          role="alert"
          className="border border-red-800/60 bg-red-950/40 px-4 py-3 type-small text-red-400"
        >
          {error}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="name" className="type-label tracking-widest text-foreground-muted block">
          NAME
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          disabled={isPending}
          className={cn(
            "w-full bg-surface-2 border border-border px-4 py-3 type-body text-foreground",
            "placeholder:text-foreground-subtle focus:outline-none focus:border-border-strong disabled:opacity-50"
          )}
          placeholder="Your name"
        />
      </div>

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
            "placeholder:text-foreground-subtle focus:outline-none focus:border-border-strong disabled:opacity-50"
          )}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="type-label tracking-widest text-foreground-muted block">
          PASSWORD
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          disabled={isPending}
          className={cn(
            "w-full bg-surface-2 border border-border px-4 py-3 type-body text-foreground",
            "placeholder:text-foreground-subtle focus:outline-none focus:border-border-strong disabled:opacity-50"
          )}
          placeholder="Min. 6 characters"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="confirm" className="type-label tracking-widest text-foreground-muted block">
          CONFIRM PASSWORD
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          disabled={isPending}
          className={cn(
            "w-full bg-surface-2 border border-border px-4 py-3 type-body text-foreground",
            "placeholder:text-foreground-subtle focus:outline-none focus:border-border-strong disabled:opacity-50"
          )}
          placeholder="Repeat password"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-foreground text-background type-label tracking-[0.2em] py-4 hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "CREATING ACCOUNT…" : "CREATE ACCOUNT"}
      </button>

      <p className="text-center type-small text-foreground-subtle">
        Already have an account?{" "}
        <Link
          href={ROUTES.login}
          className="text-foreground-muted hover:text-foreground transition-colors"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
