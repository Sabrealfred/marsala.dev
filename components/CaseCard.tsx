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
        "flex h-full flex-col gap-4 rounded-3xl border border-border bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow",
        className,
      )}
    >
      <div>
        <h3 className="font-display text-xl font-semibold text-foreground">
          {item.title.en}
          <span className="mt-1 block text-sm font-medium text-foreground/70">
            {item.title.es}
          </span>
        </h3>
        <p className="mt-3 text-sm text-foreground-muted">
          <strong className="font-semibold text-foreground">Industry · Industria:</strong>{" "}
          {item.industry.en} · {item.industry.es}
        </p>
        <p className="mt-2 text-sm text-foreground-muted">
          <strong className="font-semibold text-foreground">Objective · Objetivo:</strong>{" "}
          {item.objective.en} / {item.objective.es}
        </p>
      </div>
      <div className="grid gap-3 rounded-2xl bg-surfaceMuted/60 p-4 text-xs text-foreground">
        <p className="font-semibold uppercase tracking-[0.34em] text-foreground/60">
          Key decisions · Decisiones clave
        </p>
        <ul className="grid gap-2">
          {item.decisions.map((decision) => (
            <li key={decision.en}>
              {decision.en}
              <span className="block text-foreground-muted">{decision.es}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-3 text-xs text-foreground">
        <p className="font-semibold uppercase tracking-[0.34em] text-foreground/60">
          Results · Resultados
        </p>
        <ul className="grid gap-2">
          {item.results.map((result) => (
            <li key={result.label.en}>
              <strong>{result.label.en}</strong>: {result.value.en}
              <span className="block text-foreground-muted">
                <strong>{result.label.es}</strong>: {result.value.es}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex flex-wrap justify-between gap-2 text-[11px] uppercase tracking-[0.28em] text-foreground-muted">
        <span>{item.timelineWeeks} weeks · semanas</span>
        <span>{item.modules.join(" · ")}</span>
      </div>
    </div>
  );
}
