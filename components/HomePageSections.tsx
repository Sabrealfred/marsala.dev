"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { BlogCarousel } from "./BlogCarousel";
import {
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  ChartPieIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  BoltIcon,
  HandThumbUpIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  type?: string;
  content: string;
};

type HomePageSectionsProps = {
  blogPosts: BlogPost[];
};

export function HomePageSections({ blogPosts }: HomePageSectionsProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Blog Carousel */}
      <section className="bg-gradient-to-b from-white via-cream-50 to-white py-12 lg:py-20 dark:from-moss-950 dark:via-moss-900 dark:to-moss-950">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl dark:text-moss-50">
              {t("home.blog.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-700 dark:text-sage-300">
              {t("home.blog.subtitle")}
            </p>
          </div>

          <BlogCarousel posts={blogPosts} />

          <div className="mt-8 text-center">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-base font-semibold text-moss-700 transition-colors hover:text-moss-900 dark:text-moss-300 dark:hover:text-moss-50"
            >
              {t("home.blog.viewAll")} ({blogPosts.length})
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tutoriales Section */}
      <section className="bg-gradient-to-b from-white via-moss-50 to-white py-16 lg:py-24 dark:from-moss-950 dark:via-moss-900 dark:to-moss-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl dark:text-moss-50">
              {t("home.tutorials.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-700 dark:text-sage-300">
              {t("home.tutorials.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: RocketLaunchIcon,
                title: "Quick Start Guide",
                description: "Launch your first module in under 30 minutes",
                color: "from-blue-500 to-indigo-600",
                darkColor: "dark:from-blue-800 dark:to-indigo-900",
                time: "15 min read",
                href: "/modules",
              },
              {
                icon: WrenchScrewdriverIcon,
                title: "Integration Patterns",
                description: "Connect modules seamlessly with proven workflows",
                color: "from-purple-500 to-fuchsia-600",
                darkColor: "dark:from-purple-800 dark:to-fuchsia-900",
                time: "20 min read",
                href: "/research",
              },
              {
                icon: ChartPieIcon,
                title: "Growth Automation",
                description: "Scale intelligently with AI-powered systems",
                color: "from-green-500 to-emerald-600",
                darkColor: "dark:from-green-800 dark:to-emerald-900",
                time: "25 min read",
                href: "/lab",
              },
            ].map((tutorial, index) => (
              <Link
                key={index}
                href={tutorial.href}
                className="group relative overflow-hidden rounded-3xl border-2 border-moss-200 bg-white p-8 transition-all duration-500 hover:border-moss-500 hover:shadow-2xl hover:-translate-y-2 dark:border-moss-700 dark:bg-moss-900 dark:hover:border-moss-500"
              >
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tutorial.color} ${tutorial.darkColor} text-3xl shadow-lg`}>
                  <tutorial.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-moss-950 transition-colors duration-300 group-hover:text-moss-700 dark:text-moss-50 dark:group-hover:text-moss-200">
                  {tutorial.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sage-700 dark:text-sage-300">
                  {tutorial.description}
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-sage-600 dark:text-sage-400">
                  <span className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tutorial.time}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativas Section */}
      <section className="bg-moss-950 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl dark:text-moss-50">
              {t("home.comparison.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-300 dark:text-sage-400">
              {t("home.comparison.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border-2 border-moss-700 bg-moss-900/50 p-8 backdrop-blur-sm dark:border-moss-600 dark:bg-moss-900">
              <h3 className="mb-6 text-xl font-bold text-moss-300 dark:text-moss-100">{t("home.comparison.agencies")}</h3>
              <ul className="space-y-3">
                {["Fixed packages", "Long contracts", "Vendor lock-in", "One-size-fits-all"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sage-400 dark:text-sage-300">
                    <XMarkIcon className="h-6 w-6 text-red-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border-2 border-moss-400 bg-gradient-to-br from-moss-600 to-moss-700 p-8 shadow-2xl lg:scale-110 dark:border-moss-500 dark:from-moss-700 dark:to-moss-800">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                <span className="h-2 w-2 rounded-full bg-white" />
                Marsala OS
              </div>
              <h3 className="mb-6 text-xl font-bold text-white dark:text-moss-50">{t("home.comparison.marsala")}</h3>
              <ul className="space-y-3">
                {["Pay-as-you-grow", "No long-term contracts", "Full ownership", "Customized for you"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white dark:text-moss-100">
                    <CheckIcon className="h-6 w-6 text-green-300" />
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border-2 border-moss-700 bg-moss-900/50 p-8 backdrop-blur-sm dark:border-moss-600 dark:bg-moss-900">
              <h3 className="mb-6 text-xl font-bold text-moss-300 dark:text-moss-100">{t("home.comparison.inhouse")}</h3>
              <ul className="space-y-3">
                {["High overhead", "Slow hiring", "Limited expertise", "Hard to scale"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sage-400 dark:text-sage-300">
                    <XMarkIcon className="h-6 w-6 text-red-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-gradient-to-b from-cream-50 via-white to-moss-50 py-16 lg:py-24 dark:from-moss-950 dark:via-moss-900 dark:to-moss-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-moss-950 lg:text-5xl dark:text-moss-50">
              {t("home.highlights.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-700 dark:text-sage-300">
              {t("home.highlights.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Link href="/modules" className="group relative overflow-hidden rounded-4xl border-2 border-moss-300 bg-white p-10 transition-all duration-500 hover:border-moss-500 hover:shadow-2xl hover:-translate-y-1 dark:border-moss-700 dark:bg-moss-900 dark:hover:border-moss-500">
              <div className="absolute right-8 top-8 text-6xl opacity-10 transition-opacity duration-500 group-hover:opacity-20">
                <ShieldCheckIcon className="h-16 w-16" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-moss-950 dark:text-moss-50">Data-Driven Decisions</h3>
              <p className="text-lg leading-relaxed text-sage-700 dark:text-sage-300">
                Every module integrates with your analytics stack, giving you real-time insights
                into what&apos;s working and what needs optimization.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-moss-700 dark:text-moss-300">
                <span>Explore Analytics Module</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <Link href="/legal/sla" className="group relative overflow-hidden rounded-4xl border-2 border-moss-300 bg-white p-10 transition-all duration-500 hover:border-moss-500 hover:shadow-2xl hover:-translate-y-1 dark:border-moss-700 dark:bg-moss-900 dark:hover:border-moss-500">
              <div className="absolute right-8 top-8 text-6xl opacity-10 transition-opacity duration-500 group-hover:opacity-20">
                <LockClosedIcon className="h-16 w-16" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-moss-950 dark:text-moss-50">Enterprise Security</h3>
              <p className="text-lg leading-relaxed text-sage-700 dark:text-sage-300">
                SOC 2 Type II certified infrastructure with end-to-end encryption, audit logs,
                and compliance-ready documentation out of the box.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-moss-700 dark:text-moss-300">
                <span>View Security Details</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <Link href="/lab" className="group relative overflow-hidden rounded-4xl border-2 border-moss-300 bg-white p-10 transition-all duration-500 hover:border-moss-500 hover:shadow-2xl hover:-translate-y-1 dark:border-moss-700 dark:bg-moss-900 dark:hover:border-moss-500">
              <div className="absolute right-8 top-8 text-6xl opacity-10 transition-opacity duration-500 group-hover:opacity-20">
                <BoltIcon className="h-16 w-16" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-moss-950 dark:text-moss-50">Lightning Fast</h3>
              <p className="text-lg leading-relaxed text-sage-700 dark:text-sage-300">
                Built on Next.js 14 with edge deployment, achieving sub-100ms response times
                globally and perfect Lighthouse scores.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-moss-700 dark:text-moss-300">
                <span>See Performance Metrics</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <Link href="/contact" className="group relative overflow-hidden rounded-4xl border-2 border-moss-300 bg-white p-10 transition-all duration-500 hover:border-moss-500 hover:shadow-2xl hover:-translate-y-1 dark:border-moss-700 dark:bg-moss-900 dark:hover:border-moss-500">
              <div className="absolute right-8 top-8 text-6xl opacity-10 transition-opacity duration-500 group-hover:opacity-20">
                <HandThumbUpIcon className="h-16 w-16" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-moss-950 dark:text-moss-50">White-Glove Support</h3>
              <p className="text-lg leading-relaxed text-sage-700 dark:text-sage-300">
                Dedicated growth engineer, weekly strategy calls, and 24/7 technical support
                to ensure your success every step of the way.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-moss-700 dark:text-moss-300">
                <span>Talk to Our Team</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
