import { MetadataRoute } from 'next'
import { getBlogSlugs } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://marsala.dev'

  // Static pages
  const staticPages = [
    '',
    '/modules',
    '/research',
    '/contact',
    '/waitlist',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Blog posts
  const blogSlugs = getBlogSlugs()
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
