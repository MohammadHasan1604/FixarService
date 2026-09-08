import React, { Suspense } from "react";
import BookingWizard from "@/components/booking/BookingWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appliance Service Online | Fixar Service UAE",
  description:
    "Schedule certified home appliance repair across Sharjah, Dubai, and Ajman. Fast doorstep technician dispatch for AC, refrigerator, washing machine, and oven repair.",
};

export default function BookServicePage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
          <span>Home Appliance Service Booking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
          Book an Appliance Service at Your Doorstep
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Choose your appliance, enter your preferred date and time, and our certified technician will arrive on site with original parts.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading booking portal...</div>}>
          <BookingWizard />
        </Suspense>
      </div>
    </div>
  );
}
