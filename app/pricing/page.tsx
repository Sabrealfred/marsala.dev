import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent Marsala OS pricing with launch, scale, and operate packages for modular growth systems.",
};

const packages = [
  {
    name: "Launch",
    duration: "3–4 weeks",
    price: "From €6,900",
    en: "Marketing website (5–7 sections) + brand kit + baseline tracking.",
    es: "Website marketing (5–7 secciones) + brand kit + tracking base.",
  },
  {
    name: "Scale",
    duration: "6–8 weeks",
    price: "From €18,000",
    en: "Web OS + CRM OS + Ads OS + Data OS rollout.",
    es: "Web OS + CRM OS + Ads OS + Data OS.",
  },
  {
    name: "Operate",
    duration: "Monthly retainer",
    price: "From €3,500 / month",
    en: "Growth + automation with SLOs and quarterly roadmap.",
    es: "Growth + automation con SLOs y roadmap trimestral.",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 pb-24 pt-24 md:px-10">
      <h1 className="font-display text-4xl font-semibold text-foreground">Pricing · Precios</h1>
      <p className="mt-4 text-base text-foreground-muted">
        Transparent packages and retainers designed around outcomes — no unnecessary lock-ins.
        <span className="mt-1 block text-sm text-foreground">
          Precios transparentes en paquetes y retainers orientados a resultados, sin ataduras innecesarias.
        </span>
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg.name} className="rounded-3xl border border-border bg-white/80 p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-foreground/60">{pkg.name}</p>
            <p className="mt-2 text-sm text-foreground-muted">{pkg.duration}</p>
            <p className="mt-6 text-lg font-semibold text-foreground">{pkg.price}</p>
            <p className="mt-4 text-sm text-foreground">{pkg.en}</p>
            <p className="mt-2 text-xs text-foreground-muted">{pkg.es}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-3xl border border-border bg-surfaceMuted/70 p-6 text-sm text-foreground">
        <p>
          Final budgets are confirmed after a collaborative assessment to understand scope, integrations, and compliance needs.
        </p>
        <p className="mt-2 text-foreground-muted">
          Los presupuestos finales se confirman tras un Assessment colaborativo para entender alcance, integraciones y compliance.
        </p>
      </div>
    </main>
  );
}
