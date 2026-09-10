import { NextRequest, NextResponse } from "next/server";
import { getBookingByReference, updateBookingStatus, createAuditLog } from "@/lib/db";
import { BookingStatus } from "@/lib/db/types";
import { requireStaffOrAdminSession } from "@/lib/auth/serverAuth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const { searchParams } = new URL(req.url);
    const verification = searchParams.get("phone") || searchParams.get("verify");

    if (!verification) {
      return NextResponse.json(
        { error: "Phone number or email verification required to view booking details" },
        { status: 401 }
      );
    }

    const result = getBookingByReference(reference, verification);

    if (!result) {
      return NextResponse.json(
        { error: "No booking found matching this reference and contact verification" },
        { status: 404 }
      );
    }

    // Return customer-safe payload without internal secrets
    return NextResponse.json({
      reference: result.booking.reference,
      customerName: result.booking.customerName,
      serviceTitle: result.booking.serviceTitle,
      brand: result.booking.brand,
      city: result.booking.city,
      area: result.booking.area,
      appointmentDate: result.booking.appointmentDate,
      appointmentSlot: result.booking.appointmentSlot,
      status: result.booking.status,
      assignedTechnicianName: result.booking.assignedTechnicianName,
      createdAt: result.booking.createdAt,
      updatedAt: result.booking.updatedAt,
      history: result.history,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve booking" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  // Enforce Staff or Admin Session
  const auth = await requireStaffOrAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const { reference } = await params;
    const body = await req.json();
    const { status, note, assignedTechId } = body;

    if (!status) {
      return NextResponse.json({ error: "New status is required" }, { status: 400 });
    }

    const actor = `${auth.session.name} (${auth.session.role})`;

    const updated = updateBookingStatus(
      reference,
      status as BookingStatus,
      note,
      assignedTechId,
      actor
    );

    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Write audit log
    createAuditLog({
      actorId: auth.session.user,
      actorRole: auth.session.role,
      action: "BOOKING_STATUS_MUTATION",
      entityType: "booking",
      entityId: reference,
      metadata: { status, assignedTechId, note },
    });

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
