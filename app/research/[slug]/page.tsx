import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { researchPosts } from "@/data/research";

export function generateStaticParams() {
  return researchPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = researchPosts.find((entry) => entry.slug === params.slug);
  if (!post) {
    return {
      title: "Research Article",
    };
  }

  return {
    title: `${post.title} · Marsala Research`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
    },
  };
}

export default function ResearchArticlePage({ params }: { params: { slug: string } }) {
  const post = researchPosts.find((entry) => entry.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <article className="relative overflow-hidden bg-gradient-to-b from-moss-50 via-cream-50 to-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-moss-300 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16">
          {/* Back Link */}
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm font-semibold text-moss-700 transition-colors hover:text-moss-900"
          >
            <span>←</span>
            Back to Research
          </Link>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-moss-gradient px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {post.type}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-sage-500">
              {post.date}
            </span>
            <span className="text-xs text-sage-400">·</span>
            <span className="text-xs font-medium text-sage-500">{post.readingTime}</span>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl">
            {post.title}
          </h1>

          {/* Summary */}
          <p className="mt-6 text-xl leading-relaxed text-sage-700">
            {post.summary}
          </p>

          {/* Metrics */}
          {post.metrics.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {post.metrics.map((metric) => (
                <span
                  key={metric}
                  className="rounded-full border-2 border-moss-300 bg-white px-4 py-2 text-sm font-bold text-moss-700"
                >
                  {metric}
                </span>
              ))}
            </div>
          )}

          {/* Hero Quote */}
          {post.heroQuote && (
            <figure className="mt-10 rounded-3xl border border-moss-200 bg-white p-6 shadow-card lg:p-8">
              <blockquote className="text-lg font-semibold italic text-moss-900 lg:text-xl">
                {post.heroQuote}
              </blockquote>
              {post.heroAttribution && (
                <figcaption className="mt-4 text-sm font-medium uppercase tracking-wider text-sage-600">
                  — {post.heroAttribution}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </article>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="prose prose-lg max-w-none">
          <div className="space-y-12">
            {post.sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-2xl font-bold text-moss-950 lg:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-sage-700 lg:text-lg">
                  {section.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-6 space-y-3 border-l-4 border-moss-300 pl-6">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-base text-moss-900 lg:text-lg">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        {post.closingNote && (
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-moss-50 to-sage-50 p-8 lg:p-10">
            <p className="text-lg font-semibold text-moss-950 lg:text-xl">
              {post.closingNote}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-moss-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105"
              >
                Get in Touch
                <span>→</span>
              </Link>
              <Link
                href="/modules"
                className="inline-flex items-center gap-2 rounded-full border-2 border-moss-600 bg-white px-6 py-3 text-sm font-semibold text-moss-700 transition-all duration-300 hover:bg-moss-600 hover:text-white"
              >
                Explore Modules
              </Link>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2 border-t border-moss-100 pt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-sage-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="mt-8 flex items-center gap-4 text-sm">
          <span className="font-semibold text-moss-700">Share:</span>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=https://marsala.dev/research/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-moss-300 px-4 py-2 font-medium text-moss-700 transition-colors hover:border-moss-600 hover:bg-moss-50"
          >
            LinkedIn
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=https://marsala.dev/research/${post.slug}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-moss-300 px-4 py-2 font-medium text-moss-700 transition-colors hover:border-moss-600 hover:bg-moss-50"
          >
            Twitter
          </a>
        </div>
      </div>
    </main>
  );
}
