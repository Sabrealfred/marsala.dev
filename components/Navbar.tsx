'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/modules", label: "Modules" },
  { href: "/research", label: "Research" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
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
          ? "border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-light uppercase tracking-[0.32em] text-gray-900"
        >
          Marsala OS
        </Link>
        <nav className="flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm text-gray-600">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-gray-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="rounded-full bg-gray-900 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-gray-800"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
