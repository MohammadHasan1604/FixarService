import { NextRequest, NextResponse } from "next/server";
import {
  getAllTechnicians,
  updateTechnician,
  createTechnician,
  deleteTechnician,
} from "@/lib/db";
import { requireAdminSession } from "@/lib/auth/serverAuth";

export async function GET() {
  try {
    const technicians = getAllTechnicians();
    return NextResponse.json({ technicians });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch technicians" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // Enforce Admin Session
  const auth = await requireAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { name, phone, email, specialties, serviceAreas, active } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Technician name and phone number are required" },
        { status: 400 }
      );
    }

    const newTech = createTechnician({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      specialties: Array.isArray(specialties) ? specialties : ["General Appliance Repair"],
      serviceAreas: Array.isArray(serviceAreas) ? serviceAreas : ["Sharjah"],
      active: active !== undefined ? Boolean(active) : true,
    });

    return NextResponse.json({ success: true, technician: newTech }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create technician" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  // Enforce Admin Session
  const auth = await requireAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Technician ID is required" }, { status: 400 });
    }

    const updated = updateTechnician(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Technician not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, technician: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update technician" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  // Enforce Admin Session
  const auth = await requireAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Technician ID is required" }, { status: 400 });
    }

    const deleted = deleteTechnician(id);
    if (!deleted) {
      return NextResponse.json({ error: "Technician not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Technician profile removed" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete technician" },
      { status: 500 }
    );
  }
}
