import { getAllBlogPosts } from "@/lib/blog";
import { HomePageClient } from "@/components/HomePageClient";
import { HomePageHero } from "@/components/HomePageHero";
import { HomePageSections } from "@/components/HomePageSections";
import { ImpactCalculator } from "@/components/ImpactCalculator";

// Revalidate every 1 hour in production
export const revalidate = 3600;

export default function HomePage() {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-cream-50">
      <HomePageHero />
      <HomePageClient />
      <HomePageSections blogPosts={blogPosts} />
      <ImpactCalculator />
    </main>
  );
}
