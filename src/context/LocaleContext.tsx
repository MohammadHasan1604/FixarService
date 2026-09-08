"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { translations, Language } from "@/i18n/translations";
import { initialBusinessSettings, BusinessSettingsType, RegionalContact } from "@/data/businessSettings";

interface LocaleContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  region: string;
  setRegion: (regionId: string) => void;
  dir: "ltr" | "rtl";
  t: typeof translations.en;
  settings: BusinessSettingsType;
  activeContact: RegionalContact;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [region, setRegionState] = useState<string>("uae");
  const [settings, setSettings] = useState<BusinessSettingsType>(initialBusinessSettings);

  useEffect(() => {
    // Load persisted preferences
    try {
      const savedLang = localStorage.getItem("fixar_lang") as Language;
      if (savedLang && (savedLang === "en" || savedLang === "ar")) {
        setLanguageState(savedLang);
      }
      const savedRegion = localStorage.getItem("fixar_region");
      if (savedRegion && initialBusinessSettings.supportedRegions[savedRegion]) {
        setRegionState(savedRegion);
      }
    } catch {
      // Ignore local storage errors
    }

    // Fetch latest live settings if available
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.supportedRegions) {
          setSettings(data);
        }
      })
      .catch(() => {});
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("fixar_lang", lang);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  };

  const setRegion = (regId: string) => {
    if (settings.supportedRegions[regId]) {
      setRegionState(regId);
      try {
        localStorage.setItem("fixar_region", regId);
      } catch {}
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [language]);

  const dir = language === "ar" ? "rtl" : "ltr";
  const t = translations[language];

  const activeContact = useMemo(() => {
    return settings.supportedRegions[region] || settings.supportedRegions["uae"];
  }, [settings, region]);

  return (
    <LocaleContext.Provider
      value={{
        language,
        setLanguage,
        region,
        setRegion,
        dir,
        t,
        settings,
        activeContact,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
