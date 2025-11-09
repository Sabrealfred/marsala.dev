'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
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
          ? "border-b border-moss-200 bg-white/95 shadow-sm backdrop-blur-xl dark:border-moss-700 dark:bg-moss-900/95"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Marsala" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight text-moss-950 dark:text-moss-100">
            Marsala
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <ul className="hidden items-center gap-8 text-sm font-medium text-sage-600 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-moss-700 dark:text-sage-400 dark:hover:text-moss-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full bg-moss-gradient px-6 py-2.5 text-sm font-semibold text-white shadow-card transition-transform duration-200 hover:scale-105"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
