import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab",
  description: "Explore the Marsala Lab — experiments, open-source, notes, and roadmap for modular growth systems.",
};

const labSections = [
  {
    title: "Experiments",
    description: "Public prototypes validating ideas fast across AI, design systems, and data ops.",
  },
  {
    title: "Open Source",
    description: "Libraries, templates, and starters we maintain for the community.",
  },
  {
    title: "Papers & Notes",
    description: "Applied learnings packaged as playbooks, memos, and teardown reports.",
  },
  {
    title: "Roadmap",
    description: "The upcoming experiments graduating into production modules.",
  },
];

export default function LabPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24 md:px-10">
      <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">Lab</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-foreground">Prototyping the future</h1>
      <p className="mt-6 max-w-2xl text-base text-foreground-muted">
        The Marsala Lab is our living sandbox to test APIs, AI models, UI frameworks, connectors,
        and automations before they become modules.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {labSections.map((section) => (
          <div key={section.title} className="rounded-3xl border border-border bg-white/80 p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">{section.title}</p>
            <p className="mt-3 text-sm text-foreground">{section.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-surfaceMuted/70 p-6 text-sm text-foreground">
        <p>
          Some Lab experiments graduate into Marsala OS modules once they deliver sustained impact for multiple clients.
        </p>
      </div>
    </main>
  );
}
