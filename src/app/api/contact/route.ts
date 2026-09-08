import { NextResponse } from "next/server";
import { createContactMessage, getAllContactMessages } from "@/lib/db";

export async function GET() {
  try {
    const messages = getAllContactMessages();
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required" },
        { status: 400 }
      );
    }

    const message = createContactMessage({
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email ? body.email.trim() : "",
      subject: body.subject ? body.subject.trim() : "General Inquiry",
      message: body.message.trim(),
    });

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
