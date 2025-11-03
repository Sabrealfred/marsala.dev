import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Marsala OS to map your digital operating system, share goals, and schedule a strategy call.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10">
      <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Contact · Contacto</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-foreground">Let’s build your Marsala OS · Construyamos tu Marsala OS</h1>
      <p className="mt-6 text-base text-foreground-muted">
        Share context about your project, objectives, current stack, and timing so we can design the right modular rollout.
        <span className="mt-1 block text-sm text-foreground">
          Comparte contexto sobre tu proyecto, objetivos, stack actual y timing para diseñar el rollout modular correcto.
        </span>
      </p>
      <section className="mt-10 grid gap-6 rounded-3xl border border-border bg-white/90 p-8 shadow-card md:grid-cols-[1fr,1.1fr]">
        <div className="space-y-4 text-sm text-foreground">
          <p className="text-lg font-semibold text-foreground">sales@marsala.dev</p>
          <p className="text-foreground-muted">221 River St., 9th Floor, Hoboken, NJ 07030, USA</p>
          <p className="text-foreground-muted">NYC · London · Remote</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://cal.com/marsala/os"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-surface shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
            >
              Schedule a Call · Agenda una llamada
            </a>
            <a
              href="https://marsala.dev/waitlist"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
            >
              Join the Waitlist · Únete a la lista de espera
            </a>
          </div>
        </div>
        <form className="grid gap-4 text-sm text-foreground" aria-label="Marsala contact form">
          <div className="grid gap-2">
            <label htmlFor="name" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Name · Nombre</label>
            <input id="name" name="name" type="text" className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="Your name" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Email</label>
            <input id="email" name="email" type="email" className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="you@company.com" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="company" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Company · Empresa</label>
            <input id="company" name="company" type="text" className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="Company" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="industry" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Industry · Industria</label>
            <input id="industry" name="industry" type="text" className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="Industry" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="goal" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Primary Goal · Objetivo principal</label>
            <input id="goal" name="goal" type="text" className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="Primary goal" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="budget" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Estimated Budget · Presupuesto</label>
            <input id="budget" name="budget" type="text" className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="Budget" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Message · Mensaje</label>
            <textarea id="message" name="message" rows={4} className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="Share context, timeline, or questions." />
          </div>
          <p className="text-xs text-foreground-muted">
            We process your data to respond to you. We do not share it with third parties without consent.
            <span className="mt-1 block text-foreground">
              Procesamos tus datos para responderte. No los compartimos con terceros sin tu consentimiento.
            </span>
          </p>
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-surface shadow-glow">
            Submit · Enviar
          </button>
        </form>
      </section>
    </main>
  );
}
