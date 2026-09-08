import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { initialBusinessSettings } from "@/data/businessSettings";
import { ShieldCheck, Cookie, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Fixar Service UAE",
  description: "Fixar Service Cookie Policy explaining how we use cookies and tracking technologies responsibly.",
};

export default function CookiePolicyPage() {
  return (
    <div className="py-14 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="space-y-3 text-center sm:text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
            <Cookie className="w-4 h-4" />
            <span>Compliance & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </header>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small data files stored on your computer or mobile device when you visit websites. They help the website remember your regional preferences (such as language: English vs Arabic, selected emirate, or recent booking references) to provide a smoother, faster user experience.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">2. How We Use Cookies</h2>
            <p>
              At Fixar Service, we use cookies strictly for essential operational and performance purposes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-xs text-brand-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Essential & Functional Cookies
                </span>
                <p className="text-[11px] text-slate-600">
                  Required to remember your selected locale (EN/AR), active service region (UAE, Oman, or Saudi Arabia), and secure staff/admin authentication sessions.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-xs text-brand-navy flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                  Performance & Diagnostics
                </span>
                <p className="text-[11px] text-slate-600">
                  Anonymous diagnostics to monitor page loading speed and prevent server errors on high-traffic booking days.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">3. Third-Party Cookies</h2>
            <p>
              We do not utilize aggressive behavioral tracking or sell user data to advertising networks. Third-party services loaded on our site (e.g. Google Maps embed for verified Sharjah headquarters navigation, and direct WhatsApp web dispatch) may set their own technical cookies governed by their respective privacy policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-brand-navy">4. Managing Your Cookie Preferences</h2>
            <p>
              You can choose to disable or block cookies through your browser settings at any time. Please note that disabling essential session cookies may affect certain interactive functions such as the multi-step booking engine or language switching.
            </p>
          </section>

          <section className="space-y-2 pt-2 border-t border-slate-100">
            <h2 className="text-base font-bold text-brand-navy">5. Contact Us</h2>
            <p>
              If you have any questions regarding our Cookie Policy or data protection, contact our privacy officer at{" "}
              <a href={`mailto:${initialBusinessSettings.email}`} className="text-brand-blue font-bold underline">
                {initialBusinessSettings.email}
              </a>{" "}
              or via our{" "}
              <Link href="/contact" className="text-brand-orange font-bold underline">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
