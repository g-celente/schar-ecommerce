"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Container } from "@/components/ui/Container";

type SubmitState = "idle" | "loading" | "success" | "error";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputId = useId();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    /* Basic email guard */
    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("Digite um endereço de e-mail válido.");
      return;
    }

    setState("loading");

    /* Placeholder — wire to your mailing-list API */
    await new Promise((r) => setTimeout(r, 900));
    setState("success");
    setEmail("");
  }

  return (
    <section
      className="section bg-background border-t border-border"
      aria-label="Newsletter signup"
    >
      <Container size="narrow">
        <motion.div
          className="flex flex-col items-center text-center gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* Label */}
          <motion.p
            variants={fadeUp}
            className="type-label text-foreground-muted tracking-[0.2em]"
          >
            FIQUE POR DENTRO
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="type-title max-w-lg text-foreground"
          >
            ACESSO ANTECIPADO
            <br />
            A CADA DROP
          </motion.h2>

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="type-body text-foreground-muted max-w-sm"
          >
            Seja o primeiro a saber quando lançamos novas peças. Sem spam — apenas drops,
            reposições e ofertas exclusivas para membros.
          </motion.p>

          {/* Form */}
          {state === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2 py-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="type-subheading text-foreground">
                Você está na lista.
              </p>
              <p className="type-small text-foreground-muted">
                Verifique sua caixa de entrada para confirmação.
              </p>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="w-full max-w-md"
              noValidate
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor={inputId} className="sr-only">
                  Endereço de e-mail
                </label>
                <input
                  id={inputId}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={state === "loading"}
                  required
                  className="flex-1 min-w-0 border border-border bg-surface px-4 py-3 type-body text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none disabled:opacity-50 transition-colors duration-200"
                  aria-describedby={errorMsg ? `${inputId}-error` : undefined}
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="border border-accent bg-accent px-8 py-3 type-label text-black tracking-[0.15em] transition-colors hover:bg-transparent hover:text-accent disabled:opacity-60 disabled:pointer-events-none"
                >
                  {state === "loading" ? (
                    <span
                      className="inline-block h-3.5 w-3.5 rounded-full border-2 border-black border-t-transparent animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    "INSCREVER-SE"
                  )}
                </button>
              </div>

              {errorMsg && (
                <p
                  id={`${inputId}-error`}
                  role="alert"
                  className="mt-2 type-small text-destructive text-left"
                >
                  {errorMsg}
                </p>
              )}
            </motion.form>
          )}

          {/* Privacy note */}
          <motion.p
            variants={fadeUp}
            className="type-label text-foreground-subtle tracking-widest"
          >
            CANCELE QUANDO QUISER · SEM SPAM
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
