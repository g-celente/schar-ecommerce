import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ROUTES, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sobre — ${SITE_NAME}`,
  description:
    "SCHAR nasce de um sonho. Arte de rua, cultura urbana e autenticidade em cada estampa. Conheça nossa história.",
};

const IMAGEM = "/brand/IMG_1655.webp";
const IMAGEM_EXPERIENCIA = "/brand/IMG_1757.webp"; // troque pelo caminho da imagem desejada

export default function SobrePage() {
  return (
    <main className="min-h-dvh pt-16 md:pt-[72px]">

      {/* ── HERO ── */}
      <div className="border-b border-border">
        <Container className="py-20 md:py-28">
          <p className="type-label text-foreground-muted tracking-[0.25em] mb-3">
            NOSSA HISTÓRIA
          </p>
          <h1 className="type-hero text-[clamp(3rem,10vw,7rem)] leading-none">SOBRE</h1>
        </Container>
      </div>

      {/* ── ORIGIN STORY ── */}
      <Container className="section">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <p className="type-label text-foreground-muted tracking-[0.2em] mb-4">
              COMO COMEÇOU
            </p>
            <h2 className="type-subheading text-2xl md:text-3xl font-semibold mb-6 leading-tight">
              Um sonho que começou<br />no papel.
            </h2>
            <div className="space-y-5 type-body text-foreground-muted leading-relaxed">
              <p>
                SCHAR nasce de um sonho que começou lá atrás, na infância, com o
                desenho no papel e ganhou forma em 2020 como projeto de TCC no
                curso técnico em Administração.
              </p>
              <p>
                O que era trabalho de conclusão virou propósito de vida: espalhar
                arte de rua pelo mundo através de peças exclusivas.
              </p>
              <p>
                Em 2026, acontece o nosso primeiro DROP oficial edição limitada.
                Peças pensadas nos mínimos detalhes para quem entende que vestir é
                se posicionar.
              </p>
            </div>
          </div>

          {/* Visual block */}
          <div className="relative aspect-[3/4] bg-surface-2 overflow-hidden">
            <Image
              src={IMAGEM}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="type-hero text-[clamp(4rem,15vw,10rem)] text-foreground/5 select-none font-bold">
                SCH
              </p>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="type-label text-foreground-subtle tracking-[0.2em]">
                DESDE 2020 — BRASIL
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* ── ESSÊNCIA ── */}
      <div className="border-t border-border">
        <Container className="section">
          <div className="max-w-2xl">
            <p className="type-label text-foreground-muted tracking-[0.2em] mb-4">
              NOSSA ESSÊNCIA
            </p>
            <h2 className="type-subheading text-2xl md:text-3xl font-semibold mb-6 leading-tight">
              Graffiti, cultura urbana<br />e autenticidade.
            </h2>
            <div className="space-y-5 type-body text-foreground-muted leading-relaxed">
              <p>
                Nossa essência está no graffiti, na cultura urbana e na autenticidade.
                Cada estampa carrega identidade, expressão e história.
              </p>
              <p>
                As camisetas são oversized premium, com modelagem estruturada, tecido
                de alta gramatura, toque macio e acabamento impecável. Qualidade que
                você sente no primeiro contato e percebe na durabilidade.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* ── EXPERIÊNCIA ── */}
      <div className="border-t border-border bg-surface">
        <Container className="section">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
            {/* Visual block */}
            <div className="relative aspect-[3/4] bg-surface-2 overflow-hidden order-2 md:order-1">
              <Image
                src={IMAGEM_EXPERIENCIA}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="type-hero text-[clamp(4rem,15vw,10rem)] text-foreground/5 select-none font-bold">
                  EXP
                </p>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="type-label text-foreground-subtle tracking-[0.2em]">
                  EXPERIÊNCIA SCHAR
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 md:order-2 flex flex-col justify-center">
              <p className="type-label text-foreground-muted tracking-[0.2em] mb-4">
                A EXPERIÊNCIA
              </p>
              <h2 className="type-subheading text-2xl md:text-3xl font-semibold mb-6 leading-tight">
                Você não compra apenas<br />uma camiseta.
              </h2>
              <div className="space-y-5 type-body text-foreground-muted leading-relaxed">
                <p>
                  Você vive a experiência SCHAR.
                </p>
                <p>
                  Cada peça será entregue em embalagens premium, selecionadas entre as
                  melhores do mercado, criando uma experiência única desde o momento em
                  que chega até você. Do unboxing ao primeiro uso, tudo foi pensado para
                  marcar.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ── VALORES ── */}
      <div className="border-t border-border">
        <Container className="section">
          <p className="type-label text-foreground-muted tracking-[0.2em] mb-3">
            NOSSOS PILARES
          </p>
          <h2 className="type-title mb-12">VALORES</h2>

          <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
            {[
              {
                num: "01",
                title: "ARTE",
                desc: "Cada estampa carrega identidade, expressão e história. Graffiti e cultura urbana como forma de se posicionar no mundo.",
              },
              {
                num: "02",
                title: "QUALIDADE",
                desc: "Tecido de alta gramatura, modelagem estruturada e acabamento impecável. Qualidade que você sente no primeiro contato e percebe na durabilidade.",
              },
              {
                num: "03",
                title: "EXPERIÊNCIA",
                desc: "Da embalagem premium ao primeiro uso — tudo foi pensado para marcar. Conforto, arte e estilo para o seu dia a dia.",
              },
            ].map((v) => (
              <div key={v.num} className="bg-background p-8 md:p-10">
                <p className="type-label text-foreground-subtle tracking-[0.25em] mb-4">
                  {v.num}
                </p>
                <h3 className="type-heading text-lg font-semibold mb-3">{v.title}</h3>
                <p className="type-body text-foreground-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── CTA ── */}
      <div className="border-t border-border">
        <Container className="py-20 text-center flex flex-col items-center gap-6">
          <p className="type-label text-foreground-muted tracking-[0.2em]">DROP 001 — AO VIVO</p>
          <h2 className="type-title">EXPLORE OS DROPS</h2>
          <p className="type-body text-foreground-muted max-w-sm">
            Edição limitada. Sem reposição. Quando acaba, acabou.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href={ROUTES.drops}
              className="border border-foreground bg-foreground text-background px-10 py-4 type-label tracking-[0.18em] hover:bg-transparent hover:text-foreground transition-colors duration-200"
            >
              VER DROPS
            </Link>
            <Link
              href={ROUTES.contact}
              className="border border-border px-10 py-4 type-label tracking-[0.18em] text-foreground-muted hover:border-foreground hover:text-foreground transition-colors duration-200"
            >
              FALAR CONOSCO
            </Link>
          </div>
        </Container>
      </div>

    </main>
  );
}
