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
    <main className="min-h-screen bg-cream-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-moss-50 via-sage-50 to-cream-50 py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-moss-300 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-sage-300 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-300 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-moss-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-moss-700">
              10 Modular Services
            </span>
          </div>

          <h1 className="text-4xl font-bold text-moss-950 sm:text-5xl">
            Your modular growth stack
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sage-700">
            Choose the modules you need to build your digital ecosystem and scale with operational intelligence
          </p>
        </div>
      </section>

      <ModulesPageClient modules={modules} />

      <section className="bg-moss-950 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-moss-700 shadow-xl">
            <span className="text-4xl">💡</span>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Need help choosing?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-300">
            Schedule a call and we'll design the perfect modular rollout for your needs
          </p>
          <div className="mt-8">
            <MagneticButton href="/contact" strength={0.5}>
              <span className="inline-flex items-center gap-2 rounded-full bg-moss-gradient px-8 py-4 text-base font-semibold text-white shadow-glow transition-all duration-300">
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
