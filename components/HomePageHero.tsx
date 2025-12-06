"use client";

import { useLanguage } from "./LanguageProvider";
import { AnimatedCounter } from "./AnimatedCounter";
import { RocketLaunchIcon, BoltIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function HomePageHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-navy-950 py-20 lg:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* 60/40 Split Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr,1fr] lg:gap-20">
          {/* Left: Content */}
          <div>
            {/* Badge - minimal professional style */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2">
              <div className="h-2 w-2 rounded-sm bg-[#051c2c] dark:bg-white" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#051c2c] dark:text-white">
                {t("hero.badge")}
              </span>
            </div>

            {/* Headline with McKinsey serif style */}
            <h1 className="font-heading text-5xl font-bold leading-[1.1] tracking-tight text-[#051c2c] dark:text-white sm:text-6xl lg:text-7xl">
              <span className="block">{t("hero.title")}</span>
              <span className="mt-3 block text-[#051c2c] dark:text-white">
                {t("hero.subtitle")}
              </span>
            </h1>

            {/* Description - professional gray */}
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {t("hero.description")}
            </p>

            {/* Clean rectangular CTAs */}
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/modules"
                className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#051c2c] dark:bg-white px-8 py-4 text-base font-semibold text-white dark:text-[#051c2c] transition-all duration-300 hover:bg-[#083952] dark:hover:bg-slate-100"
              >
                <span>{t("hero.cta.modules")}</span>
                <span>→</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-sm border-2 border-[#051c2c] dark:border-white bg-white dark:bg-transparent px-8 py-4 text-base font-semibold text-[#051c2c] dark:text-white transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                <span>{t("hero.cta.start")}</span>
              </Link>
            </div>
          </div>

          {/* Right: Clean Metric Cards */}
          <div className="grid gap-6">
            {/* Card 1 - Faster Launch */}
            <div className="group relative overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:border-[#051c2c] dark:hover:border-white hover:shadow-lg">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-white">
                  <RocketLaunchIcon className="h-9 w-9 text-white dark:text-[#051c2c]" strokeWidth={2} />
                </div>
                <p className="text-5xl font-bold text-[#051c2c] dark:text-white">
                  <AnimatedCounter value={10} suffix="×" duration={2.5} />
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Faster Launch</p>
              </div>
            </div>

            {/* Card 2 - Efficiency */}
            <div className="group relative overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:border-[#051c2c] dark:hover:border-white hover:shadow-lg">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-white">
                  <BoltIcon className="h-9 w-9 text-white dark:text-[#051c2c]" strokeWidth={2} />
                </div>
                <p className="text-5xl font-bold text-[#051c2c] dark:text-white">
                  +<AnimatedCounter value={47} suffix="%" duration={2.5} />
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Efficiency</p>
              </div>
            </div>

            {/* Card 3 - Engagement */}
            <div className="group relative overflow-hidden rounded-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:border-[#051c2c] dark:hover:border-white hover:shadow-lg">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-white">
                  <ArrowTrendingUpIcon className="h-9 w-9 text-white dark:text-[#051c2c]" strokeWidth={2} />
                </div>
                <p className="text-5xl font-bold text-[#051c2c] dark:text-white">
                  <AnimatedCounter value={3} suffix="×" duration={2.5} />
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
