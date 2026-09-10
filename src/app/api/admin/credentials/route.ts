import { NextRequest, NextResponse } from "next/server";
import {
  getAdminCredentials,
  updateAdminCredentials,
  verifyAdminCredentials,
  createAuditLog,
} from "@/lib/db";
import { requireAdminSession } from "@/lib/auth/serverAuth";

// GET: Returns current admin email/username (requires authenticated Admin session)
export async function GET(req: NextRequest) {
  const auth = await requireAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const creds = getAdminCredentials();
    return NextResponse.json({
      email: creds.email,
      username: creds.username,
      name: creds.name,
      updatedAt: creds.updatedAt,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admin profile" }, { status: 500 });
  }
}

// PUT: Updates admin email/username and password (requires authenticated Admin session)
export async function PUT(req: NextRequest) {
  const auth = await requireAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { currentPassword, newEmail, newUsername, newPassword, name } = body;

    // Verify current password first for security
    if (!currentPassword || !verifyAdminCredentials("admin", currentPassword)) {
      return NextResponse.json(
        { error: "Current password verification failed. Please enter your valid current password." },
        { status: 403 }
      );
    }

    if (newPassword && newPassword.trim().length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const updated = updateAdminCredentials({
      email: newEmail,
      username: newUsername || newEmail,
      password: newPassword,
      name,
    });

    createAuditLog({
      actorId: auth.session.user,
      actorRole: "admin",
      action: "ADMIN_CREDENTIALS_UPDATED",
      entityType: "admin_profile",
      metadata: { newEmail, newUsername },
    });

    return NextResponse.json({
      success: true,
      message: "Admin credentials successfully updated and saved.",
      email: updated.email,
      username: updated.username,
      updatedAt: updated.updatedAt,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update admin credentials" }, { status: 500 });
  }
}
