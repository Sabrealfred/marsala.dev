import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lab",
  description: "Explore the Marsala Lab — experiments, open-source, notes, and roadmap for modular growth systems.",
};

const experiments = [
  {
    title: "PostHog Feature Flags + Supabase",
    description: "Automated flag lifecycle management with Supabase metadata and Slack notifications",
    status: "testing" as const,
    updated: "3 days ago",
    tech: ["PostHog", "Supabase", "n8n"],
    link: "/blog/posthog-feature-flags-playbook",
  },
  {
    title: "AI Sales Desk v2",
    description: "GPT-4 Turbo powered sales assistant with CRM integration and lead scoring",
    status: "production" as const,
    updated: "1 week ago",
    tech: ["OpenAI", "Supabase", "Next.js"],
    link: "/blog/ai-sales-desk-notebook",
  },
  {
    title: "Shopify Headless + Next.js 15",
    description: "High-performance storefront with edge rendering and optimistic UI updates",
    status: "graduating" as const,
    updated: "2 weeks ago",
    tech: ["Shopify", "Next.js", "Vercel"],
    link: "/blog/shopify-headless-nextjs15",
  },
  {
    title: "n8n RevOps Router",
    description: "SRE-grade automation workflows with error budgets and observability",
    status: "testing" as const,
    updated: "1 month ago",
    tech: ["n8n", "Metaplane", "Slack"],
    link: "/blog/automation-sre-revops",
  },
];

const openSource = [
  {
    title: "Next.js Starter Kit",
    description: "Production-ready Next.js 15 template with TypeScript, Tailwind, and Supabase",
    stars: "247",
    link: "https://github.com/Marsala-dev",
  },
  {
    title: "Modular UI Components",
    description: "Reusable React components built with framer-motion and Tailwind",
    stars: "189",
    link: "https://github.com/Marsala-dev",
  },
  {
    title: "Growth Analytics Schema",
    description: "Standardized dbt models for marketing, product, and RevOps analytics",
    stars: "156",
    link: "https://github.com/Marsala-dev",
  },
];

const statusConfig = {
  testing: {
    label: "Testing",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: "🧪",
  },
  production: {
    label: "Production Ready",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: "✅",
  },
  graduating: {
    label: "Graduating",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: "🚀",
  },
};

export default function LabPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-moss-50 via-sage-50 to-cream-50 py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-moss-300 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sage-300 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-moss-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-moss-700">
              Marsala Lab
            </span>
          </div>

          <h1 className="text-4xl font-bold text-moss-950 sm:text-5xl">
            Prototyping the future
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sage-700">
            Our living sandbox to test APIs, AI models, UI frameworks, connectors, and automations before they become modules
          </p>
        </div>
      </section>

      {/* Recent Experiments */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-moss-950">Recent Experiments</h2>
            <p className="mt-2 text-sage-700">Live prototypes and production-ready solutions</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {experiments.map((exp) => (
              <Link
                key={exp.title}
                href={exp.link}
                className="group relative overflow-hidden rounded-3xl border-2 border-moss-200 bg-gradient-to-br from-white to-cream-50 p-6 shadow-card transition-all duration-300 hover:border-moss-400 hover:shadow-hover"
              >
                {/* Status Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusConfig[exp.status].color
                    }`}
                  >
                    <span>{statusConfig[exp.status].icon}</span>
                    {statusConfig[exp.status].label}
                  </span>
                  <span className="text-xs text-sage-600">{exp.updated}</span>
                </div>

                <h3 className="text-xl font-bold text-moss-950 transition-colors group-hover:text-moss-700">
                  {exp.title}
                </h3>
                <p className="mt-2 text-sm text-sage-700">{exp.description}</p>

                {/* Tech Stack */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-moss-100 px-3 py-1 text-xs font-medium text-moss-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-moss-gradient text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="bg-moss-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-moss-950">Open Source</h2>
            <p className="mt-2 text-sage-700">Libraries and templates for the community</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {openSource.map((repo) => (
              <a
                key={repo.title}
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border-2 border-moss-200 bg-white p-6 shadow-card transition-all duration-300 hover:border-moss-400 hover:shadow-hover"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss-gradient text-xl shadow-lg">
                    📦
                  </div>
                  <div className="flex items-center gap-1 text-sm text-sage-600">
                    <span className="text-lg">⭐</span>
                    {repo.stars}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-moss-950 transition-colors group-hover:text-moss-700">
                  {repo.title}
                </h3>
                <p className="mt-2 text-sm text-sage-700">{repo.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://github.com/Marsala-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold text-moss-700 transition-colors hover:text-moss-900"
            >
              View all on GitHub
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Graduation Path */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-4xl px-6 text-center md:px-10">
          <div className="rounded-4xl border-2 border-moss-300 bg-gradient-to-br from-moss-50 to-white p-8 shadow-xl lg:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-moss-gradient text-3xl shadow-lg">
              🎓
            </div>
            <h2 className="text-2xl font-bold text-moss-950 lg:text-3xl">Graduation Path</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-700">
              Lab experiments that deliver sustained impact for multiple clients graduate into official Marsala OS modules,
              complete with SLAs, documentation, and dedicated support.
            </p>
            <Link
              href="/modules"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105"
            >
              Explore Production Modules
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
