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
        "flex h-full flex-col gap-4 rounded-sm border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:shadow-slate-900/50",
        className,
      )}
    >
      <div>
        <h3 className="font-heading text-xl font-semibold text-[#051c2c] dark:text-white">
          {item.title.en}
          <span className="mt-1 block text-sm font-medium text-slate-600 dark:text-slate-400">
            {item.title.es}
          </span>
        </h3>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          <strong className="font-semibold text-[#051c2c] dark:text-white">Industry · Industria:</strong>{" "}
          {item.industry.en} · {item.industry.es}
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          <strong className="font-semibold text-[#051c2c] dark:text-white">Objective · Objetivo:</strong>{" "}
          {item.objective.en} / {item.objective.es}
        </p>
      </div>
      <div className="grid gap-3 rounded-sm border border-slate-200 bg-slate-50 p-4 text-xs dark:border-slate-700 dark:bg-slate-800">
        <p className="font-semibold uppercase tracking-[0.34em] text-slate-600 dark:text-slate-300">
          Key decisions · Decisiones clave
        </p>
        <ul className="grid gap-2 text-[#051c2c] dark:text-white">
          {item.decisions.map((decision) => (
            <li key={decision.en}>
              {decision.en}
              <span className="block text-slate-500 dark:text-slate-400">{decision.es}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-3 text-xs">
        <p className="font-semibold uppercase tracking-[0.34em] text-slate-600 dark:text-slate-300">
          Results · Resultados
        </p>
        <ul className="grid gap-2 text-[#051c2c] dark:text-white">
          {item.results.map((result) => (
            <li key={result.label.en}>
              <strong>{result.label.en}</strong>: {result.value.en}
              <span className="block text-slate-500 dark:text-slate-400">
                <strong>{result.label.es}</strong>: {result.value.es}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-wrap justify-between gap-2 text-[11px] uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
        <span>{item.timelineWeeks} weeks · semanas</span>
        <span>{item.modules.join(" · ")}</span>
      </div>
    </div>
  );
}
