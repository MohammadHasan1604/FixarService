"use client";

import React from "react";
import { useLocale } from "@/context/LocaleContext";
import { Clock, UserCheck, Home, Wrench, Shield, CheckCircle } from "lucide-react";

export default function TrustStrip() {
  const { language } = useLocale();

  const trustItems = [
    {
      icon: Clock,
      titleEn: "24/7 Availability",
      titleAr: "خدمة 24/7 على مدار الساعة",
      descEn: "Round-the-clock emergency support across UAE",
      descAr: "استجابة فورية لحالات الطوارئ في جميع الأوقات",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: UserCheck,
      titleEn: "Certified Technicians",
      titleAr: "فنيون معتمدون ومحترفون",
      descEn: "Trained, background-verified engineers",
      descAr: "مهندسون وفنيون مؤهلون بأعلى معايير الخبرة",
      color: "text-brand-blue",
      bgColor: "bg-blue-50",
    },
    {
      icon: Home,
      titleEn: "Doorstep Home Service",
      titleAr: "خدمة فورية عند باب منزلك",
      descEn: "On-site diagnosis without moving appliances",
      descAr: "فحص وتصليح في موقعك دون نقل الجهاز",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Shield,
      titleEn: "Genuine Spare Parts",
      titleAr: "قطع غيار أصلية ومضمونة",
      descEn: "100% brand-compatible parts with warranty",
      descAr: "قطع غيار معتمدة مع توفير ضمان على الخدمة",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Wrench,
      titleEn: "15+ Appliance Categories",
      titleAr: "صيانة أكثر من 15 فئة أجهزة",
      descEn: "AC, Fridge, Washer, Oven, Geyser & More",
      descAr: "تكييف، ثلاجات، غسالات، أفران، سخانات، وغيرها",
      color: "text-brand-orange",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <section className="bg-white border-y border-slate-200 py-8 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">
                  {language === "ar" ? item.titleAr : item.titleEn}
                </h2>
                <p className="text-xs text-slate-500 leading-snug">
                  {language === "ar" ? item.descAr : item.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
