import type { Metadata } from "next";
import { getAllBlogPosts, getPostsByCategory, BLOG_CATEGORIES } from "@/lib/blog";
import { ResearchPageClient } from "@/components/ResearchPageClient";

export const metadata: Metadata = {
  title: "Research & Insights",
  description: "Case studies, frameworks, and operational playbooks from building modular growth systems",
};

// Revalidate every 1 hour in production
export const revalidate = 3600;

export default function ResearchPage() {
  const allPosts = getAllBlogPosts();
  const postsByCategory = getPostsByCategory();
  const categories = Object.values(BLOG_CATEGORIES);

  return (
    <main className="min-h-screen bg-white dark:bg-navy-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-navy-950 py-24 lg:py-32">
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2">
            <div className="h-2 w-2 rounded-sm bg-[#051c2c] dark:bg-slate-100" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
              Research & Insights
            </span>
          </div>

          <h1 className="font-heading max-w-3xl text-4xl font-bold tracking-tight text-[#051c2c] dark:text-slate-100 sm:text-5xl">
            Learnings from real engagements
          </h1>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 dark:text-slate-300">
            Case studies, frameworks, and operational playbooks from building modular growth systems
          </p>
        </div>
      </section>

      <ResearchPageClient
        allPosts={allPosts}
        postsByCategory={postsByCategory}
        categories={categories}
      />
    </main>
  );
}
