"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Calendar, Phone, MessageSquare, ShieldCheck, CheckCircle2, Star, Clock } from "lucide-react";

export default function HeroSection() {
  const { t, language, activeContact } = useLocale();

  const prefilledWhatsappMsg = encodeURIComponent(
    language === "ar"
      ? `مرحباً فيكسار سيرفيس، أود الاستفسار عن فحص وصيانة الأجهزة في ${activeContact.cityAr}.`
      : `Hello Fixar Service, I need assistance with appliance repair in ${activeContact.city}.`
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy via-[#0c203f] to-brand-navy text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none -me-20 -mt-20" />
      <div className="absolute bottom-0 start-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none -ms-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Content & CTAs) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-xs font-semibold text-brand-orange">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15]">
              <span>{t.hero.headlinePrefix}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                {language === "ar" ? activeContact.cityAr : activeContact.city}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              {language === "ar"
                ? "خدمات سريعة وموثوقة لصيانة وتصليح مكيفات الهواء، الثلاجات، الغسالات، والأفران في الشارقة ودبي ومختلف مناطق الإمارات. فنيون متخصصون ومجهزون بقطع الغيار الأصلية يصلون إلى باب منزلك في غضون 60 إلى 90 دقيقة."
                : "Fast, reliable home appliance repair and maintenance services for homes and businesses across Sharjah, Dubai, and the Middle East. Certified technicians at your doorstep with genuine spare parts."}
            </p>

            {/* Quick Benefits Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === "ar" ? "خدمة منزلية في نفس اليوم" : "Same-Day Doorstep Home Service"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === "ar" ? "فحص وتشخيص دقيق للأعطال" : "Certified Diagnostic Technicians"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === "ar" ? "قطع غيار أصلية بضمان معتمد" : "100% Genuine Spare Parts & Warranty"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{language === "ar" ? "شفافية الأسعار بدون رسوم خفية" : "Upfront Transparent Pricing"}</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              {/* Primary CTA: Book */}
              <Link
                href="/book-service"
                className="px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.common.bookService}</span>
              </Link>

              {/* Secondary CTA: Call */}
              <a
                href={`tel:${activeContact.phone}`}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>{t.common.callNow}</span>
              </a>

              {/* Third CTA: WhatsApp */}
              <a
                href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}?text=${prefilledWhatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.common.whatsappUs}</span>
              </a>
            </div>

            {/* Bottom Support Badge */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span className="font-semibold text-white">
                {language === "ar" ? "خدمة معتمدة وموثوقة" : "Top Rated Local Service"}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">
                {language === "ar" ? "دعم على مدار الساعة 24/7" : "24/7 Dedicated Support"}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Technician & Appliance Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Gradient Border */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-tr from-brand-blue via-sky-400 to-brand-orange shadow-2xl shadow-brand-blue/30">
                {/* Hero Image Container */}
                <div className="relative rounded-[22px] overflow-hidden bg-slate-900 aspect-[4/5] sm:aspect-[4/4.5]">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"
                    alt="Fixar Service Technician Inspecting Air Conditioner Unit"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle Image Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Overlaid Badge 1: 24/7 Emergency Response */}
                  <div className="absolute top-4 start-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {language === "ar" ? "استجابة سريعة 24/7" : "24/7 Fast Response"}
                      </div>
                      <div className="text-[10px] text-slate-300">
                        {language === "ar" ? "فنيون في الموقع خلال 60 دقيقة" : "On-site within 60-90 mins"}
                      </div>
                    </div>
                  </div>

                  {/* Overlaid Badge 2: Verified Work Guarantee */}
                  <div className="absolute bottom-4 inset-x-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 shadow-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {language === "ar" ? "ضمان الخدمة المعتمد" : "Service Warranty Included"}
                        </div>
                        <div className="text-[10px] text-slate-300">
                          {language === "ar" ? "قطع غيار أصلية 100%" : "100% Genuine Spare Parts"}
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/book-service"
                      className="px-3 py-1.5 rounded-lg bg-brand-orange text-white text-xs font-bold hover:bg-brand-orange-hover transition-colors shrink-0"
                    >
                      {t.common.bookService}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Ambient Badge */}
              <div className="hidden sm:flex absolute -bottom-6 -start-6 bg-white text-slate-900 rounded-2xl p-3.5 shadow-2xl border border-slate-100 items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-brand-blue font-black text-lg">
                  ❄
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {language === "ar" ? "راحة وهدوء تام" : "Cool Homes, Happier Lives"}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {language === "ar" ? "صيانة معتمدة لجميع الأجهزة" : "All Home Appliances Serviced"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
