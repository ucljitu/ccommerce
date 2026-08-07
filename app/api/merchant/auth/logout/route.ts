import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { MERCHANT_SESSION_COOKIE } from "@/lib/auth/merchant-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return NextResponse.json({ message: "Request rejected." }, { status: 403 });
  }
  const cookieStore = await cookies();
  const token = cookieStore.get(MERCHANT_SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = createHash("sha256").update(token).digest("hex");
    await getDb().execute("DELETE FROM merchant_sessions WHERE token_hash = ?", [tokenHash]);
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set(MERCHANT_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
