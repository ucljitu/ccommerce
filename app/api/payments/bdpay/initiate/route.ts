import { randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { createBdPayPayment, paisaToGatewayAmount } from "@/lib/payments/bdpay";
import { decryptCredential } from "@/lib/payments/credential-vault";

export const runtime = "nodejs";

type OrderRow = RowDataPacket & {
  id: string;
  publicId: string;
  orderNumber: string;
  merchantId: string;
  storeId: string;
  storeSlug: string;
  customerName: string;
  customerEmail: string;
  totalPaisa: string;
  currency: string;
  orderStatus: string;
  paymentStatus: string;
  gatewayMode: "sandbox" | "production";
  encryptedApiKey: string;
};

const attempts = new Map<string, number[]>();

function appUrl() {
  const configured = process.env.APP_URL?.trim();
  if (!configured || configured.includes("yourdomain.com")) {
    throw new Error("APP_URL is not configured");
  }
  const url = new URL(configured);
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("APP_URL must use HTTPS in production");
  }
  return url.origin;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return NextResponse.json({ message: "We could not start the payment." }, { status: 403 });
  }
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (attempts.get(client) ?? []).filter((time) => now - time < 10 * 60_000);
  if (recent.length >= 10) {
    return NextResponse.json({ message: "Too many payment attempts. Try again later." }, { status: 429 });
  }
  recent.push(now);
  attempts.set(client, recent);

  let body: { orderReference?: unknown; storeSlug?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "We could not start the payment." }, { status: 400 });
  }
  const orderReference =
    typeof body.orderReference === "string" ? body.orderReference.trim() : "";
  const storeSlug = typeof body.storeSlug === "string" ? body.storeSlug.trim() : "";
  if (!orderReference || !storeSlug) {
    return NextResponse.json({ message: "The order could not be found." }, { status: 404 });
  }

  const [orders] = await getDb().execute<OrderRow[]>(
    `SELECT
      CAST(o.id AS CHAR) AS id,
      o.public_id AS publicId,
      o.order_number AS orderNumber,
      CAST(o.merchant_id AS CHAR) AS merchantId,
      CAST(o.store_id AS CHAR) AS storeId,
      s.slug AS storeSlug,
      o.customer_name AS customerName,
      o.customer_email AS customerEmail,
      CAST(o.total_paisa AS CHAR) AS totalPaisa,
      o.currency,
      o.order_status AS orderStatus,
      o.payment_status AS paymentStatus,
      pgs.mode AS gatewayMode,
      pgs.encrypted_api_key AS encryptedApiKey
    FROM orders o
    JOIN stores s ON s.id = o.store_id AND s.status = 'active'
    JOIN merchants m ON m.id = o.merchant_id AND m.status = 'active'
    JOIN payment_gateway_settings pgs
      ON pgs.merchant_id = o.merchant_id
      AND pgs.gateway = 'bdpay'
      AND pgs.enabled = 1
    WHERE o.public_id = ? AND s.slug = ?
    LIMIT 1`,
    [orderReference, storeSlug],
  );
  const order = orders[0];
  if (!order) {
    return NextResponse.json({ message: "Bd Payment is not available for this order." }, { status: 404 });
  }
  if (order.currency !== "BDT" || order.paymentStatus === "paid") {
    return NextResponse.json(
      { message: order.paymentStatus === "paid" ? "This order is already paid." : "This currency is not supported." },
      { status: 409 },
    );
  }
  if (!["pending_payment", "payment_failed"].includes(order.orderStatus)) {
    return NextResponse.json({ message: "This order cannot be paid." }, { status: 409 });
  }

  const [active] = await getDb().execute<RowDataPacket[]>(
    `SELECT public_id
     FROM payment_attempts
     WHERE order_id = ? AND gateway = 'bdpay'
       AND status IN ('pending','processing')
       AND initiated_at > DATE_SUB(CURRENT_TIMESTAMP(3), INTERVAL 20 MINUTE)
     LIMIT 1`,
    [order.id],
  );
  if (active.length) {
    return NextResponse.json({ message: "A payment is already in progress for this order." }, { status: 409 });
  }

  const publicId = randomUUID();
  const internalId = `BDP-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;
  await getDb().execute(
    `INSERT INTO payment_attempts
      (public_id, internal_transaction_id, merchant_id, store_id, order_id, gateway, mode, amount_paisa, currency, status)
     VALUES (?, ?, ?, ?, ?, 'bdpay', ?, ?, 'BDT', 'pending')`,
    [
      publicId,
      internalId,
      order.merchantId,
      order.storeId,
      order.id,
      order.gatewayMode,
      order.totalPaisa,
    ],
  );

  try {
    const base = appUrl();
    const apiKey = decryptCredential(order.encryptedApiKey, order.merchantId);
    const paymentUrl = await createBdPayPayment({
      apiKey,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      amount: paisaToGatewayAmount(BigInt(order.totalPaisa)),
      successUrl: `${base}/api/payments/bdpay/success?attempt=${encodeURIComponent(publicId)}`,
      cancelUrl: `${base}/api/payments/bdpay/cancel?attempt=${encodeURIComponent(publicId)}`,
      metadata: {
        payment_reference: publicId,
        order_reference: order.publicId,
        store: order.storeSlug,
      },
    });
    await getDb().execute(
      `UPDATE payment_attempts SET status = 'processing' WHERE public_id = ? AND status = 'pending'`,
      [publicId],
    );
    return NextResponse.json({ paymentUrl, paymentReference: publicId });
  } catch (error) {
    await getDb().execute(
      `UPDATE payment_attempts SET status = 'failed', failed_at = CURRENT_TIMESTAMP(3)
       WHERE public_id = ? AND status = 'pending'`,
      [publicId],
    );
    console.error("Bd Payment initiation failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ message: "We could not start the payment. Please try again." }, { status: 502 });
  }
}
