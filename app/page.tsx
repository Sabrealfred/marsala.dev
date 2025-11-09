import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog";
import { HomePageClient } from "@/components/HomePageClient";
import { BlogCarousel } from "@/components/BlogCarousel";
import { AnimatedGradientMesh } from "@/components/AnimatedGradientMesh";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TiltCard } from "@/components/TiltCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ImpactCalculator } from "@/components/ImpactCalculator";

export default function HomePage() {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-moss-50 to-sage-50 py-20 lg:py-32">
        <AnimatedGradientMesh />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-moss-500" />
              <span className="text-xs font-medium uppercase tracking-wider text-moss-700">
                Intelligent Growth Studio
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-moss-950 sm:text-6xl lg:text-7xl">
              Grow with
              <span className="mt-2 block bg-moss-gradient bg-clip-text text-transparent">
                modular intelligence
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sage-700">
              Build your digital ecosystem with plug-and-play modules for brand, web, AI, and automation
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <MagneticButton href="/modules" strength={0.4}>
                <span className="group inline-flex items-center justify-center gap-2 rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-hover">
                  Explore Modules
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </MagneticButton>
              <MagneticButton href="/contact" strength={0.4}>
                <span className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-moss-600 bg-white/50 px-8 py-4 text-base font-semibold text-moss-700 backdrop-blur-sm transition-all duration-300 hover:bg-moss-600 hover:text-white">
                  Get Started
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Metrics */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
            <TiltCard className="group relative overflow-hidden rounded-3xl border-2 border-moss-200 bg-white p-8 backdrop-blur-sm transition-all duration-300">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-moss-50">
                  <Image src="/icon-arc.svg" alt="" width={48} height={48} className="h-12 w-12" />
                </div>
                <p className="text-5xl font-bold text-moss-700">
                  <AnimatedCounter value={10} suffix="×" duration={2.5} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-sage-600">Faster Launch</p>
              </div>
            </TiltCard>
            <TiltCard className="group relative overflow-hidden rounded-3xl border-2 border-moss-200 bg-white p-8 backdrop-blur-sm transition-all duration-300">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-sage-50">
                  <Image src="/icon-path.svg" alt="" width={48} height={48} className="h-12 w-12" />
                </div>
                <p className="text-5xl font-bold text-moss-700">
                  +<AnimatedCounter value={47} suffix="%" duration={2.5} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-sage-600">Efficiency</p>
              </div>
            </TiltCard>
            <TiltCard className="group relative overflow-hidden rounded-3xl border-2 border-moss-200 bg-white p-8 backdrop-blur-sm transition-all duration-300">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-moss-50">
                  <Image src="/icon-arc.svg" alt="" width={48} height={48} className="h-12 w-12" />
                </div>
                <p className="text-5xl font-bold text-moss-700">
                  <AnimatedCounter value={3} suffix="×" duration={2.5} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-sage-600">Engagement</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Interactive Module Builder */}
      <HomePageClient />

      {/* Blog Carousel */}
      <section className="bg-gradient-to-b from-white via-cream-50 to-white py-12 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl">
              Learn from Real Engagements
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-700">
              Case studies, frameworks, and operational playbooks from building modular growth systems
            </p>
          </div>

          <BlogCarousel posts={blogPosts} />

          <div className="mt-8 text-center">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-base font-semibold text-moss-700 transition-colors hover:text-moss-900"
            >
              Ver todos los artículos ({blogPosts.length})
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-moss-950 py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-moss-700">
                <div className="h-10 w-10 rounded-full bg-moss-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Modular by Design</h3>
              <p className="mt-3 text-sage-300">
                Add only what you need, when you need it
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-moss-700">
                <div className="h-10 w-10 rounded-full bg-sage-400" />
              </div>
              <h3 className="text-xl font-bold text-white">AI-Powered</h3>
              <p className="mt-3 text-sage-300">
                Intelligent automation that scales with you
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-moss-700">
                <div className="h-10 w-10 rounded-full bg-moss-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Always Growing</h3>
              <p className="mt-3 text-sage-300">
                Continuous improvement and optimization
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-base font-semibold text-moss-400 transition-colors hover:text-moss-300"
            >
              Read our research
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Calculator CTA */}
      <ImpactCalculator />
    </main>
  );
}
