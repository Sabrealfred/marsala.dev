'use client';

import Link from "next/link";
import { useState } from "react";

const highlights = [
  {
    id: "web",
    titleEn: "Ultra-fast websites ready for SEO and conversion.",
    titleEs: "Websites ultra-rápidos listos para SEO y conversión.",
    detailEn:
      "Next.js + Vercel architectures with clean Core Web Vitals, structured data, and conversion-focused flows.",
    detailEs:
      "Arquitecturas Next.js + Vercel con Core Web Vitals impecables, datos estructurados y flujos de conversión afinados.",
  },
  {
    id: "crm",
    titleEn: "AI-assisted sales and CRM journeys that close more deals.",
    titleEs: "Journeys de ventas y CRM con IA que cierran más oportunidades.",
    detailEn:
      "Lead scoring, pipeline automation, and playbooks that keep revenue teams aligned.",
    detailEs:
      "Scoring, automatización y playbooks que mantienen a los equipos de revenue alineados.",
  },
  {
    id: "automation",
    titleEn: "End-to-end automation across ads, content, and reporting.",
    titleEs: "Automatización end-to-end en ads, contenido y reporting.",
    detailEn:
      "From experimentation cadences to data loops that push insights back into acquisition.",
    detailEs:
      "Desde cadencias de experimentación hasta loops de datos que retroalimentan la adquisición.",
  },
  {
    id: "brand",
    titleEn: "Scalable brand systems for every touchpoint.",
    titleEs: "Sistemas de marca escalables para cada touchpoint.",
    detailEn:
      "Living design languages, component libraries, and storytelling with consistency.",
    detailEs:
      "Lenguajes vivos, librerías de componentes y storytelling consistente.",
  },
  {
    id: "impact",
    titleEn: "Weeks to measurable impact, not months.",
    titleEs: "Impacto medible en semanas, no meses.",
    detailEn:
      "Modular rollout plans with shipping milestones every sprint.",
    detailEs:
      "Planes modulares con entregables en cada sprint.",
  },
];

export function Hero() {
  const [active, setActive] = useState(highlights[0].id);
  const current = highlights.find((item) => item.id === active) ?? highlights[0];

  return (
    <section id="home" className="relative grid gap-10 pt-24 md:grid-cols-[minmax(0,1fr),minmax(0,0.9fr)] md:items-center md:pt-32">
      <div className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground-muted">
          Intelligent Growth Studio · Estudio de Crecimiento Inteligente
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-foreground md:text-[3.2rem]">
          Build your modular digital operating system.
          <span className="mt-2 block text-lg font-medium text-foreground-muted md:text-xl">
            Construye tu sistema operativo digital modular.
          </span>
        </h1>
        <p className="max-w-xl text-base text-foreground-muted md:text-lg">
          Marsala OS combines strategy, design, engineering, and AI automation to connect every part of your growth stack — from brand and web to CRM, ads, and data.
          <span className="mt-1 block text-sm text-foreground">
            Marsala OS combina estrategia, diseño, ingeniería e IA para conectar cada parte de tu stack de crecimiento: marca, web, CRM, ads y data.
          </span>
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/modules"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-surface shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore Modules · Explorar módulos
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/40 px-6 py-3 text-sm font-semibold text-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:border-foreground/30"
          >
            Book a Call · Reservar llamada
          </Link>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-foreground-muted">
          <span>Trusted by teams in fintech, retail, health, and SaaS.</span>
          <span>Confiado por equipos en fintech, retail, salud y SaaS.</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/15 via-white to-surface shadow-card" aria-hidden />
        <div className="relative rounded-3xl border border-border bg-surface/90 p-6 shadow-card">
          <div className="flex flex-col gap-2">
            {highlights.map((item) => {
              const isActive = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={`flex w-full flex-col rounded-2xl border px-4 py-3 text-left transition duration-300 ${
                    isActive
                      ? "border-accent/50 bg-accent/10 text-foreground"
                      : "border-transparent bg-surfaceMuted/40 text-foreground-muted hover:border-border hover:bg-white"
                  }`}
                >
                  <span className="text-sm font-semibold">
                    {item.titleEn}
                  </span>
                  <span className="text-xs text-foreground-muted">
                    {item.titleEs}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 space-y-2 rounded-2xl bg-foreground text-surface p-5 shadow-glow">
            <p className="text-sm font-medium">{current.detailEn}</p>
            <p className="text-xs text-surface/70">{current.detailEs}</p>
          </div>
          <div className="mt-4 grid gap-3 rounded-2xl border border-border bg-white/60 p-4 text-xs text-foreground-muted">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>sales@marsala.dev</span>
              <span>221 River St., 9th Floor · Hoboken, NJ 07030, USA</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-foreground/60">
              <span>OpenAI-inspired Motion</span>
              <span>Modular Intelligence</span>
              <span>Sistema Operativo Digital</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
