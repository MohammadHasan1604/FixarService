import { NextResponse } from "next/server";
import { verifyAdminCredentials, getAdminCredentials } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (verifyAdminCredentials(username, password)) {
      const creds = getAdminCredentials();
      const payload = {
        user: creds.email,
        role: "admin",
        name: creds.name || "Operations Director",
        issuedAt: Date.now(),
      };
      const token = Buffer.from(JSON.stringify(payload)).toString("base64");

      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
        user: creds.email,
        role: "admin",
      });

      response.cookies.set("fixar_auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      response.cookies.set("fixar_admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
