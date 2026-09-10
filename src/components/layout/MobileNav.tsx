"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";
import {
  X,
  Wrench,
  Phone,
  MessageSquare,
  Calendar,
  ShieldCheck,
  MapPin,
  Globe,
  ChevronDown,
  UserCheck,
  Lock,
  ArrowRight,
  Sun,
  Moon,
} from "lucide-react";
import { serviceMegaMenuCategories } from "./Header";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { t, language, setLanguage, activeContact, region, setRegion, settings } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const [servicesExpanded, setServicesExpanded] = useState(false);

  if (!isOpen) return null;

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/locations", label: t.nav.locations },
    { href: "/brands", label: t.nav.brands },
    { href: "/about", label: t.nav.about },
    { href: "/reviews", label: t.nav.reviews },
    { href: "/blog", label: language === "ar" ? "المدونة والإرشادات" : "Blog & Guides" },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
    { href: "/track-booking", label: t.common.trackBooking, highlight: true },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`relative w-[85%] max-w-sm bg-white dark:bg-slate-900 dark:text-slate-100 h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-fadeIn ${
          language === "ar" ? "ms-auto" : "me-auto"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/80 sticky top-0 z-20">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center text-white">
              <Wrench className="w-4 h-4 text-brand-orange" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm text-brand-navy dark:text-white leading-none">FIXAR SERVICE</span>
              <span className="text-[9px] text-brand-orange font-bold uppercase tracking-wider">
                {language === "ar" ? "خدمات الصيانة" : "Repair Specialists"}
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-500" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Region & Language Selector */}
        <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              {t.common.selectRegion}
            </span>
            <div className="flex gap-1">
              {Object.values(settings.supportedRegions).map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setRegion(reg.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    region === reg.id
                      ? "bg-brand-orange text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {reg.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1 font-semibold text-[11px]">
              <Globe className="w-3.5 h-3.5 text-brand-blue" />
              Language / اللغة
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  language === "en" ? "bg-brand-blue text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  language === "ar" ? "bg-brand-blue text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                عربي
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links + Accordion */}
        <nav className="flex-1 px-3 py-3 space-y-1">
          {/* Home Link */}
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              pathname === "/" ? "bg-blue-50 text-brand-blue" : "text-slate-800 hover:bg-slate-50"
            }`}
          >
            <span>{t.nav.home}</span>
          </Link>

          {/* Services Accordion */}
          <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/50">
            <button
              type="button"
              onClick={() => setServicesExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-brand-orange" />
                <span>{t.nav.services}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  servicesExpanded ? "rotate-180 text-brand-blue" : ""
                }`}
              />
            </button>

            {servicesExpanded && (
              <div className="px-3 pb-3 pt-1 border-t border-slate-100 bg-white space-y-3">
                {serviceMegaMenuCategories.map((cat) => (
                  <div key={cat.key} className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {language === "ar" ? cat.titleAr : cat.titleEn}
                    </span>
                    <div className="grid grid-cols-1 gap-1">
                      {cat.items.map((item) => (
                        <Link
                          key={item.id}
                          href={`/services/${item.slug}`}
                          onClick={onClose}
                          className="px-2 py-1 rounded text-xs text-slate-700 hover:text-brand-blue hover:bg-blue-50/70 font-medium block"
                        >
                          {language === "ar" ? item.ar : item.en}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href="/services"
                    onClick={onClose}
                    className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
                  >
                    <span>{t.common.viewAllServices}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Standard Page Links */}
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-blue-50 text-brand-blue"
                    : link.highlight
                    ? "bg-emerald-50/60 text-emerald-800 hover:bg-emerald-50"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                <span>{link.label}</span>
                {link.href === "/track-booking" && (
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                )}
              </Link>
            );
          })}

          {/* Staff & Admin Login Links */}
          <div className="pt-3 pb-1 border-t border-slate-200 mt-3 space-y-1">
            <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === "ar" ? "بوابات الدخول" : "Portals & Login"}
            </span>
            <Link
              href="/login?role=staff"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
            >
              <span className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === "ar" ? "دخول الفنيين (Staff Login)" : "Staff Login"}</span>
              </span>
            </Link>
            <Link
              href="/login?role=admin"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-brand-navy" />
                <span>{language === "ar" ? "لوحة تحكم الإدارة (Admin Login)" : "Admin Login"}</span>
              </span>
            </Link>
          </div>
        </nav>

        {/* Direct Action Contacts */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 space-y-2 sticky bottom-0 z-20">
          <Link
            href="/book-service"
            onClick={onClose}
            className="w-full py-2.5 px-3 rounded-xl bg-brand-orange text-white font-bold text-center text-xs shadow-md flex items-center justify-center gap-2 hover:bg-brand-orange-hover"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.common.bookService}</span>
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${activeContact.phone}`}
              className="py-2 px-2 rounded-xl bg-white border border-slate-200 text-brand-navy font-bold text-center text-[11px] shadow-xs flex items-center justify-center gap-1.5 hover:bg-slate-100"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>{t.common.callNow}</span>
            </a>

            <a
              href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-2 rounded-xl bg-emerald-600 text-white font-bold text-center text-[11px] shadow-xs flex items-center justify-center gap-1.5 hover:bg-emerald-700"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.common.whatsappUs}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
