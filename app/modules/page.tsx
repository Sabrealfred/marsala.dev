import type { Metadata } from "next";
import { ModuleCard } from "@/components/ModuleCard";
import { modules } from "@/data/modules";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "Browse Marsala OS modules spanning brand, web, CRM, AI, ads, data, commerce, content, DevOps, and integrations.",
};

export default function ModulesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Modules · Módulos</p>
        <h1 className="font-display text-4xl font-semibold text-foreground">A modular growth stack · Un stack modular de crecimiento</h1>
        <p className="text-base text-foreground-muted">
          Choose the modules required to build your digital ecosystem and scale with operational intelligence.
          <span className="mt-1 block text-sm text-foreground">
            Elige los módulos necesarios para construir tu ecosistema digital y escalar con inteligencia operativa.
          </span>
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
