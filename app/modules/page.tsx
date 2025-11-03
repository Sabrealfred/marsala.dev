import type { Metadata } from "next";
import { ModuleCard } from "@/components/ModuleCard";
import { modules } from "@/data/modules";

export const metadata: Metadata = {
  title: "Modules",
  description: "Browse Marsala OS modules spanning brand, web, CRM, AI, ads, data, commerce, content, DevOps, and integrations.",
};

export default function ModulesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Modules</p>
        <h1 className="font-display text-4xl font-semibold text-foreground">A modular growth stack</h1>
        <p className="max-w-2xl text-base text-foreground-muted">
          Choose the modules you need to build your digital ecosystem and scale with operational intelligence.
        </p>
      </header>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {modules.map((module) => (
          <ModuleCard key={module.slug} module={module} className="h-full" />
        ))}
      </div>
    </main>
  );
}
