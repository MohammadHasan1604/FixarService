export interface RegionalContact {
  id: string;
  country: string;
  countryAr: string;
  city: string;
  cityAr: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  address: string;
  addressAr: string;
  currency: string;
  currencyAr: string;
  googleMapsUrl: string;
  serviceAreas: string[];
  serviceAreasAr: string[];
}

export interface BusinessSettingsType {
  companyName: string;
  companyNameAr: string;
  tagline: string;
  taglineAr: string;
  email: string;
  operatingHours: string;
  operatingHoursAr: string;
  primaryLocation: string;
  primaryLocationAr: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  defaultCountry: string;
  supportedRegions: Record<string, RegionalContact>;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  disclaimerEn: string;
  disclaimerAr: string;
  seoDefaults: {
    titleEn: string;
    titleAr: string;
    descriptionEn: string;
    descriptionAr: string;
  };
}

export const initialBusinessSettings: BusinessSettingsType = {
  companyName: "Fixar Service",
  companyNameAr: "فيكسار سيرفيس",
  tagline: "Professional Home Appliance Repair & Maintenance at Your Doorstep",
  taglineAr: "خدمات تصليح وصيانة الأجهزة المنزلية الاحترافية عند باب منزلك",
  email: "fixarservices@gmail.com",
  operatingHours: "24 Hours / 7 Days",
  operatingHoursAr: "24 ساعة / 7 أيام طوال الأسبوع",
  primaryLocation: "106 Al Zahraa St–105th St, Hay Al Sharq, Sharjah, UAE",
  primaryLocationAr: "106 شارع الزهراء - شارع 105، حي الشرق، الشارقة، الإمارات",
  googleMapsDirectionsUrl: "https://maps.app.goo.gl/LrnC8H42yujc5oTM6?g_st=iw",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.3262602715783!2d55.390506!3d25.358702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f596a793a8d11%3A0x7bebe84c79ca906a!2s106%20Al%20Zahraa%20St%20-%20Sharjah!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae",
  defaultCountry: "uae",
  supportedRegions: {
    uae: {
      id: "uae",
      country: "United Arab Emirates",
      countryAr: "الإمارات العربية المتحدة",
      city: "Sharjah & Dubai",
      cityAr: "الشارقة ودبي وعجمان",
      phone: "+971543377512",
      phoneDisplay: "+971 54 337 7512",
      whatsapp: "+971543377512",
      whatsappDisplay: "+971 54 337 7512",
      address: "106 Al Zahraa St–105th St, Hay Al Sharq, Sharjah, UAE",
      addressAr: "106 شارع الزهراء - شارع 105، حي الشرق، الشارقة",
      currency: "AED",
      currencyAr: "درهم",
      googleMapsUrl: "https://maps.app.goo.gl/LrnC8H42yujc5oTM6?g_st=iw",
      serviceAreas: ["Sharjah", "Dubai", "Ajman", "Al Nahda", "Al Majaz", "Muwaileh", "Deira", "Al Barsha", "Mirdif"],
      serviceAreasAr: ["الشارقة", "دبي", "عجمان", "النهدة", "المجاز", "مويليح", "ديرة", "البرشاء", "مردف"],
    },
    oman: {
      id: "oman",
      country: "Oman",
      countryAr: "سلطنة عُمان",
      city: "Muscat",
      cityAr: "مسقط",
      phone: "+96895925092",
      phoneDisplay: "+968 95925092",
      whatsapp: "+96895925092",
      whatsappDisplay: "+968 95925092",
      address: "Muscat, Sultanate of Oman",
      addressAr: "مسقط، سلطنة عُمان",
      currency: "OMR",
      currencyAr: "ريال عماني",
      googleMapsUrl: "https://maps.google.com/?q=Muscat+Oman",
      serviceAreas: ["Muscat", "Seeb", "Bawshar", "Muttrah", "Al Khuwair", "Azaiba"],
      serviceAreasAr: ["مسقط", "السيب", "بوشر", "مطرح", "الخوير", "العذيبة"],
    },
    saudi: {
      id: "saudi",
      country: "Saudi Arabia",
      countryAr: "المملكة العربية السعودية",
      city: "Riyadh",
      cityAr: "الرياض",
      phone: "+966506746486",
      phoneDisplay: "050 674 6486",
      whatsapp: "+966506746486",
      whatsappDisplay: "050 674 6486",
      address: "Riyadh, Kingdom of Saudi Arabia",
      addressAr: "الرياض، المملكة العربية السعودية",
      currency: "SAR",
      currencyAr: "ريال",
      googleMapsUrl: "https://maps.google.com/?q=Riyadh+Saudi+Arabia",
      serviceAreas: ["Riyadh", "Olaya", "Al Malaz", "Al Nakheel", "Al Yasmin", "Al Sahafa"],
      serviceAreasAr: ["الرياض", "العليا", "الملز", "النخيل", "الياسمين", "الصحافة"],
    },
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  disclaimerEn: "Fixar is an independent appliance repair and maintenance service provider. Brand names and trademarks belong to their respective owners and are used solely to identify appliances serviced. Fixar is not affiliated with or authorized by manufacturers unless explicitly stated.",
  disclaimerAr: "فيكسار هي شركة مستقلة لتقديم خدمات صيانة وإصلاح الأجهزة المنزلية. جميع أسماء العلامات التجارية والعلامات التجارية المسجلة مملوكة لأصحابها المعنيين وتستخدم فقط لتوضيح الأجهزة التي نقدم خدمات صيانتها. فيكسار غير تابعة أو معتمدة رسمياً من قبل المصنّعين ما لم يُذكر ذلك صراحةً.",
  seoDefaults: {
    titleEn: "Fixar Service | Professional Appliance Repair UAE (Sharjah & Dubai)",
    titleAr: "فيكسار سيرفيس | تصليح وصيانة الأجهزة المنزلية في الإمارات (الشارقة ودبي)",
    descriptionEn: "Expert home appliance repair in UAE. AC repair, refrigerator servicing, washing machine, oven, water heater repair. 24/7 emergency response, verified technicians, doorstep service.",
    descriptionAr: "خدمات احترافية لتصليح وصيانة الأجهزة المنزلية في الإمارات. تصليح مكيفات، ثلاجات، غسالات، أفران، وسخانات المياه. خدمة منزلية متواصلة 24/7 مع فنيين معتمدين.",
  },
};
