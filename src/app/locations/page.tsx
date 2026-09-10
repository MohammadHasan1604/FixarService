import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { initialBusinessSettings } from "@/data/businessSettings";
import { MapPin, Phone, MessageSquare, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Service Locations & Coverage | Fixar Service UAE & Middle East",
  description:
    "Explore our active home appliance repair service areas in Sharjah, Dubai, Ajman, Muscat (Oman), and Riyadh (Saudi Arabia). 24/7 doorstep technician dispatch.",
};

export default function LocationsPage() {
  const regions = Object.values(initialBusinessSettings.supportedRegions);

  return (
    <div className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ labelEn: "Locations", labelAr: "مناطق الخدمة" }]} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            <span>Regional Coverage Hubs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            Fixar Service Locations & Regional Coverage
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Headquartered in Hay Al Sharq, Sharjah, Fixar delivers rapid mobile diagnostic units throughout residential and commercial communities in the UAE, with active regional support in Oman and Saudi Arabia.
          </p>
        </div>

        {/* Primary UAE Hub Highlight */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 end-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold uppercase">
                Primary UAE Operational Headquarters
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Sharjah, Dubai & Northern Emirates
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Our central dispatch depot and parts warehouse is located at <strong>106 Al Zahraa St–105th St, Hay Al Sharq, Sharjah</strong>. We dispatch mobile repair vans stocked with certified refrigerants, capacitors, drain pumps, and heating elements across all major neighborhoods within 60 to 90 minutes.
              </p>

              <div className="flex flex-wrap gap-2 pt-2 text-xs">
                {initialBusinessSettings.supportedRegions.uae.serviceAreas.map((area, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Direct UAE Hotline:</span>
                <a href={`tel:${initialBusinessSettings.supportedRegions.uae.phone}`} className="text-lg font-bold text-white hover:text-brand-orange">
                  <bdi>{initialBusinessSettings.supportedRegions.uae.phoneDisplay}</bdi>
                </a>
              </div>

              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Verified Address:</span>
                <span className="text-slate-200">{initialBusinessSettings.supportedRegions.uae.address}</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={initialBusinessSettings.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white text-brand-navy font-bold text-center hover:bg-slate-100 transition-colors"
                >
                  Open in Google Maps
                </a>
                <Link
                  href="/book-service"
                  className="w-full py-2.5 rounded-xl bg-brand-orange text-white font-bold text-center hover:bg-brand-orange-hover transition-colors"
                >
                  Book UAE Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* All Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.map((reg) => (
            <div
              key={reg.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-card flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                    {reg.country}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {reg.currency}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-brand-navy mb-1">{reg.city}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{reg.address}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-semibold text-slate-700">Covered Districts:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {reg.serviceAreas.map((area, aIdx) => (
                      <span key={aIdx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <a
                  href={`tel:${reg.phone}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-brand-navy font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  <bdi>{reg.phoneDisplay}</bdi>
                </a>

                <Link
                  href={
                    reg.id === "uae"
                      ? "/locations/uae/sharjah"
                      : reg.id === "oman"
                      ? "/locations/oman/muscat"
                      : "/locations/saudi-arabia/riyadh"
                  }
                  className="w-full py-2.5 px-3 rounded-xl bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore Local Coverage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
