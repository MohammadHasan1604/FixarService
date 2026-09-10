"use client";

import React from "react";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import { Phone, Clock, MessageSquare, Globe, MapPin, ChevronDown, Sun, Moon } from "lucide-react";

export default function UtilityBar() {
  const { language, setLanguage, region, setRegion, settings, activeContact, t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-brand-navy text-slate-200 text-xs py-2 px-4 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Location & 24/7 Hours */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Region Switcher */}
          <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer relative group">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span className="font-medium">
              {language === "ar" ? activeContact.countryAr : activeContact.country}
              <span className="opacity-70 mx-1">({language === "ar" ? activeContact.cityAr : activeContact.city})</span>
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />

            {/* Dropdown Menu */}
            <div className="absolute top-full start-0 mt-1.5 w-52 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-1.5 z-50 hidden group-hover:block transition-all animate-fadeIn">
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                {t.common.selectRegion}
              </div>
              {Object.values(settings.supportedRegions).map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setRegion(reg.id)}
                  className={`w-full text-start px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors text-xs ${
                    region === reg.id ? "text-brand-orange font-bold bg-slate-800/50" : "text-slate-300"
                  }`}
                >
                  <span>{language === "ar" ? reg.countryAr : reg.country}</span>
                  <span className="text-[10px] text-slate-400">{language === "ar" ? reg.currencyAr : reg.currency}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 24/7 Operating Hours */}
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === "ar" ? settings.operatingHoursAr : settings.operatingHours}</span>
          </div>
        </div>

        {/* Right: Hotline, WhatsApp, Theme & Language Selector */}
        <div className="flex items-center gap-4 ms-auto">
          {/* Direct Phone */}
          <a
            href={`tel:${activeContact.phone}`}
            className="flex items-center gap-1.5 text-slate-200 hover:text-brand-orange transition-colors"
            title={t.common.callNow}
          >
            <Phone className="w-3.5 h-3.5 text-brand-orange" />
            <bdi className="font-semibold tracking-wide">{activeContact.phoneDisplay}</bdi>
          </a>

          {/* WhatsApp Support Link */}
          <a
            href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}?text=${encodeURIComponent(
              language === "ar"
                ? "مرحباً فيكسار سيرفيس، أود الاستفسار عن خدمة صيانة الأجهزة المنزلية."
                : "Hello Fixar Service, I would like to inquire about home appliance repair."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.common.whatsappUs}</span>
          </a>

          {/* Theme Toggle (☀ / 🌙) */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-slate-500 transition-all flex items-center justify-center"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light Mode" : "Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-amber-400 animate-fadeIn" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-300 animate-fadeIn" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center border border-slate-700 rounded-md overflow-hidden bg-slate-800/80">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 font-medium transition-colors ${
                language === "en" ? "bg-brand-blue text-white" : "text-slate-400 hover:text-white"
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2 py-0.5 font-medium transition-colors ${
                language === "ar" ? "bg-brand-blue text-white" : "text-slate-400 hover:text-white"
              }`}
              aria-label="التبديل إلى العربية"
            >
              عربي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
