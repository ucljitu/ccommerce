import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import type { RowDataPacket } from "mysql2";
import { getDb } from "@/lib/db";

export const MERCHANT_SESSION_COOKIE = "ccommerce_merchant_session";

type SessionRow = RowDataPacket & {
  userId: string;
  merchantId: string;
  userName: string;
  userEmail: string;
  role: "owner" | "manager";
  merchantName: string;
  storeId: string | null;
  storePublicId: string | null;
  storeSlug: string | null;
  storeName: string | null;
};

export async function getMerchantSession() {
  const token = (await cookies()).get(MERCHANT_SESSION_COOKIE)?.value;
  if (!token) return null;
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const [rows] = await getDb().execute<SessionRow[]>(
    `SELECT
      CAST(ms.user_id AS CHAR) AS userId,
      CAST(ms.merchant_id AS CHAR) AS merchantId,
      mu.name AS userName,
      mu.email AS userEmail,
      mu.role,
      m.name AS merchantName,
      CAST(s.id AS CHAR) AS storeId,
      s.public_id AS storePublicId,
      s.slug AS storeSlug,
      s.name AS storeName
    FROM merchant_sessions ms
    JOIN merchant_users mu ON mu.id = ms.user_id AND mu.status = 'active'
    JOIN merchants m ON m.id = ms.merchant_id AND m.status = 'active'
    LEFT JOIN stores s ON s.merchant_id = m.id AND s.status = 'active'
    WHERE ms.token_hash = ? AND ms.expires_at > CURRENT_TIMESTAMP(3)
    ORDER BY s.id ASC
    LIMIT 1`,
    [tokenHash],
  );
  return rows[0] ?? null;
}

export async function requireMerchantSession() {
  const session = await getMerchantSession();
  if (!session) throw new MerchantAuthenticationError();
  return session;
}

export class MerchantAuthenticationError extends Error {
  constructor() {
    super("Merchant authentication required");
  }
}
