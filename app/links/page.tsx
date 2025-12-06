import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Links",
  description: "Quick links to Marsala OS modules, resources, and social channels.",
};

const linkGroups = [
  {
    title: "Marsala OS",
    links: [
      { label: "Home · Inicio", href: "/" },
      { label: "Modules · Módulos", href: "/#modules" },
      { label: "Case Studies · Casos", href: "/#cases" },
      { label: "Pricing · Precios", href: "/pricing" },
      { label: "Lab · Sandbox", href: "/lab" },
      { label: "Contact · Contacto", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Book a Call · Agenda", href: "https://cal.com/marsala/os" },
      { label: "Join Waitlist · Lista de espera", href: "https://marsala.dev/waitlist" },
      { label: "Email · Correo", href: "mailto:sales@marsala.dev" },
      {
        label: "Directions · Dirección",
        href: "https://maps.app.goo.gl/?q=221+River+St+Hoboken+NJ+07030",
      },
    ],
  },
];

export default function LinksPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-24 md:px-10">
      <h1 className="font-heading text-4xl font-semibold text-foreground">Quick Links · Linktree</h1>
      <p className="mt-4 text-base text-foreground-muted">
        Everything Marsala OS in one place — choose the path you need.
        <span className="mt-1 block text-sm text-foreground">
          Todo Marsala OS en un solo lugar — elige el camino que necesitas.
        </span>
      </p>
      <div className="mt-10 space-y-6">
        {linkGroups.map((group) => (
          <section key={group.title} className="rounded-sm border border-border bg-white/80 p-6 shadow-card">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">{group.title}</h2>
            <div className="mt-4 grid gap-3">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center justify-between rounded-sm border border-border px-5 py-3 text-sm font-semibold text-foreground shadow-card transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  {link.label}
                  <span aria-hidden>↗</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
