"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { servicesList, ServiceItem } from "@/data/servicesData";
import { Calendar, ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";

export default function ServicesGrid() {
  const { language, t } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", nameEn: "All Services", nameAr: "جميع الخدمات" },
    { id: "cooling", nameEn: "Cooling & AC", nameAr: "التبريد والمكيفات" },
    { id: "kitchen", nameEn: "Kitchen Appliances", nameAr: "أجهزة المطبخ" },
    { id: "laundry", nameEn: "Laundry & Washing", nameAr: "الغسالات والتجفيف" },
    { id: "water", nameEn: "Water & Heating", nameAr: "أنظمة المياه والسخانات" },
    { id: "electronics", nameEn: "TV & Electronics", nameAr: "الشاشات والإلكترونيات" },
    { id: "maintenance", nameEn: "Home Maintenance", nameAr: "الصيانة العامة" },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? servicesList
      : servicesList.filter((s) => s.category === selectedCategory);

  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 bg-slate-50 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>{language === "ar" ? "خدماتنا المعتمدة" : "Professional Appliance Care"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {language === "ar"
              ? "حلول صيانة شاملة لجميع أجهزتك المنزلية"
              : "Comprehensive Repair & Maintenance Services"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {language === "ar"
              ? "نقدم خدمات فحص وإصلاح عالية الجودة لجميع أنواع الأجهزة المنزلية الكبيرة والصغيرة بواسطة خبراء وفنيين معتمدين في الشارقة ودبي وعجمان."
              : "From emergency cooling breakdowns to routine maintenance, our certified mobile technicians deliver fast, guaranteed repairs directly at your home."}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {language === "ar" ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.slug}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={language === "ar" ? service.titleAr : service.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute top-3 start-3 px-3 py-1 rounded-lg bg-brand-navy/90 backdrop-blur-sm text-white text-[11px] font-bold">
                  {language === "ar" ? service.categoryNameAr : service.categoryNameEn}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors leading-snug">
                    {language === "ar" ? service.titleAr : service.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {language === "ar" ? service.shortDescAr : service.shortDescEn}
                  </p>
                </div>

                {/* Common Issue Bullet Points */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === "ar" ? "أعطال شائعة نصلحها:" : "Common Issues Solved:"}
                  </div>
                  {(language === "ar" ? service.commonProblemsAr : service.commonProblemsEn)
                    .slice(0, 2)
                    .map((prob, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{prob}</span>
                      </div>
                    ))}
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-brand-blue text-slate-700 hover:text-brand-blue font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors bg-slate-50/50 hover:bg-blue-50/40"
                  >
                    <span>{t.common.viewDetails}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/book-service?service=${service.id}`}
                    className="py-2.5 px-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-brand-orange/20 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.common.bookService}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Explorer Link */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-dark text-white font-bold text-sm shadow-md transition-all"
          >
            <span>{t.common.viewAllServices}</span>
            <ArrowIcon className="w-4 h-4 text-brand-orange" />
          </Link>
        </div>
      </div>
    </section>
  );
}
