import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Discover Marsala OS — our mission, vision, values, and the team building modular growth systems.",
};

const values = [
  {
    en: "Clarity over complexity. Design and code that can be understood.",
    es: "Claridad sobre complejidad. Diseño y código que se entiende.",
  },
  {
    en: "Responsible velocity. Ship fast without unpayable debt.",
    es: "Velocidad responsable. Entregas rápidas sin deuda impagable.",
  },
  {
    en: "Impact obsession. Metrics before opinions.",
    es: "Obsesión por el impacto. Métricas antes que opiniones.",
  },
  {
    en: "Real scalability. Architectures ready for the next stage.",
    es: "Escalabilidad real. Arquitecturas listas para el siguiente salto.",
  },
  {
    en: "Privacy and trust by design.",
    es: "Privacidad y confianza por diseño.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24 md:px-10">
      <h1 className="font-display text-4xl font-semibold text-foreground">About Marsala · Sobre Marsala</h1>
      <p className="mt-6 text-base text-foreground-muted">
        Marsala is an intelligent growth studio combining strategy, design, development, and automation. We craft digital infrastructures that learn and get smarter with every sprint.
        <span className="mt-1 block text-sm text-foreground">
          Marsala es un estudio de crecimiento inteligente que combina estrategia, diseño, desarrollo y automatización. Creamos infraestructuras digitales que aprenden y mejoran con cada sprint.
        </span>
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-white/80 p-6 shadow-card">
          <h2 className="font-display text-2xl font-semibold text-foreground">Mission · Misión</h2>
          <p className="mt-3 text-sm text-foreground-muted">
            Remove friction between marketing, product, and sales with modular systems that are measurable and beautiful.
            <span className="mt-1 block text-foreground">
              Eliminar fricción entre marketing, producto y ventas con sistemas modulares, medibles y hermosos.
            </span>
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-white/80 p-6 shadow-card">
          <h2 className="font-display text-2xl font-semibold text-foreground">Vision · Visión</h2>
          <p className="mt-3 text-sm text-foreground-muted">
            A digital operating system tailored for every business, as intuitive as using software.
            <span className="mt-1 block text-foreground">
              Un sistema operativo digital para cada empresa, tan intuitivo como usar software.
            </span>
          </p>
        </div>
      </div>
      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl font-semibold text-foreground">Values · Valores</h2>
        <ul className="grid gap-3 text-sm text-foreground">
          {values.map((value) => (
            <li key={value.en} className="rounded-3xl border border-border bg-surfaceMuted/70 p-4 shadow-card">
              {value.en}
              <span className="mt-1 block text-foreground-muted">{value.es}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl font-semibold text-foreground">Team & Stack</h2>
        <p className="text-sm text-foreground-muted">
          Designers, developers, growth engineers, and data/AI specialists experienced in SaaS, e-commerce, and regulated markets.
          <span className="mt-1 block text-foreground">
            Diseñadores, developers, growth engineers y especialistas en data/IA con experiencia en SaaS, e-commerce y mercados regulados.
          </span>
        </p>
        <p className="text-sm text-foreground-muted">
          Preferred stack: Next.js 15, Vercel, TypeScript, Tailwind, Supabase/Postgres, Prisma, Stripe, n8n, Make, Airbyte, LangChain, LlamaIndex, OpenAI, Anthropic, Pinecone, Weaviate, Cloudflare, GitHub Actions.
        </p>
        <p className="text-sm text-foreground-muted">
          Careers · Carreras: We are always looking for builders — Frontend, Product Designers, Growth Engineers, Data/AI. Portfolios and repos are a plus.
        </p>
      </section>
    </main>
  );
}
