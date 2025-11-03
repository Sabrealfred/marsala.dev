import { caseStudies, casesIntro } from "@/data/cases";
import { modules } from "@/data/modules";
import { CaseCard } from "@/components/CaseCard";
import { Hero } from "@/components/Hero";
import { ModuleCard } from "@/components/ModuleCard";

const modulesIntro = {
  en: "Activate the modules you need today and connect the rest tomorrow. Unified data, design, and automation.",
  es: "Activa los módulos que necesitas hoy y conecta el resto mañana. Datos, diseño y automatización unificados.",
};
const differentiators = [
  {
    en: "Modular and evolutive: activate what you need today and grow without rebuilding.",
    es: "Modular y evolutivo: activa lo necesario hoy y escala sin rehacer todo.",
  },
  {
    en: "Engineering-first: performance, security, and CI/CD baked into every delivery.",
    es: "Engineering first: performance, seguridad y CI/CD como base.",
  },
  {
    en: "AI-powered growth: automation with metrics, not guesswork.",
    es: "Growth con IA: automatización con métricas, no suposiciones.",
  },
  {
    en: "Time-to-value in weeks: tangible outcomes every sprint.",
    es: "Time-to-value rápido: entregables útiles desde la semana 1.",
  },
  {
    en: "Proven playbooks: repositories and systems we iterate across industries.",
    es: "Playbooks probados: repos y sistemas que iteramos en múltiples industrias.",
  },
];

const processSteps = [
  {
    step: "Discover",
    en: "Diagnosis and KPIs to understand where value unlocks.",
    es: "Diagnóstico y KPIs para entender dónde desbloquear valor.",
  },
  {
    step: "Architect",
    en: "Blueprint of the operating system and data contracts.",
    es: "Blueprint del OS y contratos de datos.",
  },
  {
    step: "Build",
    en: "UI, frontend, backend, and integrations shipped in modular drops.",
    es: "UI, frontend, backend e integraciones entregadas en tandas modulares.",
  },
  {
    step: "Automate",
    en: "IA workflows, CRM, content, and ads connected end-to-end.",
    es: "Workflows de IA, CRM, contenidos y ads conectados end-to-end.",
  },
  {
    step: "Launch",
    en: "Hardening, technical SEO, and performance tuning for go-live.",
    es: "Hardening, SEO técnico y performance para salir en producción.",
  },
  {
    step: "Optimize",
    en: "Continuous experimentation and reporting loops.",
    es: "Experimentación continua y loops de reporting.",
  },
];

const industries = ["Fintech", "Retail & e-commerce", "Health & Wellness", "B2B SaaS", "Education"];

