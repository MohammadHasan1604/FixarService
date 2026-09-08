import HeroSection from "@/components/home/HeroSection";
import TrustStrip from "@/components/home/TrustStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import WhyChooseFixar from "@/components/home/WhyChooseFixar";
import AreasWeServe from "@/components/home/AreasWeServe";
import BrandsSection from "@/components/home/BrandsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustStrip />
      <ServicesGrid />
      <HowItWorks />
      <WhyChooseFixar />
      <AreasWeServe />
      <BrandsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
    </div>
  );
}
