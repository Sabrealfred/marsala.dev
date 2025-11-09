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
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-moss-300 bg-white text-lg transition-all duration-300 hover:border-moss-500 hover:shadow-lg dark:border-moss-600 dark:bg-moss-900"
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
            className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-2xl border-2 border-moss-300 bg-white shadow-2xl dark:border-moss-600 dark:bg-moss-900"
          >
            <div className="bg-moss-gradient p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">
                Select Language
              </p>
            </div>

            <div className="p-2">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                    locale === loc
                      ? "bg-moss-gradient text-white shadow-lg"
                      : "text-moss-900 hover:bg-moss-50 dark:text-moss-100 dark:hover:bg-moss-800"
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
