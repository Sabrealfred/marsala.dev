"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const currentQuarter = `Q${Math.floor(new Date().getMonth() / 3) + 1}`;
  const currentYear = new Date().getFullYear();

  // Newsletter form state
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Thank you for subscribing!" });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to subscribe. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="mt-20 bg-[#051c2c] text-white dark:bg-slate-900 dark:text-white">
      {/* Status Dashboard - McKinsey Clean Design */}
      <div className="border-b border-white/20 dark:border-slate-700">
        <div className="mx-auto w-full max-w-7xl px-8 py-8 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Status Indicator - Simplified */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/20 bg-white/5 dark:border-slate-700 dark:bg-slate-800">
                <div className="h-3 w-3 rounded-sm bg-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white dark:text-white">
                  {t("footer.status")}
                </p>
                <p className="mt-0.5 text-xs text-white/70 dark:text-white/70">
                  99.97% {t("footer.uptime")}
                </p>
              </div>
            </div>

            {/* Quick Stats - Clean Numbers */}
            <div className="grid grid-cols-2 gap-8 lg:flex lg:gap-12">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60 dark:text-white/60">
                  {t("footer.response")}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-white dark:text-white">
                  1.2hrs
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60 dark:text-white/60">
                  {t("footer.deployments")} {currentQuarter}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-white dark:text-white">
                  12
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/60 dark:text-white/60">
                  API Latency
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-white dark:text-white">
                  45ms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto w-full max-w-7xl px-8 py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Company Info & Newsletter - Left Column */}
          <div className="space-y-6 lg:col-span-4">
            <div>
              <h3 className="font-heading text-2xl font-bold tracking-tight text-white dark:text-white">
                Marsala
              </h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/50 dark:text-white/50">
                Intelligent Growth Studio
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:sales@marsala.dev"
                className="inline-block font-medium text-white/80 transition-colors hover:text-white hover:underline dark:text-white/80 dark:hover:text-white"
              >
                sales@marsala.dev
              </a>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-white/70 dark:text-white/70">
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/5 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {t("footer.remote")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/5 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                {t("footer.certified")}
              </span>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-4 border-t border-white/20 pt-6 dark:border-slate-700">
              <div>
                <h4 className="text-sm font-bold tracking-tight text-white dark:text-white">
                  Stay Updated
                </h4>
                <p className="mt-1 text-xs text-white/70 dark:text-white/70">
                  Get insights on intelligent growth and product development.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                    className="flex-1 rounded-sm border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 transition-colors focus:border-white/40 focus:bg-white/10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-white/40 dark:focus:border-slate-600 dark:focus:bg-slate-700"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-sm border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-600"
                  >
                    {isSubmitting ? (
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>

                {message && (
                  <p
                    className={`text-xs font-medium ${
                      message.type === "success"
                        ? "text-emerald-400 dark:text-emerald-400"
                        : "text-red-400 dark:text-red-400"
                    }`}
                  >
                    {message.text}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Navigation Links - Right Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:gap-12">
            {/* Explore */}
            <div>
              <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white dark:text-white">
                {t("footer.explore")}
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="text-sm font-medium text-white/70 transition-colors hover:text-white hover:underline dark:text-white/70 dark:hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white dark:text-white">
                {t("footer.legal")}
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="text-sm font-medium text-white/70 transition-colors hover:text-white hover:underline dark:text-white/70 dark:hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white dark:text-white">
                {t("footer.connect")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/Sabrealfred"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white/70 transition-colors hover:text-white hover:underline dark:text-white/70 dark:hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-white/70 transition-colors hover:text-white hover:underline dark:text-white/70 dark:hover:text-white"
                  >
                    {t("nav.contact")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Clean Styling */}
      <div className="border-t border-white/20 dark:border-slate-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-8 py-6 sm:flex-row lg:px-12">
          <p className="text-xs font-medium text-white/60 dark:text-white/60">
            © {mounted ? currentYear : '2025'} Marsala.dev. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs font-medium text-white/60 dark:text-white/60">
            <span className="inline-block h-1.5 w-1.5 rounded-sm bg-white/50 dark:bg-white/50" />
            {t("footer.crafted")}
          </p>
        </div>
      </div>
    </footer>
  );
}
