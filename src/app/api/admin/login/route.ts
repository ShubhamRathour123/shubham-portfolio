import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "shubham-admin";
const SESSION_VALUE = process.env.ADMIN_SESSION_SECRET ?? "portfolio-admin";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set("admin_session", SESSION_VALUE, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({
    success: true,
  });
}
