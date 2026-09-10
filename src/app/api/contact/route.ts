import { NextRequest, NextResponse } from "next/server";
import {
  createContactMessage,
  getAllContactMessages,
  updateContactMessage,
  deleteContactMessage,
} from "@/lib/db";
import {
  requireStaffOrAdminSession,
  requireAdminSession,
} from "@/lib/auth/serverAuth";

export async function GET(req: NextRequest) {
  // Enforce Staff or Admin Session
  const auth = await requireStaffOrAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const messages = getAllContactMessages();
    return NextResponse.json({ success: true, messages });
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

export async function PATCH(req: NextRequest) {
  // Enforce Staff or Admin Session
  const auth = await requireStaffOrAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    const updated = updateContactMessage(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Contact message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update contact inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  // Enforce Admin Session for deletion
  const auth = await requireAdminSession(req);
  if ("errorResponse" in auth) return auth.errorResponse;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    const deleted = deleteContactMessage(id);
    if (!deleted) {
      return NextResponse.json({ error: "Contact message not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Inquiry removed" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete contact inquiry" },
      { status: 500 }
    );
  }
}
