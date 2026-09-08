import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("fixar_auth_token") || cookieStore.get("fixar_admin_token");

  if (!token || !token.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const raw = Buffer.from(token.value, "base64").toString("utf-8");
    if (raw.startsWith("{")) {
      const parsed = JSON.parse(raw);
      return NextResponse.json({
        authenticated: true,
        user: parsed.user,
        role: parsed.role,
        name: parsed.name,
      });
    } else if (raw.startsWith("admin:")) {
      return NextResponse.json({
        authenticated: true,
        user: "admin",
        role: "admin",
        name: "Operations Director",
      });
    }
  } catch (err) {}

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Signed out" });
  res.cookies.delete("fixar_auth_token");
  res.cookies.delete("fixar_admin_token");
  return res;
}
