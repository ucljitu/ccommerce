import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { paisaToGatewayAmount } from "@/lib/payments/bdpay";

export const runtime = "nodejs";

type ResultRow = RowDataPacket & {
  paymentReference: string;
  transactionId: string | null;
  amountPaisa: string;
  currency: string;
  status: string;
  mode: string;
  orderNumber: string;
  storeSlug: string;
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ reference: string }> },
) {
  const { reference } = await params;
  const [rows] = await getDb().execute<ResultRow[]>(
    `SELECT
      pa.public_id AS paymentReference,
      pa.gateway_transaction_id AS transactionId,
      CAST(pa.amount_paisa AS CHAR) AS amountPaisa,
      pa.currency,
      pa.status,
      pa.mode,
      o.order_number AS orderNumber,
      s.slug AS storeSlug
    FROM payment_attempts pa
    JOIN orders o ON o.id = pa.order_id
    JOIN stores s ON s.id = pa.store_id
    WHERE pa.public_id = ?
    LIMIT 1`,
    [reference],
  );
  const result = rows[0];
  if (!result) {
    return NextResponse.json({ message: "Payment not found." }, { status: 404 });
  }
  return NextResponse.json({
    paymentReference: result.paymentReference,
    transactionId: result.transactionId,
    amount: paisaToGatewayAmount(BigInt(result.amountPaisa)),
    currency: result.currency,
    status: result.status,
    mode: result.mode,
    orderNumber: result.orderNumber,
    storeSlug: result.storeSlug,
  });
}
