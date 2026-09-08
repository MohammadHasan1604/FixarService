"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { ShieldCheck, Clock, MapPin, Wrench, Headphones, BadgeDollarSign, Check } from "lucide-react";

export default function WhyChooseFixar() {
  const { language, t } = useLocale();

  const benefits = [
    {
      icon: Clock,
      titleEn: "24/7 Service Availability",
      titleAr: "جاهزية تامة 24/7 طوال الأسبوع",
      descEn: "Appliance emergencies don't wait for business hours. Our response team is active day and night.",
      descAr: "أعطال التكييف والثلاجات لا تنتظر أوقات الدوام. فريقنا جاهز لخدمتك ليلاً ونهاراً.",
    },
    {
      icon: MapPin,
      titleEn: "Convenient Home Visits",
      titleAr: "زيارات منزلية مريحة وفورية",
      descEn: "Save the stress of hauling heavy washers or refrigerators. 95% of repairs are completed on-site.",
      descAr: "وفر على نفسك عناء نقل الأجهزة الثقيلة. نقوم بإنجاز 95% من أعمال الصيانة مباشرة في منزلك.",
    },
    {
      icon: Wrench,
      titleEn: "Multi-Appliance Expertise",
      titleAr: "خبرة شاملة في كافة الأجهزة",
      descEn: "One reliable company for AC, refrigerators, washing machines, microwaves, hobs, and geysers.",
      descAr: "جهة واحدة موثوقة لجميع أجهزتك: مكيفات، ثلاجات، غسالات، أفران، شفاطات وسخانات مياه.",
    },
    {
      icon: ShieldCheck,
      titleEn: "Verified Diagnostics & Genuine Parts",
      titleAr: "تشخيص دقيق وقطع غيار أصلية",
      descEn: "No guesswork. We utilize proper diagnostic meters and install OEM-compatible components.",
      descAr: "فحص دقيق بأحدث الأجهزة الإلكترونية وتركيب قطع غيار أصلية متوافقة لضمان طول عمر جهازك.",
    },
    {
      icon: Headphones,
      titleEn: "Direct Call & WhatsApp Support",
      titleAr: "تواصل مباشر عبر الهاتف والواتساب",
      descEn: "Speak directly with knowledgeable dispatchers who understand your appliance requirements immediately.",
      descAr: "تواصل سريع ومباشر مع مسؤولي الصيانة عبر الهاتف أو الواتساب دون انتظار ممل.",
    },
    {
      icon: BadgeDollarSign,
      titleEn: "Transparent, Upfront Estimates",
      titleAr: "تسعير واضح وعروض أسعار مسبقة",
      descEn: "Clear inspection and quote provided before repair begins. No surprise charges upon completion.",
      descAr: "فحص واضح وتقديم تكلفة الصيانة بدقة قبل بدء العمل دون أي مفاجآت أو تكاليف غير معلنة.",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 start-0 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider">
              {language === "ar" ? "لماذا فيكسار سيرفيس؟" : "Why Choose Fixar"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              {language === "ar"
                ? "ثقة، سرعة، واحترافية في خدمة أجهزتك المنزلية"
                : "Dependable Appliance Repair Built on Trust and Speed"}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {language === "ar"
                ? "ندرك تماماً أهمية الأجهزة المنزلية في راحتك اليومية داخل دولة الإمارات. لذلك نلتزم بتقديم خدمة سريعة ومهندسين متخصصين ومعدات فحص متطورة تضمن عودة جهازك للعمل بكفاءة مثالية."
                : "We know that when an AC stops cooling in the UAE heat or a washing machine leaks, you need quick, trustworthy assistance. Fixar provides verified technicians equipped to restore your comfort fast."}
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs shadow-md transition-colors"
              >
                <span>{language === "ar" ? "تعرف أكثر على فيكسار" : "Learn More About Us"}</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Benefits Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-brand-blue/50 transition-colors space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-navy border border-slate-700 flex items-center justify-center text-brand-orange">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {language === "ar" ? b.titleAr : b.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {language === "ar" ? b.descAr : b.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
