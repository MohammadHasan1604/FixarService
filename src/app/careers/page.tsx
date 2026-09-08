import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Briefcase, MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";
import { initialBusinessSettings } from "@/data/businessSettings";

export const metadata: Metadata = {
  title: "Careers & Technical Opportunities | Fixar Service UAE",
  description:
    "Join the Fixar Service technical team. Diagnostic technicians, HVAC engineers, and appliance specialists in Sharjah and Dubai.",
};

export default function CareersPage() {
  const uaeContact = initialBusinessSettings.supportedRegions.uae;

  const currentOpenings = [
    {
      id: "job-1",
      title: "Senior HVAC / AC Diagnostic Technician",
      location: "Sharjah & Dubai Mobile Hubs",
      type: "Full-Time (Direct UAE Employment)",
      description: "Seeking skilled AC technicians experienced in split AC troubleshooting, inverter PCB testing, compressor replacements, and eco-chemical foam coil servicing.",
      requirements: ["3+ years experience in Middle East residential HVAC", "Valid UAE driving license preferred", "Proficiency in refrigerant safety"],
    },
    {
      id: "job-2",
      title: "Major Home Appliance Technician (Fridges & Washers)",
      location: "Sharjah Workshop & Mobile Units",
      type: "Full-Time",
      description: "Experienced in Samsung, LG, Whirlpool, and Bosch inverter refrigerators, front-load washer bearing overhauls, and drain pump repairs.",
      requirements: ["Component-level diagnosis skills", "Punctual and customer-oriented", "Experience in home doorstep servicing"],
    },
  ];

  return (
    <div className="py-14 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-brand-orange" />
            <span>Join Our Engineering Team</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            Careers at Fixar Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            We are always seeking certified diagnostic technicians and customer-focused professionals to expand our service coverage across the UAE.
          </p>
        </div>

        {/* Current Active Openings */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-brand-navy">Current Active Openings</h2>

          <div className="space-y-4">
            {currentOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">{job.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-brand-blue">{job.type}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {job.description}
                </p>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-700">Key Requirements:</span>
                  <ul className="space-y-1 pt-1">
                    {job.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-center gap-2 text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Apply Box */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold">How to Apply</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Interested candidates can forward their CV and experience summary directly to our operations supervisor at <strong>{initialBusinessSettings.email}</strong> with the subject line <em>"Technician Application - [Your Specialty]"</em> or message our administrative WhatsApp.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={`mailto:${initialBusinessSettings.email}?subject=Technician Application`}
              className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-colors"
            >
              Email Your Resume
            </a>
            <a
              href={`tel:${uaeContact.phone}`}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              Call Recruitment Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
