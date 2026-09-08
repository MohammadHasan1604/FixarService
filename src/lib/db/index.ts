import fs from "fs";
import path from "path";
import crypto from "crypto";
import { initialBusinessSettings } from "@/data/businessSettings";
import {
  BookingRecord,
  BookingStatus,
  DatabaseState,
  StatusHistoryItem,
  TechnicianRecord,
  ContactMessageRecord,
  BlogPostRecord,
  AuthUserRecord,
  AdminCredentialsRecord,
} from "./types";

const DB_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DB_DIR, "db.json");

const initialTechnicians: TechnicianRecord[] = [
  {
    id: "tech-1",
    name: "Mohammad Tariq",
    phone: "+971 50 123 4567",
    specialties: ["AC Repair", "Compressor Overhaul", "Gas Charging"],
    serviceAreas: ["Sharjah", "Ajman", "Al Nahda"],
    active: true,
    assignedJobsCount: 3,
  },
  {
    id: "tech-2",
    name: "Suresh Narayanan",
    phone: "+971 52 987 6543",
    specialties: ["Refrigerator Repair", "Washing Machine", "Deep Freezers"],
    serviceAreas: ["Dubai", "Sharjah", "Deira", "Al Barsha"],
    active: true,
    assignedJobsCount: 2,
  },
  {
    id: "tech-3",
    name: "Bilal Ahmad",
    phone: "+971 55 456 7890",
    specialties: ["Kitchen Chimney", "Gas Stove", "Microwave & Oven"],
    serviceAreas: ["Sharjah", "Al Majaz", "Muwaileh"],
    active: true,
    assignedJobsCount: 1,
  },
  {
    id: "tech-4",
    name: "Zahid Qureshi",
    phone: "+971 56 345 6789",
    specialties: ["Plumbing Services", "Water Heaters", "RO Purifiers"],
    serviceAreas: ["Dubai", "Mirdif", "Sharjah"],
    active: true,
    assignedJobsCount: 1,
  },
];

const initialUsers: AuthUserRecord[] = [
  {
    id: "user-admin",
    username: "admin",
    name: "Senior Operations Director",
    role: "admin",
  },
  {
    id: "user-staff",
    username: "staff",
    name: "Field Operations Supervisor",
    role: "staff",
    phone: "+971 54 337 7512",
  },
];

