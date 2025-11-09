import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Discover Marsala OS — our mission, vision, values, and the team building modular growth systems.",
};

const values = [
  {
    title: "Clarity over complexity",
    description: "Design and code that is understandable, maintainable, and scalable",
    icon: "💎",
  },
  {
    title: "Responsible velocity",
    description: "Ship fast without unpayable debt—measured by SLOs, not vanity metrics",
    icon: "⚡",
  },
  {
    title: "Impact obsession",
    description: "Metrics before opinions—every module tied to business outcomes",
    icon: "📊",
  },
  {
    title: "Real scalability",
    description: "Architectures ready for 10× growth, not just today's traffic",
    icon: "🚀",
  },
  {
    title: "Privacy and trust by design",
    description: "SOC 2 Type II compliant, GDPR-ready, security-first infrastructure",
    icon: "🔒",
  },
];

const timeline = [
  { year: "2023", event: "Marsala founded", description: "Started as a design-dev consultancy" },
  { year: "2024 Q1", event: "First modular OS", description: "Launched Brand OS and Web OS for early clients" },
  { year: "2024 Q2", event: "AI integration", description: "Added AI OS with GPT-4 and Claude integrations" },
  { year: "2024 Q3", event: "Lab experiments", description: "Opened Marsala Lab for public prototypes" },
  { year: "2024 Q4", event: "10 modules live", description: "Complete modular ecosystem operational" },
];

const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind", category: "Frontend" },
  { name: "Supabase", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "Vercel", category: "Infra" },
  { name: "Cloudflare", category: "Infra" },
  { name: "OpenAI", category: "AI" },
  { name: "Anthropic", category: "AI" },
  { name: "n8n", category: "Automation" },
  { name: "Airbyte", category: "Data" },
  { name: "GitHub", category: "DevOps" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-moss-50 via-sage-50 to-cream-50 py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-moss-300 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-moss-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-moss-700">About Marsala</span>
          </div>

          <h1 className="text-4xl font-bold text-moss-950 sm:text-5xl">Building modular growth systems</h1>
          <p className="mt-4 max-w-2xl text-lg text-sage-700">
            An intelligent growth studio combining strategy, design, development, and automation. We craft digital infrastructures that learn and get smarter with every sprint.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-4xl border-2 border-moss-300 bg-gradient-to-br from-moss-50 to-white p-8 shadow-xl">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-moss-gradient text-3xl shadow-lg">
                🎯
              </div>
              <h2 className="text-3xl font-bold text-moss-950">Mission</h2>
              <p className="mt-4 text-lg text-sage-700">
                Remove friction between marketing, product, and sales with modular systems that are measurable and beautiful.
              </p>
            </div>

            <div className="rounded-4xl border-2 border-moss-300 bg-gradient-to-br from-sage-50 to-white p-8 shadow-xl">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-moss-gradient text-3xl shadow-lg">
                🔮
              </div>
              <h2 className="text-3xl font-bold text-moss-950">Vision</h2>
              <p className="mt-4 text-lg text-sage-700">
                A digital operating system tailored for every business, as intuitive as using software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-moss-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <h2 className="mb-8 text-3xl font-bold text-moss-950">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-3xl border-2 border-moss-200 bg-white p-6 shadow-card transition-all duration-300 hover:border-moss-400 hover:shadow-hover"
              >
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="text-lg font-bold text-moss-950">{value.title}</h3>
                <p className="mt-2 text-sm text-sage-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
          <h2 className="mb-8 text-center text-3xl font-bold text-moss-950">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-moss-200" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.year} className="relative flex gap-6">
                  {/* Dot */}
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-moss-gradient text-sm font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                  {/* Content */}
                  <div className="flex-1 rounded-2xl border-2 border-moss-200 bg-gradient-to-br from-white to-cream-50 p-6 shadow-card">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-moss-600">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-moss-950">{item.event}</h3>
                    <p className="mt-2 text-sm text-sage-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-moss-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-moss-950">Our Tech Stack</h2>
            <p className="mt-2 text-lg text-sage-700">Battle-tested tools for production-grade systems</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="group relative overflow-hidden rounded-2xl border-2 border-moss-200 bg-white px-4 py-3 text-center shadow-card transition-all duration-300 hover:border-moss-500 hover:shadow-hover"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-moss-600">
                  {tech.category}
                </div>
                <div className="mt-1 text-base font-bold text-moss-950">{tech.name}</div>
                <div className="absolute inset-0 bg-moss-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-4xl px-6 text-center md:px-10">
          <div className="rounded-4xl border-2 border-moss-300 bg-gradient-to-br from-moss-50 to-white p-8 shadow-xl lg:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-moss-gradient text-3xl shadow-lg">
              👋
            </div>
            <h2 className="text-3xl font-bold text-moss-950">We're Hiring</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-700">
              Always looking for builders: Frontend, Product Designers, Growth Engineers, Data/AI specialists. Portfolios and repos are a plus.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105"
            >
              Get in Touch
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
