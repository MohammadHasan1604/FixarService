"use client";

import React, { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const { language, t, settings, activeContact } = useLocale();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Service Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSuccessMsg(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        subject: "Service Inquiry",
        message: "",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send message. Please try calling directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-brand-orange" />
            <span>24/7 Dispatch Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            {t.contact.pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.contact.pageSubtitle}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.contact.phoneHotline}
            </span>
            <div className="pt-1">
              <a href={`tel:${activeContact.phone}`} className="text-sm font-bold text-brand-navy hover:text-brand-blue block">
                <bdi>{activeContact.phoneDisplay}</bdi>
              </a>
              <span className="text-[11px] text-slate-500">24 Hours / 7 Days On-Call</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.contact.whatsappSupport}
            </span>
            <div className="pt-1">
              <a
                href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 block"
              >
                <bdi>{activeContact.whatsappDisplay}</bdi>
              </a>
              <span className="text-[11px] text-slate-500">Fast Photo & Diagnostic Chat</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.contact.emailInquiries}
            </span>
            <div className="pt-1">
              <a href={`mailto:${settings.email}`} className="text-sm font-bold text-brand-navy hover:text-brand-blue block truncate">
                {settings.email}
              </a>
              <span className="text-[11px] text-slate-500">Official Business Desk</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-brand-orange flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.contact.workingHours}
            </span>
            <div className="pt-1">
              <div className="text-sm font-bold text-brand-navy">{settings.operatingHours}</div>
              <span className="text-[11px] text-slate-500">Always Active for Emergencies</span>
            </div>
          </div>
        </div>

        {/* Form and Google Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-5">
            <div>
              <h2 className="text-xl font-bold text-brand-navy">
                {t.contact.sendUsMessage}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Have a maintenance inquiry or feedback? Send us a message and our coordinator will respond promptly.
              </p>
            </div>

            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.contact.messageSent}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.contact.name} *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Full Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.contact.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="054 337 7512"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.contact.subject}
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Appliance Service or Repair Inquiry"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.contact.message} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your appliance issue or inquiry..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-blue/20 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? t.common.loading : t.contact.sendMessage}</span>
              </button>
            </form>
          </div>

          {/* Map and Address */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brand-orange uppercase tracking-wider">
                    Primary UAE Workshop & Dispatch Office
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy">
                    Sharjah Headquarters
                  </h3>
                  <p className="text-xs text-slate-600">
                    {settings.primaryLocation}
                  </p>
                </div>

                <a
                  href={settings.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>{t.common.openInMaps}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Responsive Google Maps Embed with Lazy-loading */}
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 relative">
                <iframe
                  title="Fixar Service Sharjah Google Business Location"
                  src={settings.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Licensed Home Appliance Maintenance Entity</span>
                </div>
                <a
                  href={settings.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-blue hover:underline"
                >
                  {t.common.getDirections} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