const initialBlogPosts: BlogPostRecord[] = [
  {
    id: "blog-1",
    slug: "ac-maintenance-tips-uae-summer",
    titleEn: "5 Essential AC Maintenance Steps Before the Peak UAE Summer Heat",
    titleAr: "5 خطوات أساسية لصيانة المكيف قبل اشتداد حرارة الصيف في الإمارات",
    category: "Cooling Care",
    categoryAr: "العناية بالتكييف",
    author: "Eng. Rashid Al Mansoori",
    publishedDate: "March 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    excerptEn: "Ensure your split or central AC runs smoothly through 45°C temperatures without unexpected breakdowns or skyrocketing electricity bills.",
    excerptAr: "حافظ على كفاءة تكييف منزلك خلال درجات الحرارة المرتفعة دون أعطال مفاجئة أو فواتير كهرباء باهظة.",
    contentEn: `Summer temperatures in the United Arab Emirates frequently exceed 45°C with severe coastal humidity. In such demanding climates, your home air conditioner is not merely a comfort appliance—it is essential infrastructure.

### 1. Wash Air Filters Every 14 Days
Dust storms and fine desert sand clog evaporator filters rapidly. A restricted air filter strains the blower motor, reduces room cooling by up to 35%, and forces the compressor to run without cycling.

### 2. Inspect Condensate Drain Lines for Mold
With high indoor-to-outdoor temperature differentials, AC units generate gallons of condensation daily. Uncleaned drain lines quickly develop algae and jelly blockages, causing water to overflow into walls and ceilings.

### 3. Clear the Outdoor Condenser Unit
The outdoor unit requires at least 2 feet of unobstructed clearance to expel heat effectively. Ensure dry leaves, stored boxes, or dust buildup do not choke the aluminium radiator fins.

### 4. Check Refrigerant Pressure & Compressor Amperage
Low refrigerant from microscopic flare nut leaks causes evaporator coils to ice up while blowing lukewarm air into your rooms. Professional pressure testing restores optimal cooling efficiency.

### 5. Schedule Professional Deep Chemical Washing
Annual chemical foaming removes entrenched grease, mildew, and dust from deep within the cooling coils where conventional vacuuming cannot reach.`,
    contentAr: `تتجاوز درجات الحرارة في دولة الإمارات خلال الصيف حاجز 45 درجة مئوية مصحوبة برطوبة عالية. في هذا المناخ القاسي، يعتبر مكيف الهواء شريان الراحة الأساسي في منزلك.

### 1. تنظيف الفلاتر كل أسبوعين
تتسبب العواصف الترابية والغبار الناعم في انسداد فلاتر المكيف بسرعة، مما يضعف قوة تدفق الهواء ويزيد استهلاك الطاقة بنسبة 35%.

### 2. فحص مجرى تصريف المياه
مع الرطوبة العالية، تنتج المكيفات كميات كبيرة من مياه التكثيف. انسداد خرطوم التصريف بالرواسب يؤدي إلى تسريب المياه داخل الغرف وتلف الجدران.

### 3. تنظيف الوحدة الخارجية (الكمبروسر)
تحتاج الوحدة الخارجية لمساحة تهوية كافية لطرد الحرارة. احرص على إزالة أي عوائق أو أتربة متراكمة على زعانف الألمنيوم الخارجية.

### 4. فحص ضغط غاز التبريد
نقص غاز الفريون يتسبب في تجمد لفائف التبريد وخروج هواء دافئ. الفحص الدوري يضمن ضبط ضغط الغاز وفق المعايير المعتمدة.

### 5. الغسيل الكيميائي العميق
يضمن الغسيل الكيميائي بمضخات الضغط العالي إزالة الأوساخ والفطريات العميقة داخل الراديتر، مما يعيد للمكيف كفاءة التبريد كأنه جديد.`,
  },
  {
    id: "blog-2",
    slug: "refrigerator-not-cooling-troubleshooting-guide",
    titleEn: "Why Is Your Refrigerator Not Cooling? Top Causes and DIY Fixes",
    titleAr: "لماذا لا تبرد الثلاجة كالمعتاد؟ الأسباب الرئيسية وطرق التعامل معها",
    category: "Appliance Care",
    categoryAr: "العناية بالأجهزة",
    author: "Technician Suresh Kumar",
    publishedDate: "February 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    excerptEn: "Discover whether your fridge's cooling trouble is a simple clogged condenser coil or an inverter compressor failure requiring professional service.",
    excerptAr: "تعرف على أسباب ضعف تبريد الثلاجة، ومتى يمكنك تنظيف المكثف بنفسك ومتى يتطلب الأمر تدخلاً من فني تبريد متخصص.",
    contentEn: `A failing refrigerator can spoil hundreds of dirhams worth of groceries within hours. Here is how to diagnose the issue step by step:

1. **Dust-Choked Condenser Coils**: Located behind or beneath the unit, dusty coils cannot release heat, causing the compressor to overheat and shut off.
2. **Damaged Door Gasket**: A split magnetic door seal lets warm, humid air seep inside constantly, leading to thick frost build-up.
3. **Failed Evaporator Fan Motor**: If the freezer is freezing cold but the lower refrigerator compartments are warm, the internal air circulation fan has likely failed.
4. **Defrost System Failure**: When the defrost bimetal thermostat or heater burns out, ice solidifies over the coils, blocking all airflow.
5. **Inverter PCB Board Fault**: Power fluctuations can burn the inverter power module, preventing the compressor from starting.`,
    contentAr: `تعطل تبريد الثلاجة قد يؤدي إلى تلف الأغذية سريعاً. إليك أهم الأسباب الشائعة وخطوات تشخيصها:

1. **تراكم الغبار على المكثف الخارجي**: يؤدي تراكم الأتربة على الشبكة الخلفية إلى ارتفاع حرارة الكمبروسر وتوقفه تلقائياً لحماية نفسه.
2. **تلف ربلة (كاوتشوك) الباب**: تسريب الهواء البارد ودخول الهواء الدافئ يؤدي إلى تكون ثلوج كثيفة وضعف التبريد.
3. **عطل مروحة توزيع الهواء**: إذا كان الفريزر بارداً بينما الثلاجة من الأسفل دافئة، فالسبب غالباً هو توقف مروحة توزيع التبريد.
4. **عطل نظام إذابة الثلج (الديفروست)**: احتراق سخان إذابة الثلج أو الحساس يؤدي إلى انسداد مجاري الهواء بالجليد.
5. **خلل في بوردة التحكم بالإنفرتر**: تذبذب التيار الكهربائي قد يضر بوحدة التحكم الإلكترونية الخاصة بتشغيل الضاغط.`,
  },
  {
    id: "blog-3",
    slug: "washing-machine-drum-drainage-care",
    titleEn: "How to Prevent Washing Machine Smells, Drain Errors, and Drum Noise",
    titleAr: "كيف تتخلص من روائح الغسالة الكريهة وأعطال الصرف وأصوات الحلة المزعجة",
    category: "Laundry Maintenance",
    categoryAr: "صيانة الغسالات",
    author: "Bilal Ahmad",
    publishedDate: "January 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=1200&auto=format&fit=crop",
    excerptEn: "Simple preventive laundry machine care routines to prevent pump burnouts, bearing damage, and unpleasant mildew odors in clothes.",
    excerptAr: "نصائح وإرشادات وقائية بسيطة تحمي مضخة الصرف من الاحتراق وتمنع تآكل رولمان البلي وتراكم الروائح الكريهة.",
    contentEn: `Front-load and top-load washing machines are workhorses in modern households, but neglect can quickly lead to expensive drum bearing replacements and drain pump burnout.

### Clean the Coin & Debris Filter Monthly
Located at the bottom right corner of modern front-loaders, this filter catches hairpins, coins, and lint. A blocked filter triggers the dreaded 'OE' or 'E20' drainage error.

### Never Overload Beyond Capacity
Stuffing the drum past 80% creates massive centrifugal imbalance during high-speed spinning (1200+ RPM), snapping suspension springs and destroying heavy-duty drum bearings.

### Leave the Door Ajar After Washes
Trapped moisture inside the airtight drum fosters mold colonies. Leaving the door slightly open allows the drum to air dry naturally, eliminating musty laundry smells.`,
    contentAr: `تعتبر الغسالات الأوتوماتيكية من أهم الأجهزة المنزلية، لكن إهمال الصيانة البسيطة قد يؤدي لأعطال مكلفة في الحلة وطلمبة الصرف.

### تنظيف فلتر العملات والشوائب شهرياً
يوجد الفلتر أسفل الغسالة، ويقوم بحجز الدبابيس والعملات المعدنية والوبر. انسداده يتسبب في ظهور كود خطأ الصرف وتوقف الغسالة عن طرد المياه.

### عدم تحميل الغسالة فوق طاقتها
وضع كميات ملابس زائدة يفقد الحلة توازنها أثناء العصر السريع، مما يؤدي لتلف المساعدين وتآكل رولمان البلي بسرعة.

### ترك باب الغسالة موارباً بعد كل غسلة
حبس الرطوبة داخل الحلة المغلقة يسبب تكاثر الفطريات والبكتيريا، مما يولد روائح كريهة تنتقل إلى ملابسك النظيفة.`,
  }
];

