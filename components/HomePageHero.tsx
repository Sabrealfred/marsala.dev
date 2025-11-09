"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { AnimatedGradientMesh } from "./AnimatedGradientMesh";
import { AnimatedCounter } from "./AnimatedCounter";
import { TiltCard } from "./TiltCard";
import { MagneticButton } from "./MagneticButton";

export function HomePageHero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-moss-50 to-sage-50 py-20 lg:py-32">
      <AnimatedGradientMesh />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* 60/40 Split Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:gap-16">
          {/* Left: Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-moss-500" />
              <span className="text-xs font-medium uppercase tracking-wider text-moss-700">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-moss-950 sm:text-6xl lg:text-7xl">
              {t("hero.title")}
              <span className="mt-2 block bg-moss-gradient bg-clip-text text-transparent">
                {t("hero.subtitle")}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sage-700">
              {t("hero.description")}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href="/modules" strength={0.4}>
                <span className="group inline-flex items-center justify-center gap-2 rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-hover">
                  {t("hero.cta.modules")}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </MagneticButton>
              <MagneticButton href="/contact" strength={0.4}>
                <span className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-moss-600 bg-white/50 px-8 py-4 text-base font-semibold text-moss-700 backdrop-blur-sm transition-all duration-300 hover:bg-moss-600 hover:text-white">
                  {t("hero.cta.start")}
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Right: Metrics */}
          <div className="grid gap-6">
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
      </div>
    </section>
  );
}