const faqs = [
  {
    question: {
      en: "Can you work with internal teams?",
      es: "¿Pueden trabajar con equipo interno?",
    },
    answer: {
      en: "Yes. We co-create, document, and hand off playbooks so your team can operate the system.",
      es: "Sí. Co-creamos, documentamos y hacemos handoff para que tu equipo opere el sistema.",
    },
  },
  {
    question: {
      en: "Which CMS do you prefer?",
      es: "¿Qué CMS usan?",
    },
    answer: {
      en: "Headless stacks such as Contentlayer/MDX, Sanity, or Strapi — or the platform you already depend on.",
      es: "Headless como Contentlayer/MDX, Sanity o Strapi, o el que ya tengas en producción.",
    },
  },
  {
    question: {
      en: "Can you migrate our CRM?",
      es: "¿Pueden migrar nuestro CRM?",
    },
    answer: {
      en: "We handle migrations for HubSpot, Salesforce, Pipedrive and more with ETL and QA flows.",
      es: "Gestionamos migraciones para HubSpot, Salesforce, Pipedrive y más con ETL y QA.",
    },
  },
  {
    question: {
      en: "Do you only deliver design?",
      es: "¿Hacen sólo diseño?",
    },
    answer: {
      en: "We can, but we recommend delivering strategy + build + automation to guarantee outcomes.",
      es: "Podemos, pero recomendamos entregar estrategia + build + automatización para garantizar resultados.",
    },
  },
  {
    question: {
      en: "Do you guarantee results?",
      es: "¿Garantizan resultados?",
    },
    answer: {
      en: "We guarantee process quality and transparency; KPIs depend on ongoing execution and context.",
      es: "Garantizamos proceso y calidad; los KPIs dependen de la ejecución continua y el contexto.",
    },
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Marsala OS",
  url: "https://marsala.dev",
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "sales@marsala.dev",
      contactType: "sales",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "221 River St., 9th Floor",
    addressLocality: "Hoboken",
    addressRegion: "NJ",
    postalCode: "07030",
    addressCountry: "US",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />

        <section id="what-we-build" className="mt-24 space-y-5">
          <h2 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            Marsala OS is your modular digital operating system.
            <span className="mt-2 block text-lg font-medium text-foreground-muted">
              Marsala OS es tu sistema operativo digital modular.
            </span>
          </h2>
          <p className="max-w-3xl text-base text-foreground-muted">
            Every service is a plug-and-play module. Activate Brand, Web, CRM, AI, Ads, Data or Commerce as needed today and plug more in as you scale. Your stack, your rules.
            <span className="mt-1 block text-sm text-foreground">
              Cada servicio es un módulo conectable. Activa Brand, Web, CRM, AI, Ads, Data o Commerce según lo necesites hoy y conecta más a medida que creces. Tu stack, tus reglas.
            </span>
          </p>
          <ul className="grid gap-3 text-sm text-foreground">
            <li>Fintech Launch System: 10× faster time-to-market. <span className="text-foreground-muted">Time-to-market 10× más rápido.</span></li>
            <li>Retail Automation: +47% ad-spend efficiency. <span className="text-foreground-muted">+47% eficiencia en ad-spend.</span></li>
            <li>AI CRM Migration: 3× engagement in key journeys. <span className="text-foreground-muted">3× engagement en journeys clave.</span></li>
          </ul>
        </section>

        <section id="modules" className="mt-24 space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">Modules · Módulos</h2>
              <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">
                Modular Stack · Stack Modular
              </p>
            </div>
            <p className="max-w-xl text-base text-foreground-muted">
              {modulesIntro.en}
              <span className="mt-1 block text-sm text-foreground">
                {modulesIntro.es}
              </span>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => (
              <ModuleCard key={module.slug} module={module} />
            ))}
          </div>
        </section>

        <section id="lab" className="mt-24 grid gap-6 rounded-3xl border border-border bg-white/80 p-8 shadow-card">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Marsala Lab</h2>
          <p className="text-base text-foreground-muted">
            The Marsala Lab is our living sandbox: new APIs, AI models, connectors, and growth playbooks tested before they go mainstream.
            <span className="mt-1 block text-sm text-foreground">
              El Marsala Lab es nuestro sandbox vivo: nuevas APIs, modelos de IA, conectores y playbooks probados antes de llegar al mainstream.
            </span>
          </p>
          <div className="grid gap-4 text-sm text-foreground">
            <div>
              <strong>Experiments · Experimentos:</strong> public prototypes to validate ideas quickly.
            </div>
            <div>
              <strong>Open Source:</strong> packages, templates, and starters we maintain.
            </div>
            <div>
              <strong>Papers & Notes · Notas:</strong> battle-tested learnings ready to apply.
            </div>
            <div>
              <strong>Roadmap:</strong> the next wave of experiments graduating into modules.
            </div>
          </div>
        </section>

        <section id="cases" className="mt-24 space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Case Studies · Casos</h2>
            <p className="max-w-xl text-base text-foreground-muted">
              {casesIntro.en}
              <span className="mt-1 block text-sm text-foreground">{casesIntro.es}</span>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-24 space-y-8">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Why Marsala OS</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item.en} className="rounded-3xl border border-border bg-white/80 p-6 shadow-card">
                <p className="text-base text-foreground">{item.en}</p>
                <p className="mt-2 text-sm text-foreground-muted">{item.es}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 space-y-8">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Process · Proceso</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {processSteps.map((item) => (
              <div key={item.step} className="rounded-3xl border border-border bg-surfaceMuted/70 p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-foreground/60">{item.step}</p>
                <p className="mt-3 text-sm text-foreground">{item.en}</p>
                <p className="mt-2 text-xs text-foreground-muted">{item.es}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 space-y-5">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Industries · Industrias</h2>
          <p className="max-w-2xl text-base text-foreground-muted">
            We work with founders and teams in regulated and fast-moving spaces.
            <span className="mt-1 block text-sm text-foreground">
              Colaboramos con equipos en industrias reguladas y de alta velocidad.
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

        <section className="mt-24 space-y-6">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">FAQs</h2>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question.en} className="group rounded-3xl border border-border bg-white/80 p-5 shadow-card">
                <summary className="cursor-pointer list-none text-base font-semibold text-foreground">
                  {faq.question.en}
                  <span className="mt-1 block text-sm text-foreground-muted">{faq.question.es}</span>
                </summary>
                <div className="mt-3 text-sm text-foreground-muted">
                  {faq.answer.en}
                  <span className="mt-2 block text-foreground">{faq.answer.es}</span>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="about" className="mt-24 space-y-6 rounded-3xl border border-border bg-white/90 p-8 shadow-card">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">About Marsala</h2>
          <p className="text-base text-foreground-muted">
            Marsala is an intelligent growth studio blending strategy, design, engineering, and automation to build digital infrastructures that learn.
            <span className="mt-1 block text-sm text-foreground">
              Marsala es un estudio de crecimiento inteligente que combina estrategia, diseño, ingeniería y automatización para crear infraestructuras digitales que aprenden.
            </span>
          </p>
          <div className="grid gap-4 text-sm text-foreground">
            <p>
              <strong>Mission · Misión:</strong> Remove friction between marketing, product, and sales with modular systems that are measurable and beautiful.
            </p>
            <p>
              <strong>Vision · Visión:</strong> Every company deserves its own digital operating system, as easy to run as software.
            </p>
            <p>
              <strong>Values · Valores:</strong> Clarity over complexity, responsible speed, obsession with impact, true scalability, privacy by design.
            </p>
            <p>
              <strong>Team · Equipo:</strong> Designers, developers, and strategists from SaaS, e-commerce, AI, and growth backgrounds.
            </p>
            <p>
              <strong>Preferred Stack:</strong> Next.js 15, Vercel, TypeScript, Tailwind, Supabase/Postgres, Prisma, Stripe, n8n, Make, Airbyte, LangChain, OpenAI, Anthropic, Pinecone, Cloudflare, GitHub Actions.
            </p>
          </div>
        </section>

        <section id="contact" className="mt-24 space-y-6">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Contact · Contacto</h2>
          <p className="max-w-3xl text-base text-foreground-muted">
            Tell us about your ideal operating system — business objective, current stack, and timeline.
            <span className="mt-1 block text-sm text-foreground">
              Cuéntanos sobre tu sistema ideal: objetivo de negocio, stack actual y timing.
            </span>
          </p>
          <div className="grid gap-6 rounded-3xl border border-border bg-white/90 p-8 shadow-card md:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              <p className="text-lg font-semibold text-foreground">sales@marsala.dev</p>
              <p className="text-sm text-foreground-muted">
                221 River St., 9th Floor, Hoboken, NJ 07030, USA
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-foreground">
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
                <label htmlFor="name" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">
                  Name · Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="company" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">
                  Company · Empresa
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company"
                  className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="industry" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">
                  Industry · Industria
                </label>
                <input
                  id="industry"
                  name="industry"
                  type="text"
                  placeholder="Industry"
                  className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="goal" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">
                  Primary Goal · Objetivo principal
                </label>
                <input
                  id="goal"
                  name="goal"
                  type="text"
                  placeholder="Primary goal"
                  className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="budget" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">
                  Estimated Budget · Presupuesto
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder="Budget"
                  className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="font-semibold uppercase tracking-[0.22em] text-foreground/60">
                  Message · Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Share context, timeline, or questions."
                  className="rounded-2xl border border-border bg-surfaceMuted/60 px-4 py-3 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <p className="text-xs text-foreground-muted">
                We process your data to respond to your request. We do not share it with third parties without your consent.
                <span className="mt-1 block text-foreground">
                  Procesamos tus datos para responderte. No los compartimos con terceros sin tu consentimiento.
                </span>
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-surface shadow-glow"
              >
                Submit · Enviar
              </button>
            </form>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
    </div>
  );
}
