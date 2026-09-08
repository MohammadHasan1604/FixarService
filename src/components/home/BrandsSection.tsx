"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { brandsList, brandDisclaimerEn, brandDisclaimerAr } from "@/data/brandsData";
import { ShieldAlert, ArrowRight, ArrowLeft } from "lucide-react";

export default function BrandsSection() {
  const { language } = useLocale();
  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            {language === "ar" ? "توافق شامل مع كبرى الماركات" : "Multi-Brand Service Experts"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {language === "ar"
              ? "نصلح جميع الماركات العالمية الرائدة"
              : "We Service All Major Appliance Brands"}
          </h2>
          <p className="text-sm text-slate-600">
            {language === "ar"
              ? "فريقنا مدرب ومجهز بأحدث معدات الفحص وقطع الغيار المتوافقة مع كبرى العلامات التجارية العالمية."
              : "Our diagnostic technicians carry authentic, brand-compatible replacement parts for residential and commercial appliances."}
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 mb-10">
          {brandsList.slice(0, 18).map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-brand-blue/50 hover:shadow-md transition-all flex flex-col items-center justify-center text-center group"
            >
              <span className="font-bold text-sm text-slate-800 group-hover:text-brand-blue transition-colors">
                {b.name}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                {b.popularAppliances[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer Callout */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-slate-600 text-xs leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-800">
              {language === "ar" ? "تنويه العلامات التجارية:" : "Brand Disclaimer:"}
            </strong>{" "}
            {language === "ar" ? brandDisclaimerAr : brandDisclaimerEn}
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-blue-dark"
          >
            <span>{language === "ar" ? "عرض دليل الماركات الكامل والخدمات المتاحة" : "View Full Brand Directory & Supported Appliances"}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
