import { getAllBlogPosts } from "@/lib/blog";
import { HomePageClient } from "@/components/HomePageClient";
import { Hero } from "@/components/Hero";
import { HomePageSections } from "@/components/HomePageSections";
import { ImpactCalculator } from "@/components/ImpactCalculator";
import { FeaturesGrid } from "@/components/FeaturesGrid";

// Revalidate every 1 hour in production
export const revalidate = 3600;

export default function HomePage() {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-white dark:bg-navy-950 text-[#051c2c] dark:text-slate-100 selection:bg-slate-200 selection:text-[#051c2c] dark:selection:bg-slate-700 dark:selection:text-white">
      <Hero />
      <FeaturesGrid />
      <HomePageClient />
      <HomePageSections blogPosts={blogPosts} />
      <ImpactCalculator />
    </main>
  );
}
