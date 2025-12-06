"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-slate-300 bg-white text-lg transition-all duration-300 hover:border-slate-400 hover:shadow-lg dark:border-slate-700 dark:bg-navy-950"
        aria-label="Change language"
      >
        {localeFlags[locale]}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-sm border-2 border-slate-300 bg-white shadow-2xl dark:border-slate-700 dark:bg-navy-950"
          >
            <div className="bg-gradient-to-r from-[#051c2c] to-[#0a2d42] p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">
                Select Language
              </p>
            </div>

            <div className="p-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left transition-all duration-200 ${
                    locale === loc
                      ? "bg-gradient-to-r from-[#051c2c] to-[#0a2d42] text-white shadow-lg"
                      : "text-[#051c2c] hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="text-xl">{localeFlags[loc]}</span>
                  <span className="text-sm font-semibold">{localeNames[loc]}</span>
                  {locale === loc && (
                    <span className="ml-auto text-white">✓</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