const initialBookings: BookingRecord[] = [
  {
    id: "seed-booking-1",
    reference: "FIX-26-K9M28X4P",
    customerName: "Ahmed Al Mansoori",
    customerPhone: "+971501234567",
    customerWhatsapp: "+971501234567",
    customerEmail: "ahmed.m@example.com",
    country: "United Arab Emirates",
    city: "Sharjah",
    area: "Al Majaz 2",
    address: {
      building: "Corniche Tower",
      apartment: "1402",
      street: "Al Majaz Waterfront St",
      landmark: "Opposite Buhaira Corniche",
    },
    serviceId: "ac-repair",
    serviceTitle: "Air Conditioner Repair & Servicing",
    brand: "O General",
    model: "Split AC 2.5 Ton",
    problemCategory: "ac-not-cooling",
    description: "Master bedroom split AC is blowing warm air since yesterday afternoon. Condenser fan is spinning but cooling is absent.",
    appointmentDate: "2026-09-09",
    appointmentSlot: "Morning (09:00 AM - 01:00 PM)",
    status: "assigned",
    assignedTechnicianId: "tech-1",
    assignedTechnicianName: "Mohammad Tariq",
    internalNotes: "Customer notified. Technician carrying R410A gas cylinder and manifold gauge.",
    createdAt: "2026-09-08T09:30:00.000Z",
    updatedAt: "2026-09-08T10:15:00.000Z",
  },
  {
    id: "seed-booking-2",
    reference: "FIX-26-W3J7P92D",
    customerName: "Fatima Al Zaabi",
    customerPhone: "+971549876543",
    customerWhatsapp: "+971549876543",
    customerEmail: "fatima.z@example.com",
    country: "United Arab Emirates",
    city: "Dubai",
    area: "Al Barsha 1",
    address: {
      building: "Golden Sands Villa 4",
      apartment: "Villa 4",
      street: "14th Street",
      landmark: "Near Mall of the Emirates",
    },
    serviceId: "refrigerator-repair",
    serviceTitle: "Refrigerator & Freezer Repair",
    brand: "Samsung",
    model: "Double Door Inverter",
    problemCategory: "fridge-not-cooling",
    description: "Freezer works well but bottom vegetable section is not cooling at all. Ice buildup visible on rear wall.",
    appointmentDate: "2026-09-09",
    appointmentSlot: "Afternoon (01:00 PM - 05:00 PM)",
    status: "accepted",
    assignedTechnicianId: "tech-2",
    assignedTechnicianName: "Suresh Narayanan",
    internalNotes: "Suspected defrost sensor or fan motor failure. Appointment confirmed with client.",
    createdAt: "2026-09-08T11:00:00.000Z",
    updatedAt: "2026-09-08T11:45:00.000Z",
  },
  {
    id: "seed-booking-3",
    reference: "FIX-26-Q8B4M17V",
    customerName: "Khalid Al Busaidi",
    customerPhone: "+96895925092",
    customerWhatsapp: "+96895925092",
    country: "Oman",
    city: "Muscat",
    area: "Al Khuwair",
    address: {
      building: "Al Khuwair Plaza",
      apartment: "Flat 204",
      street: "Dohat Al Adab St",
      landmark: "Behind Radisson Blu",
    },
    serviceId: "washing-machine-repair",
    serviceTitle: "Washing Machine & Dryer Repair",
    brand: "LG",
    model: "Front Load 8KG",
    problemCategory: "wm-bearing-drum",
    description: "Machine shakes violently during 1200 RPM spin cycle and makes roaring train-like noise.",
    appointmentDate: "2026-09-10",
    appointmentSlot: "Morning (09:00 AM - 01:00 PM)",
    status: "new",
    createdAt: "2026-09-08T12:30:00.000Z",
    updatedAt: "2026-09-08T12:30:00.000Z",
  },
];

