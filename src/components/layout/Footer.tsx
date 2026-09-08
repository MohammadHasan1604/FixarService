"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Wrench, Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, ChevronRight } from "lucide-react";
import { servicesList } from "@/data/servicesData";

export default function Footer() {
  const { t, language, settings, activeContact } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info & Primary Location */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-md">
                <Wrench className="w-5 h-5 text-brand-orange -rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight">FIXAR SERVICE</span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                  {language === "ar" ? "خبراء صيانة الأجهزة المنزلية" : "Home Appliance Repair Specialists"}
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.aboutText}
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>
                  {language === "ar" ? settings.primaryLocationAr : settings.primaryLocation}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === "ar" ? settings.operatingHoursAr : settings.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Popular Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-orange rounded-full inline-block" />
              {t.footer.popularServices}
            </h3>
            <ul className="space-y-2 text-xs">
              {servicesList.slice(0, 8).map((srv) => (
                <li key={srv.slug}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-transform" />
                    <span>{language === "ar" ? srv.titleAr : srv.titleEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Areas & Coverage */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-blue rounded-full inline-block" />
              {t.footer.serviceLocations}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/locations" className="text-brand-orange hover:underline font-semibold block mb-1">
                  {language === "ar" ? "عرض كافة المناطق والتغطية" : "View All Locations & Coverage"} →
                </Link>
              </li>
              <li>
                <span className="font-semibold text-slate-200">
                  {language === "ar" ? "الإمارات العربية المتحدة:" : "United Arab Emirates:"}
                </span>{" "}
                <span className="text-slate-400">
                  {language === "ar" ? "الشارقة، دبي، عجمان، مويلح، النهدة" : "Sharjah, Dubai, Ajman, Muwaileh, Al Nahda"}
                </span>
              </li>
              <li className="pt-1">
                <span className="font-semibold text-slate-200">
                  {language === "ar" ? "سلطنة عُمان:" : "Oman:"}
                </span>{" "}
                <span className="text-slate-400">
                  {language === "ar" ? "مسقط، السيب، بوشر، الخوير" : "Muscat, Seeb, Bawshar, Al Khuwair"}
                </span>
              </li>
              <li className="pt-1">
                <span className="font-semibold text-slate-200">
                  {language === "ar" ? "المملكة العربية السعودية:" : "Saudi Arabia:"}
                </span>{" "}
                <span className="text-slate-400">
                  {language === "ar" ? "الرياض، العليا، الملز، النخيل" : "Riyadh, Olaya, Al Malaz, Al Nakheel"}
                </span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-slate-800">
              <Link
                href="/track-booking"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue-light hover:text-white transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t.common.trackBooking}</span>
              </Link>
            </div>
          </div>

          {/* Col 4: Hotline & Quick Contact Desk */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-400 rounded-full inline-block" />
              {t.footer.contactInfo}
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              {language === "ar"
                ? "اتصل بخط الصيانة الساخن أو تواصل مع مشرف التنسيق عبر واتساب للحصول على موعد فوري."
                : "Call our emergency hotline or connect with our dispatch team on WhatsApp for fast scheduling."}
            </p>

            <div className="space-y-2.5">
              <a
                href={`tel:${activeContact.phone}`}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white transition-colors border border-slate-700/60"
              >
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    {language === "ar" ? "الخط الساخن المباشر" : "Direct Hotline"}
                  </span>
                  <bdi className="text-xs font-bold tracking-wide">{activeContact.phoneDisplay}</bdi>
                </div>
              </a>

              <a
                href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 transition-colors border border-emerald-800/50"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-emerald-400/80 uppercase font-semibold">
                    {language === "ar" ? "واتساب رسمي" : "Official WhatsApp"}
                  </span>
                  <bdi className="text-xs font-bold tracking-wide">{activeContact.whatsappDisplay}</bdi>
                </div>
              </a>

              <div className="pt-2">
                <Link
                  href="/book-service"
                  className="w-full py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold text-center block transition-colors shadow-md"
                >
                  {t.common.bookService}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="py-6 border-b border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">
              {language === "ar" ? "تنويه قانوني هام:" : "Independent Service Disclaimer:"}
            </strong>{" "}
            {language === "ar" ? settings.disclaimerAr : settings.disclaimerEn}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} {settings.companyName}. {t.footer.copyright}
          </div>

          <div className="flex items-center gap-3.5 flex-wrap">
            <Link href="/terms" className="hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <span>•</span>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              {language === "ar" ? "سياسة ملفات تعريف الارتباط" : "Cookie Policy"}
            </Link>
            <span>•</span>
            <Link href="/login?role=staff" className="text-slate-400 hover:text-white transition-colors">
              {language === "ar" ? "بوابة الموظفين" : "Staff Portal"}
            </Link>
            <span>•</span>
            <Link href="/login?role=admin" className="text-slate-500 hover:text-slate-300 transition-colors">
              {language === "ar" ? "لوحة الإدارة" : "Admin Console"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
