import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { servicesList, ServiceItem } from "@/data/servicesData";
import { initialBusinessSettings } from "@/data/businessSettings";
import {
  Calendar,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Clock,
  HelpCircle,
} from "lucide-react";

export async function generateStaticParams() {
  return servicesList.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesList.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service Not Found | Fixar Service" };
  }

  return {
    title: `${service.titleEn} in Sharjah & Dubai | Fixar Service`,
    description: service.shortDescEn,
    openGraph: {
      title: `${service.titleEn} | Fixar Service UAE`,
      description: service.shortDescEn,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesList.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = servicesList
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const uaeContact = initialBusinessSettings.supportedRegions.uae;

  const whatsappMsg = encodeURIComponent(
    `Hello Fixar Service, I need assistance with ${service.titleEn} in Sharjah/Dubai. Please let me know technician availability.`
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Service Hero Section */}
      <section className="bg-gradient-to-b from-brand-navy via-[#0c203f] to-brand-navy text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-brand-orange font-semibold">{service.titleEn}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>{service.categoryNameEn}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {service.titleEn}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {service.longDescEn}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href={`/book-service?service=${service.id}`}
                  className="px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs sm:text-sm shadow-xl shadow-brand-orange/30 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Service</span>
                </Link>

                <a
                  href={`tel:${uaeContact.phone}`}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span>Call 24/7 Hotline</span>
                </a>

                <a
                  href={`https://wa.me/${uaeContact.whatsapp.replace(/\+/g, "")}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] bg-slate-900">
                <img
                  src={service.image}
                  alt={service.titleEn}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 border border-slate-700/80 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-white">Genuine Replacement Parts</div>
                      <div className="text-[10px] text-slate-300">Service Warranty Included</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-brand-orange">Sharjah & Dubai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Problems & Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Common Problems */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h2 className="text-lg font-bold text-slate-900">Common Problems We Solve</h2>
            </div>
            <p className="text-xs text-slate-500">
              If your appliance exhibits any of these typical warning signs, schedule a diagnostic check:
            </p>
            <ul className="space-y-3 pt-2">
              {service.commonProblemsEn.map((prob, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions We Deliver */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2 text-brand-blue">
              <Wrench className="w-5 h-5 shrink-0" />
              <h2 className="text-lg font-bold text-slate-900">Our Professional Repair Solutions</h2>
            </div>
            <p className="text-xs text-slate-500">
              Our technicians carry precision testing tools and replacement components:
            </p>
            <ul className="space-y-3 pt-2">
              {service.solutionsEn.map((sol, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Supported Models & Types */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <h2 className="text-lg font-bold text-brand-navy">
            Supported Appliance Types & Configurations
          </h2>
          <p className="text-xs text-slate-500">
            We service all configurations from residential apartments to large villas and commercial setups:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
            {service.supportedTypesEn.map((type, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center text-xs font-bold text-slate-800"
              >
                {type}
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Process Strip */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Straightforward Service
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Our 4-Step Repair Procedure</h2>
            <p className="text-xs text-slate-300">
              Clear, transparent steps from your initial phone call or booking to job completion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-brand-orange font-bold text-lg">01</span>
              <h3 className="font-bold text-white text-sm">Schedule Service</h3>
              <p className="text-slate-300">Submit a booking online or call our 24/7 hotline with your address.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-brand-orange font-bold text-lg">02</span>
              <h3 className="font-bold text-white text-sm">Diagnostic Visit</h3>
              <p className="text-slate-300">A certified technician arrives at your home equipped with diagnostic meters.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-brand-orange font-bold text-lg">03</span>
              <h3 className="font-bold text-white text-sm">Quote & Repair</h3>
              <p className="text-slate-300">Review clear upfront pricing. Upon your approval, the issue is fixed on site.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-brand-orange font-bold text-lg">04</span>
              <h3 className="font-bold text-white text-sm">Testing & Warranty</h3>
              <p className="text-slate-300">Full operational test with the homeowner, invoice issuance, and warranty.</p>
            </div>
          </div>
        </div>

        {/* FAQs for this Service */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h2 className="text-2xl font-black text-brand-navy">
                Questions About {service.titleEn}
              </h2>
              <p className="text-xs text-slate-500">
                Common inquiries regarding technician arrival times and spare parts warranty.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.faqs.map((f, fIdx) => (
                <div key={fIdx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>{f.qEn}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.aEn}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Services */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand-navy">Other Appliance Services</h2>
            <Link href="/services" className="text-xs font-bold text-brand-blue hover:underline">
              View All Services →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="h-36 w-full overflow-hidden bg-slate-900">
                  <img
                    src={rel.image}
                    alt={rel.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {rel.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.shortDescEn}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Booking Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-start">
            <h3 className="text-xl font-bold text-brand-navy">
              Ready to Book {service.titleEn}?
            </h3>
            <p className="text-xs text-slate-600">
              Schedule your appointment in 2 minutes. Our technicians are available 24/7 across Sharjah, Dubai, and Ajman.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/book-service?service=${service.id}`}
              className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <a
              href={`tel:${uaeContact.phone}`}
              className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>Call Hotline</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
