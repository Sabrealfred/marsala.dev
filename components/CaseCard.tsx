import type { CaseStudy } from "@/data/cases";
import { cn } from "@/lib/utils";

type CaseCardProps = {
  item: CaseStudy;
  className?: string;
};

export function CaseCard({ item, className }: CaseCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-4 rounded-4xl border border-moss-200 bg-white/95 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-moss-500 hover:shadow-glow",
        className,
      )}
    >
      <div>
        <h3 className="font-display text-xl font-semibold text-moss-950">
          {item.title.en}
          <span className="mt-1 block text-sm font-medium text-sage-500">
            {item.title.es}
          </span>
        </h3>
        <p className="mt-3 text-sm text-sage-600">
          <strong className="font-semibold text-moss-800">Industry · Industria:</strong>{" "}
          {item.industry.en} · {item.industry.es}
        </p>
        <p className="mt-2 text-sm text-sage-600">
          <strong className="font-semibold text-moss-800">Objective · Objetivo:</strong>{" "}
          {item.objective.en} / {item.objective.es}
        </p>
      </div>
      <div className="grid gap-3 rounded-3xl bg-cream-50 p-4 text-xs text-moss-900">
        <p className="font-semibold uppercase tracking-[0.34em] text-moss-700">
          Key decisions · Decisiones clave
        </p>
        <ul className="grid gap-2">
          {item.decisions.map((decision) => (
            <li key={decision.en}>
              {decision.en}
              <span className="block text-sage-500">{decision.es}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-3 text-xs text-moss-900">
        <p className="font-semibold uppercase tracking-[0.34em] text-moss-700">
          Results · Resultados
        </p>
        <ul className="grid gap-2">
          {item.results.map((result) => (
            <li key={result.label.en}>
              <strong>{result.label.en}</strong>: {result.value.en}
              <span className="block text-sage-500">
                <strong>{result.label.es}</strong>: {result.value.es}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-wrap justify-between gap-2 text-[11px] uppercase tracking-[0.28em] text-sage-500">
        <span>{item.timelineWeeks} weeks · semanas</span>
        <span>{item.modules.join(" · ")}</span>
      </div>
    </div>
  );
}
