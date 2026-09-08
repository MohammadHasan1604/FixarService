import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, requestedRole, role } = body;

    const cleanUser = (username || requestedRole || role || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    // Verify Admin
    if (cleanUser === "admin" && cleanPass === (process.env.ADMIN_PASSWORD || "fixar2026@admin")) {
      const payload = {
        user: "admin",
        role: "admin",
        name: "Operations Director",
        issuedAt: Date.now(),
      };
      const token = Buffer.from(JSON.stringify(payload)).toString("base64");

      const res = NextResponse.json({
        success: true,
        user: "admin",
        role: "admin",
        name: "Operations Director",
      });

      res.cookies.set("fixar_auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      // Backward compatibility for existing admin token check
      res.cookies.set("fixar_admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return res;
    }

    // Verify Staff / Field Engineer
    if (cleanUser === "staff" && cleanPass === (process.env.STAFF_PASSWORD || "fixar2026@staff")) {
      const payload = {
        user: "staff",
        role: "staff",
        name: "Field Operations Specialist",
        issuedAt: Date.now(),
      };
      const token = Buffer.from(JSON.stringify(payload)).toString("base64");

      const res = NextResponse.json({
        success: true,
        user: "staff",
        role: "staff",
        name: "Field Operations Specialist",
      });

      res.cookies.set("fixar_auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return res;
    }

    return NextResponse.json(
      { error: "Invalid username or password. Please check your credentials." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Authentication system error" }, { status: 500 });
  }
}
