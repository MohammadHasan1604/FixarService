"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react";

export default function FaqSection() {
  const { language, activeContact } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: "What home appliances do you repair?",
      qAr: "ما هي الأجهزة المنزلية التي تقدمون خدمات صيانتها؟",
      aEn: "We service air conditioners (split, window, duct), refrigerators, freezers, washing machines, tumble dryers, microwave ovens, gas stoves/hobs, kitchen chimneys, water heaters (geysers), RO purifiers, water dispensers, and smart TVs.",
      aAr: "نصلح مكيفات الهواء (سبليت، شباك، مركزي)، الثلاجات، الفريزرات، الغسالات، النشافات، أفران الميكروويف، بوتاجازات ومسطحات الغاز، الشفاطات، سخانات المياه، فلاتر RO، برادات المياه، وشاشات التلفزيون الذكية.",
    },
    {
      qEn: "Do you provide home service, or do I have to bring the appliance?",
      qAr: "هل تقدمون خدمة صيانة منزلية أم يجب إحضار الجهاز إليكم؟",
      aEn: "We provide 100% on-site doorstep home visits across Sharjah, Dubai, and Ajman. Our technicians arrive in fully equipped mobile service vans to troubleshoot and repair your appliance right inside your home.",
      aAr: "نوفر خدمة منزلية 100% في موقعك في الشارقة ودبي وعجمان. يصل فنيونا بسيارات مجهزة بكافة أجهزة الفحص وقطع الغيار لإنجاز الصيانة في منزلك مباشرة.",
    },
    {
      qEn: "What geographic areas and emirates do you cover?",
      qAr: "ما هي المناطق والإمارات التي تغطيها خدماتكم؟",
      aEn: "Our primary operational hub is based in Hay Al Sharq, Sharjah (106 Al Zahraa St), covering all Sharjah neighborhoods, Dubai, and Ajman. We also have active regional dispatch desks serving Muscat (Oman) and Riyadh (Saudi Arabia).",
      aAr: "مركزنا الرئيسي يقع في حي الشرق بالشارقة (106 شارع الزهراء)، ونغطي كافة أحياء الشارقة ودبي وعجمان، إلى جانب مكاتب التنسيق في مسقط (عُمان) والرياض (السعودية).",
    },
    {
      qEn: "Can I book an appointment or send appliance photos through WhatsApp?",
      qAr: "هل يمكنني حجز موعد أو إرسال صور وفيديوهات العطل عبر واتساب؟",
      aEn: "Yes! You can instantly connect with our dispatch desk on WhatsApp (+971 54 337 7512) to send photos, videos of the malfunction, your location pin, and schedule your visit directly.",
      aAr: "نعم بالتأكيد! يمكنك التواصل فوراً مع مكتب التنسيق عبر واتساب (+971 54 337 7512) لإرسال صور العطل وموقعك وتحديد الوقت المناسب لك.",
    },
    {
      qEn: "How do I track my booking status?",
      qAr: "كيف يمكنني متابعة وتتبع حالة حجز الصيانة الخاص بي؟",
      aEn: "When you book online, our system generates a unique reference code (e.g., FIX-2026-XXXXX). You can visit our 'Track Booking' page anytime with your reference and registered phone number to view real-time technician status.",
      aAr: "عند الحجز عبر الموقع، يمنحك النظام رقماً مرجعياً خاصاً (مثل FIX-2026-XXXXX). يمكنك زيارة صفحة 'تتبع الحجز' في أي وقت برقم هاتفك لمعرفة حالة الفني وموعد الوصول بدقة.",
    },
    {
      qEn: "Do you service out-of-warranty appliances?",
      qAr: "هل تقومون بصيانة الأجهزة التي انتهت فترة ضمان الشركة المصنعة لها؟",
      aEn: "Yes, we specialize in servicing all out-of-warranty home appliances from leading manufacturers (Samsung, LG, Bosch, Whirlpool, O General, Daikin, etc.) using high-grade OEM-compatible components.",
      aAr: "نعم، نحن متخصصون في صيانة الأجهزة المنزلية خارج ضمان المصنع لجميع الماركات العالمية (سامسونج، إل جي، بوش، ويرلبول، دايكن، وغيرها) باستخدام قطع غيار أصلية.",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "الأسئلة الشائعة" : "Got Questions?"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {language === "ar" ? "الأسئلة الأكثر تكراراً حول خدماتنا" : "Frequently Asked Questions"}
          </h2>
          <p className="text-sm text-slate-600">
            {language === "ar"
              ? "إجابات واضحة ومباشرة عن مواعيد الصيانة، الفحص المنزلي، والضمان."
              : "Clear answers regarding home visit scheduling, emergency response, and appliance coverage."}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full text-start p-5 flex items-center justify-between gap-4 font-bold text-sm transition-colors ${
                    isOpen ? "bg-blue-50/50 text-brand-blue" : "bg-white text-slate-900 hover:bg-slate-50"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span>{language === "ar" ? faq.qAr : faq.qEn}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-brand-blue" : "text-slate-400"
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    <p>{language === "ar" ? faq.aAr : faq.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {language === "ar" ? "هل لديك سؤال أو عطل خاص بجهازك؟" : "Have a specific question about your appliance?"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "ar"
                ? "فريق الدعم الفني متواجد على مدار 24 ساعة للإجابة على كافة الاستفسارات."
                : "Our technicians and dispatch team are available 24 hours a day to assist."}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${activeContact.phone}`}
              className="py-2.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-100"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>{language === "ar" ? "اتصال" : "Call"}</span>
            </a>
            <a
              href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "واتساب" : "WhatsApp"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
