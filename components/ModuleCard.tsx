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
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-4xl border border-moss-200 bg-white/90 p-6 shadow-card transition duration-500 hover:-translate-y-1 hover:border-moss-500 hover:shadow-glow",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-moss-gradient opacity-0 transition duration-500 group-hover:opacity-20" />
      <div className="relative space-y-3">
        <h3 className="font-display text-xl font-semibold text-moss-950">
          {module.title.en}
          <span className="mt-1 block text-sm font-medium text-sage-500">
            {module.title.es}
          </span>
        </h3>
        <p className="text-sm text-sage-600">
          {module.description.en}
          <span className="mt-1 block text-xs text-sage-500">
            {module.description.es}
          </span>
        </p>
      </div>
      <div className="relative mt-4 grid gap-3 rounded-3xl border border-moss-100 bg-cream-50 p-4 text-xs text-sage-600">
        <div>
          <p className="font-semibold uppercase tracking-[0.34em] text-moss-700">
            Deliverables · Entregables
          </p>
          <ul className="mt-2 grid gap-1 text-[12px] text-moss-900">
            {module.deliverables.map((item) => (
              <li key={item.en}>
                {item.en}
                <span className="text-sage-500"> · {item.es}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-[0.34em] text-moss-700">
            Outcomes · Resultados
          </p>
          <ul className="mt-2 grid gap-1 text-[12px] text-moss-900">
            {module.outcomes.map((item) => (
              <li key={item.en}>
                {item.en}
                <span className="text-sage-500"> · {item.es}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
