import Link from "next/link";

const footerLinks = [
  { href: "/modules", label: "Modules" },
  { href: "/research", label: "Research" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];

const legalLinks = [
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/ai-usage", label: "AI Usage" },
  { href: "/legal/sla", label: "Support SLA" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-moss-200 bg-cream-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-sage-700 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="space-y-2">
          <p className="font-display text-lg font-semibold text-moss-950">Marsala</p>
          <p className="text-sage-600">
            sales@marsala.dev
          </p>
          <p className="text-xs uppercase tracking-wider text-sage-500">
            Intelligent Growth Studio
          </p>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-moss-700">Explore</p>
            <ul className="mt-2 grid gap-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-sage-600 transition-colors duration-200 hover:text-moss-700" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-moss-700">Legal</p>
            <ul className="mt-2 grid gap-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-sage-600 transition-colors duration-200 hover:text-moss-700" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-moss-200 bg-white py-4 text-center text-xs text-sage-600">
        © {new Date().getFullYear()} Marsala.dev · Crafted with modular intelligence.
      </div>
    </footer>
  );
}
