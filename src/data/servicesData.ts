export interface ServiceItem {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  category: "cooling" | "kitchen" | "laundry" | "water" | "electronics" | "maintenance";
  categoryNameEn: string;
  categoryNameAr: string;
  shortDescEn: string;
  shortDescAr: string;
  longDescEn: string;
  longDescAr: string;
  iconName: string;
  image: string;
  commonProblemsEn: string[];
  commonProblemsAr: string[];
  solutionsEn: string[];
  solutionsAr: string[];
  supportedTypesEn: string[];
  supportedTypesAr: string[];
  faqs: { qEn: string; qAr: string; aEn: string; aAr: string }[];
}

export const servicesList: ServiceItem[] = [
  {
    id: "ac-repair",
    slug: "ac-repair",
    titleEn: "Air Conditioner Repair & Servicing",
    titleAr: "تصليح وصيانة مكيفات الهواء",
    category: "cooling",
    categoryNameEn: "Cooling Systems",
    categoryNameAr: "أنظمة التبريد",
    shortDescEn: "Professional split, window, and duct AC repair, deep chemical coil cleaning, gas charging, and compressor diagnostics.",
    shortDescAr: "صيانة وتصليح مكيفات سبليت، شباك، والمركزية، تنظيف عميق بالمواد الكيميائية، شحن غاز، وفحص الكمبروسر.",
    longDescEn: "Beat the Middle East heat with fast, same-day AC maintenance. Our certified technicians troubleshoot cooling failure, excessive water leaking, sensor faults, thermostat failures, and compressor short-cycling with precision.",
    longDescAr: "تغلب على حرارة الصيف مع خدمات الصيانة الفورية في نفس اليوم. يقوم فنيونا المعتمدون بتشخيص مشاكل ضعف التبريد وتسريب المياه وأعطال الثرموستات والكمبروسر بدقة عالية.",
    iconName: "Wind",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "AC blowing warm or room-temperature air",
      "Indoor unit leaking water onto walls or floors",
      "Unusual squealing, grinding, or buzzing noises",
      "Foul, musty odors from air vents",
      "AC turning on and tripping the circuit breaker",
      "Remote control or digital thermostat unresponsive"
    ],
    commonProblemsAr: [
      "المكيف يضخ هواء دافئ ولا يبرد",
      "تسريب مياه من الوحدة الداخلية على الجدران أو الأرضيات",
      "أصوات طقطقة أو صرير غير طبيعية",
      "روائح كريهة أو رطبة خارجة من فتحات التهوية",
      "المكيف يفصل قاطع الكهرباء الرئيسي فجأة",
      "لوحة التحكم أو الريموت لا يستجيب"
    ],
    solutionsEn: [
      "Comprehensive digital compressor & refrigerant pressure test",
      "Eco-safe eco-foam jet chemical coil & filter washing",
      "High-pressure drainage line unclogging and pan sanitation",
      "Capacitor, contractor, and control PCB replacement",
      "Genuine R410A / R32 / R22 refrigerant leak fix & top-up",
      "Blower wheel motor re-balancing & fan bearing repair"
    ],
    solutionsAr: [
      "فحص رقمي متكامل لضغط غاز التبريد والكمبروسر",
      "غسيل كيميائي عميق للفلاتر والملفات بمضخات الضغط العالي",
      "تسليك مجاري تصريف المياه وتعقيم الحوض الداخلي",
      "تبديل الكابستور ولوحة التحكم الإلكترونية PCB",
      "كشف ومعالجة تسريب الغاز مع إعادة الشحن بغاز أصلي",
      "موازنة محرك المروحة وصيانة رولمان البلي"
    ],
    supportedTypesEn: ["Split AC", "Window AC", "Duct / Concealed AC", "Package Units", "Floor Standing AC"],
    supportedTypesAr: ["مكيف سبليت", "مكيف شباك", "مكيف دكت مركزي", "وحدات بكج", "مكيف دولابي أرضي"],
    faqs: [
      {
        qEn: "How fast can an AC technician arrive at my home?",
        qAr: "ما مدى سرعة وصول الفني إلى منزلي؟",
        aEn: "In urgent cooling emergency situations across Sharjah, Dubai, and Ajman, we dispatch our nearest mobile unit within 60 to 90 minutes.",
        aAr: "في حالات طوارئ التبريد في الشارقة ودبي وعجمان، نقوم بتوجيه أقرب وحدة متنقلة إليك خلال 60 إلى 90 دقيقة."
      },
      {
        qEn: "Do you use original AC spare parts and genuine gas?",
        qAr: "هل تستخدمون قطع غيار أصلية وغاز معتمد؟",
        aEn: "Yes, our technicians only use 100% pure refrigerant (R410A, R32, R22) and certified OEM compatible electrical components with warranty.",
        aAr: "نعم، يستخدم فنيونا غاز تبريد نقي 100% وقطع غيار أصلية متوافقة مع توفير ضمان على الخدمة."
      }
    ]
  },
  {
    id: "refrigerator-repair",
    slug: "refrigerator-repair",
    titleEn: "Refrigerator & Freezer Repair",
    titleAr: "تصليح وصيانة الثلاجات والمجمدات",
    category: "cooling",
    categoryNameEn: "Cooling Systems",
    categoryNameAr: "أنظمة التبريد",
    shortDescEn: "Expert diagnosis for cooling failures, frost build-up, compressor humming, inverter board faults, and thermostat replacement.",
    shortDescAr: "تشخيص متخصص لضعف التبريد، تراكم الثلج، أصوات الكمبروسر، أعطال بورد الإنفرتر، وتبديل الثرموستات.",
    longDescEn: "Prevent food spoilage with immediate refrigerator maintenance. We service single door, double door, side-by-side, French door, and commercial deep freezers of all leading brands.",
    longDescAr: "احمِ طعامك من التلف مع خدمة تصليح الثلاجات الفورية. نصلح الثلاجات ذات الباب الواحد والبابين والسايد باي سايد والإنفرتر لجميع الماركات العالمية.",
    iconName: "Refrigerator",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Freezer is cold but lower fridge section is warm",
      "Excessive ice buildup on back wall or evaporator coil",
      "Clicking sound from bottom compressor without starting",
      "Puddle of water collecting underneath crisper drawers",
      "Door gasket loose and failing to create an airtight seal"
    ],
    commonProblemsAr: [
      "الفريزر بارد بينما الثلاجة من الأسفل دافئة",
      "تراكم كثيف للثلج خلف الجدار الداخلي",
      "صوت تكتكة يصدر من الكمبروسر دون أن يقلع",
      "تجمع مياه أسفل أدراج الخضروات",
      "كاوتشوك (ربلة) الباب تالفة ولا تغلق بإحكام"
    ],
    solutionsEn: [
      "Inverter compressor repair and starter relay replacement",
      "Defrost heater, bimetal thermostat, and defrost timer diagnostics",
      "Evaporator fan motor replacement and air damper calibration",
      "Gas leak detection, nitrogen pressure testing, and R600a charging",
      "Magnetic door gasket realigning and complete seal replacement"
    ],
    solutionsAr: [
      "فحص وصيانة كمبروسر الإنفرتر وتبديل ريليه الإقلاع",
      "اختبار وتبديل سخان إذابة الثلج وحساس الديفروست والتايمر",
      "تبديل مروحة الفريزر وضبط موجه الهواء الداخلي",
      "كشف تسريب غاز التبريد بالنيتروجين وشحن غاز R600a الصديق للبيئة",
      "تبديل وضبط ربلات الأبواب المغناطيسية لمنع تسريب البرودة"
    ],
    supportedTypesEn: ["Side-by-Side Refrigerators", "French Door Models", "Top Freezer", "Bottom Freezer", "Chest Freezers"],
    supportedTypesAr: ["ثلاجات سايد باي سايد", "ثلاجات فرنش دور", "ثلاجات عادية بابين", "مجمدات فريزر أرضي"],
    faqs: [
      {
        qEn: "Can you fix smart inverter refrigerators?",
        qAr: "هل تصلحون ثلاجات الإنفرتر الحديثة؟",
        aEn: "Yes, our technicians are trained in digital inverter drive boards and dual inverter cooling circuits.",
        aAr: "نعم، فنيونا مدربون على بوردات الإنفرتر الذكية وأنظمة التبريد الرقمية المزدوجة."
      }
    ]
  },
  {
    id: "washing-machine-repair",
    slug: "washing-machine-repair",
    titleEn: "Washing Machine & Dryer Repair",
    titleAr: "تصليح وصيانة الغسالات والنشافات",
    category: "laundry",
    categoryNameEn: "Laundry Appliances",
    categoryNameAr: "أجهزة الغسيل",
    shortDescEn: "Precision repair for front-load, top-load, and washer-dryer combos: drum noise, drainage errors, spin failure, and door lock issues.",
    shortDescAr: "صيانة دقيقة للغسالات الأمامية والعلوية والنشافات: أصوات الحلة، أعطال التصريف، عدم العصر، وقفل الباب.",
    longDescEn: "When your laundry routine halts, Fixar delivers swift home service. We resolve electronic control board errors (E1, E2, E20, 4E, etc.), broken drive belts, failed drain pumps, and worn drum bearings.",
    longDescAr: "عند تعطل الغسالة، يوفر فيكسار خدمة منزلية سريعة. نقوم بحل رموز الأخطاء الإلكترونية، تلف سير المحرك، طلمبة الصرف، ومشاكل رولمان بلي الحلة.",
    iconName: "Shirt",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Machine won't drain water or shows drain error code",
      "Violent shaking and banging during high-speed spin cycle",
      "Drum refuses to rotate even though motor is humming",
      "Water leaking onto the floor during wash cycle",
      "Door lock stuck and laundry trapped inside"
    ],
    commonProblemsAr: [
      "الغسالة لا تطرد المياه وظهور كود خطأ الصرف",
      "اهتزاز عنيف وصوت خبط أثناء دورة العصر",
      "الحلة لا تدور رغم عمل المحرك",
      "تسريب مياه أسفل الغسالة أثناء الغسيل",
      "قفل الباب عالق وتعذر إخراج الملابس"
    ],
    solutionsEn: [
      "Heavy-duty drum bearing and seal replacement",
      "Drain pump clearing, impeller repair, and drain valve replacement",
      "Shock absorber suspension spring kit installation",
      "Inverter drive motor repair and carbon brush renewal",
      "Digital electronic PCB motherboard micro-soldering"
    ],
    solutionsAr: [
      "تبديل رولمان بلي الحلة والأولسيه الأصلي",
      "تنظيف أو تبديل طلمبة طرد المياه وصمام الصرف",
      "تبديل مساعدين امتصاص الاهتزاز واليايات",
      "صيانة محرك الإنفرتر وتبديل شربون الموتور",
      "إصلاح وصيانة كارتة الكهرباء ولوحة التحكم الإلكترونية"
    ],
    supportedTypesEn: ["Front Load Washers", "Top Load Washers", "Semi-Automatic", "Washer-Dryer Combos", "Vented & Condenser Dryers"],
    supportedTypesAr: ["غسالات تحميل أمامي", "غسالات تحميل علوي", "غسالات هاف أوتوماتيك", "نشافات ملابس حرارية وتكثيف"],
    faqs: [
      {
        qEn: "Do I need to transport the heavy washing machine to a workshop?",
        qAr: "هل أحتاج لنقل الغسالة الثقيلة إلى ورشة الصيانة؟",
        aEn: "95% of repairs are completed right inside your home or laundry room during the first visit.",
        aAr: "تتم 95% من عمليات الصيانة مباشرة داخل منزلك في الزيارة الأولى دون الحاجة لنقل الجهاز."
      }
    ]
  },
  {
    id: "microwave-repair",
    slug: "microwave-repair",
    titleEn: "Microwave & Convection Oven Repair",
    titleAr: "تصليح وصيانة أفران الميكروويف والبلت إن",
    category: "kitchen",
    categoryNameEn: "Kitchen Appliances",
    categoryNameAr: "أجهزة المطبخ",
    shortDescEn: "Safe servicing for non-heating microwaves, sparking chambers, unresponsive touchpads, broken turntables, and high-voltage parts.",
    shortDescAr: "صيانة آمنة لعدم تسخين الميكروويف، الشرر الداخلي، توقف شاشة اللمس، تعطل طبق الدوران، والقطع الكهربائية.",
    longDescEn: "Microwaves operate under high-voltage conditions requiring certified technicians. Fixar guarantees safe troubleshooting of magnetrons, high-voltage diodes, door interlock micro-switches, and digital control panels.",
    longDescAr: "تعمل أفران الميكروويف بجهد كهربائي عالي يتطلب فنيين مختصين. يضمن فيكسار فحصاً آمناً للميجنترون، دايود الضغط العالي، مفاتيح أمان الباب، وشاشات التحكم.",
    iconName: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Microwave runs but food comes out stone cold",
      "Sparks and arcing inside cooking cavity",
      "Turntable glass tray doesn't spin",
      "Touch control buttons do not respond to presses",
      "Microwave shuts off after 3 to 5 seconds of operation"
    ],
    commonProblemsAr: [
      "الميكروويف يعمل ولكن الطعام يخرج بارداً تماماً",
      "حدوث شرارات وفرقعة داخل كابينة التسخين",
      "الطبق الزجاجي الدوار لا يلف",
      "أزرار شاشة اللمس لا تستجيب عند الضغط",
      "الجهاز يفصل تلقائياً بعد ثوانٍ قليلة من التشغيل"
    ],
    solutionsEn: [
      "Genuine magnetron tube testing and replacement",
      "High-voltage capacitor and diode testing with discharge safety protocol",
      "Waveguide mica cover replacement",
      "Turntable drive motor and roller guide ring renewal",
      "Door latch safety interlock switch rewiring"
    ],
    solutionsAr: [
      "فحص وتبديل وحدة الميجنترون الأصلية المسؤولة عن التسخين",
      "فحص مكثف ودايود الجهد العالي وتفريغ الشحنات بأمان",
      "تبديل رقاقة الميكا العازلة",
      "صيانة وتبديل موتور دوران الطبق وقاعدة العجلات",
      "صيانة مفاتيح أمان الباب والحماية"
    ],
    supportedTypesEn: ["Solo Microwaves", "Grill Microwaves", "Convection Ovens", "Built-In Kitchen Microwaves"],
    supportedTypesAr: ["ميكروويف تسخين فقط", "ميكروويف بالشواية", "ميكروويف كونفكشن حراري", "ميكروويف بلت إن مدمج"],
    faqs: [
      {
        qEn: "Is it worth repairing an oven or microwave vs buying new?",
        qAr: "هل تصليح الميكروويف أو الفرن يستحق التكلفة مقارنة بشراء جديد؟",
        aEn: "In most cases, replacing a simple diode, fuse, or magnetron costs a fraction of a new quality appliance, saving you money and hassle.",
        aAr: "في معظم الحالات، يكلف تبديل قطعة بسيطة مثل الدايود أو الميجنترون جزءاً يسيراً من سعر جهاز جديد."
      }
    ]
  },
  {
    id: "water-heater-repair",
    slug: "water-heater-repair",
    titleEn: "Water Heater / Geyser Repair",
    titleAr: "تصليح وصيانة سخانات المياه (المركزية والعادية)",
    category: "water",
    categoryNameEn: "Water Appliances",
    categoryNameAr: "أجهزة المياه",
    shortDescEn: "Instant and storage geyser repair: heating element replacement, thermostat adjustment, leak containment, and safety valve checks.",
    shortDescAr: "صيانة السخانات الفورية والخزانات: تبديل شمعة التسخين، ضبط الثرموستات، معالجة التسريبات، وفحص صمام الأمان.",
    longDescEn: "Hot water is a vital comfort. Our technicians quickly diagnose tripped geyser safety switches, calcified heating coils, dripping pressure relief valves, and rusty water discoloration.",
    longDescAr: "الماء الساخن أساسي للراحة المنزلية. يقوم خبراؤنا بحل أعطال قواطع الأمان، تكلس شمعة التسخين، تسريب صمام الضغط، ومشاكل الصدأ.",
    iconName: "Flame",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "No hot water or water takes hours to become lukewarm",
      "Water heater causes circuit breaker to trip immediately",
      "Persistent water dripping from temperature & pressure relief valve",
      "Discolored brownish or foul-smelling hot water",
      "Internal tank rusting or leaking joints"
    ],
    commonProblemsAr: [
      "انعدام الماء الساخن أو بطء شديد في التسخين",
      "السخان يتسبب في فصل قاطع الكهرباء فور تشغيله",
      "تنقيط وتسريب مياه مستمر من صمام الأمان والضغط",
      "خروج ماء ساخن بلون مائل للصدأ أو برائحة غريبة",
      "تسريب من وصلات السخان أو الخزان الداخلي"
    ],
    solutionsEn: [
      "Heavy-duty copper and titanium heating element replacement",
      "Dual safety thermostat testing and replacement",
      "Sacrificial magnesium anode rod replacement to prevent tank corrosion",
      "Safety pressure relief valve (PRV) testing and replacement",
      "Dielectric pipe union seal and flex hose replacement"
    ],
    solutionsAr: [
      "تبديل عنصر التسخين (الهيتر) بنوعيات نحاسية وتيتانيوم أصلية",
      "فحص وتبديل الثرموستات المزدوج وقاطع الحماية",
      "تبديل عمود المغنيسيوم لمنع تآكل الخزان وتكون الصدأ",
      "فحص وتبديل بلف الأمان وصمام تنفيس الضغط الزائد",
      "تجديد الوصلات المرنة لمنع أي تسريبات مائية"
    ],
    supportedTypesEn: ["Storage Tank Water Heaters", "Instant Tankless Heaters", "Central Water Heating Systems", "Solar-Assisted Heaters"],
    supportedTypesAr: ["سخانات مياه خزان", "سخانات فورية بدون خزان", "أنظمة السخانات المركزية للفيلات", "سخانات شمسية"],
    faqs: [
      {
        qEn: "How often should a home water heater be descaled in the UAE?",
        qAr: "كم مرة يجب تنظيف السخان من الترسبات الكلسية في الإمارات؟",
        aEn: "Due to local mineral water hardness, we recommend descaling and anode inspection once every 12 to 18 months.",
        aAr: "نظراً لنسبة الأملاح في المياه، نوصي بتنظيف الرواسب وفحص عمود المغنيسيوم مرة كل 12 إلى 18 شهراً."
      }
    ]
  },
  {
    id: "ro-water-purifier-repair",
    slug: "ro-water-purifier-repair",
    titleEn: "RO Water Purifier & Filter Servicing",
    titleAr: "تصليح وصيانة فلاتر وتنقية مياه RO",
    category: "water",
    categoryNameEn: "Water Appliances",
    categoryNameAr: "أجهزة المياه",
    shortDescEn: "Complete filter cartridge replacement, RO membrane flushing, booster pump repair, TDS level optimization, and UV lamp servicing.",
    shortDescAr: "تبديل شمعات الفلتر، غسيل ممبرين التناضح العكسي، تصليح مضخة الضغط، ضبط نسبة الأملاح TDS، وصيانة لمبة الأشعة فوق البنفسجية.",
    longDescEn: "Keep your drinking water pure and healthy. We service multi-stage Reverse Osmosis systems, under-sink alkaline units, and commercial drinking water filtration systems across the UAE.",
    longDescAr: "حافظ على نقاء وصحة مياه الشرب لعائلتك. نوفر صيانة أجهزة التناضح العكسي متعددة المراحل وفلاتر تحت الحوض القلوية مع فحص دقيق لنسبة الأملاح.",
    iconName: "Droplet",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Strange taste or odor in drinking water",
      "Purifier flow rate is extremely slow or reduced to a trickle",
      "Booster pump constantly running without shutting off",
      "Water leaking from filter housings or quick-connect elbows",
      "TDS tester showing high mineral reading beyond drinking limits"
    ],
    commonProblemsAr: [
      "طعم أو رائحة غير مستحبة في مياه الشرب",
      "تدفق المياه ضعيف جداً وبطيء للغاية",
      "مضخة الفلتر تعمل باستمرار دون توقف",
      "تسريب مياه من حوافظ الشمعات أو الوصلات السريعة",
      "ارتفاع نسبة الأملاح الذائبة TDS عن الحد المسموح"
    ],
    solutionsEn: [
      "Genuine multi-stage sediment, carbon, and post-carbon filter replacement",
      "Semi-permeable RO membrane renewal and flushing",
      "Booster pump head repair and power transformer replacement",
      "Auto shut-off valve (ASV) and low-pressure switch replacement",
      "Storage tank pressure recharge and sanitization"
    ],
    solutionsAr: [
      "تبديل شمعات الفلتر الأصلية (شوائب، كربون نشط، كربون صلب، وبوست كربون)",
      "تبديل غشاء التناضح العكسي RO عالي الكفاءة",
      "صيانة رأس مضخة الضغط وتبديل محول الكهرباء",
      "تبديل صمام الإغلاق التلقائي وحساس الضغط المنخفض",
      "شحن ضغط خزان التخزين الداخلي وتعقيمه"
    ],
    supportedTypesEn: ["5-Stage RO Systems", "7-Stage Mineral Alkaline RO", "Under-Sink Compact Purifiers", "Direct Flow RO Units"],
    supportedTypesAr: ["فلاتر 5 مراحل RO", "فلاتر 7 مراحل قلوية مع معادن", "أجهزة مدمجة تحت الحوض", "أجهزة تدفق مباشر بدون خزان"],
    faqs: [
      {
        qEn: "Do your technicians measure water TDS on site?",
        qAr: "هل يقيس الفني نسبة الأملاح TDS في الموقع؟",
        aEn: "Yes, our technicians carry calibrated digital TDS meters and test before and after servicing to guarantee safe drinking water.",
        aAr: "نعم، يحمل فنيونا أجهزة قياس رقمية معتمدة لاختبار نسبة الأملاح قبل الصيانة وبعدها لضمان نقاء المياه."
      }
    ]
  },
  {
    id: "kitchen-chimney-repair",
    slug: "kitchen-chimney-repair",
    titleEn: "Kitchen Chimney & Exhaust Hood Repair",
    titleAr: "تصليح وصيانة شفاطات المطبخ والمداخن",
    category: "kitchen",
    categoryNameEn: "Kitchen Appliances",
    categoryNameAr: "أجهزة المطبخ",
    shortDescEn: "Degreasing, motor suction repair, carbon filter replacement, touch-sensor panel fixes, and duct pipe re-routing.",
    shortDescAr: "إزالة الشحوم المستعصية، تصليح قوة سحب الموتور، تبديل فلاتر الكربون، إصلاح لوحة اللمس، وضبط دكت التهوية.",
    longDescEn: "Ensure clean, smoke-free kitchen air. Fixar repairs wall-mounted, island, and concealed kitchen chimneys with heavy-duty cleaning and precision motor calibration.",
    longDescAr: "حافظ على هواء مطبخك نقياً وخالياً من الروائح والدخان. نصلح شفاطات ومداخن المطابخ الجدارية والجزيرة والبلت إن مع تنظيف وإصلاح المحركات.",
    iconName: "Fan",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Chimney suction has become weak, leaving smoke in kitchen",
      "Baffle filters choked with thick sticky grease",
      "Loud vibration or rattling noise from internal exhaust fan",
      "Control touch switches or speed adjustment buttons dead",
      "LED lights flickering or not turning on"
    ],
    commonProblemsAr: [
      "ضعف قوة سحب الشفاط وبقاء الدخان في المطبخ",
      "انسداد فلاتر الشحوم بالدهون والزيوت اللزجة",
      "اهتزازات وأصوات صاخبة تصدر من المروحة الداخلية",
      "لوحة التحكم باللمس أو أزرار السرعات لا تعمل",
      "إضاءة الليد ترمش أو لا تضيء نهائياً"
    ],
    solutionsEn: [
      "Chemical degreasing wash of baffle and mesh filters",
      "Blower motor capacitor and winding restoration",
      "Activated charcoal carbon filter replacement for ductless hoods",
      "Electronic touch PCB circuit inspection and replacement",
      "Flexible aluminum duct pipe replacement and external flap check"
    ],
    solutionsAr: [
      "تنظيف كيميائي عميق لإزالة الدهون من الفلاتر المعدنية",
      "صيانة كابستور وملفات موتور شفط الهواء",
      "تبديل فلاتر الكربون النشط للشفاطات بدون دكت",
      "إصلاح وتبديل كارتة اللمس والمفاتيح الإلكترونية",
      "تبديل أنبوب الدكت المرن المصنوع من الألمنيوم وفحص البوابة الخارجية"
    ],
    supportedTypesEn: ["Wall Mount Hoods", "Island Chimneys", "Built-in Telescopic Hoods", "Auto-Clean Chimneys"],
    supportedTypesAr: ["شفاطات جدارية", "شفاطات جزيرة معلقة", "شفاطات بلت إن تلسكوبية", "شفاطات ذاتية التنظيف"],
    faqs: [
      {
        qEn: "Can you fix chimney suction problems on the spot?",
        qAr: "هل يمكن حل مشاكل ضعف السحب في نفس الزيارة؟",
        aEn: "Yes, our technicians carry common motors, capacitors, and cleaning equipment to restore suction in a single visit.",
        aAr: "نعم، يحمل الفنيون الموتورات والكابستورات الشائعة ومعدات التنظيف لاستعادة قوة السحب فوراً."
      }
    ]
  },
  {
    id: "gas-stove-repair",
    slug: "gas-stove-repair",
    titleEn: "Gas Stove, Hob & Cooking Range Repair",
    titleAr: "تصليح وصيانة أفران الغاز والبوتاجازات والمسطحات",
    category: "kitchen",
    categoryNameEn: "Kitchen Appliances",
    categoryNameAr: "أجهزة المطبخ",
    shortDescEn: "Safe gas leak detection, burner flame yellow-to-blue tuning, auto-ignition spark repair, and oven thermostat calibration.",
    shortDescAr: "كشف آمن لتسريبات الغاز، ضبط شعلة العيون الزرقاء، تصليح الإشعال الذاتي، ومعايرة حرارة الفرن.",
    longDescEn: "Safety is paramount with cooking appliances. Our certified technicians handle burner unclogging, spark electrode fixes, safety thermocouple valve repair, and oven temperature calibration.",
    longDescAr: "سلامة منزلك أولويتنا. يتعامل فنيونا المعتمدون مع تسليك عيون الغاز، تصليح شمعات الإشعال الذاتي، صمامات الأمان والثيرموكوبل، وضبط درجات حرارة أفران الغاز والكهرباء.",
    iconName: "FlameKindling",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Burners producing weak yellow flame that blackens pots",
      "Auto-ignition spark clicking continuously or not sparking",
      "Gas smell near cooker knobs or regulator connection",
      "Burner goes out immediately when releasing control knob",
      "Oven burner fails to stay lit"
    ],
    commonProblemsAr: [
      "شعلة صفراء ضعيفة تتسبب في اسوداد أواني الطهي",
      "الإشعال الذاتي يدق باستمرار دون توقف أو لا يطلق شرراً",
      "انبعاث رائحة غاز قرب مفاتيح التشغيل أو المنظم",
      "الشعلة تنطفئ فور ترك مقبض التحكم",
      "شعلة الفرن لا تستقر وتنطفئ بعد ثوانٍ"
    ],
    solutionsEn: [
      "Electronic spark pulse generator & ignition electrode replacement",
      "Safety thermocouple valve testing and replacement",
      "Brass burner jet injector nozzle cleaning and resizing",
      "High-pressure certified gas hose replacement with safety clamps",
      "Oven thermostat and safety shutoff valve calibration"
    ],
    solutionsAr: [
      "تبديل شمعات الإشعال الذاتي ومولد الشرر الكهربائي",
      "فحص وتبديل صمامات الأمان والثيرموكوبل الحساس",
      "تسليك وتنظيف فواني ومنافذ الغاز النحاسية وضبط الهواء",
      "تبديل خراطيم الغاز المعتمدة ومرابط الأمان المحكمة",
      "معايرة ثرموستات الفرن وصمام الأمان التلقائي"
    ],
    supportedTypesEn: ["Built-in Glass Hobs", "Stainless Steel Gas Stoves", "Free-Standing Cooking Ranges", "Induction Hobs"],
    supportedTypesAr: ["مسطحات غاز زجاجية بلت إن", "بوتاجازات ستانلس ستيل", "أفران طهي قائمة بذاتها", "مسطحات طهي كهربائية وحثية"],
    faqs: [
      {
        qEn: "What should I do if I smell gas in the kitchen?",
        qAr: "ماذا أفعل إذا شممت رائحة غاز في المطبخ؟",
        aEn: "Immediately shut off your main gas supply cylinder/pipe, ventilate windows, avoid switching on electrical switches, and call our 24/7 hotline.",
        aAr: "أغلق محبس الغاز الرئيسي فوراً، افتح النوافذ للتهوية، وتجنب تشغيل أي مفاتيح كهربائية، ثم اتصل بخط طوارئ فيكسار 24/7."
      }
    ]
  },
  {
    id: "water-dispenser-repair",
    slug: "water-dispenser-repair",
    titleEn: "Water Dispenser Repair & Sanitization",
    titleAr: "تصليح وتعقيم برادات وموزعات المياه",
    category: "water",
    categoryNameEn: "Water Appliances",
    categoryNameAr: "أجهزة المياه",
    shortDescEn: "Fast repair for hot/cold dispensers: cooling compressor fixes, hot water heating band replacement, faucet tap leaks, and deep sanitization.",
    shortDescAr: "صيانة سريعة لموزعات المياه الباردة والساخنة: صيانة الكمبروسر، تبديل هيتر التسخين، معالجة تسريب الحنفيات، والتعقيم الداخلي.",
    longDescEn: "Ensure refreshing cold and instantly hot water in your home or office. Fixar repairs top-loading and bottom-loading bottled water dispensers with complete hygienic sanitation.",
    longDescAr: "احصل دائماً على ماء نقي بارد وساخن في منزلك أو مكتبك. نصلح برادات وموزعات المياه ذات التحميل العلوي والسفلي مع تعقيم كامل للخزانات الداخلية.",
    iconName: "GlassWater",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Cold water tap dispensing warm or room-temperature water",
      "Hot water tap not heating at all",
      "Persistent water leaking onto the floor from dispenser base",
      "Plastic or metallic taste in dispensed water",
      "Bottom-loading dispenser pump failing to draw water from bottle"
    ],
    commonProblemsAr: [
      "صنبور الماء البارد يضخ ماء دافئ أو بدرجة حرارة الغرفة",
      "صنبور الماء الساخن لا يسخن نهائياً",
      "تسريب مياه مستمر من أسفل قاعدة البراد على الأرضية",
      "طعم غريب أو بلاستيكي في المياه الخارجة",
      "مضخة البراد ذات التحميل السفلي تفشل في سحب المياه من القارورة"
    ],
    solutionsEn: [
      "Cooling compressor thermostat testing and gas leak seal",
      "Stainless steel hot tank heating band replacement",
      "Push-type hygienic faucet tap valve replacement",
      "Water suction pump replacement for bottom-load units",
      "Food-grade citric acid tank descale and antibacterial sanitization"
    ],
    solutionsAr: [
      "فحص ثرموستات كمبروسر التبريد ومعالجة تسريب الغاز",
      "تبديل حزام وهيتر تسخين خزان الستانلس ستيل",
      "تبديل حنفيات الموزع المانعة للتسريب بقطع صحية أصلية",
      "تبديل مضخة سحب المياه لموديلات التحميل السفلي",
      "تعقيم الخزانات الداخلية بمواد غذائية معتمدة لإزالة الرواسب"
    ],
    supportedTypesEn: ["Top-Load Dispensers", "Bottom-Load Hidden Bottle", "Countertop Compact Dispensers", "Direct-Piped Bottleless Dispensers"],
    supportedTypesAr: ["موزعات تحميل علوي", "موزعات تحميل سفلي مخفي", "موزعات مدمجة لسطح المطبخ", "موزعات متصلة مباشرة بالفلتر"],
    faqs: [
      {
        qEn: "How often should an office or home water dispenser be sanitized?",
        qAr: "كم مرة يجب تعقيم براد المياه في المنزل أو المكتب؟",
        aEn: "Health guidelines recommend deep interior sanitization once every 3 to 6 months to prevent bacterial biofilm buildup.",
        aAr: "توصي الإرشادات الصحية بتعقيم الخزانات الداخلية مرة كل 3 إلى 6 أشهر لمنع تكون البكتيريا والرواسب."
      }
    ]
  },
  {
    id: "led-smart-tv-repair",
    slug: "led-smart-tv-repair",
    titleEn: "LED, OLED & Smart TV Repair",
    titleAr: "تصليح وصيانة شاشات التلفزيون الذكية LED و OLED",
    category: "electronics",
    categoryNameEn: "Electronics",
    categoryNameAr: "الإلكترونيات",
    shortDescEn: "Expert TV troubleshooting: black screen backlight strip replacement, motherboard repair, power supply failure, and sound without picture.",
    shortDescAr: "صيانة احترافية للشاشات: تبديل مساطر الليد (الشاشة سوداء مع وجود صوت)، تصليح الماذر بورد، كارتة الباور، ومشاكل المنافذ.",
    longDescEn: "Don't let a dark TV screen interrupt your entertainment. Fixar provides component-level motherboard diagnostics, genuine LED backlight replacement, power supply unit (PSU) repairs, and HDMI port replacement.",
    longDescAr: "لا تدع عطل الشاشة يفسد متعة المشاهدة. يقدم فيكسار فحصاً إلكترونياً دقيقاً، تبديل مساطر إضاءة الليد الأصلية، إصلاح وحدات التغذية، ومنافذ الشاشة التالفة.",
    iconName: "Tv",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "TV has sound but picture is completely dark (black screen)",
      "TV does not power on and standby light is dead or blinking",
      "Horizontal or vertical colored lines appearing on display",
      "TV keeps restarting continuously in a boot loop",
      "Wi-Fi disconnects frequently or smart apps freeze"
    ],
    commonProblemsAr: [
      "يوجد صوت في التلفزيون ولكن الشاشة مظلمة تماماً",
      "الشاشة لا تعمل نهائياً ولمبة البيان مطفأة أو تومض",
      "ظهور خطوط أفقية أو عمودية ملونة على الشاشة",
      "التلفزيون يعيد تشغيل نفسه تلقائياً بشكل متكرر",
      "انقطاع اتصال الواي فاي أو تجمد التطبيقات الذكية"
    ],
    solutionsEn: [
      "Precision LED backlight bar replacement with even light diffusion",
      "Power Supply Unit (PSU) capacitor and MOSFET repair",
      "Main logic motherboard processor reballing and firmware flash",
      "T-CON logic board ribbon cable and timing controller replacement",
      "HDMI port and digital optical audio jack micro-soldering"
    ],
    solutionsAr: [
      "تبديل طقم مساطر الليد الأصلية مع توزيع ضوئي متوازن",
      "إصلاح كارتة الباور وتبديل المكثفات والترانزستورات التالفة",
      "صيانة كارتة الماذر بورد وبرمجة الفلاشة وإصلاح المعالج",
      "فحص وتبديل كارتة التيكون T-CON وكابلات نقل الإشارة",
      "لحام وتثبيت منافذ HDMI ومنافذ الصوت التالفة بدقة"
    ],
    supportedTypesEn: ["Smart LED TVs", "4K UHD TVs", "QLED TVs", "OLED TVs", "Commercial Display Panels"],
    supportedTypesAr: ["شاشات سمارت LED", "شاشات 4K فائقة الوضوح", "شاشات QLED", "شاشات OLED", "شاشات العرض التجارية"],
    faqs: [
      {
        qEn: "Can you fix a TV where I can hear sound but see no picture?",
        qAr: "هل يمكن تصليح شاشة بها صوت بدون صورة؟",
        aEn: "Yes! This is the classic symptom of a failed LED backlight array, and we routinely replace the full backlight set with a warranty.",
        aAr: "نعم! هذا العطل الشائع ناتج عن تلف مساطر إضاءة الليد الخلفية، ونقوم بتبديل الطقم كاملاً بقطع أصلية مع ضمان."
      }
    ]
  },
  {
    id: "water-cooler-repair",
    slug: "water-cooler-repair",
    titleEn: "Commercial Water Cooler Repair",
    titleAr: "تصليح وصيانة مبردات المياه التجارية والكبيرة",
    category: "water",
    categoryNameEn: "Water Appliances",
    categoryNameAr: "أجهزة المياه",
    shortDescEn: "Heavy-duty commercial water cooler repairs for factories, mosques, schools, and offices: compressor overhaul, fan motor, and leak fixes.",
    shortDescAr: "صيانة مبردات المياه الكبيرة للمساجد والمدارس والمصانع والشركات: فحص الكمبروسر، مواتير المراوح، ومعالجة التسريبات.",
    longDescEn: "We maintain heavy-capacity commercial water chillers and stainless steel drinking coolers. Our technicians handle high-capacity compressors, heavy condensing coils, and industrial water filtration.",
    longDescAr: "نعتني بمبردات المياه ذات السعات الكبيرة للمؤسسات والمساجد والمواقع التجارية في الشارقة ودبي وعجمان مع توفير قطع غيار أصلية وضمان معتمد.",
    iconName: "Waves",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Cooler compressor runs hot without chilling water",
      "Rust holes or water leaking from cooling tank or drainage",
      "Fan motor bearing noise and poor heat dissipation",
      "Water pressure is sluggish at taps"
    ],
    commonProblemsAr: [
      "كمبروسر المبرد يسخن بشدة دون تبريد المياه",
      "تسريب مياه من الخزان أو وصلات الصرف السفلية",
      "أصوات مزعجة من مروحة تبريد المكثف الخارجي",
      "ضعف تدفق المياه الخارجة من الصنابير"
    ],
    solutionsEn: [
      "Heavy-duty commercial hermetic compressor replacement",
      "High-pressure coil wash and condenser fan motor overhaul",
      "Stainless steel food-grade argon welding for tank pinhole leaks",
      "Industrial inline filter sediment and carbon cartridge replacement"
    ],
    solutionsAr: [
      "تبديل كمبروسرات التبريد التجارية عالية القدرة",
      "غسيل وتنظيف مكثف التبريد وصيانة محرك المروحة",
      "لحام أرغون ستانلس ستيل صحي لمعالجة ثقوب الخزانات",
      "تبديل فلاتر التنقية الصناعية للشمعات الكربونية والشوائب"
    ],
    supportedTypesEn: ["Stainless Steel Tank Coolers", "Multi-Tap Public Coolers", "Industrial Chilling Units"],
    supportedTypesAr: ["مبردات ستانلس ستيل خزان", "مبردات متعددة الحنفيات للأماكن العامة", "وحدات التبريد المركزية"],
    faqs: [
      {
        qEn: "Do you offer maintenance contracts for commercial coolers?",
        qAr: "هل توفرون عقود صيانة دورية للمبردات التجارية؟",
        aEn: "Yes, we provide periodic quarterly and biannual preventive maintenance for corporate facilities and public locations.",
        aAr: "نعم، نوفر عقود صيانة وقائية دورية ربع سنوية ونصف سنوية للشركات والمساجد والمنشآت."
      }
    ]
  },
  {
    id: "deep-freezer-repair",
    slug: "deep-freezer-repair",
    titleEn: "Deep Freezer & Chest Freezer Repair",
    titleAr: "تصليح وصيانة الديب فريزر والمجمدات الأفقية والرأسية",
    category: "cooling",
    categoryNameEn: "Cooling Systems",
    categoryNameAr: "أنظمة التبريد",
    shortDescEn: "Fast repair for chest and upright freezers: temperature fluctuations, continuous running, thick frost accumulation, and thermostat failure.",
    shortDescAr: "صيانة سريعة للفريزر الأفقي والرأسي: عدم تجميد الأطعمة، العمل المستمر دون فصل، وتراكم الثلج الشديد.",
    longDescEn: "Don't let expensive meat, seafood, and groceries spoil. Fixar diagnoses commercial and residential chest freezers, replacing mechanical thermostats, sealing gas leaks, and restoring rapid freezing temperatures.",
    longDescAr: "لا تخسر مخزون طعامك المجمد. يقوم فريق فيكسار بصيانة الديب فريزر المنزلي والتجاري بسرعة فائقة لضمان الحفاظ على درجات التجميد المثالية.",
    iconName: "Snowflake",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Freezer unable to freeze food solid; temperature staying above freezing",
      "Compressor runs 24/7 without cycling off",
      "Excessive frost forming along the lid rubber gasket",
      "Electrical shock sensation when touching the metal exterior"
    ],
    commonProblemsAr: [
      "الفريزر لا يجمد الأطعمة ودرجة الحرارة ترتفع فوق الصفر",
      "الكمبروسر يعمل طوال الوقت دون توقف لتنظيم الحرارة",
      "تكون طبقات ثلج كثيفة حول إطار الباب",
      "الشعور بماس كهربائي خفيف عند لمس الهيكل المعدني"
    ],
    solutionsEn: [
      "Sub-zero mechanical and digital thermostat calibration",
      "R134a and R600a vacuum pressure testing and refilling",
      "Grounding wire and electrical insulation leakage diagnostics",
      "High-density magnetic lid gasket replacement"
    ],
    solutionsAr: [
      "معايرة وتبديل ثرموستات درجات التجميد الرقمية والميكانيكية",
      "سحب وتفريغ الهواء وشحن غاز التبريد R134a أو R600a الأصلي",
      "فحص التأريض الكهربائي ومعالجة أي تسريب كهربائي في الهيكل",
      "تبديل كاوتشوك وإطار الباب العازل عالي الكثافة"
    ],
    supportedTypesEn: ["Chest Deep Freezers", "Vertical Upright Freezers", "Commercial Glass-Top Display Freezers"],
    supportedTypesAr: ["ديب فريزر أفقي صندوق", "ديب فريزر رأسي أدراج", "مجمدات تجارية بباب زجاجي"],
    faqs: [
      {
        qEn: "How fast can you repair a deep freezer to save my food?",
        qAr: "ما مدى سرعة إصلاح الفريزر لإنقاذ الأطعمة المجمدة؟",
        aEn: "We treat freezer failures as priority urgent calls and dispatch technicians immediately across our service zones.",
        aAr: "نتعامل مع أعطال الفريزر كأولوية طارئة ونوجه أقرب فني إليك فوراً لحماية مخزونك الغذائي."
      }
    ]
  },
  {
    id: "cctv-installation-repair",
    slug: "cctv-installation-repair",
    titleEn: "CCTV Installation & Repair",
    titleAr: "تركيب وصيانة كاميرات المراقبة والأنظمة الأمنية",
    category: "electronics",
    categoryNameEn: "Electronics & Security",
    categoryNameAr: "الإلكترونيات والأنظمة الأمنية",
    shortDescEn: "Security camera troubleshooting: DVR/NVR hard drive recording issues, mobile viewing setup, video loss, and new IP camera installations.",
    shortDescAr: "صيانة كاميرات المراقبة: مشاكل تسجيل القرص الصلب بأجهزة DVR/NVR، ربط الموبايل عن بعد، وفقدان إشارة الفيديو.",
    longDescEn: "Protect your villa, apartment, or commercial shop with dependable surveillance. We install and repair HD analog, IP network cameras, PTZ cameras, and configure secure remote mobile viewing.",
    longDescAr: "أمّن منزلك، فيلتك أو محلك التجاري بأحدث أنظمة المراقبة. نركب ونصلح كاميرات IP الذكية وكاميرات DVR وربطها بالهاتف للمشاهدة المباشرة 24/7.",
    iconName: "Camera",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Camera screen shows 'No Video' or black screen",
      "Night vision infrared LEDs not functioning in the dark",
      "DVR/NVR beep continuously due to storage hard drive error",
      "Unable to connect or view live footage on smartphone"
    ],
    commonProblemsAr: [
      "الشاشة تعرض رسالة 'لا توجد إشارة فيديو' أو شاشة سوداء",
      "خاصية الرؤية الليلية بالأشعة تحت الحمراء لا تعمل في الظلام",
      "جهاز التسجيل يطلق صفارة تحذير مستمرة بسبب عطل الهارد ديسك",
      "تعذر الاتصال أو المشاهدة الحية عبر تطبيق الهاتف المحمول"
    ],
    solutionsEn: [
      "BNC connector and PoE Ethernet cable crimping & testing",
      "Surveillance-grade Western Digital / Seagate hard drive replacement",
      "Camera power supply adapter and multi-channel power box renewal",
      "Router port forwarding and P2P cloud smartphone configuration"
    ],
    solutionsAr: [
      "فحص وتأريج كابلات الشبكة PoE وتوصيلات الفيديو BNC",
      "تبديل وتهيئة أقراص التخزين الصلبة المخصصة لأجهزة المراقبة",
      "صيانة وتبديل محولات الطاقة ووحدات التغذية المركزية للكاميرات",
      "ضبط إعدادات السحابة P2P والراوتر للربط الفوري بالهواتف الذكية"
    ],
    supportedTypesEn: ["IP Network Cameras", "HD Analog Systems", "Wireless Wi-Fi Cameras", "PTZ Pan-Tilt-Zoom Cameras"],
    supportedTypesAr: ["كاميرات شبكية IP", "أنظمة HD أنالوج", "كاميرات واي فاي لاسلكية", "كاميرات متحركة PTZ"],
    faqs: [
      {
        qEn: "Can you configure the cameras so I can watch them from abroad?",
        qAr: "هل يمكن ضبط الكاميرات لمشاهدتها من الهاتف أثناء السفر؟",
        aEn: "Yes, our technicians configure encrypted P2P cloud access on your iPhone or Android device so you can monitor live from anywhere in the world.",
        aAr: "نعم، يضبط فنيونا تطبيق الموبايل المشفر لتتمكن من مراقبة منزلك مباشرة من أي مكان حول العالم."
      }
    ]
  },
  {
    id: "plumbing-services",
    slug: "plumbing-services",
    titleEn: "Professional Plumbing Services",
    titleAr: "خدمات السباكة والحلول الصحية المنزلية",
    category: "maintenance",
    categoryNameEn: "Home Maintenance",
    categoryNameAr: "الصيانة المنزلية",
    shortDescEn: "Emergency leak repair, bathroom & kitchen faucet replacement, clogged drain unclogging, water booster pump repair, and toilet overhaul.",
    shortDescAr: "صيانة طوارئ التسريبات، تبديل خلاطات المطبخ والحمام، تسليك المجاري المسدودة، صيانة دينمو ومضخات المياه، وإصلاح كراسي التواليت.",
    longDescEn: "From dripping faucets and hidden pipe leaks to booster pump overhauls, Fixar's licensed plumbers handle all residential and light commercial sanitary requirements promptly.",
    longDescAr: "من تنقيط الخلاطات وتسريبات الأنابيب إلى صيانة مضخات المياه، يوفر سباكو فيكسار المحترفون حلولاً سريعة ومتقنة لجميع متطلبات السباكة المنزلية.",
    iconName: "Wrench",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Burst pipe or severe water leak flooding bathroom or kitchen",
      "Water booster pump constantly cycling on and off or not pumping",
      "Toilet flush tank leaking water into bowl continuously",
      "Slow-draining shower, bathtub, or kitchen wash basin",
      "Low water pressure across all household fixtures"
    ],
    commonProblemsAr: [
      "انفجار ماسورة مياه أو تسريب مفاجئ يغرق الأرضيات",
      "دينمو (مضخة) المياه يعمل ويفصل بشكل متكرر دون فتح حنفية",
      "صندوق طرد المرحاض (السيفون) يسرب مياه باستمرار",
      "انسداد وبطء تصريف مياه حوض المطبخ أو الشاور",
      "ضعف عام في ضغط المياه بجميع حنفيات المنزل"
    ],
    solutionsEn: [
      "PPR hot-melt pipe welding and compression joint replacement",
      "Booster pump pressure switch calibration and impeller repair",
      "Toilet cistern dual-flush valve and fill valve replacement",
      "Electromechanical drain snake unclogging",
      "Mixer tap cartridge and flexible supply braided hose renewal"
    ],
    solutionsAr: [
      "لحام مواسير البولي بروبلين PPR وتبديل الوصلات التالفة",
      "معايرة أوتوماتيك مضخة المياه وصيانة التوربينة",
      "تبديل ماكينة السيفون المزدوجة وعوامة تعبئة المياه",
      "تسليك بالوعات ومجاري الصرف بماكينات السوستة الكهربائية",
      "تبديل قلوب الخلاطات وخراطيم التغذية المرنة المقواة"
    ],
    supportedTypesEn: ["Bathroom Sanitary Ware", "Kitchen Plumbing", "Booster & Submersible Pumps", "Water Tank Float Valves"],
    supportedTypesAr: ["أطقم صحية للحمامات", "سباكة المطابخ والمغاسل", "مضخات رفع المياه والدينمو", "عوامات خزانات المياه العلوية والأرضية"],
    faqs: [
      {
        qEn: "Do you provide emergency 24/7 plumbing for burst pipes?",
        qAr: "هل توفرون خدمة سباكة طارئة 24 ساعة لانفجار المواسير؟",
        aEn: "Yes! Our on-call emergency plumbers are available around the clock to prevent property water damage.",
        aAr: "نعم! سباكو الطوارئ لدينا متاحون على مدار الساعة للتعامل الفوري مع أي انفجار أو تسريب مائي طارئ."
      }
    ]
  },
  {
    id: "electrician-services",
    slug: "electrician-services",
    titleEn: "Professional Electrician Services",
    titleAr: "خدمات الكهرباء والتمديدات المنزلية",
    category: "maintenance",
    categoryNameEn: "Home Maintenance",
    categoryNameAr: "الصيانة المنزلية",
    shortDescEn: "Certified electrical troubleshooting: circuit breaker trips, short circuit trace, chandelier installation, rewiring, and socket replacement.",
    shortDescAr: "فحص كهربائي معتمد: انقطاع القواطع، كشف الشورت والالتماس، تركيب النجف والإضاءة، وتبديل المفاتيح والأفياش المحترقة.",
    longDescEn: "Safe, compliant electrical solutions for your peace of mind. Our licensed technicians locate tricky short circuits, balance distribution board (DB) phases, and install energy-efficient lighting.",
    longDescAr: "حلول كهربائية آمنة ومعتمدة تمنحك راحة البال. يقوم فنيونا بتتبع أعطال الالتماس الكهربائي، موازنة أحمال لوحة التوزيع، وتركيب الإضاءة العصرية بدقة وأمان.",
    iconName: "Zap",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop",
    commonProblemsEn: [
      "Main circuit breaker trips instantly and refuses to stay up",
      "Burnt smell or spark from wall switches and power outlets",
      "Flickering ceiling lights or partial power blackout in villa/flat",
      "Appliance casing giving static electric shock when touched"
    ],
    commonProblemsAr: [
      "القاطع الرئيسي يفصل فوراً ويرفض التثبيت للأعلى",
      "رائحة حريق أو شرر يخرج من مفاتيح الجدار أو الأفياش",
      "تذبذب في الإضاءة أو انقطاع جزئي للكهرباء في بعض الغرف",
      "وجود رجفة أو ماس كهربائي عند لمس الأجهزة الكهربائية"
    ],
    solutionsEn: [
      "Digital megger insulation testing to isolate neutral/earth faults",
      "Distribution board (DB) MCB and ELCB circuit breaker replacement",
      "Burned wiring replacement with heat-resistant copper cables",
      "Heavy appliance dedicated high-amperage isolator switch installation"
    ],
    solutionsAr: [
      "فحص عزل الكابلات بجهاز الميجر الرقمي لعزل الالتماس",
      "تبديل قواطع الحماية ELCB و MCB بلوحة التوزيع الرئيسية",
      "تغيير الأسلاك المحترقة بأسلاك نحاسية معتمدة مقاومة للحرارة",
      "تركيب مفاتيح أحمال ثقيلة معزولة للأجهزة المنزلية الكبيرة"
    ],
    supportedTypesEn: ["Distribution Boards (DB)", "Chandelier & Architectural LED", "Cooker & AC Isolators", "Home Automation"],
    supportedTypesAr: ["لوحات توزيع الكهرباء DB", "تركيب النجف والليدات العصرية", "مفاتيح عزل الأفران والمكيفات", "أنظمة التحكم الذكي بالإضاءة"],
    faqs: [
      {
        qEn: "Is it dangerous if my circuit breaker keeps tripping?",
        qAr: "هل استمرار فصل قاطع الكهرباء يشكل خطورة؟",
        aEn: "Yes, circuit breakers trip to protect against fire or electrocution from overloads and short circuits. It should be inspected by a professional immediately.",
        aAr: "نعم، صُممت القواطع لحمايتك من الحرائق والصعق الكهربائي. استمرار فصلها يتطلب تدخلاً فورياً من فني متخصص."
      }
    ]
  }
];
