import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Discover Marsala OS — our mission, vision, values, and the team building modular growth systems.",
};

const values = [
  "Clarity over complexity — design and code that is understandable",
  "Responsible velocity — ship fast without unpayable debt",
  "Impact obsession — metrics before opinions",
  "Real scalability — architectures ready for growth",
  "Privacy and trust by design",
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24 md:px-10">
      <h1 className="font-display text-4xl font-semibold text-foreground">About Marsala</h1>
      <p className="mt-6 max-w-3xl text-base text-foreground-muted">
        Marsala is an intelligent growth studio combining strategy, design, development, and automation.
        We craft digital infrastructures that learn and get smarter with every sprint.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-white/80 p-6 shadow-card">
          <h2 className="font-display text-2xl font-semibold text-foreground">Mission</h2>
          <p className="mt-3 text-sm text-foreground-muted">
            Remove friction between marketing, product, and sales with modular systems that are measurable and beautiful.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-white/80 p-6 shadow-card">
          <h2 className="font-display text-2xl font-semibold text-foreground">Vision</h2>
          <p className="mt-3 text-sm text-foreground-muted">
            A digital operating system tailored for every business, as intuitive as using software.
          </p>
        </div>
      </div>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl font-semibold text-foreground">Values</h2>
        <ul className="grid gap-3 text-sm text-foreground">
          {values.map((value) => (
            <li key={value} className="rounded-3xl border border-border bg-surfaceMuted/70 p-4 shadow-card">
              {value}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl font-semibold text-foreground">Team & Stack</h2>
        <div className="space-y-3 text-sm text-foreground-muted">
          <p>
            Designers, developers, growth engineers, and data/AI specialists experienced in SaaS, e-commerce, and regulated markets.
          </p>
          <p>
            <strong className="text-foreground">Preferred stack:</strong> Next.js 15, Vercel, TypeScript, Tailwind, Supabase/Postgres, Prisma, Stripe, n8n, Make, Airbyte, LangChain, LlamaIndex, OpenAI, Anthropic, Pinecone, Weaviate, Cloudflare, GitHub Actions.
          </p>
          <p>
            <strong className="text-foreground">Careers:</strong> We are always looking for builders — Frontend, Product Designers, Growth Engineers, Data/AI. Portfolios and repos are a plus.
          </p>
        </div>
      </section>
    </main>
  );
}