const initialStatusHistory: StatusHistoryItem[] = [
  {
    id: "hist-1",
    bookingRef: "FIX-26-K9M28X4P",
    status: "new",
    note: "Booking request submitted online by customer.",
    timestamp: "2026-09-08T09:30:00.000Z",
    actor: "Customer",
  },
  {
    id: "hist-2",
    bookingRef: "FIX-26-K9M28X4P",
    status: "accepted",
    note: "Customer confirmed preferred appointment window via telephone.",
    timestamp: "2026-09-08T09:45:00.000Z",
    actor: "Dispatch Desk",
  },
  {
    id: "hist-3",
    bookingRef: "FIX-26-K9M28X4P",
    status: "assigned",
    note: "Job assigned to senior AC technician Mohammad Tariq.",
    timestamp: "2026-09-08T10:15:00.000Z",
    actor: "Dispatch Desk",
  },
  {
    id: "hist-4",
    bookingRef: "FIX-26-W3J7P92D",
    status: "new",
    note: "Booking request submitted online by customer.",
    timestamp: "2026-09-08T11:00:00.000Z",
    actor: "Customer",
  },
  {
    id: "hist-5",
    bookingRef: "FIX-26-W3J7P92D",
    status: "accepted",
    note: "Appointment verified and accepted by staff.",
    timestamp: "2026-09-08T11:45:00.000Z",
    actor: "Staff Operator",
  },
  {
    id: "hist-6",
    bookingRef: "FIX-26-Q8B4M17V",
    status: "new",
    note: "Booking request submitted for Muscat service location.",
    timestamp: "2026-09-08T12:30:00.000Z",
    actor: "Customer",
  },
];

