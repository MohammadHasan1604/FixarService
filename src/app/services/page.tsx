import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { servicesList } from "@/data/servicesData";
import { Calendar, ArrowRight, CheckCircle2, Shield, Wrench } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "All Home Appliance Repair Services | Fixar Service UAE",
  description:
    "Explore our complete home appliance repair and maintenance services in Sharjah and Dubai. AC repair, refrigerators, washing machines, ovens, chimneys, and geysers.",
};

export default function ServicesPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ labelEn: "Services", labelAr: "الخدمات" }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-brand-orange" />
            <span>Complete Appliance Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            Professional Home Appliance Repair Services
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From emergency air-conditioner cooling restorations in the UAE summer heat to precision refrigerator and washer repairs, Fixar provides certified doorstep solutions across Sharjah, Dubai, and Ajman.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.slug}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.titleEn}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute top-3 start-3 px-3 py-1 rounded-lg bg-brand-navy/90 backdrop-blur-sm text-white text-[11px] font-bold">
                    {service.categoryNameEn}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <h2 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {service.titleEn}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {service.shortDescEn}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Supported Models:</div>
                    <div className="flex flex-wrap gap-1">
                      {service.supportedTypesEn.slice(0, 3).map((type, idx) => (
                        <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-600">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
                <Link
                  href={`/services/${service.slug}`}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-brand-blue text-slate-700 hover:text-brand-blue font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/book-service?service=${service.id}`}
                  className="py-2.5 px-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Now</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
