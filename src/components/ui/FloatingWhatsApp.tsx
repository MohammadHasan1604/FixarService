"use client";

import React from "react";
import { useLocale } from "@/context/LocaleContext";
import { MessageSquare } from "lucide-react";

export default function FloatingWhatsApp() {
  const { activeContact, language } = useLocale();

  const msg = encodeURIComponent(
    language === "ar"
      ? "مرحباً فيكسار سيرفيس، أود حجز فحص وصيانة لجهازي المنزلي."
      : "Hello Fixar Service, I would like to schedule a home appliance service."
  );

  return (
    <aside
      aria-label="WhatsApp Quick Support"
      className="hidden lg:block fixed bottom-6 end-6 z-40 transition-transform duration-300 hover:scale-105"
    >
      <a
        href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}?text=${msg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 transition-colors animate-pulse-subtle group"
        title="Chat with Fixar Support on WhatsApp"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col text-start">
          <span className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider">
            {language === "ar" ? "دعم واتساب فوري" : "Quick WhatsApp"}
          </span>
          <bdi className="text-xs font-bold leading-tight">{activeContact.whatsappDisplay}</bdi>
        </div>
      </a>
    </aside>
  );
}
