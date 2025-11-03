import Link from "next/link";
import { Hero } from "@/components/Hero";

const quickLinks = [
  {
    href: "/modules",
    title: "Modules · Módulos",
    description: "10 modular services from brand to AI automation.",
    descriptionEs: "10 servicios modulares desde marca hasta automatización IA.",
  },
  {
    href: "/cases",
    title: "Case Studies · Casos",
    description: "Real results with metrics and timelines.",
    descriptionEs: "Resultados reales con métricas y tiempos.",
  },
  {
    href: "/lab",
    title: "Lab · Laboratorio",
    description: "Experiments and prototypes before production.",
    descriptionEs: "Experimentos y prototipos antes de producción.",
  },
  {
    href: "/about",
    title: "About · Nosotros",
    description: "Mission, values, team, and preferred stack.",
    descriptionEs: "Misión, valores, equipo y stack preferido.",
  },
];

const highlights = [
  "Ultra-fast websites (Next.js + Vercel) optimized for SEO and conversion",
  "AI-powered CRM journeys and sales automation",
  "End-to-end automation across ads, content, and reporting",
  "Scalable brand systems for consistent touchpoints",
  "Measurable impact in weeks, not months",
];

const highlightsEs = [
  "Websites ultra-rápidos (Next.js + Vercel) optimizados para SEO y conversión",
  "Journeys de CRM con IA y automatización de ventas",
  "Automatización end-to-end en ads, contenido y reporting",
  "Sistemas de marca escalables para touchpoints consistentes",
  "Impacto medible en semanas, no meses",
];

const industries = ["Fintech", "Retail & e-commerce", "Health & Wellness", "B2B SaaS", "Education"];

const socialProof = [
  { metric: "10×", label: "faster time-to-market", labelEs: "time-to-market más rápido" },
  { metric: "+47%", label: "ad-spend efficiency", labelEs: "eficiencia en ad-spend" },
  { metric: "3×", label: "engagement in key journeys", labelEs: "engagement en journeys clave" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />

        <section className="mt-24 space-y-6">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            Marsala OS is your modular digital operating system.
            <span className="mt-2 block text-lg font-medium text-foreground-muted">
              Marsala OS es tu sistema operativo digital modular.
            </span>
          </h2>
          <p className="max-w-3xl text-base text-foreground-muted">
            Every service is a plug-and-play module. Activate Brand, Web, CRM, AI, Ads, Data or Commerce as needed today and add more as you scale. Your stack, your rules.
            <span className="mt-1 block text-sm text-foreground">
              Cada servicio es un módulo conectable. Activa Brand, Web, CRM, AI, Ads, Data o Commerce según necesites hoy y agrega más a medida que escales. Tu stack, tus reglas.
            </span>
          </p>
        </section>

        <section className="mt-16 grid gap-4 rounded-3xl border border-border bg-white/80 p-8 shadow-card md:grid-cols-3">
          {socialProof.map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-display text-4xl font-semibold text-foreground">{item.metric}</p>
              <p className="mt-2 text-sm text-foreground-muted">{item.label}</p>
              <p className="text-xs text-foreground">{item.labelEs}</p>
            </div>
          ))}
        </section>

        <section className="mt-24 space-y-6">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            What you get · Qué obtienes
          </h2>
          <div className="grid gap-3 text-sm text-foreground md:grid-cols-2">
            {highlights.map((item, index) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-surfaceMuted/70 p-4 shadow-card">
                <span className="text-accent">✓</span>
                <div>
                  <p>{item}</p>
                  <p className="mt-1 text-foreground-muted">{highlightsEs[index]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 space-y-8">
          <div className="space-y-3">
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
              Explore · Explora
            </h2>
            <p className="text-base text-foreground-muted">
              Browse our modules, case studies, experiments, and approach.
              <span className="mt-1 block text-sm text-foreground">
                Explora nuestros módulos, casos, experimentos y enfoque.
              </span>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col gap-3 rounded-3xl border border-border bg-white/80 p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow"
              >
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-accent">
                  {link.title}
                </h3>
                <p className="text-sm text-foreground-muted">
                  {link.description}
                  <span className="mt-1 block text-foreground">{link.descriptionEs}</span>
                </p>
                <span className="text-sm text-accent">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-24 space-y-6">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            Industries we serve · Industrias
          </h2>
          <p className="max-w-2xl text-base text-foreground-muted">
            We work with founders and teams in regulated and fast-moving spaces.
            <span className="mt-1 block text-sm text-foreground">
              Trabajamos con fundadores y equipos en sectores regulados y de alta velocidad.
            </span>
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-foreground">
            {industries.map((industry) => (
              <span key={industry} className="rounded-full border border-border bg-white px-4 py-2 shadow-card">
                {industry}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-white to-surface p-10 shadow-glow">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
              Ready to build your OS?
              <span className="mt-2 block text-lg font-medium text-foreground-muted">
                ¿Listo para construir tu OS?
              </span>
            </h2>
            <p className="text-base text-foreground-muted">
              Book a 30-minute call to map your ideal operating system, or explore our pricing and packages.
              <span className="mt-1 block text-sm text-foreground">
                Agenda una llamada de 30 minutos para mapear tu sistema operativo ideal, o explora nuestros precios y paquetes.
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-surface shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
              >
                Contact Us · Contáctanos
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white px-6 py-3 text-sm font-semibold text-foreground transition-transform duration-300 hover:-translate-y-0.5 hover:border-foreground/40"
              >
                See Pricing · Ver precios
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
