import { NextResponse } from "next/server";
import { getAllTechnicians, updateTechnician } from "@/lib/db";

export async function GET() {
  try {
    const technicians = getAllTechnicians();
    return NextResponse.json({ technicians });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch technicians" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
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
