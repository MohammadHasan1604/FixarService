import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Star, Quote, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | Fixar Service UAE",
  description:
    "Read genuine customer reviews from homeowners in Sharjah, Dubai, and Ajman who experienced Fixar's fast, doorstep home appliance repairs.",
};

export default function ReviewsPage() {
  const reviews = [
    {
      author: "Ahmed Al Qasimi",
      location: "Al Majaz, Sharjah",
      service: "Split AC Gas Leak Repair & Cleaning",
      quote: "Our living room AC started blowing warm air on a Friday afternoon. Technician Mohammad Tariq arrived in Sharjah with proper gauges, fixed the flare leak, and charged genuine gas. Excellent service!",
      date: "September 2026",
      rating: 5,
    },
    {
      author: "Fatima Al Suwaidi",
      location: "Deira, Dubai",
      service: "Samsung Inverter Refrigerator Repair",
      quote: "The lower compartment of my double-door fridge stopped cooling completely. The technician pinpointed the faulty defrost sensor and fan within 20 minutes and had the spare part in his mobile van.",
      date: "August 2026",
      rating: 5,
    },
    {
      author: "Rashid bin Hamad",
      location: "Al Nahda, Sharjah",
      service: "LG Front-Load Washer Drum Repair",
      quote: "Our washing machine was shaking violently during spin cycles. Fixar replaced the worn drum bearings on-site without having to haul the heavy appliance to a workshop.",
      date: "August 2026",
      rating: 5,
    },
    {
      author: "Sunil Varma",
      location: "Al Barsha, Dubai",
      service: "Convection Microwave Magnetron Repair",
      quote: "Microwave was running but not heating meals. The engineer discharged the capacitor safely, installed a replacement magnetron, and had it running good as new in 45 minutes.",
      date: "July 2026",
      rating: 5,
    },
    {
      author: "Mariam Al Kaabi",
      location: "Muwaileh Commercial, Sharjah",
      service: "Ariston Water Heater Thermostat & PRV",
      quote: "Water heater tripped the circuit breaker every morning. Fixar arrived the same day and replaced the calcified heating element and thermostat with warranty. Very polite technicians.",
      date: "July 2026",
      rating: 5,
    },
    {
      author: "Tariq Al Harthy",
      location: "Muscat, Oman",
      service: "Deep Freezer Thermostat Calibration",
      quote: "Saved my deep freezer inventory after cooling failure. Fast response from the Muscat branch, professional gauges, and clear pricing.",
      date: "June 2026",
      rating: 5,
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Verified Customer Feedback</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy tracking-tight">
            Customer Reviews & Experiences
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Real feedback from residents across Sharjah, Dubai, and Ajman who trust Fixar Service for dependable, same-day home appliance maintenance.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">{rev.author}</h2>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-brand-orange" />
                    <span>{rev.location}</span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="inline-block text-[10px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                    {rev.service}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Action */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Experience the Fixar Standard Today</h3>
            <p className="text-xs text-slate-300 mt-1">Book certified appliance technicians at your doorstep in minutes.</p>
          </div>
          <Link
            href="/book-service"
            className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-md transition-colors"
          >
            Book a Service Now
          </Link>
        </div>
      </div>
    </div>
  );
}
