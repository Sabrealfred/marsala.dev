'use client';

import Link from "next/link";
import { useState } from "react";

const highlights = [
  {
    id: "web",
    title: "Ultra-fast websites ready for SEO and conversion",
    detail: "Next.js + Vercel architectures with clean Core Web Vitals and conversion-focused flows.",
  },
  {
    id: "crm",
    title: "AI-assisted sales and CRM that close more deals",
    detail: "Lead scoring, pipeline automation, and playbooks that keep revenue teams aligned.",
  },
  {
    id: "automation",
    title: "End-to-end automation across ads, content, and reporting",
    detail: "From experimentation cadences to data loops that push insights back into acquisition.",
  },
  {
    id: "brand",
    title: "Scalable brand systems for every touchpoint",
    detail: "Living design languages, component libraries, and storytelling with consistency.",
  },
  {
    id: "impact",
    title: "Weeks to measurable impact, not months",
    detail: "Modular rollout plans with shipping milestones every sprint.",
  },
];

export function Hero() {
  const [active, setActive] = useState(highlights[0].id);
  const current = highlights.find((item) => item.id === active) ?? highlights[0];

  return (
    <section className="relative grid gap-10 pt-24 md:grid-cols-[minmax(0,1fr),minmax(0,0.9fr)] md:items-center md:pt-32">
      <div className="space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-foreground-muted">
          Intelligent Growth Studio
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-foreground md:text-[3.2rem]">
          Build your modular digital operating system.
        </h1>
        <p className="max-w-xl text-base text-foreground-muted md:text-lg">
          Marsala OS combines strategy, design, engineering, and AI automation to connect every part of your growth stack — from brand and web to CRM, ads, and data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/modules"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-surface shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore Modules
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/40 px-6 py-3 text-sm font-semibold text-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:border-foreground/30"
          >
            Book a Call
          </Link>
        </div>
        <p className="text-sm text-foreground-muted">
          Trusted by teams in fintech, retail, health, and SaaS.
        </p>
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
                  <span className="text-sm font-semibold">{item.title}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl bg-foreground p-5 text-surface shadow-glow">
            <p className="text-sm font-medium">{current.detail}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-white/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-foreground-muted">
              <span>sales@marsala.dev</span>
              <span>Hoboken, NJ · Remote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
