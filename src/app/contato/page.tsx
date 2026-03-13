"use client";

import { useState, useId } from "react";
import { Container } from "@/components/ui/Container";
import { SITE_NAME } from "@/lib/constants";

type SubmitState = "idle" | "loading" | "success";

export default function ContatoPage() {
  const [state, setState] = useState<SubmitState>("idle");
  const formId = useId();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1000));
    setState("success");
  }

  function openWhatsApp() {
    const phone = "+55 41 9 9557-1279"; // Replace with your WhatsApp number
    const msg = encodeURIComponent("Olá! Vim pelo site da Schar e gostaria de falar com vocês.");
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-dvh pt-16 md:pt-[72px]">

      {/* ── HEADER ── */}
      <div className="border-b border-border">
        <Container className="py-16 md:py-20">
          <p className="type-label text-foreground-muted tracking-[0.25em] mb-3">
            FALE CONOSCO
          </p>
          <h1 className="type-hero text-[clamp(2.5rem,8vw,6rem)] leading-none">CONTATO</h1>
        </Container>
      </div>

      <Container className="section">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24">

          {/* ── FORM ── */}
          <div>
            <h2 className="type-subheading text-xl font-semibold mb-8">
              Envie uma mensagem
            </h2>

            {state === "success" ? (
              <div className="border border-border p-8 flex flex-col items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center border border-accent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="type-heading text-foreground">Mensagem enviada!</p>
                <p className="type-body text-foreground-muted">
                  Recebemos sua mensagem e responderemos em até 48 horas.
                </p>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="mt-2 type-label tracking-[0.15em] text-foreground-muted border border-border px-6 py-2 hover:border-foreground hover:text-foreground transition-colors"
                >
                  NOVA MENSAGEM
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="space-y-1">
                  <label htmlFor={`${formId}-name`} className="type-label tracking-widest text-foreground-muted block">
                    NOME
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    disabled={state === "loading"}
                    className="w-full bg-surface border border-border px-4 py-3 type-body text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-border-strong disabled:opacity-50"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor={`${formId}-email`} className="type-label tracking-widest text-foreground-muted block">
                    E-MAIL
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={state === "loading"}
                    className="w-full bg-surface border border-border px-4 py-3 type-body text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-border-strong disabled:opacity-50"
                    placeholder="voce@exemplo.com"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor={`${formId}-subject`} className="type-label tracking-widest text-foreground-muted block">
                    ASSUNTO
                  </label>
                  <input
                    id={`${formId}-subject`}
                    name="subject"
                    type="text"
                    required
                    disabled={state === "loading"}
                    className="w-full bg-surface border border-border px-4 py-3 type-body text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-border-strong disabled:opacity-50"
                    placeholder="Ex: Dúvida sobre pedido"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor={`${formId}-message`} className="type-label tracking-widest text-foreground-muted block">
                    MENSAGEM
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={5}
                    required
                    disabled={state === "loading"}
                    className="w-full bg-surface border border-border px-4 py-3 type-body text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-border-strong disabled:opacity-50 resize-none"
                    placeholder="Escreva sua mensagem aqui..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full bg-foreground text-background type-label tracking-[0.2em] py-4 hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
                      ENVIANDO…
                    </span>
                  ) : (
                    "ENVIAR MENSAGEM"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── INFO SIDEBAR ── */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="type-subheading text-xl font-semibold mb-6">
                Atendimento rápido
              </h2>
              <p className="type-body text-foreground-muted leading-relaxed mb-6">
                Para respostas imediatas, fale conosco pelo WhatsApp. Nosso time responde
                em minutos durante o horário comercial.
              </p>
              <button
                type="button"
                onClick={openWhatsApp}
                className="flex items-center gap-3 bg-[#25D366] text-white type-label tracking-[0.15em] px-6 py-3 hover:bg-[#1ebe5d] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WHATSAPP
              </button>
            </div>

            <div className="border-t border-border pt-8 space-y-4">
              <div>
                <p className="type-label tracking-widest text-foreground-muted mb-1">HORÁRIO</p>
                <p className="type-body text-foreground">Seg–Sex, 9h às 18h (BRT)</p>
              </div>
              <div>
                <p className="type-label tracking-widest text-foreground-muted mb-1">RESPOSTA POR E-MAIL</p>
                <p className="type-body text-foreground">Em até 48 horas</p>
              </div>
              <div>
                <p className="type-label tracking-widest text-foreground-muted mb-1">LOCALIZAÇÃO</p>
                <p className="type-body text-foreground">Lapa PR, Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}