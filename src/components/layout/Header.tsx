"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import UtilityBar from "./UtilityBar";
import MobileNav from "./MobileNav";
import {
  Wrench,
  Menu,
  Calendar,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  Lock,
  Flame,
  Droplets,
  Wind,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";

export const serviceMegaMenuCategories = [
  {
    key: "cooling",
    titleEn: "Cooling",
    titleAr: "التبريد والتكييف",
    icon: Wind,
    items: [
      { id: "ac-repair", slug: "ac-repair", en: "AC Repair", ar: "تصليح مكيفات" },
      { id: "refrigerator-repair", slug: "refrigerator-repair", en: "Refrigerator Repair", ar: "تصليح ثلاجات" },
      { id: "deep-freezer-repair", slug: "deep-freezer-repair", en: "Deep Freezer Repair", ar: "تصليح فريزر" },
      { id: "water-cooler-repair", slug: "water-cooler-repair", en: "Water Cooler Repair", ar: "مبردات مياه" },
    ],
  },
  {
    key: "laundry",
    titleEn: "Laundry",
    titleAr: "الغسيل والتنظيف",
    icon: Sparkles,
    items: [
      { id: "washing-machine-repair", slug: "washing-machine-repair", en: "Washing Machine Repair", ar: "تصليح غسالات" },
    ],
  },
  {
    key: "kitchen",
    titleEn: "Kitchen",
    titleAr: "أجهزة المطبخ",
    icon: Flame,
    items: [
      { id: "microwave-repair", slug: "microwave-repair", en: "Microwave/Oven Repair", ar: "ميكروويف وأفران" },
      { id: "kitchen-chimney-repair", slug: "kitchen-chimney-repair", en: "Chimney Repair", ar: "شفاطات مطابخ" },
      { id: "gas-stove-repair", slug: "gas-stove-repair", en: "Gas Stove / Hob Repair", ar: "طباخات وأفران غاز" },
    ],
  },
  {
    key: "water",
    titleEn: "Water",
    titleAr: "أنظمة المياه",
    icon: Droplets,
    items: [
      { id: "water-heater-repair", slug: "water-heater-repair", en: "Water Heater / Geyser", ar: "سخانات مياه" },
      { id: "ro-water-purifier-repair", slug: "ro-water-purifier-repair", en: "RO Water Purifier", ar: "فلاتر وتحلية المياه" },
      { id: "water-dispenser-repair", slug: "water-dispenser-repair", en: "Water Dispenser", ar: "برادات مياه" },
    ],
  },
  {
    key: "other",
    titleEn: "Other",
    titleAr: "خدمات فنية أخرى",
    icon: Layers,
    items: [
      { id: "led-smart-tv-repair", slug: "led-smart-tv-repair", en: "TV Repair", ar: "تصليح شاشات وتلفزيون" },
      { id: "cctv-installation-repair", slug: "cctv-installation-repair", en: "CCTV Systems", ar: "كاميرات المراقبة" },
      { id: "plumbing-services", slug: "plumbing-services", en: "Plumbing Service", ar: "سباكة وصحية" },
      { id: "electrician-services", slug: "electrician-services", en: "Electrical Service", ar: "تمديدات كهربائية" },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const loginDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { t, language } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesDropdownOpen(false);
        setLoginDropdownOpen(false);
        setMoreDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setServicesDropdownOpen(false);
    setLoginDropdownOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  const primaryNavLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services, hasMegaMenu: true },
    { href: "/locations", label: t.nav.locations },
    { href: "/brands", label: t.nav.brands },
    { href: "/about", label: t.nav.about },
    { href: "/reviews", label: t.nav.reviews },
    { href: "/contact", label: t.nav.contact },
    { href: "/track-booking", label: t.common.trackBooking },
  ];

  const secondaryNavLinks = [
    { href: "/blog", label: language === "ar" ? "المدونة والإرشادات" : "Blog & Guides" },
    { href: "/faq", label: t.nav.faq },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* Top Utility Bar */}
        <UtilityBar />

        {/* Main Navigation Bar */}
        <div
          className={`w-full transition-all duration-300 border-b ${
            isScrolled
              ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-2.5 border-slate-200 dark:border-slate-800"
              : "bg-white dark:bg-slate-900 py-3.5 border-slate-100 dark:border-slate-800"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center text-white shadow-md shadow-brand-blue/20 group-hover:scale-105 transition-transform shrink-0">
                <Wrench className="w-5 h-5 text-brand-orange transform -rotate-12 group-hover:rotate-0 transition-transform" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-brand-navy dark:text-white">FIXAR</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">SERVICE</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                  {language === "ar" ? "خبراء صيانة الأجهزة" : "Appliance Repair Experts"}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3 shrink-0">
              {primaryNavLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                if (link.hasMegaMenu) {
                  return (
                    <div
                      key={link.href}
                      ref={servicesDropdownRef}
                      className="relative shrink-0"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesDropdownOpen((prev) => !prev)}
                        aria-expanded={servicesDropdownOpen}
                        className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                          isActive || servicesDropdownOpen
                            ? "text-brand-blue bg-blue-50/70 dark:bg-blue-950/40"
                            : "text-slate-700 dark:text-slate-200 hover:text-brand-blue dark:hover:text-brand-blue hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <span className="whitespace-nowrap">{link.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesDropdownOpen ? "rotate-180 text-brand-blue" : "text-slate-400"
                          }`}
                        />
                      </button>

                      {/* Mega-Dropdown Menu */}
                      {servicesDropdownOpen && (
                        <div
                          className="absolute top-full start-0 mt-1 w-[740px] max-w-[90vw] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-5 z-50 animate-fadeIn"
                          role="menu"
                        >
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                                <Wrench className="w-3.5 h-3.5 text-brand-orange" />
                              </div>
                              <span className="text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider">
                                {language === "ar" ? "خدمات الصيانة المعتمدة" : "Verified Appliance Services"}
                              </span>
                            </div>
                            <Link
                              href="/services"
                              onClick={() => setServicesDropdownOpen(false)}
                              className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 whitespace-nowrap"
                            >
                              <span>{t.common.viewAllServices}</span>
                              <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-5 gap-3 text-xs">
                            {serviceMegaMenuCategories.map((cat) => {
                              const CatIcon = cat.icon;
                              return (
                                <div key={cat.key} className="space-y-2">
                                  <div className="flex items-center gap-1.5 pb-1 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white text-[11px] whitespace-nowrap">
                                    <CatIcon className="w-3 h-3 text-brand-blue shrink-0" />
                                    <span>{language === "ar" ? cat.titleAr : cat.titleEn}</span>
                                  </div>
                                  <ul className="space-y-1">
                                    {cat.items.map((item) => (
                                      <li key={item.id}>
                                        <Link
                                          href={`/services/${item.slug}`}
                                          onClick={() => setServicesDropdownOpen(false)}
                                          className="block px-1.5 py-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-brand-blue font-medium transition-colors text-[11px] whitespace-nowrap"
                                        >
                                          {language === "ar" ? item.ar : item.en}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? "text-brand-blue bg-blue-50/70 dark:bg-blue-950/40 font-bold"
                        : "text-slate-700 dark:text-slate-200 hover:text-brand-blue dark:hover:text-brand-blue hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="whitespace-nowrap">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action CTAs: Login Dropdown + Book Service */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              {/* Login Dropdown (Staff / Admin) */}
              <div
                ref={loginDropdownRef}
                className="relative"
                onMouseEnter={() => setLoginDropdownOpen(true)}
                onMouseLeave={() => setLoginDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setLoginDropdownOpen((prev) => !prev)}
                  aria-expanded={loginDropdownOpen}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-brand-navy hover:bg-slate-100 transition-colors border border-slate-200/80 shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{language === "ar" ? "تسجيل الدخول" : "Login"}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      loginDropdownOpen ? "rotate-180 text-brand-blue" : "text-slate-400"
                    }`}
                  />
                </button>

                {loginDropdownOpen && (
                  <div
                    className="absolute top-full end-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn"
                    role="menu"
                  >
                    <Link
                      href="/login?role=staff"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <div className="flex flex-col text-start">
                        <span>{language === "ar" ? "دخول الفنيين والموظفين" : "Staff Portal"}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {language === "ar" ? "متابعة وتحديث الطلبات" : "Manage assigned jobs"}
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/login?role=admin"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-brand-blue transition-colors border-t border-slate-100 mt-1"
                    >
                      <Lock className="w-4 h-4 text-brand-navy" />
                      <div className="flex flex-col text-start">
                        <span>{language === "ar" ? "لوحة تحكم الإدارة" : "Admin Console"}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {language === "ar" ? "إدارة كاملة للنظام" : "Full business control"}
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Book a Service CTA */}
              <Link
                href="/book-service"
                className="inline-flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-xl bg-brand-orange text-white font-bold text-xs xl:text-sm whitespace-nowrap shrink-0 shadow-md shadow-brand-orange/25 hover:bg-brand-orange-hover hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{t.common.bookService}</span>
              </Link>
            </div>

            {/* Mobile Menu Trigger & Quick Book */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/book-service"
                className="px-3 py-1.5 rounded-lg bg-brand-orange text-white font-bold text-xs shadow-sm flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.common.bookService}</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
