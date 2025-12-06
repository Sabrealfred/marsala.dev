import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Marsala OS privacy policy covering data usage, storage, and user rights.",
};

const sections = [
  {
    title: "Data Collection",
    en: "We collect contact information, project context, and analytics to improve services.",
    es: "Recopilamos información de contacto, contexto de proyectos y analíticas para mejorar nuestros servicios.",
  },
  {
    title: "Usage",
    en: "Data is used to deliver proposals, manage projects, and provide support.",
    es: "Los datos se utilizan para preparar propuestas, gestionar proyectos y brindar soporte.",
  },
  {
    title: "Storage",
    en: "Data is stored in encrypted systems with role-based access and regular audits.",
    es: "Los datos se almacenan en sistemas encriptados con accesos basados en roles y auditorías regulares.",
  },
  {
    title: "Rights",
    en: "You may request access, corrections, or deletion via privacy@marsala.dev.",
    es: "Puedes solicitar acceso, correcciones o eliminación en privacy@marsala.dev.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10">
      <h1 className="font-display text-4xl font-semibold text-foreground">Privacy Policy · Privacidad</h1>
      <p className="mt-4 text-sm text-foreground-muted">Updated {new Date().toLocaleDateString()}.</p>
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
