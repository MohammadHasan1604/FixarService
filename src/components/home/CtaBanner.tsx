"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Calendar, Phone, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

export default function CtaBanner() {
  const { language, activeContact, t } = useLocale();

  return (
    <section className="py-16 bg-gradient-to-r from-brand-navy via-brand-dark to-brand-navy text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 end-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 start-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-2xl text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "خدمة فورية في نفس اليوم" : "Same-Day Emergency Service"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              {language === "ar"
                ? "هل تحتاج صيانة عاجلة لجهازك المنزلي اليوم؟"
                : "Need Urgent Appliance Repair at Your Doorstep?"}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === "ar"
                ? "لا تدع تعطل المكيف أو تسريب الغسالة يعكر صفو يومك. احجز موعدك الآن وسيصلك فني معتمد مجهز بكافة قطع الغيار الأصلية."
                : "Don't let a broken AC or leaking washing machine disrupt your day. Schedule a visit in 2 minutes or reach our 24/7 hotline directly."}
            </p>

            <div className="flex items-center gap-4 pt-1 justify-center lg:justify-start text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {language === "ar" ? "ضمان معتمد على الخدمة" : "Service Warranty"}
              </span>
              <span>•</span>
              <span>{language === "ar" ? "وصول خلال 60-90 دقيقة" : "60-90 Min Response"}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0 justify-center">
            <Link
              href="/book-service"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/40 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.common.bookService}</span>
            </Link>

            <a
              href={`tel:${activeContact.phone}`}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-orange" />
              <span>{t.common.callNow}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
