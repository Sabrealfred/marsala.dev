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
      {/* Blog Carousel - Light Section */}
      <section className="relative overflow-hidden bg-white dark:bg-navy-950 py-12 lg:py-20">
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-[#051c2c] dark:text-white uppercase" style={{ letterSpacing: '0.05em' }}>
              {t("home.blog.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300 tracking-wide">
              {t("home.blog.subtitle")}
            </p>
          </div>

          <BlogCarousel posts={blogPosts} />

          <div className="mt-8 text-center">
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 text-base font-semibold text-[#051c2c] dark:text-white transition-all duration-300 hover:text-slate-600 dark:hover:text-slate-300 tracking-wide uppercase" style={{ letterSpacing: '0.08em' }}
            >
              {t("home.blog.viewAll")} ({blogPosts.length})
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tutoriales Section - Dark Navy */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-navy-950 py-16 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-[#051c2c] dark:text-white uppercase" style={{ letterSpacing: '0.05em' }}>
              {t("home.tutorials.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300 tracking-wide">
              {t("home.tutorials.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: RocketLaunchIcon,
                title: "Quick Start Guide",
                description: "Launch your first module in under 30 minutes",
                time: "15 min read",
                href: "/modules",
              },
              {
                icon: WrenchScrewdriverIcon,
                title: "Integration Patterns",
                description: "Connect modules seamlessly with proven workflows",
                time: "20 min read",
                href: "/research",
              },
              {
                icon: ChartPieIcon,
                title: "Growth Automation",
                description: "Scale intelligently with AI-powered systems",
                time: "25 min read",
                href: "/lab",
              },
            ].map((tutorial, index) => (
              <Link
                key={index}
                href={tutorial.href}
                className="group relative overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:border-[#051c2c] dark:hover:border-white hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-white">
                  <tutorial.icon className="h-8 w-8 text-white dark:text-[#051c2c]" />
                </div>
                <h3 className="relative text-2xl font-bold text-[#051c2c] dark:text-white uppercase tracking-wide" style={{ letterSpacing: '0.03em' }}>
                  {tutorial.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 tracking-wide">
                  {tutorial.description}
                </p>
                <div className="relative mt-6 flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
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

      {/* Comparativas Section - Light Section */}
      <section className="relative overflow-hidden bg-white dark:bg-navy-950 py-16 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-[#051c2c] dark:text-white uppercase" style={{ letterSpacing: '0.05em' }}>
              {t("home.comparison.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300 tracking-wide">
              {t("home.comparison.subtitle")}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="mb-6 text-xl font-bold text-[#051c2c] dark:text-white uppercase tracking-wide" style={{ letterSpacing: '0.05em' }}>{t("home.comparison.agencies")}</h3>
              <ul className="space-y-3">
                {["Fixed packages", "Long contracts", "Vendor lock-in", "One-size-fits-all"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 tracking-wide">
                    <XMarkIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-sm border-2 border-[#051c2c] dark:border-white bg-[#051c2c] dark:bg-white p-8 shadow-2xl lg:scale-105 transition-all duration-300 hover:scale-110">
              <div className="relative mb-4 inline-flex items-center gap-2 rounded-sm bg-white/20 dark:bg-[#051c2c]/20 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white dark:text-[#051c2c] border border-white/30 dark:border-[#051c2c]/30">
                <span className="h-2 w-2 rounded-sm bg-white dark:bg-[#051c2c] animate-pulse" />
                Marsala OS
              </div>
              <h3 className="relative mb-6 text-xl font-bold text-white dark:text-[#051c2c] uppercase tracking-wide" style={{ letterSpacing: '0.05em' }}>{t("home.comparison.marsala")}</h3>
              <ul className="relative space-y-3">
                {["Pay-as-you-grow", "No long-term contracts", "Full ownership", "Customized for you"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white dark:text-[#051c2c]">
                    <CheckIcon className="h-6 w-6 text-white dark:text-[#051c2c] flex-shrink-0" />
                    <span className="font-semibold tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <h3 className="mb-6 text-xl font-bold text-[#051c2c] dark:text-white uppercase tracking-wide" style={{ letterSpacing: '0.05em' }}>{t("home.comparison.inhouse")}</h3>
              <ul className="space-y-3">
                {["High overhead", "Slow hiring", "Limited expertise", "Hard to scale"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 tracking-wide">
                    <XMarkIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section - Dark Navy */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-navy-950 py-16 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl text-[#051c2c] dark:text-white uppercase" style={{ letterSpacing: '0.05em' }}>
              {t("home.highlights.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300 tracking-wide">
              {t("home.highlights.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Link href="/modules" className="group relative overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 transition-all duration-300 hover:border-[#051c2c] dark:hover:border-white hover:shadow-lg hover:-translate-y-1">
              <div className="absolute right-8 top-8 text-6xl opacity-5">
                <ShieldCheckIcon className="h-16 w-16 text-[#051c2c] dark:text-white" />
              </div>
              <h3 className="relative mb-4 text-3xl font-bold text-[#051c2c] dark:text-white uppercase tracking-wide" style={{ letterSpacing: '0.03em' }}>Data-Driven Decisions</h3>
              <p className="relative text-lg leading-relaxed text-slate-600 dark:text-slate-300 tracking-wide">
                Every module integrates with your analytics stack, giving you real-time insights
                into what&apos;s working and what needs optimization.
              </p>
              <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-[#051c2c] dark:text-white uppercase tracking-wider">
                <span>Explore Analytics Module</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <Link href="/legal/sla" className="group relative overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 transition-all duration-300 hover:border-[#051c2c] dark:hover:border-white hover:shadow-lg hover:-translate-y-1">
              <div className="absolute right-8 top-8 text-6xl opacity-5">
                <LockClosedIcon className="h-16 w-16 text-[#051c2c] dark:text-white" />
              </div>
              <h3 className="relative mb-4 text-3xl font-bold text-[#051c2c] dark:text-white uppercase tracking-wide" style={{ letterSpacing: '0.03em' }}>Enterprise Security</h3>
              <p className="relative text-lg leading-relaxed text-slate-600 dark:text-slate-300 tracking-wide">
                SOC 2 Type II certified infrastructure with end-to-end encryption, audit logs,
                and compliance-ready documentation out of the box.
              </p>
              <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-[#051c2c] dark:text-white uppercase tracking-wider">
                <span>View Security Details</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <Link href="/lab" className="group relative overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 transition-all duration-300 hover:border-[#051c2c] dark:hover:border-white hover:shadow-lg hover:-translate-y-1">
              <div className="absolute right-8 top-8 text-6xl opacity-5">
                <BoltIcon className="h-16 w-16 text-[#051c2c] dark:text-white" />
              </div>
              <h3 className="relative mb-4 text-3xl font-bold text-[#051c2c] dark:text-white uppercase tracking-wide" style={{ letterSpacing: '0.03em' }}>Lightning Fast</h3>
              <p className="relative text-lg leading-relaxed text-slate-600 dark:text-slate-300 tracking-wide">
                Built on Next.js 14 with edge deployment, achieving sub-100ms response times
                globally and perfect Lighthouse scores.
              </p>
              <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-[#051c2c] dark:text-white uppercase tracking-wider">
                <span>See Performance Metrics</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <Link href="/contact" className="group relative overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 transition-all duration-300 hover:border-[#051c2c] dark:hover:border-white hover:shadow-lg hover:-translate-y-1">
              <div className="absolute right-8 top-8 text-6xl opacity-5">
                <HandThumbUpIcon className="h-16 w-16 text-[#051c2c] dark:text-white" />
              </div>
              <h3 className="relative mb-4 text-3xl font-bold text-[#051c2c] dark:text-white uppercase tracking-wide" style={{ letterSpacing: '0.03em' }}>White-Glove Support</h3>
              <p className="relative text-lg leading-relaxed text-slate-600 dark:text-slate-300 tracking-wide">
                Dedicated growth engineer, weekly strategy calls, and 24/7 technical support
                to ensure your success every step of the way.
              </p>
              <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-[#051c2c] dark:text-white uppercase tracking-wider">
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
