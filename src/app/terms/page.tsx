import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { initialBusinessSettings } from "@/data/businessSettings";

export const metadata: Metadata = {
  title: "Terms & Conditions | Fixar Service UAE",
  description: "Fixar Service terms of service, home visit policy, warranty, and customer conditions.",
};

export default function TermsPage() {
  return (
    <div className="py-14 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </header>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">1. Independent Service Provider Status</h2>
            <p>{initialBusinessSettings.disclaimerEn}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">2. Home Diagnostic Visits & Quotes</h2>
            <p>
              Fixar Service provides on-site home diagnostic inspections across Sharjah, Dubai, Ajman, and active regional branches. Upon inspection, the attending technician provides an upfront quote detailing required spare parts and labor. Work commences only after the client grants verbal or written consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">3. Replacement Parts & Warranty</h2>
            <p>
              All newly installed OEM-compatible spare parts supplied by Fixar Service include a limited warranty as documented on your official invoice. The warranty covers manufacturing defects in the replaced component under normal operating conditions. It excludes external power surges, unauthorized tampering by third parties, or deliberate physical damage.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">4. Customer Responsibilities</h2>
            <p>
              Clients are requested to ensure adult presence (18+ years of age) at the service location, safe access to the malfunctioning appliance, and a clear working perimeter around electrical and plumbing fixtures.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">5. Contact Information</h2>
            <p>
              For inquiries regarding service terms, please contact: <br />
              <strong>Fixar Service</strong><br />
              106 Al Zahraa St–105th St, Hay Al Sharq, Sharjah, UAE<br />
              Email: {initialBusinessSettings.email}<br />
              Telephone: {initialBusinessSettings.supportedRegions.uae.phoneDisplay}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
