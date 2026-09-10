import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/session";
import {
  getAllStaffMembers,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
  createAuditLog,
} from "@/lib/db";

async function verifyAdminAuth(request: NextRequest) {
  const token =
    request.cookies.get("fixar_auth_token")?.value ||
    request.cookies.get("fixar_admin_token")?.value;

  if (!token) return null;
  const session = await verifySessionToken(token);
  if (!session || session.role !== "admin") return null;
  return session;
}

export async function GET(request: NextRequest) {
  const session = await verifyAdminAuth(request);
  if (!session) {
    return NextResponse.json({ error: "Forbidden: Admin role required" }, { status: 403 });
  }

  const staff = getAllStaffMembers();
  return NextResponse.json({ success: true, staff });
}

export async function POST(request: NextRequest) {
  const session = await verifyAdminAuth(request);
  if (!session) {
    return NextResponse.json({ error: "Forbidden: Admin role required" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, role, assignedAreas } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const newStaff = createStaffMember({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      role: role === "technician" ? "technician" : "staff",
      active: true,
      assignedAreas: Array.isArray(assignedAreas) ? assignedAreas : ["Sharjah"],
    });

    return NextResponse.json({ success: true, staff: newStaff });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create staff" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await verifyAdminAuth(request);
  if (!session) {
    return NextResponse.json({ error: "Forbidden: Admin role required" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json({ error: "ID and updates required" }, { status: 400 });
    }

    const updated = updateStaffMember(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, staff: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update staff" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await verifyAdminAuth(request);
  if (!session) {
    return NextResponse.json({ error: "Forbidden: Admin role required" }, { status: 403 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Staff ID is required" }, { status: 400 });
    }

    const success = deleteStaffMember(id);
    if (!success) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Staff member removed" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete staff" }, { status: 500 });
  }
}
