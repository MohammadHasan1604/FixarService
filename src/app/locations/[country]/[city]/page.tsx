import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { initialBusinessSettings } from "@/data/businessSettings";
import { servicesList } from "@/data/servicesData";
import {
  MapPin,
  Phone,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface CityMeta {
  countrySlug: string;
  citySlug: string;
  countryNameEn: string;
  countryNameAr: string;
  cityNameEn: string;
  cityNameAr: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  addressEn: string;
  addressAr: string;
  descriptionEn: string;
  descriptionAr: string;
  keyAreas: string[];
  googleMapsUrl: string;
}

const CITY_DATA: Record<string, CityMeta> = {
  "uae-sharjah": {
    countrySlug: "uae",
    citySlug: "sharjah",
    countryNameEn: "United Arab Emirates",
    countryNameAr: "الإمارات العربية المتحدة",
    cityNameEn: "Sharjah",
    cityNameAr: "الشارقة",
    phone: "+971543377512",
    phoneDisplay: "+971 54 337 7512",
    whatsapp: "+971543377512",
    addressEn: "106 Al Zahraa St–105th St, Hay Al Sharq, Sharjah, UAE",
    addressAr: "106 شارع الزهراء - شارع 105، حي الشرق، الشارقة",
    descriptionEn: "Headquarters of Fixar Service. Comprehensive same-day doorstep appliance diagnostics, AC gas refilling, chemical washing, refrigerator inverter board fixes, and washer repairs across all Sharjah communities.",
    descriptionAr: "المقر الرئيسي لشركة فيكسار سيرفيس. خدمات صيانة فورية للأجهزة المنزلية في نفس اليوم تشمل غسيل وشحن غاز المكيفات، صيانة الثلاجات والغسالات في كافة مناطق الشارقة.",
    keyAreas: ["Al Majaz", "Al Nahda", "Muwaileh", "Al Taawun", "Al Qasimia", "Al Yarmook", "Al Khan", "Halwan", "Al Juraina"],
    googleMapsUrl: "https://maps.app.goo.gl/LrnC8H42yujc5oTM6?g_st=iw",
  },
  "uae-dubai": {
    countrySlug: "uae",
    citySlug: "dubai",
    countryNameEn: "United Arab Emirates",
    countryNameAr: "الإمارات العربية المتحدة",
    cityNameEn: "Dubai",
    cityNameAr: "دبي",
    phone: "+971543377512",
    phoneDisplay: "+971 54 337 7512",
    whatsapp: "+971543377512",
    addressEn: "Rapid Dispatch Depot Serving Dubai Residential & Commercial Areas",
    addressAr: "مركز توزيع سريع يخدم كافة المناطق السكنية والتجارية في دبي",
    descriptionEn: "Fast, certified appliance repair for Dubai villas and apartments. We maintain chillers, split ACs, high-end French-door refrigerators, built-in induction hobs, and washer-dryer units.",
    descriptionAr: "صيانة معتمدة وسريعة للأجهزة المنزلية في دبي للشقق والفلل. نصلح المكيفات، الثلاجات الذكية، الأفران والمسطحات، والنشافات والغسالات بأحدث المعدات.",
    keyAreas: ["Deira", "Al Barsha", "Mirdif", "Jumeirah", "Downtown Dubai", "Business Bay", "Dubai Marina", "Al Quoz", "JVC"],
    googleMapsUrl: "https://maps.google.com/?q=Dubai+UAE",
  },
  "uae-ajman": {
    countrySlug: "uae",
    citySlug: "ajman",
    countryNameEn: "United Arab Emirates",
    countryNameAr: "الإمارات العربية المتحدة",
    cityNameEn: "Ajman",
    cityNameAr: "عجمان",
    phone: "+971543377512",
    phoneDisplay: "+971 54 337 7512",
    whatsapp: "+971543377512",
    addressEn: "Serving Al Nuaimia, Al Rashidiya, and All Ajman Districts",
    addressAr: "خدمة سريعة في النعيمية، الراشدية، وكافة مناطق عجمان",
    descriptionEn: "Swift 45-minute dispatch from our Sharjah border hub into Ajman. Specialized in water heater element replacement, deep freezer maintenance, and AC coil cleaning.",
    descriptionAr: "وصول سريع خلال 45 دقيقة من مركزنا المتاخم لعجمان. تخصص في صيانة سخانات المياه، الفريزرات، وغسيل المكيفات.",
    keyAreas: ["Al Nuaimia", "Al Rashidiya", "Al Jurf", "Al Rawda", "Ajman Downtown", "Al Mowaihat"],
    googleMapsUrl: "https://maps.google.com/?q=Ajman+UAE",
  },
  "oman-muscat": {
    countrySlug: "oman",
    citySlug: "muscat",
    countryNameEn: "Oman",
    countryNameAr: "سلطنة عُمان",
    cityNameEn: "Muscat",
    cityNameAr: "مسقط",
    phone: "+96895925092",
    phoneDisplay: "+968 95925092",
    whatsapp: "+96895925092",
    addressEn: "Muscat Governorate, Sultanate of Oman",
    addressAr: "محافظة مسقط، سلطنة عُمان",
    descriptionEn: "Regional Fixar Service branch for Muscat households. Prompt home repairs for split AC cooling issues, washing machine drum bearings, and refrigerator troubleshooting.",
    descriptionAr: "فرع فيكسار سيرفيس الإقليمي في مسقط. صيانة منزلية فورية لأعطال تبريد المكيفات، رولمان بلي الغسالات، وثلاجات المنازل.",
    keyAreas: ["Muscat City", "Seeb", "Bawshar", "Muttrah", "Al Khuwair", "Azaiba", "Ghubrah", "Mawaleh"],
    googleMapsUrl: "https://maps.google.com/?q=Muscat+Oman",
  },
  "saudi-arabia-riyadh": {
    countrySlug: "saudi-arabia",
    citySlug: "riyadh",
    countryNameEn: "Saudi Arabia",
    countryNameAr: "المملكة العربية السعودية",
    cityNameEn: "Riyadh",
    cityNameAr: "الرياض",
    phone: "+966506746486",
    phoneDisplay: "050 674 6486",
    whatsapp: "+966506746486",
    addressEn: "Riyadh Metropolitan Region, Kingdom of Saudi Arabia",
    addressAr: "منطقة الرياض وضواحيها، المملكة العربية السعودية",
    descriptionEn: "Regional Fixar Service dispatch desk in Riyadh. Doorstep repairs for air conditioning, kitchen appliances, and residential cooling systems.",
    descriptionAr: "مكتب التنسيق الإقليمي لفيكسار في الرياض. صيانة منزلية متخصصة للتكييف وأجهزة المطبخ والغسالات.",
    keyAreas: ["Olaya", "Al Malaz", "Al Nakheel", "Al Yasmin", "Al Sahafa", "Al Sulaimaniyah", "Al Murabba"],
    googleMapsUrl: "https://maps.google.com/?q=Riyadh+Saudi+Arabia",
  },
};

export async function generateStaticParams() {
  return Object.values(CITY_DATA).map((c) => ({
    country: c.countrySlug,
    city: c.citySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; city: string }>;
}): Promise<Metadata> {
  const { country, city } = await params;
  const key = `${country}-${city}`;
  const data = CITY_DATA[key];

  if (!data) {
    return { title: "Location Not Found | Fixar Service" };
  }

  return {
    title: `Appliance Repair Services in ${data.cityNameEn}, ${data.countryNameEn} | Fixar`,
    description: data.descriptionEn,
  };
}

export default async function CityLocationPage({
  params,
}: {
  params: Promise<{ country: string; city: string }>;
}) {
  const { country, city } = await params;
  const key = `${country}-${city}`;
  const data = CITY_DATA[key];

  if (!data) {
    notFound();
  }

  const whatsappMsg = encodeURIComponent(
    `Hello Fixar Service, I need appliance repair assistance in ${data.cityNameEn}. Please provide technician availability.`
  );

  return (
    <div className="bg-slate-50 min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <Link href="/" className="hover:text-brand-blue">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/locations" className="hover:text-brand-blue">Locations</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-navy font-bold">{data.countryNameEn}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-orange font-bold">{data.cityNameEn}</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-brand-navy via-[#0d2244] to-brand-navy text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold uppercase">
                <MapPin className="w-3.5 h-3.5" />
                <span>{data.cityNameEn} Service Center</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Appliance Repair & Maintenance in {data.cityNameEn}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {data.descriptionEn}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/book-service`}
                  className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book in {data.cityNameEn}</span>
                </Link>

                <a
                  href={`tel:${data.phone}`}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <bdi>{data.phoneDisplay}</bdi>
                </a>

                <a
                  href={`https://wa.me/${data.whatsapp.replace(/\+/g, "")}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Clock className="w-4 h-4" />
                <span>24/7 Availability Across {data.cityNameEn}</span>
              </div>

              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Location Hub:</span>
                <span className="text-slate-200">{data.addressEn}</span>
              </div>

              <div className="pt-2">
                <a
                  href={data.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white text-brand-navy font-bold text-center block hover:bg-slate-100 transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Neighborhood Coverage Grid */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-brand-navy">
              Neighborhoods & Districts We Cover in {data.cityNameEn}
            </h2>
            <p className="text-xs text-slate-500">
              Our mobile technicians provide on-site diagnostics across these key residential and commercial zones:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {data.keyAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services Available Here */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-brand-navy">
                Available Repair Services in {data.cityNameEn}
              </h2>
              <p className="text-xs text-slate-500">
                100% genuine parts and on-site inspection for all major home appliance categories.
              </p>
            </div>
            <Link href="/services" className="text-xs font-bold text-brand-blue hover:underline">
              View All 15 Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.slice(0, 4).map((srv) => (
              <div
                key={srv.slug}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2 mb-4">
                  <span className="text-[10px] font-bold text-brand-orange uppercase">
                    {srv.categoryNameEn}
                  </span>
                  <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                    {srv.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{srv.shortDescEn}</p>
                </div>

                <Link
                  href={`/services/${srv.slug}`}
                  className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
