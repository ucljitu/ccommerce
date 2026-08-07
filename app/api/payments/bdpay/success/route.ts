import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { getDb, inTransaction } from "@/lib/db";
import { gatewayAmountToPaisa, verifyBdPayPayment } from "@/lib/payments/bdpay";
import { decryptCredential } from "@/lib/payments/credential-vault";

export const runtime = "nodejs";

type AttemptRow = RowDataPacket & {
  id: string;
  publicId: string;
  merchantId: string;
  orderId: string;
  amountPaisa: string;
  currency: string;
  status: string;
  encryptedApiKey: string;
};

function resultUrl(request: Request, reference: string, state: string) {
  const configured = process.env.APP_URL?.trim() || new URL(request.url).origin;
  return new URL(`/payment-result/${encodeURIComponent(reference)}?state=${state}`, configured);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const attemptReference = url.searchParams.get("attempt")?.trim() || "";
  const transactionId =
    url.searchParams.get("transactionId")?.trim() ||
    url.searchParams.get("transaction_id")?.trim() ||
    "";
  if (!attemptReference || !transactionId || transactionId.length > 120) {
    return NextResponse.redirect(resultUrl(request, attemptReference || "unknown", "failed"));
  }

  const [rows] = await getDb().execute<AttemptRow[]>(
    `SELECT
      CAST(pa.id AS CHAR) AS id,
      pa.public_id AS publicId,
      CAST(pa.merchant_id AS CHAR) AS merchantId,
      CAST(pa.order_id AS CHAR) AS orderId,
      CAST(pa.amount_paisa AS CHAR) AS amountPaisa,
      pa.currency,
      pa.status,
      pgs.encrypted_api_key AS encryptedApiKey
    FROM payment_attempts pa
    JOIN payment_gateway_settings pgs
      ON pgs.merchant_id = pa.merchant_id AND pgs.gateway = 'bdpay'
    WHERE pa.public_id = ? AND pa.gateway = 'bdpay'
    LIMIT 1`,
    [attemptReference],
  );
  const attempt = rows[0];
  if (!attempt) {
    return NextResponse.redirect(resultUrl(request, attemptReference, "failed"));
  }
  if (attempt.status === "paid") {
    return NextResponse.redirect(resultUrl(request, attemptReference, "success"));
  }

  try {
    const apiKey = decryptCredential(attempt.encryptedApiKey, attempt.merchantId);
    const verified = await verifyBdPayPayment(apiKey, transactionId);
    const verifiedPaisa =
      typeof verified.amount === "string" ? gatewayAmountToPaisa(verified.amount) : null;
    const valid =
      verified.status === "COMPLETED" &&
      verified.transaction_id === transactionId &&
      verifiedPaisa === BigInt(attempt.amountPaisa) &&
      attempt.currency === "BDT";

    if (!valid) {
      await getDb().execute(
        `UPDATE payment_attempts
         SET status = 'failed', gateway_transaction_id = ?, gateway_status = ?, failed_at = CURRENT_TIMESTAMP(3), verified_at = CURRENT_TIMESTAMP(3)
         WHERE id = ? AND status <> 'paid'`,
        [transactionId, String(verified.status || "INVALID").slice(0, 80), attempt.id],
      );
      return NextResponse.redirect(resultUrl(request, attemptReference, "failed"));
    }

    await inTransaction(async (connection) => {
      const [locked] = await connection.execute<RowDataPacket[]>(
        `SELECT status FROM payment_attempts WHERE id = ? FOR UPDATE`,
        [attempt.id],
      );
      if (locked[0]?.status === "paid") return;
      await connection.execute(
        `UPDATE payment_attempts
         SET status = 'paid', gateway_transaction_id = ?, gateway_status = 'COMPLETED',
             paid_at = CURRENT_TIMESTAMP(3), verified_at = CURRENT_TIMESTAMP(3)
         WHERE id = ?`,
        [transactionId, attempt.id],
      );
      await connection.execute(
        `UPDATE orders
         SET payment_status = 'paid', order_status = 'confirmed'
         WHERE id = ? AND payment_status <> 'paid'`,
        [attempt.orderId],
      );
      await connection.execute(
        `INSERT IGNORE INTO payment_events
          (payment_attempt_id, event_key, event_type, safe_details)
         VALUES (?, ?, 'verification_completed', JSON_OBJECT('status','COMPLETED'))`,
        [attempt.id, `bdpay:verified:${transactionId}`],
      );
    });
    return NextResponse.redirect(resultUrl(request, attemptReference, "success"));
  } catch (error) {
    console.error("Bd Payment verification failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.redirect(resultUrl(request, attemptReference, "failed"));
  }
}
