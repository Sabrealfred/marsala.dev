'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/modules", label: "Modules" },
  { href: "/cases", label: "Cases" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const listener = () => setIsScrolled(window.scrollY > 4);
    listener();
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-surface/90 shadow-card backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <Link
          href="/"
          className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-foreground"
        >
          Marsala OS
        </Link>
        <nav className="flex items-center gap-6">
          <ul className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted sm:text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-300 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-surface transition-transform duration-300 hover:-translate-y-0.5"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
