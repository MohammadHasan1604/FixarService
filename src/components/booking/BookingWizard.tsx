"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { servicesList } from "@/data/servicesData";
import { brandsList } from "@/data/brandsData";
import { getProblemsForService, ServiceProblemOption } from "@/data/serviceProblems";
import {
  Calendar,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Wrench,
  AlertCircle,
  Copy,
  Check,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Search,
  Building,
  HelpCircle,
} from "lucide-react";

interface BookingFormState {
  serviceId: string;
  serviceTitle: string;
  problemCategory: string;
  description: string;
  brand: string;
  model: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp: string;
  customerEmail: string;
  country: string;
  city: string;
  area: string;
  building: string;
  apartment: string;
  street: string;
  landmark: string;
  mapsLink: string;
  appointmentDate: string;
  appointmentSlot: string;
}

export default function BookingWizard() {
  const { language, t, settings, activeContact, region } = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [serviceSearch, setServiceSearch] = useState<string>("");
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>("all");
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState<BookingFormState>({
    serviceId: "ac-repair",
    serviceTitle: "Air Conditioner Repair & Servicing",
    problemCategory: "Not cooling",
    description: "",
    brand: "General / Other",
    model: "",
    customerName: "",
    customerPhone: "",
    customerWhatsapp: "",
    customerEmail: "",
    country: "United Arab Emirates",
    city: "Sharjah",
    area: "Al Majaz",
    building: "",
    apartment: "",
    street: "",
    landmark: "",
    mapsLink: "",
    appointmentDate: "",
    appointmentSlot: "Morning (09:00 AM - 01:00 PM)",
  });

  // Prefill service if provided in query string
  useEffect(() => {
    const qService = searchParams.get("service");
    if (qService) {
      const match = servicesList.find((s) => s.id === qService || s.slug === qService);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          serviceId: match.id,
          serviceTitle: language === "ar" ? match.titleAr : match.titleEn,
        }));
      }
    }

    // Set today as default date
    const today = new Date();
    const formatted = today.toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      appointmentDate: formatted,
    }));
  }, [searchParams, language]);

  // Sync country/city with active region if not manually altered
  useEffect(() => {
    if (activeContact) {
      setFormData((prev) => ({
        ...prev,
        country: activeContact.country,
        city: activeContact.city.split("&")[0].trim(),
        area: activeContact.serviceAreas[0] || "Downtown",
      }));
    }
  }, [activeContact]);

  // Contextual problems list based on selected service
  const contextualProblems: ServiceProblemOption[] = useMemo(() => {
    return getProblemsForService(formData.serviceId);
  }, [formData.serviceId]);

  // Ensure selected problem matches available options when service changes
  useEffect(() => {
    if (contextualProblems.length > 0) {
      const exists = contextualProblems.some(
        (p) => p.labelEn === formData.problemCategory || p.labelAr === formData.problemCategory
      );
      if (!exists) {
        setFormData((prev) => ({
          ...prev,
          problemCategory: language === "ar" ? contextualProblems[0].labelAr : contextualProblems[0].labelEn,
        }));
      }
    }
  }, [contextualProblems, language]);

  const updateField = (field: keyof BookingFormState, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "customerPhone" && !prev.customerWhatsapp) {
        updated.customerWhatsapp = value;
      }
      return updated;
    });
  };

  const handleServiceSelect = (serviceId: string) => {
    const srv = servicesList.find((s) => s.id === serviceId);
    if (srv) {
      const problems = getProblemsForService(srv.id);
      const defaultProb = problems[0] ? (language === "ar" ? problems[0].labelAr : problems[0].labelEn) : "Other";
      setFormData((prev) => ({
        ...prev,
        serviceId: srv.id,
        serviceTitle: language === "ar" ? srv.titleAr : srv.titleEn,
        problemCategory: defaultProb,
      }));
    }
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    setSubmitError(null);

    // Step 1: Service
    if (step === 1) {
      if (!formData.serviceId) {
        setSubmitError(language === "ar" ? "يرجى اختيار نوع الخدمة أو الجهاز" : "Please select an appliance service");
        return false;
      }
    }

    // Step 2: Problem
    if (step === 2) {
      if (!formData.problemCategory) {
        setSubmitError(language === "ar" ? "يرجى تحديد نوع المشكلة أو العطل" : "Please specify the problem or symptom");
        return false;
      }
    }

    // Step 3: Details (Appliance + Customer)
    if (step === 3) {
      if (!formData.customerName.trim() || formData.customerName.length < 2) {
        setSubmitError(language === "ar" ? "يرجى إدخال اسم العميل بشكل صحيح" : "Please enter your full name");
        return false;
      }
      if (!formData.customerPhone.trim() || formData.customerPhone.length < 7) {
        setSubmitError(language === "ar" ? "يرجى إدخال رقم هاتف صحيح للتواصل" : "Please enter a valid local phone number");
        return false;
      }
    }

    // Step 4: Location
    if (step === 4) {
      if (!formData.city.trim()) {
        setSubmitError(language === "ar" ? "يرجى إدخال المدينة أو الإمارة" : "Please enter your city/emirate");
        return false;
      }
      if (!formData.area.trim()) {
        setSubmitError(language === "ar" ? "يرجى إدخال المنطقة أو الحي" : "Please enter your area or neighborhood");
        return false;
      }
      if (!formData.building.trim()) {
        setSubmitError(
          language === "ar"
            ? "يرجى إدخال اسم أو رقم البناية أو الفيلا لتسهيل وصول الفني"
            : "Please enter building / villa name or number"
        );
        return false;
      }
    }

    // Step 5: Appointment
    if (step === 5) {
      if (!formData.appointmentDate) {
        setSubmitError(language === "ar" ? "يرجى اختيار التاريخ المفضل للزيارة" : "Please select a preferred date");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerPhone: formData.customerPhone,
          customerWhatsapp: formData.customerWhatsapp || formData.customerPhone,
          customerEmail: formData.customerEmail || undefined,
          country: formData.country,
          city: formData.city,
          area: formData.area,
          address: {
            building: formData.building,
            apartment: formData.apartment,
            street: formData.street,
            landmark: formData.landmark,
            mapsLink: formData.mapsLink,
          },
          serviceId: formData.serviceId,
          serviceTitle: formData.serviceTitle,
          brand: formData.brand,
          model: formData.model,
          problemCategory: formData.problemCategory,
          description: formData.description || "General diagnosis and inspection requested",
          appointmentDate: formData.appointmentDate,
          appointmentSlot: formData.appointmentSlot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit booking");
      }

      setBookingResult(data.booking);
      setCurrentStep(7); // Success Step
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred during booking submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReference = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const ArrowNext = language === "ar" ? ArrowLeft : ArrowRight;
  const ArrowBack = language === "ar" ? ArrowRight : ArrowLeft;
  const todayStr = new Date().toISOString().split("T")[0];

  // Filter services for Step 1
  const filteredServices = useMemo(() => {
    return servicesList.filter((srv) => {
      const matchesSearch =
        serviceSearch === "" ||
        srv.titleEn.toLowerCase().includes(serviceSearch.toLowerCase()) ||
        srv.titleAr.includes(serviceSearch);
      const matchesCategory =
        selectedCategoryTab === "all" || srv.category === selectedCategoryTab;
      return matchesSearch && matchesCategory;
    });
  }, [serviceSearch, selectedCategoryTab]);

  // SUCCESS STEP (Step 7)
  if (currentStep === 7 && bookingResult) {
    const whatsappAlertMsg = encodeURIComponent(
      language === "ar"
        ? `مرحباً فيكسار سيرفيس، لقد قمت بحجز موعد صيانة برقم مرجعي: ${bookingResult.reference}\nالخدمة: ${bookingResult.serviceTitle}\nالمدينة: ${bookingResult.city}\nتاريخ الموعد: ${bookingResult.appointmentDate}`
        : `Hello Fixar Service, I submitted a booking request with reference: ${bookingResult.reference}\nService: ${bookingResult.serviceTitle}\nCity: ${bookingResult.city}\nAppointment Date: ${bookingResult.appointmentDate}`
    );

    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 max-w-2xl mx-auto text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
            {language === "ar" ? "تم استلام طلب الحجز" : "Booking Request Received"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            {t.booking.successTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            {t.booking.successDesc}
          </p>
        </div>

        {/* Reference Code Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 max-w-md mx-auto">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {t.booking.refLabel}
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xl sm:text-2xl font-black font-mono tracking-widest text-brand-blue ltr-isolate">
              {bookingResult.reference}
            </span>
            <button
              onClick={() => copyReference(bookingResult.reference)}
              className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
              title="Copy Reference"
            >
              {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            {language === "ar"
              ? "احتفظ بهذا الرقم لتتبع حالة موعدك والتواصل مع الفني"
              : "Save this reference to track your technician en route"}
          </p>
        </div>

        {/* Booking Snapshot */}
        <div className="bg-slate-50/70 rounded-2xl p-4 text-xs text-start max-w-md mx-auto space-y-1.5 border border-slate-200/60">
          <div className="flex justify-between">
            <span className="text-slate-500">{language === "ar" ? "الخدمة:" : "Service:"}</span>
            <span className="font-bold text-slate-800">{bookingResult.serviceTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{language === "ar" ? "الموعد المفضل:" : "Preferred Appointment:"}</span>
            <span className="font-semibold text-brand-blue">{bookingResult.appointmentDate} ({bookingResult.appointmentSlot?.split(" ")[0]})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">{language === "ar" ? "الموقع:" : "Location:"}</span>
            <span className="font-medium text-slate-700">{bookingResult.area}, {bookingResult.city}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={`/track-booking?ref=${bookingResult.reference}&phone=${encodeURIComponent(bookingResult.customerPhone)}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.booking.trackBtn}</span>
          </Link>

          <a
            href={`https://wa.me/${activeContact.whatsapp.replace(/\+/g, "")}?text=${whatsappAlertMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{language === "ar" ? "تأكيد فوري عبر واتساب" : "WhatsApp Dispatch"}</span>
          </a>

          <a
            href={`tel:${activeContact.phone}`}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200"
          >
            <Phone className="w-4 h-4 text-brand-orange" />
            <span>{t.common.callNow}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-4 sm:p-8 md:p-10 max-w-4xl mx-auto">
      {/* 6-Step Stepper Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-600">
          <span>
            {language === "ar" ? `الخطوة ${currentStep} من 6` : `Step ${currentStep} of 6`}
          </span>
          <span className="text-brand-blue font-bold">
            {currentStep === 1 && t.booking.step1}
            {currentStep === 2 && t.booking.step2}
            {currentStep === 3 && t.booking.step3}
            {currentStep === 4 && t.booking.step4}
            {currentStep === 5 && t.booking.step5}
            {currentStep === 6 && t.booking.step6}
          </span>
        </div>

        {/* Visual Stepper Pills */}
        <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mb-2">
          {[1, 2, 3, 4, 5, 6].map((st) => (
            <div
              key={st}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentStep >= st
                  ? "bg-gradient-to-r from-brand-blue to-brand-orange"
                  : "bg-slate-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Error Alert Box */}
      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-xs text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{submitError}</span>
        </div>
      )}

      {/* STEP 1: Select Service */}
      {currentStep === 1 && (
        <div className="space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-brand-navy">
              {language === "ar" ? "الخطوة 1: حدد الجهاز أو الخدمة المطلوبة" : "Step 1: Select Appliance or Service"}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "ar"
                ? "اختر الجهاز من القائمة أدناه لتحديد الفني المتخصص والمعدات اللازمة"
                : "Choose your appliance from our certified repair catalog"}
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <input
                type="text"
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                placeholder={language === "ar" ? "ابحث عن جهاز (مكيف، غسالة، ثلاجة...)" : "Search appliance (AC, fridge, washer...)"}
                className="w-full ps-9 pe-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { key: "all", en: "All", ar: "الكل" },
                { key: "cooling", en: "Cooling", ar: "تبريد" },
                { key: "laundry", en: "Laundry", ar: "غسيل" },
                { key: "kitchen", en: "Kitchen", ar: "مطبخ" },
                { key: "water", en: "Water", ar: "مياه" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedCategoryTab(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                    selectedCategoryTab === tab.key
                      ? "bg-brand-blue text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {language === "ar" ? tab.ar : tab.en}
                </button>
              ))}
            </div>
          </div>

          {/* 15 Services Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[380px] overflow-y-auto p-1 border border-slate-100 rounded-2xl bg-slate-50/50">
            {filteredServices.map((service) => {
              const isSelected = formData.serviceId === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceSelect(service.id)}
                  className={`p-3.5 rounded-xl border text-start flex flex-col justify-between transition-all ${
                    isSelected
                      ? "border-brand-blue bg-blue-50/90 ring-2 ring-brand-blue/30 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-brand-orange uppercase">
                      {language === "ar" ? service.categoryNameAr : service.categoryNameEn}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />}
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {language === "ar" ? service.titleAr : service.titleEn}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              {language === "ar" ? "الجهاز المحدد:" : "Selected Appliance:"}{" "}
              <strong className="text-brand-blue">{formData.serviceTitle}</strong>
            </span>
          </div>
        </div>
      )}

      {/* STEP 2: Dynamic Contextual Problem Options */}
      {currentStep === 2 && (
        <div className="space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-brand-navy">
              {language === "ar"
                ? `الخطوة 2: ما هي مشكلة (${formData.serviceTitle})؟`
                : `Step 2: What is the issue with your ${formData.serviceTitle}?`}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "ar"
                ? "اختر المشكلة الرئيسية لتجهيز القطع المناسبة قبل وصول الفني"
                : "Select the specific symptom or malfunction to prepare the technician"}
            </p>
          </div>

          {/* Contextual Problem Selection Grid */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              {language === "ar" ? "الأعطال الشائعة لهذا الجهاز:" : "Common Issues for this Appliance:"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {contextualProblems.map((prob) => {
                const label = language === "ar" ? prob.labelAr : prob.labelEn;
                const isSelected = formData.problemCategory === label || formData.problemCategory === prob.labelEn;

                return (
                  <button
                    key={prob.id}
                    type="button"
                    onClick={() => updateField("problemCategory", label)}
                    className={`p-3 rounded-xl border text-start flex items-center justify-between transition-all ${
                      isSelected
                        ? "border-brand-blue bg-blue-50/90 ring-2 ring-brand-blue/30 font-bold text-brand-navy shadow-xs"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs"
                    }`}
                  >
                    <span className="text-xs leading-snug">{label}</span>
                    {isSelected && <Check className="w-4 h-4 text-brand-blue shrink-0 ms-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Issue Notes / Description */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {language === "ar" ? "ملاحظات إضافية حول العطل (اختياري)" : "Additional Problem Description (Optional)"}
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder={t.booking.descPlaceholder}
            />
          </div>
        </div>
      )}

      {/* STEP 3: Appliance Details & Customer Info */}
      {currentStep === 3 && (
        <div className="space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-brand-navy">
              {language === "ar" ? "الخطوة 3: بيانات الماركة والتواصل" : "Step 3: Brand & Contact Information"}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "ar"
                ? "حدد ماركة الجهاز وأدخل معلومات التواصل الخاصة بك لتأكيد الموعد"
                : "Provide appliance brand and your local contact details for confirmation"}
            </p>
          </div>

          {/* Appliance Brand & Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.brandLabel} *
              </label>
              <select
                value={formData.brand}
                onChange={(e) => updateField("brand", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none bg-white"
              >
                <option value="General / Other">General / Other Brand</option>
                {brandsList.map((b) => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.modelLabel}
              </label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => updateField("model", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder={language === "ar" ? "اختياري (مثال: 2 Ton Inverter / 8kg Front Load)" : "Optional (e.g., 2 Ton Inverter / 8kg)"}
              />
            </div>
          </div>

          {/* Customer Contact Information */}
          <div className="border-t border-slate-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.fullName} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => updateField("customerName", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder={language === "ar" ? "أحمد المنصوري" : "E.g. Ahmed Al Mansoori"}
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute end-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.phone} *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  inputMode="tel"
                  value={formData.customerPhone}
                  onChange={(e) => updateField("customerPhone", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder="054 337 7512"
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute end-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.whatsappNumber}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  inputMode="tel"
                  value={formData.customerWhatsapp}
                  onChange={(e) => updateField("customerWhatsapp", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder="054 337 7512"
                />
                <MessageSquare className="w-4 h-4 text-emerald-500 absolute end-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.email}
              </label>
              <div className="relative">
                <input
                  type="email"
                  inputMode="email"
                  value={formData.customerEmail}
                  onChange={(e) => updateField("customerEmail", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder="client@example.com"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute end-3 top-3" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Location Details */}
      {currentStep === 4 && (
        <div className="space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-brand-navy">
              {language === "ar" ? "الخطوة 4: موقع وعنوان الزيارة المنزلية" : "Step 4: Service Location & Address"}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "ar"
                ? "يرجى كتابة تفاصيل البناية أو الفيلا بدقة لتسهيل وصول سيارة الفني"
                : "Provide complete building, villa, and street address for prompt dispatch"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.countryLabel} *
              </label>
              <select
                value={formData.country}
                onChange={(e) => updateField("country", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none bg-white"
              >
                <option value="United Arab Emirates">United Arab Emirates (الإمارات)</option>
                <option value="Oman">Oman (سلطنة عُمان)</option>
                <option value="Saudi Arabia">Saudi Arabia (السعودية)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.cityLabel} *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="Sharjah, Dubai, Ajman..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.areaLabel} *
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => updateField("area", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="Al Majaz, Al Nahda, Muwaileh..."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.building} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.building}
                  onChange={(e) => updateField("building", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder={language === "ar" ? "برج الكورنيش / فيلا 12" : "E.g., Corniche Tower / Villa 12"}
                  required
                />
                <Building className="w-4 h-4 text-slate-400 absolute end-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === "ar" ? "الشارع / علامة مميزة" : "Street / Landmark"}
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => updateField("street", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder={language === "ar" ? "مثال: شارع الاتحاد / قرب المسجد" : "E.g., Al Ittihad St / Near Mosque"}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.apartment}
              </label>
              <input
                type="text"
                value={formData.apartment}
                onChange={(e) => updateField("apartment", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder={language === "ar" ? "شقة 402 (اختياري)" : "E.g., Apt 402 (Optional)"}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Appointment Scheduling */}
      {currentStep === 5 && (
        <div className="space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-brand-navy">
              {language === "ar" ? "الخطوة 5: الموعد والفترة الزمنية" : "Step 5: Preferred Appointment Date & Time"}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "ar"
                ? "حدد اليوم والوقت المناسب لك، وسيقوم فني الصيانة بالحضور في الموعد المحدد"
                : "Choose your preferred date and window. Emergency 24/7 service is available across UAE"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.prefDate} *
              </label>
              <input
                type="date"
                min={todayStr}
                value={formData.appointmentDate}
                onChange={(e) => updateField("appointmentDate", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                required
              />
              <p className="text-[11px] text-slate-500 mt-1.5">
                {language === "ar" ? "نوفر خدمة في نفس اليوم في معظم المناطق" : "Same-day service available in most areas"}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.booking.prefTime} *
              </label>
              <div className="space-y-2">
                {[
                  { id: "Morning (09:00 AM - 01:00 PM)", label: t.booking.slotMorning },
                  { id: "Afternoon (01:00 PM - 05:00 PM)", label: t.booking.slotAfternoon },
                  { id: "Evening (05:00 PM - 09:00 PM)", label: t.booking.slotEvening },
                  { id: "Immediate Emergency (Within 90 Mins)", label: t.booking.slotEmergency, highlight: true },
                ].map((slot) => (
                  <label
                    key={slot.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      formData.appointmentSlot === slot.id
                        ? "border-brand-blue bg-blue-50/70 font-bold"
                        : "border-slate-200 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <input
                      type="radio"
                      name="appointmentSlot"
                      value={slot.id}
                      checked={formData.appointmentSlot === slot.id}
                      onChange={() => updateField("appointmentSlot", slot.id)}
                      className="text-brand-blue focus:ring-brand-blue"
                    />
                    <span className="text-xs text-slate-800">
                      {slot.label}
                      {slot.highlight && (
                        <span className="ms-2 px-1.5 py-0.5 rounded bg-brand-orange text-white text-[10px] font-bold">
                          24/7
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Review & Confirmation */}
      {currentStep === 6 && (
        <div className="space-y-5 animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-brand-navy">
              {t.booking.reviewHeader}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "ar"
                ? "تأكد من صحة بياناتك وموقعك قبل إرسال طلب الحجز"
                : "Please review all details carefully before submitting your service booking"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Service & Problem Review */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-brand-navy block uppercase text-[11px] tracking-wider border-b pb-1">
                {language === "ar" ? "الجهاز والعطل:" : "Appliance & Issue:"}
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === "ar" ? "الخدمة:" : "Service:"}</span>
                <span className="font-bold text-slate-800">{formData.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === "ar" ? "المشكلة:" : "Problem:"}</span>
                <span className="font-bold text-brand-orange">{formData.problemCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === "ar" ? "الماركة / الموديل:" : "Brand / Model:"}</span>
                <span className="font-semibold text-slate-800">
                  {formData.brand} {formData.model ? `(${formData.model})` : ""}
                </span>
              </div>
              {formData.description && (
                <div className="pt-1 text-slate-600 italic border-t border-slate-200/60">
                  "{formData.description}"
                </div>
              )}
            </div>

            {/* Customer & Appointment Review */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-brand-navy block uppercase text-[11px] tracking-wider border-b pb-1">
                {language === "ar" ? "بيانات التواصل والموعد:" : "Contact & Schedule:"}
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === "ar" ? "الاسم:" : "Name:"}</span>
                <span className="font-bold text-slate-800">{formData.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === "ar" ? "الهاتف:" : "Phone:"}</span>
                <bdi className="font-semibold text-slate-800">{formData.customerPhone}</bdi>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === "ar" ? "التاريخ:" : "Date:"}</span>
                <span className="font-bold text-brand-blue">{formData.appointmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === "ar" ? "الفترة:" : "Slot:"}</span>
                <span className="font-semibold text-slate-800">{formData.appointmentSlot}</span>
              </div>
            </div>

            {/* Address Full Review */}
            <div className="md:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <span className="font-bold text-brand-navy block uppercase text-[11px] tracking-wider border-b pb-1">
                {language === "ar" ? "عنوان الزيارة:" : "Service Address:"}
              </span>
              <p className="text-slate-700 font-medium">
                {[
                  formData.building,
                  formData.apartment ? `${language === "ar" ? "شقة" : "Apt"} ${formData.apartment}` : null,
                  formData.street,
                  formData.area,
                  formData.city,
                  formData.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {formData.landmark && (
                <p className="text-slate-500">
                  {language === "ar" ? "علامة مميزة:" : "Landmark:"} {formData.landmark}
                </p>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/60 text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
            <p>{t.booking.confirmNotice}</p>
          </div>
        </div>
      )}

      {/* Navigation Controls (Back / Next / Submit) */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ArrowBack className="w-4 h-4" />
            <span>{t.booking.back}</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 6 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-brand-blue/20 transition-all"
          >
            <span>{t.booking.next}</span>
            <ArrowNext className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmitBooking}
            className="px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-brand-orange/30 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? (
              <span>{t.common.loading}</span>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>{t.booking.submitBooking}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
