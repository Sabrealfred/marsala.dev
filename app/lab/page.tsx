import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab",
  description: "Explore the Marsala Lab — experiments, open-source, notes, and roadmap for modular growth systems.",
};

const labSections = [
  {
    title: "Experiments",
    en: "Public prototypes validating ideas fast across AI, design systems, and data ops.",
    es: "Prototipos públicos para validar ideas rápido en IA, design systems y data ops.",
  },
  {
    title: "Open Source",
    en: "Libraries, templates, and starters we maintain for the community.",
    es: "Librerías, templates y starters que mantenemos para la comunidad.",
  },
  {
    title: "Papers & Notes",
    en: "Applied learnings packaged as playbooks, memos, and teardown reports.",
    es: "Aprendizajes aplicados en forma de playbooks, memos y teardowns.",
  },
  {
    title: "Roadmap",
    en: "The upcoming experiments graduating into production modules.",
    es: "Los próximos experimentos que se graduarán a módulos productivos.",
  },
];

export default function LabPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24 md:px-10">
      <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Lab</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-foreground">Prototyping the future · Prototipamos el futuro</h1>
      <p className="mt-6 text-base text-foreground-muted">
        The Marsala Lab is our living sandbox to test APIs, AI models, UI frameworks, connectors, and automations before they become modules.
        <span className="mt-1 block text-sm text-foreground">
          El Marsala Lab es nuestro sandbox vivo para probar APIs, modelos de IA, frameworks UI, conectores y automatizaciones antes de convertirlos en módulos.
        </span>
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {labSections.map((section) => (
          <div key={section.title} className="rounded-3xl border border-border bg-white/80 p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">{section.title}</p>
            <p className="mt-3 text-sm text-foreground">{section.en}</p>
            <p className="mt-2 text-xs text-foreground-muted">{section.es}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-3xl border border-border bg-surfaceMuted/70 p-6 text-sm text-foreground">
        <p>
          Some Lab experiments graduate into Marsala OS modules once they deliver sustained impact for multiple clients.
        </p>
        <p className="mt-2 text-foreground-muted">
          Algunas piezas del Lab se gradúan a módulos de Marsala OS cuando demuestran impacto sostenido para múltiples clientes.
        </p>
      </div>
    </main>
  );
}
