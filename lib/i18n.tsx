"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "es" | "en";

export type Localized = { es: string; en: string };

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (value?: Localized) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("locale") as Locale | null;
    if (stored === "es" || stored === "en") setLocaleState(stored);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem("locale", l);
      document.documentElement.lang = l;
    } catch {}
  };

  const t = (value?: Localized) => (value ? value[locale] : "");

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
