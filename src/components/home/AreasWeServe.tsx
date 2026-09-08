"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { MapPin, Phone, MessageSquare, ArrowRight, ArrowLeft } from "lucide-react";

export default function AreasWeServe() {
  const { language, settings } = useLocale();
  const ArrowIcon = language === "ar" ? ArrowLeft : ArrowRight;

  const locations = [
    {
      countryEn: "United Arab Emirates",
      countryAr: "الإمارات العربية المتحدة",
      cityEn: "Sharjah (Headquarters)",
      cityAr: "الشارقة (المقر الرئيسي)",
      addressEn: "106 Al Zahraa St–105th St, Hay Al Sharq, Sharjah",
      addressAr: "106 شارع الزهراء - شارع 105، حي الشرق، الشارقة",
      phone: "+971 54 337 7512",
      phoneRaw: "+971543377512",
      areasEn: ["Al Majaz", "Al Nahda", "Muwaileh", "Al Taawun", "Al Qasimia", "Sharjah Industrial"],
      areasAr: ["المجاز", "النهدة", "مويليح", "التعاون", "القاسمية", "صناعية الشارقة"],
      badge: language === "ar" ? "المقر الرئيسي" : "Main Hub",
      featured: true,
      link: "/locations/uae/sharjah",
    },
    {
      countryEn: "United Arab Emirates",
      countryAr: "الإمارات العربية المتحدة",
      cityEn: "Dubai & Ajman",
      cityAr: "دبي وعجمان",
      addressEn: "Serving residential communities across Dubai & Ajman",
      addressAr: "تغطية سريعة لجميع المجمعات السكنية بدبي وعجمان",
      phone: "+971 54 337 7512",
      phoneRaw: "+971543377512",
      areasEn: ["Deira", "Al Barsha", "Mirdif", "Jumeirah", "Downtown", "Al Nuaimia", "Al Rashidiya"],
      areasAr: ["ديرة", "البرشاء", "مردف", "جميرا", "داون تاون", "النعيمية", "الراشدية"],
      badge: language === "ar" ? "تغطية واسعة" : "Active Coverage",
      featured: false,
      link: "/locations/uae/dubai",
    },
    {
      countryEn: "Sultanate of Oman",
      countryAr: "سلطنة عُمان",
      cityEn: "Muscat",
      cityAr: "مسقط",
      addressEn: "Muscat Governorate, Sultanate of Oman",
      addressAr: "محافظة مسقط، سلطنة عُمان",
      phone: "+968 95925092",
      phoneRaw: "+96895925092",
      areasEn: ["Seeb", "Bawshar", "Muttrah", "Al Khuwair", "Azaiba"],
      areasAr: ["السيب", "بوشر", "مطرح", "الخوير", "العذيبة"],
      badge: language === "ar" ? "خدمة إقليمية" : "Regional Service",
      featured: false,
      link: "/locations/oman/muscat",
    },
    {
      countryEn: "Kingdom of Saudi Arabia",
      countryAr: "المملكة العربية السعودية",
      cityEn: "Riyadh",
      cityAr: "الرياض",
      addressEn: "Riyadh Metropolitan Region",
      addressAr: "منطقة الرياض وضواحيها",
      phone: "050 674 6486",
      phoneRaw: "+966506746486",
      areasEn: ["Olaya", "Al Malaz", "Al Nakheel", "Al Yasmin", "Al Sahafa"],
      areasAr: ["العليا", "الملز", "النخيل", "الياسمين", "الصحافة"],
      badge: language === "ar" ? "خدمة إقليمية" : "Regional Service",
      featured: false,
      link: "/locations/saudi-arabia/riyadh",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "نطاق التغطية الجغرافية" : "Service Areas"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            {language === "ar" ? "المناطق والمدن التي نخدمها" : "Service Areas & Coverage Across the Region"}
          </h2>
          <p className="text-sm text-slate-600">
            {language === "ar"
              ? "فريقنا المتنقل مجهز بسيارات صيانة تصلك أينما كنت في الشارقة، دبي، عجمان ومناطق مختارة في الشرق الأوسط."
              : "Our mobile diagnostic vans are strategically deployed across key residential and commercial hubs for prompt response."}
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                loc.featured
                  ? "border-brand-blue/60 shadow-lg ring-1 ring-brand-blue/20"
                  : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {language === "ar" ? loc.countryAr : loc.countryEn}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      loc.featured
                        ? "bg-brand-blue text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {loc.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-navy mb-1">
                  {language === "ar" ? loc.cityAr : loc.cityEn}
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {language === "ar" ? loc.addressAr : loc.addressEn}
                </p>

                <div className="space-y-1.5 mb-6">
                  <div className="text-[11px] font-semibold text-slate-400">
                    {language === "ar" ? "أبرز الأحياء المشمولة:" : "Key Neighborhoods:"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === "ar" ? loc.areasAr : loc.areasEn).slice(0, 4).map((area, aIdx) => (
                      <span
                        key={aIdx}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <a
                  href={`tel:${loc.phoneRaw}`}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-brand-navy font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  <bdi>{loc.phone}</bdi>
                </a>

                <Link
                  href={loc.link}
                  className="w-full py-2 px-3 rounded-xl text-brand-blue hover:text-brand-blue-dark font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span>{language === "ar" ? "تفاصيل المنطقة" : "View Area Details"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
