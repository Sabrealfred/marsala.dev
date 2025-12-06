import type { Metadata } from "next";
import { modules } from "@/data/modules";
import { ModulesPageClient } from "@/components/ModulesPageClient";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Modules",
  description: "Browse Marsala OS modules spanning brand, web, CRM, AI, ads, data, commerce, content, DevOps, and integrations.",
};

export default function ModulesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-navy-950">
      <section className="relative overflow-hidden bg-white dark:bg-navy-950 py-24 lg:py-32">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-2">
            <div className="h-2 w-2 rounded-sm bg-[#051c2c] dark:bg-slate-100" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
              10 Modular Services
            </span>
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-[#051c2c] dark:text-slate-100 sm:text-5xl">
            Your modular growth stack
          </h1>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 dark:text-slate-300">
            Choose the modules you need to build your digital ecosystem and scale with operational intelligence
          </p>
        </div>
      </section>

      <ModulesPageClient modules={modules} />

      <section className="bg-slate-50 dark:bg-slate-900 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-sm bg-[#051c2c] dark:bg-slate-100">
            <span className="text-4xl">💡</span>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#051c2c] dark:text-slate-100">
            Need help choosing?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg tracking-wide text-slate-600 dark:text-slate-300">
            Schedule a call and we&rsquo;ll design the perfect modular rollout for your needs
          </p>
          <div className="mt-8">
            <MagneticButton href="/contact" strength={0.5}>
              <span className="inline-flex items-center gap-2 rounded-sm bg-[#051c2c] dark:bg-slate-100 px-8 py-4 text-base font-semibold tracking-wide text-white dark:text-[#051c2c] shadow-sm transition-all duration-300 hover:bg-[#062433] dark:hover:bg-slate-200">
                Get Started
                <span>→</span>
              </span>
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
