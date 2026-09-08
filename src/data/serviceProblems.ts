export interface ProblemOption {
  id: string;
  labelEn: string;
  labelAr: string;
}

export type ServiceProblemOption = ProblemOption;

export const serviceProblemsMap: Record<string, ProblemOption[]> = {
  "ac-repair": [
    { id: "ac-not-cooling", labelEn: "Not cooling at all / Warm air blowing", labelAr: "المكيف لا يبرد نهائياً / يخرج هواء دافئ" },
    { id: "ac-weak-cooling", labelEn: "Weak cooling / Slow to cool room", labelAr: "ضعف في كفاءة التبريد / بطء التبريد" },
    { id: "ac-water-leak", labelEn: "Indoor unit leaking water onto wall/floor", labelAr: "تسريب مياه من الوحدة الداخلية" },
    { id: "ac-no-power", labelEn: "Not turning on / No power", labelAr: "المكيف لا يعمل نهائياً / قاطع الكهرباء" },
    { id: "ac-noise", labelEn: "Strange noise / Vibration from indoor or outdoor unit", labelAr: "أصوات غير طبيعية أو اهتزاز مزعج" },
    { id: "ac-smell", labelEn: "Bad or musty odor coming from vents", labelAr: "رائحة كريهة أو رطبة من فتحات الهواء" },
    { id: "ac-fan-issue", labelEn: "Blower fan not spinning or weak airflow", labelAr: "مروحة دفع الهواء لا تدور أو دفع ضعيف" },
    { id: "ac-thermostat", labelEn: "Thermostat or remote control unresponsive", labelAr: "الثرموستات أو الريموت لا يستجيب" },
    { id: "ac-gas-leak", labelEn: "Refrigerant / Gas leak & refilling needed", labelAr: "نقص أو تسريب غاز الفريون وشحن الغاز" },
    { id: "ac-cleaning", labelEn: "Deep chemical foaming & coil cleaning service", labelAr: "غسيل كيميائي عميق وصيانة دورية" },
    { id: "ac-installation", labelEn: "AC installation / Uninstallation / Relocation", labelAr: "فك أو تركيب أو نقل المكيف" },
    { id: "ac-other", labelEn: "Other AC issue / Diagnostics required", labelAr: "مشكلة أخرى / فحص وتشخيص" },
  ],
  "refrigerator-repair": [
    { id: "fridge-not-cooling", labelEn: "Refrigerator lower compartment not cooling", labelAr: "الثلاجة من الأسفل لا تبرد" },
    { id: "fridge-freezer-not-freezing", labelEn: "Freezer not freezing / Ice melting", labelAr: "الفريزر لا يجمد / ذوبان الأطعمة" },
    { id: "fridge-excessive-ice", labelEn: "Excessive ice / Frost build-up on back wall", labelAr: "تراكم ثلج كثيف داخل الثلاجة" },
    { id: "fridge-water-leak", labelEn: "Water pooling under crisper drawers or floor", labelAr: "تسريب وتجمع مياه أسفل الأدراج" },
    { id: "fridge-compressor", labelEn: "Compressor clicking or humming constantly", labelAr: "صوت تكتكة أو عمل مستمر للكمبروسر" },
    { id: "fridge-noise", labelEn: "Loud humming or vibrating noise", labelAr: "صوت طنين أو اهتزاز مزعج" },
    { id: "fridge-door-seal", labelEn: "Door rubber gasket torn or not sealing", labelAr: "ربلة (كاوتشوك) الباب تالفة ولا تغلق بإحكام" },
    { id: "fridge-power", labelEn: "Tripping power breaker / No power", labelAr: "الثلاجة تفصل الكهرباء أو لا تعمل" },
    { id: "fridge-other", labelEn: "Other refrigerator issue", labelAr: "مشكلة أخرى في الثلاجة" },
  ],
  "washing-machine-repair": [
    { id: "wm-not-starting", labelEn: "Machine not starting / No power", labelAr: "الغسالة لا تبدأ الدورة / لا تعمل" },
    { id: "wm-not-draining", labelEn: "Not draining water (Drain error OE/E20)", labelAr: "الغسالة لا تطرد المياه (عطل الصرف)" },
    { id: "wm-not-spinning", labelEn: "Drum not spinning / Clothes soaking wet", labelAr: "الحلة لا تدور / عدم عصر الملابس" },
    { id: "wm-water-leak", labelEn: "Water leaking from bottom or door", labelAr: "تسريب مياه من أسفل الغسالة أو الباب" },
    { id: "wm-vibration", labelEn: "Violent shaking / Drum banging noise", labelAr: "اهتزاز عنيف وصوت خبط قوي أثناء العصر" },
    { id: "wm-door-lock", labelEn: "Door lock stuck / Cannot open door", labelAr: "قفل الباب عالق وتعذر إخراج الملابس" },
    { id: "wm-error-code", labelEn: "Error code displayed on digital screen", labelAr: "ظهور رمز خطأ على الشاشة الرقمية" },
    { id: "wm-bearing-drum", labelEn: "Loud roaring drum bearing noise", labelAr: "صوت خشن ومزعج من رولمان بلي الحلة" },
    { id: "wm-other", labelEn: "Other washing machine issue", labelAr: "مشكلة أخرى في الغسالة" },
  ],
  "microwave-repair": [
    { id: "mw-not-heating", labelEn: "Runs but does not heat food at all", labelAr: "الجهاز يدور ولكن لا يسخن الطعام" },
    { id: "mw-sparking", labelEn: "Sparking or arcing inside cooking chamber", labelAr: "ظهور شرر أو فرقعة داخل الكابينة" },
    { id: "mw-turntable", labelEn: "Turntable glass plate not rotating", labelAr: "طبق الزجاج الدوار لا يلف" },
    { id: "mw-touchpad", labelEn: "Touch buttons or digital keypad not responding", labelAr: "أزرار اللمس أو الشاشة لا تستجيب" },
    { id: "mw-stops", labelEn: "Shuts off automatically after a few seconds", labelAr: "يفصل تلقائياً بعد ثوانٍ من التشغيل" },
    { id: "mw-other", labelEn: "Other microwave or oven fault", labelAr: "مشكلة أخرى في الميكروويف أو الفرن" },
  ],
  "water-heater-repair": [
    { id: "wh-no-hot-water", labelEn: "No hot water / Heating element failure", labelAr: "انعدام الماء الساخن / عطل الهيتر" },
    { id: "wh-trips-breaker", labelEn: "Trips main electrical breaker instantly", labelAr: "السخان يفصل قاطع الكهرباء الرئيسي" },
    { id: "wh-leaking", labelEn: "Water leaking from safety valve or tank", labelAr: "تسريب مياه من صمام الأمان أو الخزان" },
    { id: "wh-rust-water", labelEn: "Brown, rusty, or bad-smelling hot water", labelAr: "ماء ساخن بلون صدأ أو برائحة كريهة" },
    { id: "wh-low-pressure", labelEn: "Extremely low hot water flow pressure", labelAr: "ضعف شديد في ضغط تدفق الماء الساخن" },
    { id: "wh-other", labelEn: "Other water heater fault", labelAr: "عطل آخر في سخان المياه" },
  ],
  "ro-water-purifier-repair": [
    { id: "ro-bad-taste", labelEn: "Foul taste or odor in purified water", labelAr: "طعم أو رائحة غير مستحبة في الماء" },
    { id: "ro-low-flow", labelEn: "Very slow water flow / Dropping stream", labelAr: "تدفق ماء بطيء وضعيف جداً" },
    { id: "ro-pump-running", labelEn: "Booster pump running continuously without stop", labelAr: "مضخة الفلتر تعمل باستمرار دون توقف" },
    { id: "ro-leakage", labelEn: "Water leaking from filter housings or tubes", labelAr: "تسريب مياه من حوافظ الشمعات أو الوصلات" },
    { id: "ro-high-tds", labelEn: "TDS tester showing high mineral readings", labelAr: "ارتفاع نسبة الأملاح الذائبة TDS" },
    { id: "ro-filter-change", labelEn: "Routine filter cartridge renewal service", labelAr: "تبديل شمعات الفلتر الدورية" },
    { id: "ro-other", labelEn: "Other purifier issue", labelAr: "مشكلة أخرى في فلتر المياه" },
  ],
  "kitchen-chimney-repair": [
    { id: "ch-weak-suction", labelEn: "Weak smoke suction / Smoke remains in kitchen", labelAr: "ضعف قوة سحب الدخان وبقاؤه بالمطبخ" },
    { id: "ch-loud-noise", labelEn: "Loud vibration or rattling noise from motor", labelAr: "اهتزاز أو صوت ضجيج مرتفع من الموتور" },
    { id: "ch-touch-panel", labelEn: "Touch control or speed buttons dead", labelAr: "لوحة التحكم باللمس أو السرعات لا تعمل" },
    { id: "ch-grease-cleaning", labelEn: "Deep degreasing wash of baffle/mesh filters", labelAr: "تنظيف كيميائي عميق لإزالة الدهون" },
    { id: "ch-lights", labelEn: "Chimney LED lights not working", labelAr: "إضاءة الشفاط لا تعمل" },
    { id: "ch-other", labelEn: "Other chimney fault", labelAr: "عطل آخر في شفاط المطبخ" },
  ],
  "gas-stove-repair": [
    { id: "gs-yellow-flame", labelEn: "Weak yellow flame blackening cooking pots", labelAr: "شعلة صفراء ضعيفة تسود أواني الطهي" },
    { id: "gs-auto-ignition", labelEn: "Auto-ignition not sparking or ticking continuously", labelAr: "الإشعال الذاتي لا يعمل أو يدق باستمرار" },
    { id: "gs-gas-smell", labelEn: "Gas smell / Leak detection inspection needed", labelAr: "رائحة غاز / فحص ومعالجة التسريب فوراً" },
    { id: "gs-knob-release", labelEn: "Burner flame turns off when releasing knob", labelAr: "الشعلة تنطفئ فور ترك مقبض التشغيل" },
    { id: "gs-oven-burner", labelEn: "Oven burner flame does not stay lit", labelAr: "شعلة الفرن السفلية أو العلوية لا تثبت" },
    { id: "gs-other", labelEn: "Other gas stove or hob issue", labelAr: "مشكلة أخرى في البوتاجاز أو المسطح" },
  ],
  "water-dispenser-repair": [
    { id: "wd-not-cooling", labelEn: "Cold tap dispensing room-temperature water", labelAr: "صنبور البارد لا يبرد الماء" },
    { id: "wd-not-heating", labelEn: "Hot tap not heating water", labelAr: "صنبور الساخن لا يسخن الماء" },
    { id: "wd-leaking", labelEn: "Water leaking onto the floor from base", labelAr: "تسريب مياه من أسفل البراد على الأرض" },
    { id: "wd-bottom-pump", labelEn: "Bottom-load pump failing to draw water", labelAr: "المضخة السفلية لا تسحب الماء من القارورة" },
    { id: "wd-sanitization", labelEn: "Deep internal tank descaling & sanitization", labelAr: "تعقيم داخلي وإزالة الرواسب من الخزان" },
    { id: "wd-other", labelEn: "Other dispenser fault", labelAr: "عطل آخر في براد المياه" },
  ],
  "led-smart-tv-repair": [
    { id: "tv-black-screen", labelEn: "Sound is working but screen is dark / black", labelAr: "يوجد صوت ولكن الشاشة سوداء تماماً" },
    { id: "tv-no-power", labelEn: "Will not power on / Standby light blinking", labelAr: "الشاشة لا تعمل / لمبة البيان تومض" },
    { id: "tv-lines", labelEn: "Vertical or horizontal colored lines on screen", labelAr: "ظهور خطوط طولية أو عرضية ملونة" },
    { id: "tv-reboot-loop", labelEn: "Restarting continuously / Stuck on logo", labelAr: "إعادة تشغيل مستمر / تجمد على الشعار" },
    { id: "tv-ports-wifi", labelEn: "HDMI ports or Wi-Fi connectivity failure", labelAr: "أعطال منافذ HDMI أو اتصال الواي فاي" },
    { id: "tv-other", labelEn: "Other TV diagnostic requirement", labelAr: "عطل آخر في شاشة التلفزيون" },
  ],
  "water-cooler-repair": [
    { id: "wc-not-cooling", labelEn: "Commercial cooler compressor runs but water is warm", labelAr: "الكمبروسر يعمل ولكن مياه المبرد دافئة" },
    { id: "wc-tank-leak", labelEn: "Pinhole leak from stainless steel tank or drain", labelAr: "تسريب مياه من خزان الستانلس أو الصرف" },
    { id: "wc-fan-motor", labelEn: "Condenser fan noisy or not exhausting heat", labelAr: "مروحة المكثف تصدر صوتاً أو لا تطرد الحرارة" },
    { id: "wc-other", labelEn: "Other commercial water cooler issue", labelAr: "عطل آخر في مبرد المياه التجاري" },
  ],
  "deep-freezer-repair": [
    { id: "df-not-freezing", labelEn: "Deep freezer temperature staying above freezing", labelAr: "الفريزر لا يجمد وحرارته أعلى من الصفر" },
    { id: "df-runs-nonstop", labelEn: "Compressor runs 24/7 without cycling off", labelAr: "الكمبروسر يعمل باستمرار دون توقف" },
    { id: "df-thick-ice", labelEn: "Heavy frost accumulation around lid gasket", labelAr: "تراكم ثلج كثيف حول إطار الباب" },
    { id: "df-shock", labelEn: "Static shock sensation on metal cabinet", labelAr: "ماس كهربائي خفيف على الهيكل الخارجي" },
    { id: "df-other", labelEn: "Other chest/upright freezer fault", labelAr: "عطل آخر في الديب فريزر" },
  ],
  "cctv-installation-repair": [
    { id: "cctv-no-video", labelEn: "Camera display shows 'No Video' or black screen", labelAr: "الكاميرا تعرض 'لا توجد إشارة' أو شاشة سوداء" },
    { id: "cctv-night-vision", labelEn: "Infrared night vision not working in dark", labelAr: "الرؤية الليلية بالأشعة تحت الحمراء لا تعمل" },
    { id: "cctv-dvr-beep", labelEn: "DVR/NVR beeping / Hard disk storage error", labelAr: "صفارة تحذير من جهاز التسجيل / عطل الهارد" },
    { id: "cctv-mobile-app", labelEn: "Cannot view live stream on mobile phone", labelAr: "تعذر المشاهدة الحية عبر تطبيق الهاتف" },
    { id: "cctv-installation", labelEn: "New camera wiring & installation setup", labelAr: "تمديد وتركيب كاميرات مراقبة جديدة" },
    { id: "cctv-other", labelEn: "Other security camera issue", labelAr: "مشكلة أخرى في كاميرات المراقبة" },
  ],
  "plumbing-services": [
    { id: "pl-burst-pipe", labelEn: "Emergency burst pipe / Active water flooding", labelAr: "انفجار ماسورة مياه / تسريب طارئ يغرق المكان" },
    { id: "pl-pump-cycling", labelEn: "Booster pump cycling on and off continuously", labelAr: "مضخة المياه تعمل وتفصل باستمرار" },
    { id: "pl-toilet-leak", labelEn: "Toilet flush tank leaking water into bowl", labelAr: "صندوق طرد المرحاض (السيفون) يسرب مياه" },
    { id: "pl-clogged-drain", labelEn: "Clogged sink, shower, or bathroom drain line", labelAr: "انسداد مجاري أو بالوعة الحمام أو المطبخ" },
    { id: "pl-faucet-replace", labelEn: "Dripping mixer tap / Faucet replacement", labelAr: "تنقيط الخلاط / تركيب خلاطات مياه جديدة" },
    { id: "pl-other", labelEn: "Other plumbing service required", labelAr: "خدمة سباكة أخرى مطلوبة" },
  ],
  "electrician-services": [
    { id: "el-tripping-breaker", labelEn: "Main circuit breaker trips and won't stay up", labelAr: "القاطع الرئيسي يفصل باستمرار ويرفض التثبيت" },
    { id: "el-short-circuit", labelEn: "Short circuit spark or burnt smell from switch", labelAr: "شرارة التماس أو رائحة حريق من المفاتيح" },
    { id: "el-flickering-lights", labelEn: "Flickering lights / Partial villa power blackout", labelAr: "تذبذب الإضاءة أو انقطاع جزئي للكهرباء" },
    { id: "el-socket-replacement", labelEn: "Burned wall socket / High-amp isolator installation", labelAr: "تبديل أفياش محترقة أو تركيب مفتاح عزل" },
    { id: "el-lighting-chandelier", labelEn: "Chandelier, architectural LED & pendant hanging", labelAr: "تركيب نجف وإضاءة ليد عصرية" },
    { id: "el-other", labelEn: "Other electrical inspection required", labelAr: "فحص أو تمديدات كهربائية أخرى" },
  ],
};

export function getProblemsForService(serviceId: string): ProblemOption[] {
  return (
    serviceProblemsMap[serviceId] || [
      { id: "general-not-working", labelEn: "Appliance not working properly", labelAr: "الجهاز لا يعمل بالشكل المطلوب" },
      { id: "general-noise", labelEn: "Unusual noise or vibration", labelAr: "أصوات أو اهتزازات غير طبيعية" },
      { id: "general-maintenance", labelEn: "Routine servicing & inspection", labelAr: "صيانة دورية وفحص شامل" },
      { id: "general-other", labelEn: "Other diagnostics needed", labelAr: "تشخيص وفحص مشكلة أخرى" },
    ]
  );
}
