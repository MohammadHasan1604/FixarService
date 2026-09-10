import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Redirect legacy /admin/login to unified /login?role=admin
  if (pathname === "/admin/login") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("role", "admin");
    return NextResponse.redirect(loginUrl);
  }

  // 2. Identify protected route areas
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isStaffRoute = pathname === "/staff" || pathname.startsWith("/staff/");

  if (isAdminRoute || isStaffRoute) {
    // Extract session token from cookies
    const authToken = request.cookies.get("fixar_auth_token")?.value || request.cookies.get("fixar_admin_token")?.value;
    const session = await verifySessionToken(authToken);

    // Case A: Anonymous User
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("role", isAdminRoute ? "admin" : "staff");
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Case B: Staff attempting to access Admin routes
    if (isAdminRoute && session.role !== "admin") {
      const staffUrl = new URL("/staff", request.url);
      staffUrl.searchParams.set("error", "unauthorized_admin_access");
      return NextResponse.redirect(staffUrl);
    }
  }

  // 3. Inject Security Headers on all responses (Phase 37)
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(self), payment=()"
  );

  // Content Security Policy
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images / public static files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
