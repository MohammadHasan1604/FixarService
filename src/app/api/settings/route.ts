import { NextRequest, NextResponse } from "next/server";
import { getBusinessSettings, updateBusinessSettings, createAuditLog } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth/serverAuth";

export async function GET() {
  try {
    const settings = getBusinessSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // Enforce Admin Session
  const auth = await requireAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const updated = updateBusinessSettings(body);

    createAuditLog({
      actorId: auth.session.user,
      actorRole: "admin",
      action: "SETTINGS_UPDATED",
      entityType: "business_settings",
      metadata: { companyName: updated.companyName, email: updated.email },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
