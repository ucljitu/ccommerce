import { createHash, randomBytes } from "node:crypto";
import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { MERCHANT_SESSION_COOKIE } from "@/lib/auth/merchant-session";

export const runtime = "nodejs";

type UserRow = RowDataPacket & {
  id: string;
  merchantId: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  merchantName: string;
  storeSlug: string | null;
  storeName: string | null;
};

const attempts = new Map<string, number[]>();

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return NextResponse.json({ message: "Sign in failed." }, { status: 403 });
  }
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < 15 * 60_000);
  if (recent.length >= 10) {
    return NextResponse.json({ message: "Too many sign-in attempts. Try again later." }, { status: 429 });
  }
  recent.push(now);
  attempts.set(key, recent);

  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || password.length < 8 || password.length > 200) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const [rows] = await getDb().execute<UserRow[]>(
    `SELECT
      CAST(mu.id AS CHAR) AS id,
      CAST(mu.merchant_id AS CHAR) AS merchantId,
      mu.email,
      mu.password_hash AS passwordHash,
      mu.name,
      mu.role,
      m.name AS merchantName,
      s.slug AS storeSlug,
      s.name AS storeName
    FROM merchant_users mu
    JOIN merchants m ON m.id = mu.merchant_id AND m.status = 'active'
    LEFT JOIN stores s ON s.merchant_id = m.id AND s.status = 'active'
    WHERE mu.email = ? AND mu.status = 'active'
    ORDER BY s.id ASC
    LIMIT 1`,
    [email],
  );
  const user = rows[0];
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  await getDb().execute(
    `INSERT INTO merchant_sessions (user_id, merchant_id, token_hash, expires_at)
     VALUES (?, ?, ?, DATE_ADD(CURRENT_TIMESTAMP(3), INTERVAL 8 HOUR))`,
    [user.id, user.merchantId, tokenHash],
  );
  const response = NextResponse.json({
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      merchantName: user.merchantName,
      storeName: user.storeName,
      storeSlug: user.storeSlug,
    },
  });
  response.cookies.set(MERCHANT_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  });
  return response;
}
