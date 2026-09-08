import { NextResponse } from "next/server";
import { getBusinessSettings, updateBusinessSettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = getBusinessSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updated = updateBusinessSettings(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
