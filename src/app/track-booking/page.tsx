"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import {
  ShieldCheck,
  Search,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  Wrench,
  Truck,
  Check,
} from "lucide-react";

const STATUS_PROGRESSION = [
  { key: "new", labelEn: "Booking Received", labelAr: "تم استلام الطلب", icon: Clock },
  { key: "confirmed", labelEn: "Confirmed", labelAr: "تم تأكيد الموعد", icon: CheckCircle2 },
  { key: "assigned", labelEn: "Tech Assigned", labelAr: "تم تعيين الفني", icon: User },
  { key: "technician_en_route", labelEn: "En Route", labelAr: "الفني في الطريق", icon: Truck },
  { key: "in_progress", labelEn: "Repair In Progress", labelAr: "جاري التصليح", icon: Wrench },
  { key: "completed", labelEn: "Job Completed", labelAr: "تم إنجاز الصيانة", icon: Check },
];

function TrackBookingContent() {
  const { language, t, activeContact } = useLocale();
  const searchParams = useSearchParams();

  const [reference, setReference] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<any | null>(null);

  useEffect(() => {
    const qRef = searchParams.get("ref");
    const qPhone = searchParams.get("phone");
    if (qRef) setReference(qRef);
    if (qPhone) setPhone(qPhone);

    if (qRef && qPhone) {
      performLookup(qRef, qPhone);
    }
  }, [searchParams]);

  const performLookup = async (refQuery: string, phoneQuery: string) => {
    if (!refQuery.trim() || !phoneQuery.trim()) {
      setError(
        language === "ar"
          ? "يرجى إدخال رقم الحجز المرجعي ورقم الهاتف المسجل للتحقق"
          : "Please enter both booking reference and registered phone number"
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/bookings/${encodeURIComponent(refQuery.trim())}?phone=${encodeURIComponent(phoneQuery.trim())}`
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t.tracking.notFound);
      }

      setBookingData(data);
    } catch (err: any) {
      setBookingData(null);
      setError(err.message || t.tracking.notFound);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(reference, phone);
  };

  const getStatusIndex = (statusKey: string) => {
    if (statusKey === "cancelled") return -1;
    if (statusKey === "accepted") return 1;
    if (
      statusKey === "inspection" ||
      statusKey === "consultation_completed" ||
      statusKey === "quote_provided" ||
      statusKey === "approved"
    ) {
      return 4; // Map intermediate inspection steps to repair in progress
    }
    const idx = STATUS_PROGRESSION.findIndex((s) => s.key === statusKey);
    return idx !== -1 ? idx : 0;
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Real-Time Status Tracking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {t.tracking.pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            {t.tracking.pageSubtitle}
          </p>
        </div>

        {/* Lookup Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === "ar" ? "رقم الحجز المرجعي" : "Booking Reference Code"} *
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value.toUpperCase())}
                  placeholder="FIX-26-ABC123XY"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-brand-blue outline-none uppercase tracking-wider font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === "ar" ? "رقم الهاتف المسجل" : "Registered Contact Phone"} *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="054 337 7512"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-blue/20 transition-all disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? t.common.loading : t.tracking.searchBtn}</span>
              </button>
            </div>
          </form>

          {/* Error Notice */}
          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold">{language === "ar" ? "تعذر العثور على الحجز" : "Booking Lookup Notice"}</div>
                <p>{error}</p>
                <p className="text-[11px] text-slate-500 pt-1">
                  {language === "ar"
                    ? "هل تحتاج مساعدة؟ اتصل بمكتب التنسيق: "
                    : "Need immediate help? Call dispatch: "}
                  <a href={`tel:${activeContact.phone}`} className="font-bold underline text-brand-blue">
                    {activeContact.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results Details Card */}
        {bookingData && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-8 animate-fadeIn">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {language === "ar" ? "رقم المرجع" : "Booking Reference"}
                </span>
                <div className="text-xl sm:text-2xl font-black text-brand-navy">
                  {bookingData.reference}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {bookingData.serviceTitle} • {bookingData.brand}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    bookingData.status === "completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : bookingData.status === "cancelled"
                      ? "bg-rose-100 text-rose-800"
                      : "bg-blue-100 text-brand-blue"
                  }`}
                >
                  {bookingData.status.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            {/* Status Progress Stepper */}
            {bookingData.status !== "cancelled" && (
              <div className="py-4">
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {STATUS_PROGRESSION.map((step, idx) => {
                    const StepIcon = step.icon;
                    const currentIdx = getStatusIndex(bookingData.status);
                    const isPassed = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div
                        key={step.key}
                        className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                          isCurrent
                            ? "bg-blue-50 border-brand-blue ring-2 ring-brand-blue/20"
                            : isPassed
                            ? "bg-emerald-50/50 border-emerald-200"
                            : "bg-slate-50/60 border-slate-200/60 opacity-60"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                            isCurrent
                              ? "bg-brand-blue text-white"
                              : isPassed
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[11px] font-bold leading-tight ${
                            isCurrent
                              ? "text-brand-blue"
                              : isPassed
                              ? "text-emerald-800"
                              : "text-slate-500"
                          }`}
                        >
                          {language === "ar" ? step.labelAr : step.labelEn}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Metadata Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">{language === "ar" ? "تاريخ الزيارة:" : "Scheduled Date:"}</span>
                <span className="font-bold text-slate-800">{bookingData.appointmentDate}</span>
                <div className="text-[11px] text-slate-500">{bookingData.appointmentSlot}</div>
              </div>

              <div>
                <span className="text-slate-500 block">{language === "ar" ? "المنطقة والمدينة:" : "Service Location:"}</span>
                <span className="font-bold text-slate-800">{bookingData.city} - {bookingData.area}</span>
              </div>

              <div>
                <span className="text-slate-500 block">{language === "ar" ? "الفني المخصص:" : "Assigned Specialist:"}</span>
                <span className="font-bold text-brand-blue">
                  {bookingData.assignedTechnicianName || (language === "ar" ? "قيد التعيين من المشرف" : "Dispatching Nearest Tech")}
                </span>
              </div>
            </div>

            {/* Status Timeline History */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>{language === "ar" ? "سجل التحديثات المباشرة" : "Live Activity & Updates"}</span>
              </h3>

              <div className="space-y-3 border-s-2 border-slate-200 ms-3 ps-4">
                {bookingData.history && bookingData.history.length > 0 ? (
                  bookingData.history.map((h: any, hIdx: number) => (
                    <div key={hIdx} className="relative space-y-1">
                      <div className="absolute -start-[23px] top-1 w-2.5 h-2.5 rounded-full bg-brand-blue ring-4 ring-white" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 uppercase tracking-wide">
                          {h.status.replace(/_/g, " ")}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(h.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{h.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No updates logged yet.</p>
                )}
              </div>
            </div>

            {/* Direct Communication Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                {language === "ar" ? "هل لديك استفسار حول هذا الموعد؟" : "Have an urgent question regarding this job?"}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${activeContact.phone}`}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{t.common.callNow}</span>
                </a>
                <a
                  href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackBookingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading tracking portal...</div>}>
      <TrackBookingContent />
    </Suspense>
  );
}
