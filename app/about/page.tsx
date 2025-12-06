import type { Metadata } from "next";
import Link from "next/link";
import {
  RocketLaunchIcon,
  LockClosedIcon,
  ChartBarIcon,
  SparklesIcon,
  BeakerIcon,
  HandThumbUpIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  CodeBracketIcon,
  CircleStackIcon,
  CloudIcon,
  CpuChipIcon,
  BoltIcon,
  CubeTransparentIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "About",
  description: "Discover Marsala OS — our mission, vision, values, and the team building modular growth systems.",
};

const values = [
  {
    title: "Clarity over complexity",
    description: "Design and code that is understandable, maintainable, and scalable",
    icon: CubeTransparentIcon,
  },
  {
    title: "Responsible velocity",
    description: "Ship fast without unpayable debt—measured by SLOs, not vanity metrics",
    icon: BoltIcon,
  },
  {
    title: "Impact obsession",
    description: "Metrics before opinions—every module tied to business outcomes",
    icon: ChartBarIcon,
  },
  {
    title: "Real scalability",
    description: "Architectures ready for 10× growth, not just today's traffic",
    icon: ScaleIcon,
  },
  {
    title: "Privacy and trust by design",
    description: "SOC 2 Type II compliant, GDPR-ready, security-first infrastructure",
    icon: LockClosedIcon,
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
    <main className="min-h-screen bg-white dark:bg-navy-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-navy-950 py-24 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2">
            <div className="h-2 w-2 rounded-sm bg-[#051c2c] dark:bg-slate-100" />
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">About Marsala</span>
          </div>

          <h1 className="font-heading text-4xl font-bold sm:text-5xl text-[#051c2c] dark:text-slate-100 tracking-tight">
            Building modular growth systems
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed tracking-wide">
            An intelligent growth studio combining strategy, design, development, and automation. We craft digital infrastructures that learn and get smarter with every sprint.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="group rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 p-8 shadow-sm transition-all duration-300 hover:border-[#051c2c] dark:hover:border-slate-100">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100 text-3xl">
                <RocketLaunchIcon className="h-8 w-8 text-white dark:text-[#051c2c]" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#051c2c] dark:text-slate-100 tracking-tight">Mission</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Remove friction between marketing, product, and sales with modular systems that are measurable and beautiful.
              </p>
            </div>

            <div className="group rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 p-8 shadow-sm transition-all duration-300 hover:border-[#051c2c] dark:hover:border-slate-100">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100 text-3xl">
                <SparklesIcon className="h-8 w-8 text-white dark:text-[#051c2c]" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#051c2c] dark:text-slate-100 tracking-tight">Vision</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                A digital operating system tailored for every business, as intuitive as using software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white dark:bg-navy-950 py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <h2 className="font-heading mb-8 text-3xl font-bold text-[#051c2c] dark:text-slate-100 tracking-tight">
            Our Values
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-300 hover:border-[#051c2c] dark:hover:border-slate-100"
              >
                <div className="mb-4 text-4xl">
                  <value.icon className="h-8 w-8 text-[#051c2c] dark:text-slate-100" />
                </div>
                <h3 className="text-lg font-bold text-[#051c2c] dark:text-slate-100 tracking-wide">{value.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
          <h2 className="font-heading mb-8 text-center text-3xl font-bold text-[#051c2c] dark:text-slate-100 tracking-tight">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-slate-300 dark:bg-slate-700" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.year} className="relative flex gap-6">
                  {/* Dot */}
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-sm border-4 border-slate-50 dark:border-slate-900 bg-[#051c2c] dark:bg-slate-100 text-sm font-bold text-white dark:text-[#051c2c]">
                    {index + 1}
                  </div>
                  {/* Content */}
                  <div className="group flex-1 rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 p-6 shadow-sm transition-all duration-300 hover:border-[#051c2c] dark:hover:border-slate-100">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#051c2c] dark:text-slate-100">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-[#051c2c] dark:text-slate-100 tracking-tight">{item.event}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-white dark:bg-navy-950 py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-bold text-[#051c2c] dark:text-slate-100 tracking-tight">
              Our Tech Stack
            </h2>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300 tracking-wide">Battle-tested tools for production-grade systems</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="group relative overflow-hidden rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-center shadow-sm transition-all duration-300 hover:border-[#051c2c] dark:hover:border-slate-100"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  {tech.category}
                </div>
                <div className="mt-1 text-base font-bold text-[#051c2c] dark:text-slate-100 tracking-wide">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="mx-auto w-full max-w-4xl px-6 text-center md:px-10">
          <div className="relative overflow-hidden rounded-sm border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-navy-950 p-8 shadow-sm lg:p-12">
            <div className="relative z-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100 text-3xl">
                <HandThumbUpIcon className="h-8 w-8 text-white dark:text-[#051c2c]" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-[#051c2c] dark:text-slate-100 tracking-tight">
                We&rsquo;re Hiring
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Always looking for builders: Frontend, Product Designers, Growth Engineers, Data/AI specialists. Portfolios and repos are a plus.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[#051c2c] dark:bg-slate-100 px-8 py-4 text-base font-semibold text-white dark:text-[#051c2c] shadow-sm transition-all duration-300 hover:bg-[#062433] dark:hover:bg-slate-200 tracking-wide"
              >
                Get in Touch
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
