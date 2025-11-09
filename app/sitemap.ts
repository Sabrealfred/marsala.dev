import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

const BASE_URL = "https://marsala.dev";

const staticRoutes = [
  "/",
  "/modules",
  "/research",
  "/blog",
  "/about",
  "/cases",
  "/contact",
  "/lab",
  "/links",
  "/waitlist",
  "/legal/privacy",
  "/legal/terms",
  "/legal/sla",
  "/legal/ai-usage",
];

const getBlogSlugs = () => {
  const blogDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  return fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
};

const mapRoute = (route: string, lastModified?: Date): MetadataRoute.Sitemap[0] => ({
  url: `${BASE_URL}${route}`,
  lastModified: (lastModified ?? new Date()).toISOString(),
});

export default function sitemap(): MetadataRoute.Sitemap {
  const blogDir = path.join(process.cwd(), "content", "blog");
  const blogSlugs = getBlogSlugs();

  const blogRoutes = blogSlugs.flatMap((slug) => {
    const filePath = path.join(blogDir, `${slug}.mdx`);
    const stats = fs.statSync(filePath);
    const lastModified = stats.mtime;
    return [
      mapRoute(`/blog/${slug}`, lastModified),
      mapRoute(`/research/${slug}`, lastModified),
    ];
  });

  const staticEntries = staticRoutes.map((route) => mapRoute(route));

  return [...staticEntries, ...blogRoutes];
}

