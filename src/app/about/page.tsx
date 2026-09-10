import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { initialBusinessSettings } from "@/data/businessSettings";
import {
  Wrench,
  ShieldCheck,
  Clock,
  MapPin,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Phone,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Fixar Service | Professional Home Appliance Maintenance",
  description:
    "Learn about Fixar Service, our certified technician team, transparent service philosophy, and commitment to fast, reliable home appliance repair in Sharjah and Dubai.",
};

export default function AboutPage() {
  const uaeContact = initialBusinessSettings.supportedRegions.uae;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ labelEn: "About Us", labelAr: "من نحن" }]} />

        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-brand-orange" />
            <span>Dedicated Maintenance Experts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            About Fixar Service
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Fixar Service is a specialized home appliance repair and maintenance provider serving households, villas, and commercial properties across the United Arab Emirates and selected Middle East regions.
          </p>
        </div>

        {/* Mission & Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-brand-navy">Our Service Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our mission is to eliminate the frustration of appliance breakdowns by delivering prompt, trustworthy, and technically sound doorstep repairs. In the demanding climate of the Middle East, functioning cooling and refrigeration are essential to everyday health and comfort. We strive to restore every appliance safely, affordably, and with minimal disruption to your home.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-brand-navy">Customer-First Philosophy</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We operate on complete transparency. Our technicians never recommend unnecessary replacements or charge concealed inspection fees. Every customer receives a thorough diagnostic assessment, an explanation of the fault in plain language, upfront pricing before work begins, and a legitimate service warranty.
            </p>
          </div>
        </div>

        {/* Core Operating Principles */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-black text-brand-navy">How We Work</h2>
            <p className="text-xs text-slate-500">
              A disciplined, agency-grade operational standard applied to every service call.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-brand-blue text-sm">1. Accurate Diagnostics</div>
              <p className="text-slate-600 leading-relaxed">
                Rather than replacing parts on guesswork, our engineers carry electronic manifold gauges, insulation testers, and motor analyzers to pinpoint true root causes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-brand-blue text-sm">2. Genuine Compatible Parts</div>
              <p className="text-slate-600 leading-relaxed">
                We install certified OEM-grade components, food-safe refrigerants, and industrial-grade relays to ensure prolonged appliance life and peak energy efficiency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-brand-blue text-sm">3. Home Visit Convenience</div>
              <p className="text-slate-600 leading-relaxed">
                Transporting heavy refrigerators or washing machines risks physical damage to cabinetry and flooring. We perform 95% of repairs directly on-site in your home.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Operational Hub */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Sharjah Headquarters</span>
            </div>
            <h2 className="text-2xl font-bold">106 Al Zahraa St–105th St, Hay Al Sharq</h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Centrally situated in Sharjah to provide rapid dispatch across Sharjah, Dubai, and Ajman. Operating 24 hours a day, 7 days a week.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/book-service"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-md transition-colors text-center"
            >
              Book Service
            </Link>
            <a
              href={`tel:${uaeContact.phone}`}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors text-center"
            >
              Call Hotline
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
