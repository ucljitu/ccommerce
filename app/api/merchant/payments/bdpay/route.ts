import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import {
  MerchantAuthenticationError,
  requireMerchantSession,
} from "@/lib/auth/merchant-session";
import { encryptCredential } from "@/lib/payments/credential-vault";

export const runtime = "nodejs";

type SettingsRow = RowDataPacket & {
  mode: "sandbox" | "production";
  enabled: number;
  keyLastFour: string;
  updatedAt: Date;
};

function errorResponse(error: unknown) {
  if (error instanceof MerchantAuthenticationError) {
    return NextResponse.json({ message: "Sign in required." }, { status: 401 });
  }
  console.error("Merchant Bd Pay settings failed", error instanceof Error ? error.message : "Unknown error");
  return NextResponse.json({ message: "Payment settings could not be saved." }, { status: 500 });
}

export async function GET() {
  try {
    const session = await requireMerchantSession();
    const [rows] = await getDb().execute<SettingsRow[]>(
      `SELECT mode, enabled, key_last_four AS keyLastFour, updated_at AS updatedAt
       FROM payment_gateway_settings
       WHERE merchant_id = ? AND gateway = 'bdpay'
       LIMIT 1`,
      [session.merchantId],
    );
    const setting = rows[0];
    return NextResponse.json({
      configured: Boolean(setting),
      mode: setting?.mode ?? "sandbox",
      enabled: Boolean(setting?.enabled),
      keyLastFour: setting?.keyLastFour ?? null,
      updatedAt: setting?.updatedAt ?? null,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await requireMerchantSession();
    if (session.role !== "owner") {
      return NextResponse.json({ message: "Only the store owner can change payment credentials." }, { status: 403 });
    }
    const origin = request.headers.get("origin");
    if (origin && new URL(origin).host !== new URL(request.url).host) {
      return NextResponse.json({ message: "Payment settings could not be saved." }, { status: 403 });
    }
    const body = (await request.json()) as {
      apiKey?: unknown;
      mode?: unknown;
      enabled?: unknown;
      confirmProduction?: unknown;
    };
    const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
    const mode = body.mode === "production" ? "production" : "sandbox";
    const enabled = body.enabled === true;
    if (apiKey.length < 20 || apiKey.length > 500) {
      return NextResponse.json({ message: "Enter a valid Bd Payment API key." }, { status: 422 });
    }
    if (mode === "production" && body.confirmProduction !== true) {
      return NextResponse.json({ message: "Confirm before enabling Production mode." }, { status: 422 });
    }
    const encrypted = encryptCredential(apiKey, session.merchantId);
    await getDb().execute(
      `INSERT INTO payment_gateway_settings
        (merchant_id, gateway, mode, enabled, encrypted_api_key, key_last_four)
       VALUES (?, 'bdpay', ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
        mode = VALUES(mode),
        enabled = VALUES(enabled),
        encrypted_api_key = VALUES(encrypted_api_key),
        key_last_four = VALUES(key_last_four),
        updated_at = CURRENT_TIMESTAMP(3)`,
      [session.merchantId, mode, enabled ? 1 : 0, encrypted, apiKey.slice(-4)],
    );
    return NextResponse.json({
      message: "Bd Payment settings saved.",
      mode,
      enabled,
      keyLastFour: apiKey.slice(-4),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
