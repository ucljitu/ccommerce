import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { MerchantAuthenticationError, requireMerchantSession } from "@/lib/auth/merchant-session";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

type PaymentRow = RowDataPacket & {
  reference: string;
  transactionId: string | null;
  orderNumber: string;
  customerName: string;
  amountPaisa: string;
  currency: string;
  mode: "sandbox" | "production";
  status: string;
  createdAt: Date;
};

export async function GET() {
  try {
    const session = await requireMerchantSession();
    const [rows] = await getDb().execute<PaymentRow[]>(
      `SELECT
        pa.public_id AS reference,
        pa.gateway_transaction_id AS transactionId,
        o.order_number AS orderNumber,
        o.customer_name AS customerName,
        CAST(pa.amount_paisa AS CHAR) AS amountPaisa,
        pa.currency,
        pa.mode,
        pa.status,
        pa.created_at AS createdAt
      FROM payment_attempts pa
      JOIN orders o ON o.id = pa.order_id AND o.merchant_id = pa.merchant_id
      WHERE pa.merchant_id = ?
      ORDER BY pa.created_at DESC
      LIMIT 100`,
      [session.merchantId],
    );
    return NextResponse.json({
      payments: rows.map((row) => ({
        ...row,
        amountPaisa: Number(row.amountPaisa),
        createdAt: row.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    if (error instanceof MerchantAuthenticationError) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }
    console.error("Merchant payments query failed", error);
    return NextResponse.json({ message: "Payments could not be loaded." }, { status: 500 });
  }
}
