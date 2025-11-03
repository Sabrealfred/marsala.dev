import Link from "next/link";
import { Hero } from "@/components/Hero";

const quickLinks = [
  { href: "/modules", title: "Modules", description: "Modular services from brand to AI" },
  { href: "/cases", title: "Case Studies", description: "Real results with metrics" },
  { href: "/lab", title: "Lab", description: "Experiments and prototypes" },
  { href: "/about", title: "About", description: "Mission, values, and team" },
];

const highlights = [
  "Ultra-fast Next.js websites optimized for SEO",
  "AI-powered CRM and sales automation",
  "End-to-end ad and content automation",
  "Measurable impact in weeks",
];

const socialProof = [
  { metric: "10×", label: "faster time-to-market" },
  { metric: "+47%", label: "ad efficiency" },
  { metric: "3×", label: "engagement boost" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />

        <section className="mt-24 space-y-5">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            Your modular digital operating system
          </h2>
          <p className="max-w-3xl text-lg text-foreground-muted">
            Plug-and-play modules for Brand, Web, CRM, AI, Ads, Data, and Commerce.
            Activate what you need today, scale as you grow.
          </p>
        </section>

        <section className="mt-16 grid gap-6 rounded-3xl border border-border bg-white/80 p-8 shadow-card md:grid-cols-3">
          {socialProof.map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-display text-4xl font-semibold text-accent">{item.metric}</p>
              <p className="mt-2 text-sm text-foreground-muted">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 space-y-6">
          <h2 className="font-display text-2xl font-semibold text-foreground">What you get</h2>
          <div className="grid gap-3 text-sm text-foreground md:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-surfaceMuted/70 p-5 shadow-card">
                <span className="text-lg text-accent">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 space-y-6">
          <h2 className="font-display text-2xl font-semibold text-foreground">Explore</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col gap-2 rounded-3xl border border-border bg-white/80 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
              >
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent">
                  {link.title}
                </h3>
                <p className="text-sm text-foreground-muted">{link.description}</p>
                <span className="mt-2 text-accent">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-white to-surface p-10 shadow-glow">
          <div className="max-w-2xl space-y-5">
            <h2 className="font-display text-3xl font-semibold text-foreground">
              Ready to build your OS?
            </h2>
            <p className="text-lg text-foreground-muted">
              Book a call to map your ideal system, or browse our pricing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-surface shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white px-6 py-3 text-sm font-semibold text-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
