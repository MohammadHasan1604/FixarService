"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { Star, Quote, MapPin } from "lucide-react";

export default function TestimonialsSection() {
  const { language } = useLocale();

  const reviews = [
    {
      author: "Ahmed Al Qasimi",
      locationEn: "Al Majaz, Sharjah",
      locationAr: "المجاز، الشارقة",
      serviceEn: "Split AC Gas Leak Repair & Cleaning",
      serviceAr: "إصلاح تسريب غاز المكيف وتنظيف كيميائي",
      quoteEn: "Our living room AC started blowing warm air on a Friday afternoon. Technician Mohammad Tariq arrived in Sharjah with proper gauges, fixed the flare leak, and charged genuine gas. Excellent service!",
      quoteAr: "توقف مكيف غرفة المعيشة عن التبريد فجأة بعد ظهر يوم الجمعة. وصل الفني مجهزاً بأدوات الفحص، وقام بعلاج التسريب وشحن الغاز الأصلي. خدمة ممتازة وسريعة.",
      date: "September 2026",
    },
    {
      author: "Fatima Al Suwaidi",
      locationEn: "Deira, Dubai",
      locationAr: "ديرة، دبي",
      serviceEn: "Samsung Inverter Refrigerator Repair",
      serviceAr: "صيانة ثلاجة سامسونج إنفرتر",
      quoteEn: "The lower compartment of my double-door fridge stopped cooling completely. The technician pinpointed the faulty defrost sensor and fan within 20 minutes and had the spare part in his mobile van.",
      quoteAr: "الجزء السفلي من الثلاجة توقف عن التبريد تماماً. حدد الفني العطل في حساس إذابة الثلج والمروحة خلال 20 دقيقة وكانت القطعة متوفرة في سيارته.",
      date: "August 2026",
    },
    {
      author: "Rashid bin Hamad",
      locationEn: "Al Nahda, Sharjah",
      locationAr: "النهدة، الشارقة",
      serviceEn: "LG Front-Load Washer Drum Repair",
      serviceAr: "صيانة رولمان بلي غسالة إل جي",
      quoteEn: "Our washing machine was shaking violently during spin cycles. Fixar replaced the worn drum bearings on-site without having to haul the heavy appliance to a workshop.",
      quoteAr: "كانت الغسالة تهتز بعنف أثناء العصر. قام فني فيكسار بتبديل رولمان بلي الحلة التالف مباشرة في المنزل دون الحاجة لنقلها.",
      date: "August 2026",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            {language === "ar" ? "تجارب عملائنا الحقيقية" : "Customer Feedback"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {language === "ar" ? "ماذا يقول عملاؤنا في دولة الإمارات؟" : "What Homeowners Say About Our Service"}
          </h2>
          <p className="text-sm text-slate-600">
            {language === "ar"
              ? "آراء وانطباعات عملائنا الكرام بعد الانتهاء من فحص وتصليح أجهزتهم المنزلية."
              : "Real, verified feedback from households across Sharjah, Dubai, and Ajman who rely on Fixar for fast home repairs."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{language === "ar" ? rev.quoteAr : rev.quoteEn}"
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{rev.author}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-brand-orange" />
                    <span>{language === "ar" ? rev.locationAr : rev.locationEn}</span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="inline-block text-[10px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                    {language === "ar" ? rev.serviceAr : rev.serviceEn}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark hover:underline"
          >
            {language === "ar" ? "قراءة المزيد من تقييمات العملاء" : "Read More Client Testimonials"} →
          </Link>
        </div>
      </div>
    </section>
  );
}
