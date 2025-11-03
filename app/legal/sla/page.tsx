import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support SLA",
  description: "Marsala OS support service-level agreements for retainers and ongoing operations.",
};

const tiers = [
  {
    name: "Operate Retainer",
    en: "Response within 4 business hours, resolution targets agreed per module.",
    es: "Respuesta en 4 horas hábiles, resolución según módulo acordado.",
  },
  {
    name: "Launch / Scale Projects",
    en: "Response within 24 hours during active sprints.",
    es: "Respuesta dentro de 24 horas durante sprints activos.",
  },
  {
    name: "Critical Incidents",
    en: "24/7 alerts via agreed channel with escalation to engineering leaders.",
    es: "Alertas 24/7 vía canal acordado con escalamiento a engineering leads.",
  },
];

export default function SLAPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10">
      <h1 className="font-display text-4xl font-semibold text-foreground">Support SLA · SLA de soporte</h1>
      <div className="mt-8 grid gap-6">
        {tiers.map((tier) => (
          <section key={tier.name} className="rounded-3xl border border-border bg-white/80 p-6 shadow-card">
            <h2 className="text-base font-semibold text-foreground">{tier.name}</h2>
            <p className="mt-3 text-sm text-foreground">{tier.en}</p>
            <p className="mt-2 text-xs text-foreground-muted">{tier.es}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
