import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog";
import { HomePageClient } from "@/components/HomePageClient";
import { BlogCarousel } from "@/components/BlogCarousel";

export default function HomePage() {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-moss-50 to-sage-50 py-12 lg:py-20">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-moss-400 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sage-400 blur-3xl" />
        </div>

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
              <Link
                href="/modules"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-hover"
              >
                Explore Modules
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-moss-600 bg-white/50 px-8 py-4 text-base font-semibold text-moss-700 backdrop-blur-sm transition-all duration-300 hover:bg-moss-600 hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Metrics */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-4 lg:gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-moss-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-hover">
              <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-moss-100 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center">
                  <Image src="/icon-arc.svg" alt="" width={64} height={64} className="h-16 w-16" />
                </div>
                <p className="text-3xl font-bold text-moss-700">10×</p>
                <p className="mt-1 text-sm font-medium text-sage-600">Faster Launch</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-moss-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-hover">
              <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-moss-100 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center">
                  <Image src="/icon-path.svg" alt="" width={64} height={64} className="h-16 w-16" />
                </div>
                <p className="text-3xl font-bold text-moss-700">+47%</p>
                <p className="mt-1 text-sm font-medium text-sage-600">Efficiency</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-moss-200 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-hover">
              <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-moss-100 transition-transform duration-500 group-hover:scale-150" />
              <div className="relative text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center">
                  <Image src="/icon-arc.svg" alt="" width={64} height={64} className="h-16 w-16" />
                </div>
                <p className="text-3xl font-bold text-moss-700">3×</p>
                <p className="mt-1 text-sm font-medium text-sage-600">Engagement</p>
              </div>
            </div>
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

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-moss-100 via-sage-100 to-cream-100 py-12 lg:py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-moss-gradient blur-3xl" />
          <div className="absolute right-0 bottom-0 h-full w-1/3 bg-sage-gradient blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          <Image src="/logo.png" alt="Marsala" width={80} height={80} className="mx-auto mb-6 h-20 w-20" />

          <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl">
            Ready to grow?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-700">
            Schedule a call to design your ideal modular system
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-moss-gradient px-10 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </Link>
            <Link
              href="/modules"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-moss-600 bg-white px-10 py-4 text-base font-semibold text-moss-700 transition-all duration-300 hover:bg-moss-600 hover:text-white"
            >
              View All Modules
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
