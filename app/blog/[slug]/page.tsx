import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatBlogDate, getBlogPost, getBlogSlugs, getRelatedPosts, getCategoryForPost, getNextPost, getPreviousPost } from "@/lib/blog";
import { mdxComponents } from "@/components/MDXComponents";
import { BlogBackLink, BlogPostNavigation, BlogRelatedPosts } from "@/components/BlogPostClient";

type BlogPostParams = {
  params: {
    slug: string;
  };
};

// Revalidate every 1 hour in production
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {};
  }

  const title = `${post.title}`;
  const description = post.description ?? post.summary ?? "Marsala insights on modular growth systems.";

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.date,
      authors: [post.author ?? "Marsala Team"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: post.keywords,
  };
}

export default function BlogPostPage({ params }: BlogPostParams) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = formatBlogDate(post.date);
  const relatedPosts = getRelatedPosts(params.slug, 3);
  const category = getCategoryForPost(post);
  const nextPost = getNextPost(params.slug);
  const previousPost = getPreviousPost(params.slug);

  return (
    <main className="min-h-screen bg-cream-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-moss-50 to-sage-50 py-10 lg:py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-moss-300 blur-3xl" />
          <div className="absolute right-1/3 bottom-0 h-80 w-80 rounded-full bg-sage-300 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">
          <BlogBackLink />

          <div className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-sage-600">
            <span className="rounded-full bg-moss-gradient px-3 py-1 text-white">{post.type}</span>
            <span>{formattedDate}</span>
            {post.readingTime && (
              <>
                <span className="text-sage-400">·</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-moss-950 sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-sage-700">{post.summary}</p>
          {post.description && (
            <p className="mt-2 text-base text-sage-600">
              {post.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-sage-600">
            <span>By {post.author ?? "Marsala Team"}</span>
            {post.tags?.length ? (
              <>
                <span className="text-sage-400">·</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-moss-200 bg-white px-3 py-1 text-xs font-semibold text-moss-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <article className="mx-auto max-w-3xl px-6 lg:px-8">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>
      </section>

      {/* Next/Previous Navigation */}
      <BlogPostNavigation previousPost={previousPost} nextPost={nextPost} />

      {/* Related Posts */}
      <BlogRelatedPosts relatedPosts={relatedPosts} category={category} />

      <section className="bg-moss-950 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage-400">Marsala OS</p>
          <h2 className="mt-4 text-3xl font-bold text-white">
            Ready to turn this insight into a live system?
          </h2>
          <p className="mx-auto mt-4 text-lg text-sage-300">
            We build brand, web, CRM, AI, and automation modules that plug into your stack.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-moss-gradient px-8 py-3 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105"
          >
            Talk to our team
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
