"use client";

import React from "react";
import { useLocale } from "@/context/LocaleContext";
import { Calendar, CheckCircle2, Wrench, ThumbsUp } from "lucide-react";

export default function HowItWorks() {
  const { t, language } = useLocale();

  const steps = [
    {
      icon: Calendar,
      number: "01",
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      badge: language === "ar" ? "سهل وسريع" : "Quick & Easy",
    },
    {
      icon: CheckCircle2,
      number: "02",
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      badge: language === "ar" ? "تأكيد فوري" : "Instant Confirmation",
    },
    {
      icon: Wrench,
      number: "03",
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      badge: language === "ar" ? "تشخيص معتمد" : "Certified Inspection",
    },
    {
      icon: ThumbsUp,
      number: "04",
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      badge: language === "ar" ? "ضمان الرضا" : "Warranty & Peace of Mind",
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            {t.howItWorks.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-brand-blue/40 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-300 group-hover:text-brand-blue transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                      <StepIcon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <span className="inline-block text-[11px] font-semibold text-brand-blue bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {step.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
