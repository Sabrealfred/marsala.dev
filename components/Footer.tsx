import Link from "next/link";

const footerLinks = [
  { href: "/#modules", label: "Modules" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#cases", label: "Cases" },
  { href: "/lab", label: "Lab" },
  { href: "/links", label: "Links" },
];

const legalLinks = [
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/ai-usage", label: "AI Usage" },
  { href: "/legal/sla", label: "Support SLA" },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-white/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-foreground-muted md:flex-row md:items-center md:justify-between md:px-10">
        <div className="space-y-2">
          <p className="font-display text-lg font-semibold text-foreground">Marsala OS</p>
          <p>
            sales@marsala.dev · 221 River St., 9th Floor, Hoboken, NJ 07030, USA
          </p>
          <p className="text-xs uppercase tracking-[0.32em] text-foreground/60">
            Intelligent Growth Studio · Estudio de Crecimiento Inteligente
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Explore</p>
            <ul className="mt-2 grid gap-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors duration-200 hover:text-foreground" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/60">Legal</p>
            <ul className="mt-2 grid gap-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors duration-200 hover:text-foreground" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border bg-white/80 py-4 text-center text-xs text-foreground-muted">
        © {new Date().getFullYear()} Marsala.dev · Crafted with modular intelligence.
      </div>
    </footer>
  );
}