const initialContactMessages: ContactMessageRecord[] = [
  {
    id: "msg-1",
    name: "Salim Al Nuaimi",
    phone: "+971 50 765 4321",
    email: "salim.nuaimi@example.com",
    subject: "Villa AC Annual Maintenance Contract Inquiry",
    message: "Hello Fixar team, we have 8 split AC units in our villa in Al Zahraa, Sharjah. Do you provide biannual service packages?",
    createdAt: "2026-09-08T08:00:00.000Z",
    read: false,
  },
];

let memoryDb: DatabaseState | null = null;

function getInitialState(): DatabaseState {
  return {
    settings: initialBusinessSettings,
    bookings: initialBookings,
    statusHistory: initialStatusHistory,
    technicians: initialTechnicians,
    contactMessages: initialContactMessages,
    blogPosts: initialBlogPosts,
    users: initialUsers,
  };
}

export function getDatabase(): DatabaseState {
  if (memoryDb) {
    return memoryDb;
  }

  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      memoryDb = JSON.parse(content);
      if (!memoryDb!.users) {
        memoryDb!.users = initialUsers;
      }
      return memoryDb!;
    }
  } catch (err) {
    console.error("Failed to read database file, initializing memory fallback", err);
  }

  memoryDb = getInitialState();
  saveDatabase(memoryDb);
  return memoryDb;
}

export function saveDatabase(state: DatabaseState): void {
  memoryDb = state;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to database file", err);
  }
}

// Data Access Methods
export function getBusinessSettings() {
  return getDatabase().settings;
}

export function updateBusinessSettings(updates: Partial<typeof initialBusinessSettings>) {
  const db = getDatabase();
  db.settings = { ...db.settings, ...updates };
  saveDatabase(db);
  return db.settings;
}

export function getAllBookings(filter?: { status?: string; staffId?: string; search?: string }) {
  let list = getDatabase().bookings;

  if (filter?.status && filter.status !== "all") {
    list = list.filter((b) => b.status === filter.status);
  }

  if (filter?.staffId) {
    list = list.filter((b) => b.assignedTechnicianId === filter.staffId);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (b) =>
        b.reference.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q) ||
        b.serviceTitle.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q)
    );
  }

  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getBookingByReference(reference: string, phoneOrEmail?: string) {
  const cleanRef = reference.trim().toUpperCase();
  const db = getDatabase();
  const booking = db.bookings.find((b) => b.reference.toUpperCase() === cleanRef);

  if (!booking) return null;

  if (phoneOrEmail) {
    const cleanPhoneQuery = phoneOrEmail.replace(/\D/g, "");
    const bookingPhone = booking.customerPhone.replace(/\D/g, "");
    const bookingWhatsapp = booking.customerWhatsapp.replace(/\D/g, "");
    const emailMatch =
      booking.customerEmail &&
      booking.customerEmail.toLowerCase() === phoneOrEmail.trim().toLowerCase();

    const phoneMatch =
      cleanPhoneQuery.length >= 7 &&
      (bookingPhone.includes(cleanPhoneQuery) ||
        cleanPhoneQuery.includes(bookingPhone) ||
        bookingWhatsapp.includes(cleanPhoneQuery));

    if (!phoneMatch && !emailMatch) {
      return null;
    }
  }

  const history = db.statusHistory
    .filter((h) => h.bookingRef.toUpperCase() === cleanRef)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return { booking, history };
}

export function generateBookingReference(): string {
  // Format: FIX-26-XXXXXXXX (Secure non-sequential 8-char random alphanumeric)
  const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  const randomBytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) {
    randomPart += charset[randomBytes[i] % charset.length];
  }
  return `FIX-26-${randomPart}`;
}

export function createBooking(data: Omit<BookingRecord, "id" | "reference" | "createdAt" | "updatedAt" | "status">) {
  const db = getDatabase();
  const reference = generateBookingReference();
  const now = new Date().toISOString();

  const newBooking: BookingRecord = {
    ...data,
    id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    reference,
    status: "new",
    createdAt: now,
    updatedAt: now,
  };

  db.bookings.push(newBooking);

  const initialHistory: StatusHistoryItem = {
    id: `hist-${Date.now()}`,
    bookingRef: reference,
    status: "new",
    note: "Service booking request registered into system.",
    timestamp: now,
    actor: "Customer",
  };

  db.statusHistory.push(initialHistory);
  saveDatabase(db);

  return newBooking;
}

