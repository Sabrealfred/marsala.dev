import { getAllBlogPosts } from "@/lib/blog";
import { HomePageClient } from "@/components/HomePageClient";
import { HomePageHero } from "@/components/HomePageHero";
import { HomePageSections } from "@/components/HomePageSections";
import { ImpactCalculator } from "@/components/ImpactCalculator";

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
