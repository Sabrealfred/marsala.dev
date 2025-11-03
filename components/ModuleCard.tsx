import type { Module } from "@/data/modules";
import { cn } from "@/lib/utils";

type ModuleCardProps = {
  module: Module;
  className?: string;
};

export function ModuleCard({ module, className }: ModuleCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-white/70 p-6 shadow-card transition duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow",
        className,
      )}
    >
      <div className="pointer-events-none absolute -inset-16 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative space-y-3">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {module.title.en}
          <span className="mt-1 block text-sm font-medium text-foreground/70">
            {module.title.es}
          </span>
        </h3>
        <p className="text-sm text-foreground-muted">
          {module.description.en}
          <span className="mt-1 block text-xs text-foreground">
            {module.description.es}
          </span>
        </p>
      </div>
      <div className="relative mt-4 grid gap-3 rounded-2xl border border-border bg-surfaceMuted/50 p-4 text-xs text-foreground-muted">
        <div>
          <p className="font-semibold uppercase tracking-[0.34em] text-foreground/60">
            Deliverables · Entregables
          </p>
          <ul className="mt-2 grid gap-1 text-[12px] text-foreground">
            {module.deliverables.map((item) => (
              <li key={item.en}>
                {item.en}
                <span className="text-foreground-muted"> · {item.es}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-[0.34em] text-foreground/60">
            Outcomes · Resultados
          </p>
          <ul className="mt-2 grid gap-1 text-[12px] text-foreground">
            {module.outcomes.map((item) => (
              <li key={item.en}>
                {item.en}
                <span className="text-foreground-muted"> · {item.es}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
