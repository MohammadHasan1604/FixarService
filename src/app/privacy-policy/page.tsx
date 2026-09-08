import React from "react";
import { Metadata } from "next";
import { initialBusinessSettings } from "@/data/businessSettings";

export const metadata: Metadata = {
  title: "Privacy Policy | Fixar Service UAE",
  description: "Fixar Service privacy policy and customer data protection standards.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-14 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </header>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">1. Information Collection</h2>
            <p>
              When you schedule an appliance repair service or contact us via WhatsApp or web forms, we collect only the necessary information to deliver our home services: your name, telephone/WhatsApp number, service address (building, street, city), and the description of the appliance fault.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">2. How We Use Your Data</h2>
            <p>
              Your contact details are used exclusively to:
            </p>
            <ul className="list-disc ps-5 space-y-1 text-slate-600">
              <li>Coordinate technician dispatch and provide arrival updates.</li>
              <li>Issue service invoices and track warranty records.</li>
              <li>Follow up on service satisfaction and quality assurance.</li>
            </ul>
            <p className="pt-1">
              We never sell, trade, or distribute your personal contact information to third-party marketing companies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">3. Data Security & Storage</h2>
            <p>
              All customer booking records and status tracking are stored in secure environments with restricted administrative access. Sensitive customer telephone and address information is masked on public tracking portals.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">4. Inquiries & Requests</h2>
            <p>
              To request removal or correction of your contact records from our service log, email us directly at <strong>{initialBusinessSettings.email}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
