export interface BrandItem {
  id: string;
  name: string;
  category: string;
  popularAppliances: string[];
}

export const brandsList: BrandItem[] = [
  { id: "samsung", name: "Samsung", category: "Major Appliances & Electronics", popularAppliances: ["Refrigerators", "Washing Machines", "Smart TVs", "Microwaves"] },
  { id: "lg", name: "LG", category: "Major Appliances & Electronics", popularAppliances: ["Dual Inverter ACs", "InstaView Fridges", "Direct Drive Washers", "OLED TVs"] },
  { id: "whirlpool", name: "Whirlpool", category: "Kitchen & Laundry", popularAppliances: ["6th Sense Washers", "Double Door Fridges", "Built-In Ovens"] },
  { id: "haier", name: "Haier", category: "Cooling & Laundry", popularAppliances: ["Deep Freezers", "Smart Inverter ACs", "Top-Load Washers"] },
  { id: "bosch", name: "Bosch", category: "Premium Kitchen & Laundry", popularAppliances: ["Serie 6/8 Washers", "Dishwashers", "Built-In Ovens", "Hobs"] },
  { id: "ifb", name: "IFB", category: "Laundry & Kitchen", popularAppliances: ["Front Load Washers", "Microwaves", "Dishwashers"] },
  { id: "panasonic", name: "Panasonic", category: "Cooling & Electronics", popularAppliances: ["Air Conditioners", "Microwave Ovens", "Smart TVs"] },
  { id: "sony", name: "Sony", category: "Smart Entertainment", popularAppliances: ["Bravia LED & OLED TVs", "Audio Systems"] },
  { id: "mi", name: "Mi", category: "Smart Electronics", popularAppliances: ["Smart TVs", "Water Purifiers", "Air Purifiers"] },
  { id: "oneplus", name: "OnePlus", category: "Smart Electronics", popularAppliances: ["Smart Android TVs"] },
  { id: "kent", name: "Kent", category: "Water Purification", popularAppliances: ["Mineral RO Purifiers", "UV Purifiers"] },
  { id: "aquaguard", name: "Aquaguard", category: "Water Purification", popularAppliances: ["Active Copper RO", "Under-Sink Purifiers"] },
  { id: "livpure", name: "Livpure", category: "Water Purification", popularAppliances: ["RO + UV Water Purifiers"] },
  { id: "pureit", name: "Pureit", category: "Water Purification", popularAppliances: ["Mineral RO Systems"] },
  { id: "ao-smith", name: "AO Smith", category: "Water Heating & RO", popularAppliances: ["Storage Geysers", "Digital RO Purifiers"] },
  { id: "havells", name: "Havells", category: "Water Heating & Electricals", popularAppliances: ["Monza Geysers", "Kitchen Chimneys", "Induction Hobs"] },
  { id: "racold", name: "Racold", category: "Water Heating", popularAppliances: ["Pronto Instant Geysers", "Omnis Storage Geysers"] },
  { id: "bajaj", name: "Bajaj", category: "Small Appliances & Heating", popularAppliances: ["Water Heaters", "Microwaves", "Gas Stoves"] },
  { id: "crompton", name: "Crompton", category: "Water Pumps & Heating", popularAppliances: ["Arno Geysers", "Water Booster Pumps"] },
  { id: "venus", name: "Venus", category: "Water Heating", popularAppliances: ["Porcelain Enamel Geysers"] },
  { id: "daikin", name: "Daikin", category: "HVAC & Air Conditioning", popularAppliances: ["Inverter Split ACs", "Concealed Duct Units"] },
  { id: "electrolux", name: "Electrolux", category: "Major Kitchen & Laundry", popularAppliances: ["Refrigerators", "Washing Machines"] },
  { id: "midea", name: "Midea", category: "Cooling & Water", popularAppliances: ["Water Dispensers", "Split ACs", "Freezers"] },
  { id: "toshiba", name: "Toshiba", category: "Cooling & Kitchen", popularAppliances: ["Inverter Fridges", "Microwaves"] },
  { id: "hitachi", name: "Hitachi", category: "Cooling & Air Conditioning", popularAppliances: ["French Door Fridges", "Duct ACs"] },
];

export const brandDisclaimerEn =
  "Fixar is an independent appliance repair and maintenance service provider. Brand names and trademarks belong to their respective owners and are used solely to identify appliances serviced. Fixar is not affiliated with or authorized by appliance manufacturers unless specifically stated.";

export const brandDisclaimerAr =
  "فيكسار هي شركة مستقلة لتقديم خدمات صيانة وإصلاح الأجهزة المنزلية. جميع أسماء الماركات والعلامات التجارية المسجلة هي ملك لأصحابها المعنيين وتستخدم فقط لتوضيح الأجهزة التي نقدم خدمات صيانتها. فيكسار غير تابعة أو معتمدة رسمياً من قبل المصنّعين ما لم يُذكر ذلك صراحةً.";
