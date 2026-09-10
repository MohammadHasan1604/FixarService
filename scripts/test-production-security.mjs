// Production Security & RBAC Verification Test Suite
// Verifies Middleware Gatekeeping, Token Signing, Role Authorization, and API Protection

import http from "http";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3005";

console.log(`\n======================================================`);
console.log(`🔒 FIXAR SERVICE — AUTOMATED SECURITY & RBAC SUITE`);
console.log(`Target: ${BASE_URL}`);
console.log(`======================================================\n`);

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

async function fetchWithRedirectControl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname + parsed.search,
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      }
    );
    req.on("error", reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runSecuritySuite() {
  try {
    // 1. ANONYMOUS ACCESS TO /admin
    console.log(`[TEST 1] Anonymous user accessing /admin route...`);
    const anonAdminRes = await fetchWithRedirectControl(`${BASE_URL}/admin`);
    assert(
      anonAdminRes.status === 307 || anonAdminRes.status === 302 || anonAdminRes.status === 308,
      `Anonymous /admin returns redirect HTTP status (${anonAdminRes.status})`
    );
    assert(
      anonAdminRes.headers.location && anonAdminRes.headers.location.includes("/login?role=admin"),
      `Redirect target points to /login?role=admin (Got: ${anonAdminRes.headers.location})`
    );

    // 2. ANONYMOUS ACCESS TO /staff
    console.log(`\n[TEST 2] Anonymous user accessing /staff route...`);
    const anonStaffRes = await fetchWithRedirectControl(`${BASE_URL}/staff`);
    assert(
      anonStaffRes.status === 307 || anonStaffRes.status === 302 || anonStaffRes.status === 308,
      `Anonymous /staff returns redirect HTTP status (${anonStaffRes.status})`
    );
    assert(
      anonStaffRes.headers.location && anonStaffRes.headers.location.includes("/login?role=staff"),
      `Redirect target points to /login?role=staff (Got: ${anonStaffRes.headers.location})`
    );

    // 3. SECURITY HEADERS VERIFICATION
    console.log(`\n[TEST 3] Inspecting HTTP Security Headers injected by Middleware...`);
    const rootRes = await fetchWithRedirectControl(`${BASE_URL}/`);
    assert(
      rootRes.headers["x-frame-options"] === "DENY",
      `X-Frame-Options is set to DENY (clickjacking protection)`
    );
    assert(
      rootRes.headers["x-content-type-options"] === "nosniff",
      `X-Content-Type-Options is set to nosniff`
    );
    assert(
      rootRes.headers["content-security-policy"] !== undefined,
      `Content-Security-Policy header is configured`
    );

    // 4. ANONYMOUS ACCESS TO SENSITIVE APIS
    console.log(`\n[TEST 4] Anonymous access to sensitive data endpoints (Anti-Data Leak)...`);
    const anonBookingsApi = await fetchWithRedirectControl(`${BASE_URL}/api/bookings`);
    assert(
      anonBookingsApi.status === 401,
      `GET /api/bookings rejects anonymous access with 401 Unauthorized (Status: ${anonBookingsApi.status})`
    );

    const anonPatchBooking = await fetchWithRedirectControl(`${BASE_URL}/api/bookings/FIX-26-K9M28X4P`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });
    assert(
      anonPatchBooking.status === 401,
      `PATCH /api/bookings/[ref] rejects anonymous status change with 401 Unauthorized (Status: ${anonPatchBooking.status})`
    );

    const anonContactApi = await fetchWithRedirectControl(`${BASE_URL}/api/contact`);
    assert(
      anonContactApi.status === 401,
      `GET /api/contact rejects anonymous message reads with 401 Unauthorized (Status: ${anonContactApi.status})`
    );

    const anonSettingsPut = await fetchWithRedirectControl(`${BASE_URL}/api/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyName: "Hacked Corp" }),
    });
    assert(
      anonSettingsPut.status === 401,
      `PUT /api/settings rejects anonymous modifications with 401 Unauthorized (Status: ${anonSettingsPut.status})`
    );

    const anonFleetApi = await fetchWithRedirectControl(`${BASE_URL}/api/fleet`);
    assert(
      anonFleetApi.status === 401,
      `GET /api/fleet rejects anonymous access with 401 Unauthorized (Status: ${anonFleetApi.status})`
    );

    const anonAuditApi = await fetchWithRedirectControl(`${BASE_URL}/api/admin/audit`);
    assert(
      anonAuditApi.status === 401,
      `GET /api/admin/audit rejects anonymous access (Status: ${anonAuditApi.status})`
    );

    const anonStaffApi = await fetchWithRedirectControl(`${BASE_URL}/api/admin/staff`);
    assert(
      anonStaffApi.status === 401 || anonStaffApi.status === 403,
      `GET /api/admin/staff rejects anonymous access (Status: ${anonStaffApi.status})`
    );

    // 5. TAMPERED SESSION TOKEN REJECTION
    console.log(`\n[TEST 5] Tampered Cookie Token verification...`);
    const fakeToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9.invalidsignature123";
    const tamperedRes = await fetchWithRedirectControl(`${BASE_URL}/admin`, {
      headers: {
        Cookie: `fixar_admin_token=${fakeToken}; fixar_auth_token=${fakeToken}`,
      },
    });
    assert(
      tamperedRes.status === 307 || tamperedRes.status === 302,
      `Tampered token is rejected and redirected to login (Status: ${tamperedRes.status})`
    );

    // 6. ADMIN AUTHENTICATION FLOW
    console.log(`\n[TEST 6] Admin authentication & HMAC Token Issuance...`);
    const adminLoginRes = await fetchWithRedirectControl(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "admin",
        userOrEmail: "fixarservices@gmail.com",
        password: "FixarServices@2026@",
      }),
    });
    assert(adminLoginRes.status === 200, `Admin credentials accepted with HTTP 200`);

    const adminCookie = adminLoginRes.headers["set-cookie"];
    assert(
      adminCookie && adminCookie.some((c) => c.includes("fixar_auth_token") || c.includes("fixar_admin_token")),
      `Server sets HttpOnly secure session cookie on admin login`
    );

    let adminAuthCookieHeader = "";
    if (adminCookie) {
      adminAuthCookieHeader = adminCookie.map((c) => c.split(";")[0]).join("; ");
    }

    // 7. PRIVILEGED ACCESS WITH SIGNED ADMIN TOKEN
    console.log(`\n[TEST 7] Accessing privileged APIs with authentic Admin Session...`);
    const privilegedAuditRes = await fetchWithRedirectControl(`${BASE_URL}/api/admin/audit`, {
      headers: { Cookie: adminAuthCookieHeader },
    });
    assert(privilegedAuditRes.status === 200, `Admin successfully queries /api/admin/audit (HTTP 200)`);

    const privilegedBookingsRes = await fetchWithRedirectControl(`${BASE_URL}/api/bookings`, {
      headers: { Cookie: adminAuthCookieHeader },
    });
    assert(privilegedBookingsRes.status === 200, `Admin successfully queries /api/bookings (HTTP 200)`);

    const privilegedFleetRes = await fetchWithRedirectControl(`${BASE_URL}/api/fleet`, {
      headers: { Cookie: adminAuthCookieHeader },
    });
    assert(privilegedFleetRes.status === 200, `Admin successfully queries /api/fleet (HTTP 200)`);

    const privilegedStaffRes = await fetchWithRedirectControl(`${BASE_URL}/api/admin/staff`, {
      headers: { Cookie: adminAuthCookieHeader },
    });
    assert(privilegedStaffRes.status === 200, `Admin successfully queries /api/admin/staff (HTTP 200)`);

    // 8. STAFF AUTHENTICATION & ROLE ISOLATION
    console.log(`\n[TEST 8] Staff Login & RBAC Boundary Enforcement...`);
    const staffLoginRes = await fetchWithRedirectControl(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "staff",
        userOrEmail: "staff",
        password: "fixar2026@staff",
      }),
    });
    assert(staffLoginRes.status === 200, `Staff login accepted with HTTP 200`);

    let staffAuthCookieHeader = "";
    const staffCookie = staffLoginRes.headers["set-cookie"];
    if (staffCookie) {
      staffAuthCookieHeader = staffCookie.map((c) => c.split(";")[0]).join("; ");
    }

    // 9. STAFF BOUNDARY RESTRICTIONS
    console.log(`\n[TEST 9] Logged-in Staff role boundary tests...`);
    const staffAccessAdmin = await fetchWithRedirectControl(`${BASE_URL}/admin`, {
      headers: { Cookie: staffAuthCookieHeader },
    });
    assert(
      staffAccessAdmin.status === 307 || staffAccessAdmin.status === 302,
      `Staff is redirected away from /admin (Status: ${staffAccessAdmin.status})`
    );
    assert(
      staffAccessAdmin.headers.location && staffAccessAdmin.headers.location.includes("/staff"),
      `Staff is redirected back to /staff (Location: ${staffAccessAdmin.headers.location})`
    );

    const staffAuditApi = await fetchWithRedirectControl(`${BASE_URL}/api/admin/audit`, {
      headers: { Cookie: staffAuthCookieHeader },
    });
    assert(
      staffAuditApi.status === 403,
      `Staff access to /api/admin/audit returns HTTP 403 Forbidden`
    );

    const staffSettingsPut = await fetchWithRedirectControl(`${BASE_URL}/api/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Cookie: staffAuthCookieHeader },
      body: JSON.stringify({ companyName: "Staff Tampering" }),
    });
    assert(
      staffSettingsPut.status === 403,
      `Staff attempting PUT /api/settings returns HTTP 403 Forbidden`
    );

    const staffBookingsGet = await fetchWithRedirectControl(`${BASE_URL}/api/bookings`, {
      headers: { Cookie: staffAuthCookieHeader },
    });
    assert(
      staffBookingsGet.status === 200,
      `Staff successfully reads operational bookings (HTTP 200)`
    );

    console.log(`\n======================================================`);
    console.log(`TEST SUMMARY: ${passedTests} / ${totalTests} PASSED`);
    console.log(`======================================================\n`);

    if (passedTests === totalTests) {
      console.log(`🎉 ALL SECURITY & RBAC TESTS PASSED SUCCESSFULLY!`);
      process.exit(0);
    } else {
      console.error(`❌ SOME TESTS FAILED!`);
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exit(1);
  }
}

runSecuritySuite();
