import type { Metadata } from "next";
import { CaseCard } from "@/components/CaseCard";
import { caseStudies } from "@/data/cases";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Marsala OS case studies focused on decisions, metrics, and timelines across fintech, retail, and SaaS.",
};

export default function CasesPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24 md:px-10">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Case Studies</p>
        <h1 className="font-heading text-4xl font-semibold text-foreground">Accelerated results</h1>
        <p className="max-w-2xl text-base text-foreground-muted">
          Real cases distilled into decisions, metrics, and timelines.
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
