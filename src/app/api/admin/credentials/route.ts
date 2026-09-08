import { NextResponse } from "next/server";
import { getAdminCredentials, updateAdminCredentials, verifyAdminCredentials } from "@/lib/db";

// GET: Returns current admin email/username (without exposing password)
export async function GET() {
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

// PUT: Updates admin email/username and password
export async function PUT(req: Request) {
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
