'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

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
          ? "border-b border-marsala-200 bg-white/95 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Marsala" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight text-black">
            Marsala
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 text-sm font-medium text-marsala-600 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-black"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
