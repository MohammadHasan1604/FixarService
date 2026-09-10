import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SessionPayload } from "./session";

/**
 * Extract auth cookie from NextRequest or standard Request
 */
export function extractAuthToken(request: Request | NextRequest): string | null {
  // If NextRequest with cookies API
  if ("cookies" in request && typeof (request as any).cookies?.get === "function") {
    const nextReq = request as NextRequest;
    return (
      nextReq.cookies.get("fixar_auth_token")?.value ||
      nextReq.cookies.get("fixar_admin_token")?.value ||
      null
    );
  }

  // Fallback to cookie header string
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const matchAuth = cookieHeader.match(/fixar_auth_token=([^;]+)/);
  if (matchAuth && matchAuth[1]) return decodeURIComponent(matchAuth[1]);

  const matchAdmin = cookieHeader.match(/fixar_admin_token=([^;]+)/);
  if (matchAdmin && matchAdmin[1]) return decodeURIComponent(matchAdmin[1]);

  // Check Authorization Bearer header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  return null;
}

/**
 * Get verified session from request
 */
export async function getAuthenticatedSession(
  request: Request | NextRequest
): Promise<SessionPayload | null> {
  const token = extractAuthToken(request);
  if (!token) return null;
  return await verifySessionToken(token);
}

/**
 * Enforce Admin Session
 * Returns session if authorized, or NextResponse with 401/403
 */
export async function requireAdminSession(
  request: Request | NextRequest
): Promise<{ session: SessionPayload } | { errorResponse: NextResponse }> {
  const session = await getAuthenticatedSession(request);

  if (!session) {
    return {
      errorResponse: NextResponse.json(
        { error: "Authentication required. Please sign in." },
        { status: 401 }
      ),
    };
  }

  if (session.role !== "admin") {
    return {
      errorResponse: NextResponse.json(
        { error: "Forbidden. Administrative access privileges required." },
        { status: 403 }
      ),
    };
  }

  return { session };
}

/**
 * Enforce Staff or Admin Session
 * Returns session if authorized, or NextResponse with 401/403
 */
export async function requireStaffOrAdminSession(
  request: Request | NextRequest
): Promise<{ session: SessionPayload } | { errorResponse: NextResponse }> {
  const session = await getAuthenticatedSession(request);

  if (!session) {
    return {
      errorResponse: NextResponse.json(
        { error: "Authentication required. Please sign in." },
        { status: 401 }
      ),
    };
  }

  if (session.role !== "admin" && session.role !== "staff") {
    return {
      errorResponse: NextResponse.json(
        { error: "Forbidden. Authorized personnel only." },
        { status: 403 }
      ),
    };
  }

  return { session };
}
