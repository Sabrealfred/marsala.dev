import Link from "next/link";
import Image from "next/image";

const metrics = [
  {
    value: "10×",
    label: "Time to Market",
    detail: "Ship faster with modular systems",
  },
  {
    value: "+47%",
    label: "Ad Efficiency",
    detail: "Data-driven optimization",
  },
  {
    value: "3×",
    label: "Engagement",
    detail: "AI-powered workflows",
  },
  {
    value: "24/7",
    label: "Operations",
    detail: "Continuous automation",
  },
];

const capabilities = [
  {
    title: "Brand & Design Systems",
    summary: "Scalable identity, component libraries, and visual languages that evolve with your business.",
    detail: "From logos to complete design systems with reusable components, ensuring consistency across every touchpoint.",
  },
  {
    title: "Web & Platform Engineering",
    summary: "Next.js architectures optimized for performance, SEO, and conversion with clean Core Web Vitals.",
    detail: "Fast, scalable websites built with modern frameworks, delivered on global CDNs with sub-second load times.",
  },
  {
    title: "AI Automation & Intelligence",
    summary: "Copilots, workflows, and intelligent systems that handle repetitive tasks and scale operations.",
    detail: "From content generation to customer support, AI agents that integrate seamlessly with your existing stack.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-marsala-50 to-white py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,0,0,0.03)_0%,_transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-3xl border border-marsala-200 bg-white px-4 py-2 shadow-card">
                <span className="text-xs font-semibold uppercase tracking-widest text-marsala-600">
                  Intelligent Growth Studio
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
              Build your modular
              <span className="mt-2 block bg-gradient-to-r from-black to-marsala-700 bg-clip-text text-transparent">
                digital operating system
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-marsala-600">
              Strategy, design, engineering, and AI automation to connect every part of your growth stack
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/modules"
                className="group rounded-full bg-black px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-hover"
              >
                Explore Modules
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-black px-8 py-4 text-base font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
              >
                Contact Team
              </Link>
            </div>
          </div>

          {/* Metrics */}
          <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="group relative overflow-hidden rounded-3xl border border-marsala-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-marsala-50 transition-transform duration-300 group-hover:scale-150" />
                <div className="relative">
                  <p className="text-4xl font-bold text-black">{metric.value}</p>
                  <p className="mt-2 text-sm font-medium text-marsala-600">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">Modular Capabilities</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the modules you need today, add more as you scale.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {capabilities.map((capability) => (
              <article
                key={capability.title}
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-xl font-light text-gray-900">{capability.title}</h3>
                <p className="mt-4 text-sm text-gray-700">{capability.summary}</p>
                <p className="mt-3 text-xs text-gray-500">{capability.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/modules"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700"
            >
              View all 10 modules
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-600">
                  Trusted By
                </p>
                <h3 className="mt-3 text-2xl font-light text-gray-900">
                  Teams building the next generation of digital products across fintech, SaaS, and e-commerce.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Preview */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-light tracking-tight text-gray-900">Research & Insights</h2>
            <p className="mt-4 text-lg text-gray-600">
              Learnings from building modular systems across industries.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <article className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-600">Case Study</p>
              <h3 className="mt-4 text-2xl font-light text-gray-900">Fintech Launch System</h3>
              <p className="mt-3 text-sm text-gray-700">10× faster time-to-market with modular architecture and compliance-ready infrastructure.</p>
              <Link href="/research" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-900">
                Read More
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
            <article className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-600">Whitepaper</p>
              <h3 className="mt-4 text-2xl font-light text-gray-900">Modular Growth Stacks</h3>
              <p className="mt-3 text-sm text-gray-700">Framework for building scalable, maintainable systems that evolve with your business.</p>
              <Link href="/research" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-900">
                Read More
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
            <article className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-600">Insight</p>
              <h3 className="mt-4 text-2xl font-light text-gray-900">AI Automation Playbook</h3>
              <p className="mt-3 text-sm text-gray-700">Practical guide to implementing AI workflows that save time and scale operations.</p>
              <Link href="/research" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-gray-900">
                Read More
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-12 text-center">
            <h2 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">
              Ready to build your OS?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Schedule a call to discuss your project, objectives, and ideal modular rollout.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-full bg-gray-900 px-10 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition hover:bg-gray-800"
              >
                Contact Team
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-gray-300 px-10 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-gray-900 transition hover:bg-white"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
