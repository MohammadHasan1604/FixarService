"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { ChevronDown, HelpCircle, Phone, MessageSquare, Search } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function FullFaqPage() {
  const { language, activeContact } = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const allFaqs = [
    {
      q: "What appliances do you repair?",
      qAr: "ما هي الأجهزة المنزلية التي تقدمون خدمات صيانتها؟",
      a: "We service air conditioners (split, window, duct), refrigerators, freezers, washing machines, dryers, microwave ovens, gas stoves, kitchen chimneys, water heaters (geysers), RO purifiers, water dispensers, and LED smart TVs.",
      aAr: "نصلح مكيفات الهواء، الثلاجات، المجمدات، الغسالات، النشافات، أفران الميكروويف، بوتاجازات ومسطحات الغاز، الشفاطات، سخانات المياه، فلاتر RO، برادات المياه، وشاشات التلفزيون الذكية.",
    },
    {
      q: "Do you provide home service across Sharjah and Dubai?",
      qAr: "هل تقدمون خدمة منزلية في الشارقة ودبي؟",
      a: "Yes! 100% of our diagnostic and repair calls are performed on-site at your home or workplace. Our technicians carry mobile kits and spare parts to avoid transporting heavy appliances.",
      aAr: "نعم! تتم 100% من خدمات الفحص والتصليح مباشرة داخل منزلك في الشارقة ودبي وعجمان دون الحاجة لنقل الأجهزة.",
    },
    {
      q: "What are your operating hours?",
      qAr: "ما هي ساعات العمل لديكم؟",
      a: "Our dispatch and technical response units operate 24 Hours / 7 Days a week for emergency cooling, water leaks, and urgent appliance breakdowns.",
      aAr: "نعمل على مدار 24 ساعة طوال 7 أيام في الأسبوع لاستقبال حالات الطوارئ وخدمة عملائنا الكرام.",
    },
    {
      q: "How fast can a technician arrive at my home?",
      qAr: "ما هي المدة الزمنية لوصول الفني إلى منزلي؟",
      a: "For emergency bookings across Sharjah and Dubai, our nearest technician is typically dispatched and arrives within 60 to 90 minutes.",
      aAr: "في الحالات الطارئة في الشارقة ودبي، يتم توجيه أقرب فني إليك ليصل في غضون 60 إلى 90 دقيقة.",
    },
    {
      q: "Do you provide a warranty on repaired appliances?",
      qAr: "هل تقدمون ضماناً على الأجهزة التي يتم إصلاحها؟",
      a: "Yes, all replacement components installed by Fixar Service come with a service warranty. Our technician will issue an official service invoice upon job completion.",
      aAr: "نعم، جميع قطع الغيار المستبدلة من قبل فيكسار سيرفيس مشمولة بضمان معتمد وفاتورة صيانة رسمية.",
    },
    {
      q: "Can I book or send photos via WhatsApp?",
      qAr: "هل يمكنني الحجز أو إرسال صور العطل عبر واتساب؟",
      a: "Yes! You can message our active WhatsApp desk at +971 54 337 7512 anytime to share pictures of the issue, request estimates, and confirm appointments.",
      aAr: "نعم! يمكنك التواصل فوراً عبر واتساب على الرقم +971 54 337 7512 لمشاركة صور وفيديوهات العطل وحجز الموعد مباشرة.",
    },
    {
      q: "How do I track my booking status?",
      qAr: "كيف يمكنني تتبع حالة الحجز الخاص بي؟",
      a: "Every booking generates a unique reference (FIX-2026-XXXXX). Visit our 'Track Booking' page with your reference code and registered phone number for real-time status.",
      aAr: "كل حجز يحصل على رقم مرجعي (FIX-2026-XXXXX). تفضل بزيارة صفحة 'تتبع الحجز' برقم هاتفك لمعرفة حالة الطلب لحظة بلحظة.",
    },
    {
      q: "Do you service out-of-warranty brand appliances?",
      qAr: "هل تقومون بصيانة أجهزة الماركات التي انتهى ضمانها؟",
      a: "Yes, we specialize in servicing out-of-warranty appliances from all leading global brands including Samsung, LG, Bosch, Whirlpool, O General, Daikin, and Panasonic.",
      aAr: "نعم، نحن متخصصون في صيانة أجهزة كافة الماركات العالمية المنتهية فترة ضمانها بقطع غيار أصلية ومضمونة.",
    },
  ];

  const filtered = allFaqs.filter((item) =>
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.qAr.includes(searchQuery) ||
    item.aAr.includes(searchQuery)
  );

  return (
    <div className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ labelEn: "Frequently Asked Questions", labelAr: "الأسئلة الشائعة" }]} />
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-brand-orange" />
            <span>Help Center & FAQ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Everything you need to know about our home visit procedure, pricing transparency, and warranty.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. warranty, emergency, AC)..."
            className="w-full px-4 py-3 ps-11 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-brand-blue outline-none shadow-sm bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute start-4 top-3.5" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filtered.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full text-start p-5 flex items-center justify-between gap-4 font-bold text-sm transition-colors ${
                    isOpen ? "bg-blue-50/50 text-brand-blue" : "text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{language === "ar" ? faq.qAr : faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-brand-blue" : "text-slate-400"
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{language === "ar" ? faq.aAr : faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="p-6 rounded-3xl bg-brand-navy text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-bold text-sm">Need immediate assistance?</div>
            <div className="text-slate-300">Call our 24/7 hotline or message us on WhatsApp directly.</div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${activeContact.phone}`}
              className="px-4 py-2.5 rounded-xl bg-brand-orange text-white font-bold hover:bg-brand-orange-hover"
            >
              Call Now
            </a>
            <a
              href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
