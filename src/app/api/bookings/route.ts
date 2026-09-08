import { NextResponse } from "next/server";
import { createBooking, getAllBookings } from "@/lib/db";

export async function GET(req: Request) {
  // Admin listings
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let bookings = getAllBookings();

    if (status && status !== "all") {
      bookings = bookings.filter((b) => b.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      bookings = bookings.filter(
        (b) =>
          b.reference.toLowerCase().includes(q) ||
          b.customerName.toLowerCase().includes(q) ||
          b.customerPhone.includes(q) ||
          b.serviceTitle.toLowerCase().includes(q) ||
          b.city.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.customerName || !body.customerPhone || !body.serviceId || !body.city || !body.appointmentDate) {
      return NextResponse.json(
        { error: "Missing required booking details (Name, Phone, Service, City, Appointment Date)" },
        { status: 400 }
      );
    }

    const booking = createBooking({
      customerName: body.customerName.trim(),
      customerPhone: body.customerPhone.trim(),
      customerWhatsapp: (body.customerWhatsapp || body.customerPhone).trim(),
      customerEmail: body.customerEmail ? body.customerEmail.trim() : undefined,
      country: body.country || "United Arab Emirates",
      city: body.city.trim(),
      area: body.area ? body.area.trim() : "Main District",
      address: {
        building: body.address?.building || "",
        apartment: body.address?.apartment || "",
        street: body.address?.street || "",
        landmark: body.address?.landmark || "",
        mapsLink: body.address?.mapsLink || "",
      },
      serviceId: body.serviceId,
      serviceTitle: body.serviceTitle || "Appliance Repair",
      brand: body.brand || "General Brand",
      model: body.model || "",
      problemCategory: body.problemCategory || "General Troubleshooting",
      description: body.description || "Diagnostics requested",
      appointmentDate: body.appointmentDate,
      appointmentSlot: body.appointmentSlot || "Morning (09:00 AM - 01:00 PM)",
    });

    return NextResponse.json(
      {
        success: true,
        reference: booking.reference,
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Internal server error while processing booking" }, { status: 500 });
  }
}
