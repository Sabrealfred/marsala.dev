"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const currentQuarter = `Q${Math.floor(new Date().getMonth() / 3) + 1}`;
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/modules", label: t("nav.modules") },
    { href: "/research", label: t("nav.research") },
    { href: "/lab", label: t("nav.lab") },
    { href: "/about", label: t("nav.about") },
  ];

  const legalLinks = [
    { href: "/legal/terms", label: t("footer.terms") },
    { href: "/legal/privacy", label: t("footer.privacy") },
    { href: "/legal/ai-usage", label: t("footer.aiUsage") },
    { href: "/legal/sla", label: t("footer.sla") },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="mt-16 border-t border-moss-200 bg-gradient-to-b from-cream-50 to-white">
      {/* Status Dashboard */}
      <div className="border-b border-moss-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-6 md:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-semibold text-moss-950">{t("footer.status")}</p>
                <p className="text-xs text-sage-600">99.97% {t("footer.uptime")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center sm:flex sm:gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sage-600">{t("footer.response")}</p>
                <p className="mt-1 text-lg font-bold text-moss-700">1.2hrs</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sage-600">{t("footer.deployments")} {currentQuarter}</p>
                <p className="mt-1 text-lg font-bold text-moss-700">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 text-sm text-sage-700 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="space-y-3">
            <p className="font-display text-xl font-bold text-moss-950">Marsala</p>
            <p className="text-sage-600">
              <a href="mailto:sales@marsala.dev" className="hover:text-moss-700 transition-colors">
                sales@marsala.dev
              </a>
            </p>
            <p className="text-xs uppercase tracking-wider text-sage-500">
              Intelligent Growth Studio
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-sage-500">
              <span className="flex items-center gap-1">
                <span className="text-moss-600">📍</span> {t("footer.remote")}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="text-moss-600">🔒</span> {t("footer.certified")}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-moss-700">{t("footer.explore")}</p>
              <ul className="grid gap-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="text-sage-600 transition-colors duration-200 hover:text-moss-700"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-moss-700">{t("footer.legal")}</p>
              <ul className="grid gap-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="text-sage-600 transition-colors duration-200 hover:text-moss-700"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-moss-700">{t("footer.connect")}</p>
              <ul className="grid gap-2">
                <li>
                  <a
                    href="https://github.com/Sabrealfred"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage-600 transition-colors duration-200 hover:text-moss-700"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/marsala-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage-600 transition-colors duration-200 hover:text-moss-700"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sage-600 transition-colors duration-200 hover:text-moss-700"
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-moss-200 bg-moss-950 py-4 text-center text-xs text-sage-300">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 sm:flex-row md:px-10">
          <p>© {mounted ? currentYear : '2025'} Marsala.dev</p>
          <p className="text-sage-400">{t("footer.crafted")}</p>
        </div>
      </div>
    </footer>
  );
}
