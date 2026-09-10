import { NextRequest, NextResponse } from "next/server";
import {
  requireAdminSession,
  requireStaffOrAdminSession,
} from "@/lib/auth/serverAuth";
import {
  getAllFleetVehicles,
  createFleetVehicle,
  updateFleetVehicle,
  deleteFleetVehicle,
} from "@/lib/db";

export async function GET(request: NextRequest) {
  const auth = await requireStaffOrAdminSession(request);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const vehicles = getAllFleetVehicles();
    return NextResponse.json({ success: true, vehicles });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch fleet vehicles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession(request);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const body = await request.json();
    const { plateNumber, type, makeModel, year, assignedTechnicianId, assignedTechnicianName, status, serviceDue, mileage, notes } = body;

    if (!plateNumber || !makeModel) {
      return NextResponse.json(
        { error: "Plate number and make/model are required" },
        { status: 400 }
      );
    }

    const vehicle = createFleetVehicle({
      plateNumber: plateNumber.trim().toUpperCase(),
      type: type || "Van",
      makeModel: makeModel.trim(),
      year: year ? parseInt(year, 10) : undefined,
      assignedTechnicianId: assignedTechnicianId || undefined,
      assignedTechnicianName: assignedTechnicianName || undefined,
      status: status || "active",
      serviceDue: serviceDue || undefined,
      mileage: mileage ? mileage.trim() : undefined,
      notes: notes ? notes.trim() : undefined,
    });

    return NextResponse.json({ success: true, vehicle }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create fleet vehicle" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminSession(request);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const updated = updateFleetVehicle(id, updates);
    if (!updated) {
      return NextResponse.json(
        { error: "Fleet vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vehicle: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update fleet vehicle" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdminSession(request);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const deleted = deleteFleetVehicle(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Fleet vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Fleet vehicle removed" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete fleet vehicle" },
      { status: 500 }
    );
  }
}
