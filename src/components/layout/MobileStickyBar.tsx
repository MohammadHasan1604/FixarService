"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleContext";
import { Phone, MessageSquare, Calendar } from "lucide-react";

export default function MobileStickyBar() {
  const pathname = usePathname();
  const { t, activeContact, language } = useLocale();

  // Intelligently hide on operational/admin and auth routes
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/staff") ||
    pathname?.startsWith("/login")
  ) {
    return null;
  }

  const prefilledWhatsappMsg = encodeURIComponent(
    language === "ar"
      ? `مرحباً فيكسار سيرفيس، أود حجز موعد صيانة للأجهزة المنزلية في ${activeContact.cityAr}.`
      : `Hello Fixar Service, I would like to book an appliance repair service in ${activeContact.city}.`
  );

  return (
    <aside
      aria-label="Mobile Quick Action Bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] print:hidden"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Action */}
        <a
          href={`tel:${activeContact.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors active:scale-95 touch-manipulation"
          aria-label={t.common.callNow}
        >
          <Phone className="w-4 h-4 text-brand-blue mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight leading-none">{t.common.callNow}</span>
        </a>

        {/* WhatsApp Action */}
        <a
          href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}?text=${prefilledWhatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors active:scale-95 touch-manipulation"
          aria-label={t.common.whatsappUs}
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight leading-none">{t.common.whatsappUs}</span>
        </a>

        {/* Book Service Action */}
        <Link
          href="/book-service"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white shadow-md shadow-brand-orange/20 transition-all active:scale-95 touch-manipulation"
          aria-label={t.common.bookService}
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight leading-none">{t.common.bookService}</span>
        </Link>
      </div>
    </aside>
  );
}
