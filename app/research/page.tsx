import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research & Insights",
  description: "Case studies, whitepapers, and insights from building modular growth systems.",
};

const posts = [
  {
    id: 1,
    type: "Case Study",
    title: "Fintech Launch System",
    summary: "How a regulated fintech platform achieved 10× faster time-to-market using modular architecture.",
    detail: "Complete breakdown of architecture decisions, compliance requirements, and operational metrics over 6 weeks.",
    date: "November 2025",
    metrics: ["10× faster GTM", "+38% lead conversion", "Green Core Web Vitals"],
  },
  {
    id: 2,
    type: "Case Study",
    title: "Retail Automation Platform",
    summary: "E-commerce brand improved ad-spend efficiency by 47% through automated creative testing and audience sync.",
    detail: "Dynamic creative generation, weekly experimentation cadence, and LTV-based audience optimization.",
    date: "October 2025",
    metrics: ["+47% ad efficiency", "+19% AOV", "ROAS > 3.0"],
  },
  {
    id: 3,
    type: "Case Study",
    title: "AI CRM Migration",
    summary: "B2B SaaS company tripled engagement with ML-powered scoring and intelligent nurture sequences.",
    detail: "ETL process, ID reconciliation, segmentation strategy, and AI-assisted playbooks for revenue teams.",
    date: "September 2025",
    metrics: ["3× engagement", "-35% response time", "Unified pipeline dashboard"],
  },
  {
    id: 4,
    type: "Whitepaper",
    title: "Modular Growth Stacks",
    summary: "Framework for building scalable, maintainable systems that evolve with your business needs.",
    detail: "Principles for modular architecture, component boundaries, integration patterns, and operational playbooks.",
    date: "August 2025",
    metrics: [],
  },
  {
    id: 5,
    type: "Insight",
    title: "AI Automation Playbook",
    summary: "Practical guide to implementing AI workflows that save time and scale operations.",
    detail: "From content generation to customer support, with real examples and integration patterns.",
    date: "July 2025",
    metrics: [],
  },
  {
    id: 6,
    type: "Insight",
    title: "Performance Budgets for Modern Web",
    summary: "How to set and maintain Core Web Vitals targets across your entire site.",
    detail: "Monitoring strategies, optimization techniques, and automated enforcement in CI/CD pipelines.",
    date: "June 2025",
    metrics: [],
  },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-600">
              Research & Insights
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">
              Learnings from building modular systems
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Case studies, frameworks, and practical guides distilled from real projects across fintech, SaaS, and e-commerce.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-600">
                        {post.type}
                      </p>
                      <h2 className="mt-3 text-2xl font-light text-gray-900">{post.title}</h2>
                      <p className="mt-3 text-sm text-gray-700">{post.summary}</p>
                      <p className="mt-2 text-xs text-gray-500">{post.detail}</p>

                      {post.metrics.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {post.metrics.map((metric, idx) => (
                            <span
                              key={idx}
                              className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{post.date}</p>
                      <button className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-50">
                        Read Full Post
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-12 text-center">
            <h2 className="text-3xl font-light tracking-tight text-gray-900">
              Subscribe to Research Updates
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Get new case studies and insights delivered monthly.
            </p>
            <form className="mx-auto mt-8 flex max-w-md gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm focus:border-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
