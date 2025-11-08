import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getBlogPost, getBlogSlugs } from "@/lib/blog";

type ResearchSlugParams = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ResearchSlugParams): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) {
    return {
      title: "Marsala Research",
    };
  }

  return {
    title: `${post.title} · Marsala Research`,
    description: post.summary,
  };
}

export default function ResearchArticleRedirect({ params }: ResearchSlugParams) {
  redirect(`/blog/${params.slug}`);
}