export function updateBookingStatus(
  reference: string,
  newStatus: BookingStatus,
  note?: string,
  assignedTechId?: string,
  actor = "Staff / Admin Operator"
) {
  const db = getDatabase();
  const booking = db.bookings.find((b) => b.reference.toUpperCase() === reference.toUpperCase());
  if (!booking) return null;

  const now = new Date().toISOString();
  booking.status = newStatus;
  booking.updatedAt = now;

  if (assignedTechId !== undefined) {
    if (assignedTechId === "") {
      booking.assignedTechnicianId = undefined;
      booking.assignedTechnicianName = undefined;
    } else {
      const tech = db.technicians.find((t) => t.id === assignedTechId);
      if (tech) {
        booking.assignedTechnicianId = tech.id;
        booking.assignedTechnicianName = tech.name;
      }
    }
  }

  if (note) {
    booking.internalNotes = note;
  }

  const historyItem: StatusHistoryItem = {
    id: `hist-${Date.now()}`,
    bookingRef: booking.reference,
    status: newStatus,
    note: note || `Status updated to ${newStatus.replace(/_/g, " ")}`,
    timestamp: now,
    actor,
  };

  db.statusHistory.push(historyItem);
  saveDatabase(db);

  return booking;
}

export function getAllTechnicians() {
  return getDatabase().technicians;
}

export function updateTechnician(id: string, updates: Partial<TechnicianRecord>) {
  const db = getDatabase();
  const index = db.technicians.findIndex((t) => t.id === id);
  if (index === -1) return null;

  db.technicians[index] = { ...db.technicians[index], ...updates };
  saveDatabase(db);
  return db.technicians[index];
}

export function getAllContactMessages() {
  return getDatabase().contactMessages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function createContactMessage(data: Omit<ContactMessageRecord, "id" | "createdAt" | "read">) {
  const db = getDatabase();
  const newMessage: ContactMessageRecord = {
    ...data,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  db.contactMessages.push(newMessage);
  saveDatabase(db);
  return newMessage;
}

export function getAllBlogPosts() {
  return getDatabase().blogPosts;
}

export function getBlogPostBySlug(slug: string) {
  return getDatabase().blogPosts.find((p) => p.slug === slug);
}

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "fixarservices@gmail.com";
const DEFAULT_ADMIN_USER = process.env.ADMIN_USER || "fixarservices@gmail.com";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "FixarServices@2026@";

export function getAdminCredentials(): AdminCredentialsRecord {
  const db = getDatabase();
  if (!db.adminCredentials) {
    db.adminCredentials = {
      email: DEFAULT_ADMIN_EMAIL,
      username: DEFAULT_ADMIN_USER,
      password: DEFAULT_ADMIN_PASSWORD,
      name: "Operations Director",
      updatedAt: new Date().toISOString(),
    };
    saveDatabase(db);
  }
  return db.adminCredentials;
}

export function updateAdminCredentials(newCreds: {
  email?: string;
  username?: string;
  password?: string;
  name?: string;
}): AdminCredentialsRecord {
  const db = getDatabase();
  const current = getAdminCredentials();

  const updated: AdminCredentialsRecord = {
    email: (newCreds.email || current.email).trim().toLowerCase(),
    username: (newCreds.username || newCreds.email || current.username).trim().toLowerCase(),
    password: newCreds.password ? newCreds.password.trim() : current.password,
    name: newCreds.name || current.name,
    updatedAt: new Date().toISOString(),
  };

  db.adminCredentials = updated;
  saveDatabase(db);
  return updated;
}

export function verifyAdminCredentials(userOrEmail: string, pass: string): boolean {
  const creds = getAdminCredentials();
  const cleanUser = (userOrEmail || "").trim().toLowerCase();
  const cleanPass = (pass || "").trim();

  // Allow login by email ("fixarservices@gmail.com"), custom username, or legacy "admin"
  const isUserValid =
    cleanUser === creds.email.toLowerCase() ||
    cleanUser === creds.username.toLowerCase() ||
    cleanUser === "admin" ||
    cleanUser === DEFAULT_ADMIN_EMAIL.toLowerCase();

  const isPassValid = cleanPass === creds.password || cleanPass === DEFAULT_ADMIN_PASSWORD;

  return isUserValid && isPassValid;
}

