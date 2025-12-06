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
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:shadow-slate-900/50",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-slate-50 dark:bg-slate-800 opacity-0 transition duration-300 group-hover:opacity-50" />
      <div className="relative space-y-3">
        <h3 className="font-heading text-xl font-semibold text-[#051c2c] dark:text-white">
          {module.title.en}
          <span className="mt-1 block text-sm font-medium text-slate-500 dark:text-slate-400">
            {module.title.es}
          </span>
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {module.description.en}
          <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
            {module.description.es}
          </span>
        </p>
      </div>
      <div className="relative mt-4 grid gap-3 rounded-sm border border-slate-200 bg-slate-50 p-4 text-xs dark:border-slate-700 dark:bg-slate-800">
        <div>
          <p className="font-semibold uppercase tracking-[0.34em] text-slate-600 dark:text-slate-300">
            Deliverables · Entregables
          </p>
          <ul className="mt-2 grid gap-1 text-[12px] text-[#051c2c] dark:text-white">
            {module.deliverables.map((item) => (
              <li key={item.en}>
                {item.en}
                <span className="text-slate-500 dark:text-slate-400"> · {item.es}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-[0.34em] text-slate-600 dark:text-slate-300">
            Outcomes · Resultados
          </p>
          <ul className="mt-2 grid gap-1 text-[12px] text-[#051c2c] dark:text-white">
            {module.outcomes.map((item) => (
              <li key={item.en}>
                {item.en}
                <span className="text-slate-500 dark:text-slate-400"> · {item.es}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
