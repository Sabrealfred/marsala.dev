import type { Metadata } from "next";
import { CaseCard } from "@/components/CaseCard";
import { caseStudies, casesIntro } from "@/data/cases";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Marsala OS case studies focused on decisions, metrics, and timelines across fintech, retail, and SaaS.",
};

export default function CasesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Case Studies · Casos</p>
        <h1 className="font-display text-4xl font-semibold text-foreground">Accelerated results · Resultados acelerados</h1>
        <p className="text-base text-foreground-muted">
          {casesIntro.en}
          <span className="mt-1 block text-sm text-foreground">{casesIntro.es}</span>
        </p>
      </header>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {caseStudies.map((item) => (
          <CaseCard key={item.slug} item={item} />
        ))}
      </div>
    </main>
  );
}
