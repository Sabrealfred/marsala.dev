'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "./LanguageProvider";

const links = [
  { href: "/modules", labelKey: "nav.modules" },
  { href: "/research", labelKey: "nav.research" },
  { href: "/lab", labelKey: "nav.lab" },
  { href: "/about", labelKey: "nav.about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const listener = () => setIsScrolled(window.scrollY > 10);
    listener();
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ease-out ${
          isScrolled
            ? "border-b border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
            : "border-b border-transparent bg-white dark:bg-slate-900"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group relative z-10 flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
          >
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Marsala"
                width={36}
                height={36}
                className="h-9 w-9"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#051c2c] dark:text-white">
              Marsala
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 md:flex">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onMouseEnter={() => setActiveLink(link.href)}
                    onMouseLeave={() => setActiveLink("")}
                    className="group relative px-1 py-2 text-sm font-medium text-[#051c2c] transition-colors duration-200 hover:text-[#051c2c]/70 dark:text-white dark:hover:text-white/70"
                  >
                    {t(link.labelKey)}
                    {/* Animated underline - McKinsey style */}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#051c2c] transition-transform duration-200 ease-out group-hover:scale-x-100 dark:bg-white ${
                        activeLink === link.href ? "scale-x-100" : ""
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <ThemeToggle />

              {/* CTA Button - McKinsey style */}
              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-sm border border-[#051c2c] bg-[#051c2c] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0a2d42] dark:border-white dark:bg-white dark:text-[#051c2c] dark:hover:bg-slate-200"
              >
                {t("nav.contact")}
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm border border-slate-200 bg-white p-2 transition-all duration-200 hover:border-[#051c2c] hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block h-0.5 w-5 bg-[#051c2c] transition-all duration-200 dark:bg-white ${
                  isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#051c2c] transition-all duration-200 dark:bg-white ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-[#051c2c] transition-all duration-200 dark:bg-white ${
                  isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - McKinsey style */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#051c2c]/40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-40 h-full w-[85%] max-w-sm overflow-y-auto rounded-sm border-l border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900 md:hidden"
            >
              <div className="flex min-h-full flex-col p-6 pt-24">
                {/* Mobile Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-center justify-between rounded-sm border-b border-slate-200 px-4 py-4 text-base font-semibold text-[#051c2c] transition-colors duration-200 hover:bg-slate-50 hover:text-[#051c2c]/70 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 dark:hover:text-white/70"
                      >
                        {t(link.labelKey)}
                        <svg
                          className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.2 }}
                  className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center justify-center gap-2 rounded-sm border border-[#051c2c] bg-[#051c2c] px-6 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#0a2d42] dark:border-white dark:bg-white dark:text-[#051c2c] dark:hover:bg-slate-200"
                  >
                    {t("nav.contact")}
                    <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>

                {/* Mobile Footer Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400"
                >
                  <p>Building the future of consulting</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
