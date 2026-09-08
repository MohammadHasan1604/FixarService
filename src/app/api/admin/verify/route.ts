import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("fixar_auth_token") || cookieStore.get("fixar_admin_token");

  if (!token || !token.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const decoded = Buffer.from(token.value, "base64").toString("utf-8");
    if (decoded.startsWith("{")) {
      const parsed = JSON.parse(decoded);
      if (parsed.role === "admin") {
        return NextResponse.json({ authenticated: true, user: parsed.user, role: "admin" });
      }
    } else if (decoded.startsWith("admin:")) {
      return NextResponse.json({ authenticated: true, user: "admin", role: "admin" });
    }
  } catch (err) {}

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.delete("fixar_admin_token");
  response.cookies.delete("fixar_auth_token");
  return response;
}
