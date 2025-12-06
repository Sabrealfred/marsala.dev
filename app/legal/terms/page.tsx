import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Marsala OS terms of service covering engagement, deliverables, and responsibilities.",
};

const sections = [
  {
    title: "Engagement",
    en: "Projects are executed under a master services agreement with individual statements of work for each module or phase.",
    es: "Los proyectos se ejecutan bajo un master services agreement con statements of work por módulo o fase.",
  },
  {
    title: "Deliverables",
    en: "Deliverables are defined in each statement of work and considered accepted after a documented sign-off.",
    es: "Los entregables se definen en cada statement y se consideran aceptados tras sign-off documentado.",
  },
  {
    title: "Intellectual Property",
    en: "Upon full payment, deliverables become the client's property unless otherwise specified.",
    es: "Tras el pago completo, los entregables pasan a ser propiedad del cliente salvo lo especificado.",
  },
  {
    title: "Confidentiality",
    en: "Both parties commit to confidentiality over shared assets, data, and roadmaps.",
    es: "Ambas partes mantienen confidencialidad sobre assets, data y roadmaps compartidos.",
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10">
      <h1 className="font-display text-4xl font-semibold text-foreground">Terms of Service · Términos</h1>
      <p className="mt-4 text-sm text-foreground-muted">
        Updated {new Date().getFullYear()}. Please contact sales@marsala.dev for signed copies.
      </p>
      <div className="mt-8 space-y-6">
        {sections.map((section) => (
          <section key={section.title} className="rounded-sm border border-border bg-white/80 p-6 shadow-card">
            <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
            <p className="mt-3 text-sm text-foreground">{section.en}</p>
            <p className="mt-2 text-xs text-foreground-muted">{section.es}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
