"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { formatBlogDate, getCategoryForPost } from "@/lib/blog-utils";

type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  type?: string;
  content: string;
};

type BlogCategory = {
  id: string;
  name: string;
  iconName: string;
  description: string;
  color?: string;
};

type BlogPostClientProps = {
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
  relatedPosts: BlogPost[];
  category: BlogCategory;
};

export function BlogPostNavigation({ previousPost, nextPost }: { previousPost: BlogPost | null; nextPost: BlogPost | null }) {
  const { t } = useLanguage();

  if (!previousPost && !nextPost) return null;

  return (
    <section className="border-y border-slate-200 bg-white py-8 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Previous Post */}
          {previousPost ? (
            <Link
              href={`/blog/${previousPost.slug}`}
              className="group relative overflow-hidden rounded-sm border-2 border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
            >
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                <span>←</span>
                <span>{t("blog.previousArticle")}</span>
              </div>
              <h3 className="text-lg font-bold text-[#051c2c] transition-colors group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-200">
                {previousPost.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-700 dark:text-slate-300">
                {previousPost.summary}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {/* Next Post */}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group relative overflow-hidden rounded-sm border-2 border-slate-200 bg-white p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg md:col-start-2 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
            >
              <div className="mb-2 flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                <span>{t("blog.nextArticle")}</span>
                <span>→</span>
              </div>
              <h3 className="text-lg font-bold text-[#051c2c] transition-colors group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-200">
                {nextPost.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-700 dark:text-slate-300">
                {nextPost.summary}
              </p>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function BlogRelatedPosts({ relatedPosts, category }: { relatedPosts: BlogPost[]; category: BlogCategory }) {
  const { t } = useLanguage();

  if (relatedPosts.length === 0) return null;

  return (
    <section className="bg-white py-12 lg:py-16 dark:bg-navy-950">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#051c2c] dark:text-white">
            {t("blog.alsoInterested")}
          </h2>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            {t("blog.moreContent")} <span className="font-semibold">{category.name}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((relatedPost) => {
            const relatedCategory = getCategoryForPost(relatedPost);
            return (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group relative overflow-hidden rounded-sm border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
              >
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold">
                  <span className="rounded-sm bg-[#051c2c] px-3 py-1 text-white dark:bg-slate-700">
                    {relatedPost.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#051c2c] transition-colors group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-200">
                  {relatedPost.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm text-slate-700 dark:text-slate-300">
                  {relatedPost.summary}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span>{formatBlogDate(relatedPost.date)}</span>
                  {relatedPost.readingTime && (
                    <>
                      <span>·</span>
                      <span>{relatedPost.readingTime}</span>
                    </>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#051c2c] transition-all duration-300 group-hover:translate-x-1 dark:text-white">
                  {t("common.readMore")} <span>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function BlogBackLink() {
  const { t } = useLanguage();

  return (
    <Link
      href="/research"
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#051c2c] transition hover:text-slate-700 dark:text-white dark:hover:text-slate-200"
    >
      <span>←</span> {t("blog.backToArticles")}
    </Link>
  );
}
