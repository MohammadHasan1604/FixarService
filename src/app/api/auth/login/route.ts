import { NextResponse } from "next/server";
import { verifyAdminCredentials, getAdminCredentials } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, requestedRole, role } = body;

    const cleanUser = (username || requestedRole || role || "").trim();
    const cleanPass = (password || "").trim();

    // Verify Admin (supports fixarservices@gmail.com, admin, or customized credentials)
    if (
      requestedRole === "admin" ||
      role === "admin" ||
      cleanUser.toLowerCase() === "admin" ||
      cleanUser.toLowerCase() === "fixarservices@gmail.com" ||
      cleanUser.includes("@")
    ) {
      if (verifyAdminCredentials(cleanUser, cleanPass)) {
        const creds = getAdminCredentials();
        const payload = {
          user: creds.email,
          role: "admin",
          name: creds.name || "Operations Director",
          issuedAt: Date.now(),
        };
        const token = Buffer.from(JSON.stringify(payload)).toString("base64");

        const res = NextResponse.json({
          success: true,
          user: creds.email,
          role: "admin",
          name: creds.name || "Operations Director",
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
    }

    // Direct check if requestedRole wasn't explicit but user entered valid admin credentials
    if (verifyAdminCredentials(cleanUser, cleanPass)) {
      const creds = getAdminCredentials();
      const payload = {
        user: creds.email,
        role: "admin",
        name: creds.name || "Operations Director",
        issuedAt: Date.now(),
      };
      const token = Buffer.from(JSON.stringify(payload)).toString("base64");

      const res = NextResponse.json({
        success: true,
        user: creds.email,
        role: "admin",
        name: creds.name || "Operations Director",
      });

      res.cookies.set("fixar_auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

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
    if (
      (cleanUser.toLowerCase() === "staff" || requestedRole === "staff" || role === "staff") &&
      cleanPass === (process.env.STAFF_PASSWORD || "fixar2026@staff")
    ) {
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
