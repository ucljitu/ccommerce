import { NextResponse } from "next/server";
import { getDb, inTransaction } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const reference = url.searchParams.get("attempt")?.trim() || "";
  if (reference) {
    await inTransaction(async (connection) => {
      const [rows] = await connection.execute<RowDataPacket[]>(
        `SELECT id, order_id AS orderId, status
         FROM payment_attempts
         WHERE public_id = ? AND gateway = 'bdpay'
         FOR UPDATE`,
        [reference],
      );
      const attempt = rows[0];
      if (!attempt || attempt.status === "paid") return;
      await connection.execute(
        `UPDATE payment_attempts
         SET status = 'cancelled', cancelled_at = CURRENT_TIMESTAMP(3)
         WHERE id = ?`,
        [attempt.id],
      );
      await connection.execute(
        `UPDATE orders SET payment_status = 'cancelled'
         WHERE id = ? AND payment_status <> 'paid'`,
        [attempt.orderId],
      );
    });
  }
  const base = process.env.APP_URL?.trim() || new URL(request.url).origin;
  return NextResponse.redirect(
    new URL(`/payment-result/${encodeURIComponent(reference || "unknown")}?state=cancelled`, base),
  );
}
