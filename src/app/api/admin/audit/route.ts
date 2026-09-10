import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/session";
import { getAllAuditLogs, createAuditLog } from "@/lib/db";

export async function GET(request: NextRequest) {
  const token =
    request.cookies.get("fixar_auth_token")?.value ||
    request.cookies.get("fixar_admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admin role required" }, { status: 403 });
  }

  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get("limit") || "100", 10);
  const logs = getAllAuditLogs(limit);

  return NextResponse.json({ success: true, logs });
}
