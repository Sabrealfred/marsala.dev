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
    <main className="min-h-screen bg-cream-50 dark:bg-moss-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-moss-50 to-sage-50 py-24 lg:py-32 dark:from-moss-950 dark:via-moss-900 dark:to-moss-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-moss-300 blur-3xl dark:bg-moss-700" />
          <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-sage-300 blur-3xl dark:bg-sage-700" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:border-moss-700 dark:bg-moss-900/80">
            <div className="h-2 w-2 rounded-full bg-moss-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-moss-700 dark:text-moss-300">
              Research & Insights
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-moss-950 sm:text-5xl dark:text-moss-50">
            Learnings from real engagements
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sage-700 dark:text-sage-300">
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
