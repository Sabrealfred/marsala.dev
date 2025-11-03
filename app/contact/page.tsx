import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Marsala OS to map your digital operating system, share goals, and schedule a strategy call.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10">
      <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Contact</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-foreground">Build your Marsala OS</h1>
      <p className="mt-6 max-w-2xl text-base text-foreground-muted">
        Share context about your project, objectives, current stack, and timing so we can design the right modular rollout.
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
              Schedule a Call
            </a>
            <a
              href="https://marsala.dev/waitlist"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
            >
              Join Waitlist
            </a>
          </div>
        </div>

        <form className="grid gap-4 text-sm text-foreground" aria-label="Marsala contact form">
          <div className="grid gap-2">
            <label htmlFor="name" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Name</label>
            <input id="name" name="name" type="text" className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="Your name" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Email</label>
            <input id="email" name="email" type="email" className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="you@company.com" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="company" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Company</label>
            <input id="company" name="company" type="text" className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="Your company" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">Message</label>
            <textarea id="message" name="message" rows={4} className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 focus:border-accent focus:outline-none" placeholder="Tell us about your project" />
          </div>
          <p className="text-xs text-foreground-muted">
            We process your data to respond to you. We do not share it with third parties without consent.
          </p>
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-surface shadow-glow">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
