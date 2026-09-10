import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { brandsList, brandDisclaimerEn, brandDisclaimerAr } from "@/data/brandsData";
import { ShieldAlert, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Appliance Brands Serviced | Samsung, LG, Bosch, Whirlpool & More | Fixar",
  description:
    "Fixar provides independent, professional repair services for all major home appliance brands in the UAE. Samsung, LG, Whirlpool, Bosch, Haier, Daikin, Panasonic.",
};

export default function BrandsPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ labelEn: "Supported Brands", labelAr: "الماركات المدعومة" }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <span>Multi-Brand Maintenance Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            Supported Appliance Brands
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our certified repair engineers maintain residential and commercial appliances from leading global manufacturers, utilizing OEM-compatible diagnostic tools and spare parts.
          </p>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="max-w-4xl mx-auto bg-amber-50/80 border border-amber-200 rounded-2xl p-5 sm:p-6 flex items-start gap-4 text-xs text-amber-900 leading-relaxed shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h2 className="font-bold text-sm">Independent Service Provider Notice</h2>
            <p>{brandDisclaimerEn}</p>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brandsList.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-black text-brand-navy group-hover:text-brand-blue transition-colors">
                    {brand.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-brand-blue">
                    Compatible
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  {brand.category}
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Commonly Serviced:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {brand.popularAppliances.map((app, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-md font-medium"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <Link
                  href={`/book-service`}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-brand-blue hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book {brand.name} Service</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
