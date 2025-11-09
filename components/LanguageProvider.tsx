"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type Locale, getTranslation, locales } from "@/lib/i18n";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const supportedLocales: Locale[] = locales;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first
    const stored = localStorage.getItem("locale");

    if (stored && supportedLocales.includes(stored as Locale)) {
      setLocaleState(stored as Locale);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (supportedLocales.includes(browserLang as Locale)) {
        setLocaleState(browserLang as Locale);
      } else {
        setLocaleState("en"); // Default to English
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (mounted) {
      localStorage.setItem("locale", newLocale);
    }
  };

  const t = (key: string) => getTranslation(locale, key as any);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
