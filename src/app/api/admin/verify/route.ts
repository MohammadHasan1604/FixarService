import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth/session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("fixar_auth_token") || cookieStore.get("fixar_admin_token");

  if (!token || !token.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = await verifySessionToken(token.value);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: session.user,
    role: "admin",
    name: session.name,
  });
}

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("fixar_admin_token");
  response.cookies.delete("fixar_auth_token");
  return response;
}
