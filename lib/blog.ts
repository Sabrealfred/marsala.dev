import fs from "fs";
import path from "path";
import matter, { type GrayMatterFile } from "gray-matter";
import { researchPosts, type ResearchPost } from "@/data/research";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  slug?: string;
  summary: string;
  date: string;
  readingTime?: string;
  author?: string;
  tags?: string[];
  type?: string;
  featured?: boolean;
  image?: string;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
};

export function getBlogSlugs() {
  const slugSet = new Set(getMdxSlugs());

  researchPosts.forEach((post) => {
    if (!slugSet.has(post.slug)) {
      slugSet.add(post.slug);
    }
  });

  return Array.from(slugSet);
}

export function getBlogPost(slug: string): BlogPost | null {
  const mdxPost = getMdxPost(slug);
  if (mdxPost) {
    return mdxPost;
  }

  const researchPost = researchPosts.find((post) => post.slug === slug);
  if (!researchPost) {
    return null;
  }

  return convertResearchPost(researchPost);
}

export function getAllBlogPosts(): BlogPost[] {
  const mdxSlugs = getMdxSlugs();
  const mdxPosts = mdxSlugs
    .map((slug) => getMdxPost(slug))
    .filter((post): post is BlogPost => Boolean(post));

  const mdxSlugSet = new Set(mdxSlugs);
  const researchAsBlogPosts = researchPosts
    .filter((post) => !mdxSlugSet.has(post.slug))
    .map((post) => convertResearchPost(post));

  return [...mdxPosts, ...researchAsBlogPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function formatBlogDate(date: string, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function normalizeFrontmatter(data: GrayMatterFile<string>["data"], fallbackSlug: string) {
  const frontmatter = data as BlogFrontmatter;

  return {
    title: frontmatter.title ?? fallbackSlug,
    summary: frontmatter.summary ?? "",
    date: frontmatter.date ?? new Date().toISOString(),
    readingTime: frontmatter.readingTime ?? "",
    author: frontmatter.author ?? "Marsala Team",
    tags: frontmatter.tags ?? [],
    type: frontmatter.type ?? "Insight",
    featured: frontmatter.featured ?? false,
    image: frontmatter.image,
    slug: frontmatter.slug ?? fallbackSlug,
  };
}

function getMdxSlugs() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function getMdxPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const frontmatter = normalizeFrontmatter(data, slug);

  return {
    ...frontmatter,
    content,
  };
}

function convertResearchPost(post: ResearchPost): BlogPost {
  return {
    title: post.title,
    summary: post.summary,
    date: normalizeResearchDate(post.date),
    readingTime: post.readingTime,
    author: post.heroAttribution ?? "Marsala Research",
    tags: post.tags,
    type: post.type,
    featured: false,
    image: undefined,
    slug: post.slug,
    content: renderResearchMarkdown(post),
  };
}

function normalizeResearchDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

function renderResearchMarkdown(post: ResearchPost) {
  const lines: string[] = [];

  if (post.detail) {
    lines.push(post.detail);
  }

  if (post.metrics?.length) {
    lines.push(
      ["**Key Metrics**", ...post.metrics.map((metric) => `- ${metric}`)].join("\n")
    );
  }

  if (post.heroQuote) {
    lines.push(`> ${post.heroQuote}`);
    if (post.heroAttribution) {
      lines.push(`> — ${post.heroAttribution}`);
    }
  }

  post.sections.forEach((section) => {
    lines.push(`## ${section.heading}`);
    section.paragraphs.forEach((paragraph) => {
      lines.push(paragraph);
    });

    if (section.bullets?.length) {
      lines.push(section.bullets.map((bullet) => `- ${bullet}`).join("\n"));
    }
  });

  if (post.closingNote) {
    lines.push("---");
    lines.push(post.closingNote);
  }

  return lines.join("\n\n");
}
