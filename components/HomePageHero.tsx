"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { CanvasAnimationBackground } from "./CanvasAnimationBackground";
import { InfiniteModulesSlider } from "./InfiniteModulesSlider";
import { AnimatedCounter } from "./AnimatedCounter";
import { TiltCard } from "./TiltCard";
import { MagneticButton } from "./MagneticButton";
import { RocketLaunchIcon, BoltIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export function HomePageHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-moss-950 py-20 lg:py-32">
      {/* Layer 1: Canvas Animation Background */}
      <div className="absolute inset-0 z-0">
        <CanvasAnimationBackground />
      </div>

      {/* Layer 2: Infinite Modules Slider */}
      <div className="absolute inset-0 z-[5] opacity-30">
        <InfiniteModulesSlider />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* 60/40 Split Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:gap-16">
          {/* Left: Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-600/40 bg-moss-900/60 px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-sage-400 animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-wider text-moss-100">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t("hero.title")}
              <span className="mt-2 block bg-gradient-to-r from-sage-300 via-moss-300 to-sage-400 bg-clip-text text-transparent">
                {t("hero.subtitle")}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-moss-200">
              {t("hero.description")}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href="/modules" strength={0.4}>
                <span className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sage-500 to-moss-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-moss-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-moss-500/35 hover:scale-105">
                  {t("hero.cta.modules")}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </MagneticButton>
              <MagneticButton href="/contact" strength={0.4}>
                <span className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-moss-600 bg-moss-900/70 px-8 py-4 text-base font-semibold text-moss-100 backdrop-blur-sm transition-all duration-300 hover:bg-moss-800 hover:border-moss-500 hover:scale-105">
                  {t("hero.cta.start")}
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Right: Metrics */}
          <div className="grid gap-6">
            <TiltCard className="group relative overflow-hidden rounded-3xl border border-moss-700/50 bg-moss-900/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-moss-600/50 hover:bg-moss-900/60 hover:shadow-lg hover:shadow-moss-500/10">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-600 to-moss-600">
                  <RocketLaunchIcon className="h-12 w-12 text-white" />
                </div>
                <p className="text-5xl font-bold text-white">
                  <AnimatedCounter value={10} suffix="×" duration={2.5} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-moss-300">Faster Launch</p>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sage-500/10 to-transparent pointer-events-none" />
            </TiltCard>
            <TiltCard className="group relative overflow-hidden rounded-3xl border border-moss-700/50 bg-moss-900/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-moss-600/50 hover:bg-moss-900/60 hover:shadow-lg hover:shadow-moss-500/10">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-moss-600 to-moss-700">
                  <BoltIcon className="h-12 w-12 text-white" />
                </div>
                <p className="text-5xl font-bold text-white">
                  +<AnimatedCounter value={47} suffix="%" duration={2.5} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-moss-300">Efficiency</p>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-moss-500/10 to-transparent pointer-events-none" />
            </TiltCard>
            <TiltCard className="group relative overflow-hidden rounded-3xl border border-moss-700/50 bg-moss-900/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-moss-600/50 hover:bg-moss-900/60 hover:shadow-lg hover:shadow-moss-500/10">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-600 to-sage-700">
                  <ArrowTrendingUpIcon className="h-12 w-12 text-white" />
                </div>
                <p className="text-5xl font-bold text-white">
                  <AnimatedCounter value={3} suffix="×" duration={2.5} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-moss-300">Engagement</p>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sage-500/10 to-transparent pointer-events-none" />
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
