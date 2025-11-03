import type { Metadata } from "next";
import Link from "next/link";
import { researchPosts } from "@/data/research";

export const metadata: Metadata = {
  title: "Research & Insights",
  description: "Case studies, whitepapers, and playbooks distilled from Marsala OS engagements.",
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-moss-50 to-sage-50 py-12 lg:py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-moss-300 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-sage-300 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-moss-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-moss-700">
              Research & Insights
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-moss-950 sm:text-5xl">
            Learnings from real engagements
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sage-700">
            Case studies, frameworks, and operational playbooks from building modular growth systems
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-6">
            {researchPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/research/${post.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-moss-200 bg-gradient-to-br from-white to-cream-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-moss-400 hover:shadow-hover lg:p-8"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-moss-gradient px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                        {post.type}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-sage-500">
                        {post.date}
                      </span>
                      <span className="text-xs text-sage-400">·</span>
                      <span className="text-xs font-medium text-sage-500">{post.readingTime}</span>
                    </div>

                    {/* Title & Summary */}
                    <h2 className="text-2xl font-bold text-moss-950 transition-colors group-hover:text-moss-700 lg:text-3xl">
                      {post.title}
                    </h2>
                    <p className="text-base text-sage-700 lg:text-lg">{post.summary}</p>

                    {/* Metrics */}
                    {post.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {post.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="rounded-full border border-moss-300 bg-white px-3 py-1 text-xs font-semibold text-moss-700"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs text-sage-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-moss-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-moss-900 lg:flex-col lg:items-end lg:gap-0">
                    <span className="text-sm font-semibold">Read more</span>
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-moss-950 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            Need help with your growth stack?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-300">
            Schedule a call to design your ideal modular system
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-moss-gradient px-8 py-3 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105"
          >
            Get in Touch
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
