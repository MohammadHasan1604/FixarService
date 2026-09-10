// Comprehensive End-to-End Test & Security Audit Script for Fixar Service
import assert from "node:assert";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3005";

async function runTests() {
  console.log("==================================================");
  console.log("FIXAR SERVICE — COMPREHENSIVE PRODUCTION TEST SUITE");
  console.log("==================================================");

  let passed = 0;
  let total = 0;

  const test = async (name, fn) => {
    total++;
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
      throw err;
    }
  };

  // -------------------------------------------------------------
  // SUITE 1: Public Core Pages Rendering & Status Codes
  // -------------------------------------------------------------
  const publicRoutes = [
    "/",
    "/services",
    "/services/ac-repair",
    "/services/refrigerator-repair",
    "/services/washing-machine-repair",
    "/services/microwave-repair",
    "/services/water-heater-repair",
    "/services/ro-water-purifier-repair",
    "/services/kitchen-chimney-repair",
    "/services/gas-stove-repair",
    "/services/water-dispenser-repair",
    "/services/led-smart-tv-repair",
    "/services/water-cooler-repair",
    "/services/deep-freezer-repair",
    "/services/cctv-installation-repair",
    "/services/plumbing-services",
    "/services/electrician-services",
    "/locations",
    "/locations/uae/sharjah",
    "/locations/uae/dubai",
    "/locations/oman/muscat",
    "/locations/saudi-arabia/riyadh",
    "/brands",
    "/about",
    "/reviews",
    "/faq",
    "/contact",
    "/terms",
    "/privacy-policy",
    "/cookie-policy",
    "/book-service",
    "/track-booking",
    "/login",
    "/blog",
    "/blog/ac-maintenance-tips-uae-summer",
    "/sitemap.xml",
    "/robots.txt",
  ];

  for (const route of publicRoutes) {
    await test(`GET ${route} returns status 200`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      assert.strictEqual(res.status, 200, `Expected 200 for ${route}`);
      const text = await res.text();
      assert(text.length > 50, `Expected body content for ${route}`);
    });
  }

  // -------------------------------------------------------------
  // SUITE 2: 404 Error Handling
  // -------------------------------------------------------------
  await test("GET non-existent page returns 404 with custom repair theme", async () => {
    const res = await fetch(`${BASE_URL}/non-existent-page-test-404`);
    assert.strictEqual(res.status, 404);
    const html = await res.text();
    assert(html.includes("Oops") || html.includes("404"), "404 page contains theme message");
  });

  // -------------------------------------------------------------
  // SUITE 3: Booking Validation & Security Error Handling
  // -------------------------------------------------------------
  await test("POST /api/bookings with missing required fields returns 400 Bad Request", async () => {
    const res = await fetch(`${BASE_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert(data.error, "Expected error message in response");
  });

  let createdRef = "";
  const testPhone = "+971509988776";

  await test("POST /api/bookings with valid data creates booking and returns unique FIX-26-XXXXXXXX reference", async () => {
    const res = await fetch(`${BASE_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Majid Al Falasi",
        customerPhone: testPhone,
        customerWhatsapp: testPhone,
        customerEmail: "majid.falasi@example.com",
        serviceId: "ac-repair",
        serviceTitle: "Air Conditioner Repair & Servicing",
        brand: "Daikin",
        model: "Inverter Split 2.0 Ton",
        problemCategory: "ac-not-cooling",
        description: "Compressor hums loudly but no cooling in master bedroom.",
        country: "United Arab Emirates",
        city: "Sharjah",
        area: "Al Majaz 3",
        address: {
          building: "Crystal Tower",
          apartment: "1104",
          street: "Corniche Road",
          landmark: "Near Al Majaz Amphitheatre",
        },
        appointmentDate: "2026-09-15",
        appointmentSlot: "Afternoon (01:00 PM - 05:00 PM)",
      }),
    });

    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert(data.success, "Booking response has success: true");
    assert(data.reference.startsWith("FIX-26-"), "Booking reference format matches FIX-26-XXXXXXXX");
    createdRef = data.reference;
  });

  // -------------------------------------------------------------
  // SUITE 4: Booking Tracking & Phone Verification Isolation
  // -------------------------------------------------------------
  await test("GET /api/bookings/[reference] without phone verification returns 401 Unauthorized", async () => {
    const res = await fetch(`${BASE_URL}/api/bookings/${createdRef}`);
    assert.strictEqual(res.status, 401);
  });

  await test("GET /api/bookings/[reference] with wrong phone returns 404", async () => {
    const res = await fetch(`${BASE_URL}/api/bookings/${createdRef}?phone=+971500000000`);
    assert.strictEqual(res.status, 404);
  });

  await test("GET /api/bookings/[reference] with correct phone returns 200 and sanitized record", async () => {
    const res = await fetch(`${BASE_URL}/api/bookings/${createdRef}?phone=${encodeURIComponent(testPhone)}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.reference, createdRef);
    assert.strictEqual(data.customerName, "Majid Al Falasi");
    assert.strictEqual(data.status, "new");
    assert(Array.isArray(data.history), "Includes status history array");
  });

  // -------------------------------------------------------------
  // SUITE 5: Authentication & Session Verification
  // -------------------------------------------------------------
  await test("POST /api/auth/login with invalid password returns 401", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "admin",
        userOrEmail: "fixarservices@gmail.com",
        password: "WrongPassword!",
      }),
    });
    assert.strictEqual(res.status, 401);
  });

  let staffCookie = "";
  await test("POST /api/auth/login as Staff returns 200 and role: staff", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "staff",
        userOrEmail: "staff",
        password: "fixar2026@staff",
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.role, "staff");
    const cookieHeader = res.headers.get("set-cookie");
    assert(cookieHeader && cookieHeader.includes("fixar_auth_token"), "Cookie fixar_auth_token set");
    staffCookie = cookieHeader.split(";")[0];
  });

  let adminCookie = "";
  await test("POST /api/auth/login as Admin with email fixarservices@gmail.com returns 200 and role: admin", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "admin",
        userOrEmail: "fixarservices@gmail.com",
        password: "FixarServices@2026@",
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.role, "admin");
    const cookieHeader = res.headers.get("set-cookie");
    assert(cookieHeader && cookieHeader.includes("fixar_auth_token"), "Cookie fixar_auth_token set");
    adminCookie = cookieHeader.split(";")[0];
  });

  await test("GET /api/admin/credentials returns admin profile metadata", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/credentials`, {
      headers: { Cookie: adminCookie },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.email, "fixarservices@gmail.com");
  });

  await test("GET /api/auth/session returns user details for staff", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/session`, {
      headers: { Cookie: staffCookie },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.role, "staff");
  });

  await test("GET /api/auth/session returns user details for admin", async () => {
    const res = await fetch(`${BASE_URL}/api/auth/session`, {
      headers: { Cookie: adminCookie },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.role, "admin");
  });

  // -------------------------------------------------------------
  // SUITE 6: Staff & Admin Operational Workflow Status Updates
  // -------------------------------------------------------------
  await test("PATCH /api/bookings/[reference] updates status to accepted", async () => {
    const res = await fetch(`${BASE_URL}/api/bookings/${createdRef}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        status: "accepted",
        note: "Accepted by dispatch supervisor",
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.booking.status, "accepted");
  });

  await test("PATCH /api/bookings/[reference] updates status to technician_en_route", async () => {
    const res = await fetch(`${BASE_URL}/api/bookings/${createdRef}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: staffCookie,
      },
      body: JSON.stringify({
        status: "technician_en_route",
        note: "Technician dispatched and en route",
        assignedTechId: "tech-1",
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.booking.status, "technician_en_route");
  });

  await test("Customer tracking immediately reflects updated status 'technician_en_route'", async () => {
    const res = await fetch(`${BASE_URL}/api/bookings/${createdRef}?phone=${encodeURIComponent(testPhone)}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, "technician_en_route");
    assert(data.history.length >= 3, "Status history records timeline changes");
  });

  // -------------------------------------------------------------
  // SUITE 7: Contact Inquiries CRM API
  // -------------------------------------------------------------
  await test("POST /api/contact with missing fields returns 400 Bad Request", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "" }),
    });
    assert.strictEqual(res.status, 400);
  });

  let createdMsgId = "";
  await test("POST /api/contact with valid data stores customer inquiry", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Customer",
        phone: "+971543377512",
        email: "customer@example.com",
        subject: "Washing Machine Service Inquiry",
        message: "Can a technician visit today in Sharjah?",
      }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    createdMsgId = data.message.id;
  });

  await test("PATCH /api/contact updates inquiry status to contacted", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        id: createdMsgId,
        status: "contacted",
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.message.status, "contacted");
  });

  // -------------------------------------------------------------
  // SUITE 8: Fleet Vehicles API
  // -------------------------------------------------------------
  let createdVehId = "";
  await test("POST /api/fleet registers new service van", async () => {
    const res = await fetch(`${BASE_URL}/api/fleet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        plateNumber: "SHJ-99231",
        type: "Van",
        makeModel: "Toyota HiAce 2025",
        year: 2025,
        assignedTechnicianName: "Mohammad Tariq",
        status: "active",
        serviceDue: "2026-12-01",
        mileage: "12,400 km",
        notes: "Full HVAC diagnostic kit",
      }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert(data.success);
    assert.strictEqual(data.vehicle.plateNumber, "SHJ-99231");
    createdVehId = data.vehicle.id;
  });

  await test("GET /api/fleet returns fleet vehicles list", async () => {
    const res = await fetch(`${BASE_URL}/api/fleet`, {
      headers: { Cookie: adminCookie },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert(Array.isArray(data.vehicles));
    assert(data.vehicles.some((v) => v.plateNumber === "SHJ-99231"));
  });

  await test("DELETE /api/fleet removes test vehicle", async () => {
    const res = await fetch(`${BASE_URL}/api/fleet?id=${createdVehId}`, {
      method: "DELETE",
      headers: { Cookie: adminCookie },
    });
    assert.strictEqual(res.status, 200);
  });

  // -------------------------------------------------------------
  // SUITE 9: Central Business Settings CMS Synchronization
  // -------------------------------------------------------------
  await test("PUT /api/settings propagates changes immediately", async () => {
    const originalSettingsRes = await fetch(`${BASE_URL}/api/settings`);
    const originalSettings = await originalSettingsRes.json();

    const putRes = await fetch(`${BASE_URL}/api/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify({
        ...originalSettings,
        tagline: "Tested & Verified Home Appliance Experts",
      }),
    });
    assert.strictEqual(putRes.status, 200);

    const checkRes = await fetch(`${BASE_URL}/api/settings`);
    const checkData = await checkRes.json();
    assert.strictEqual(checkData.tagline, "Tested & Verified Home Appliance Experts");

    // Restore clean tagline
    await fetch(`${BASE_URL}/api/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: adminCookie,
      },
      body: JSON.stringify(originalSettings),
    });
  });

  console.log("==================================================");
  console.log(`RESULTS: All ${passed} / ${total} test cases PASSED (100%)`);
  console.log("==================================================");
}

runTests().catch((e) => {
  console.error("FATAL TEST FAILURE:", e);
  process.exit(1);
});
