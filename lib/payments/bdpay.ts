const CREATE_PATH = "/api/payment/create";
const VERIFY_PATH = "/api/payment/verify";

type CreateInput = {
  apiKey: string;
  customerName: string;
  customerEmail: string;
  amount: string;
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
};

type CreateResponse = { status?: boolean; payment_url?: string; message?: string };
export type VerifyResponse = {
  status?: string;
  transaction_id?: string;
  amount?: string;
  cus_name?: string;
  cus_email?: string;
};

function baseUrl() {
  const configured = process.env.BDPAY_BASE_URL?.trim() || "https://payment.bdpayment.online";
  const url = new URL(configured);
  if (url.protocol !== "https:") throw new Error("BDPAY_BASE_URL must use HTTPS");
  return url.origin;
}

async function request<T>(path: string, apiKey: string, body: Record<string, unknown>) {
  const response = await fetch(`${baseUrl()}${path}`, {
    method: "POST",
    headers: { "API-KEY": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12_000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Bd Payment request failed with ${response.status}`);
  const data = (await response.json()) as T;
  return data;
}

export async function createBdPayPayment(input: CreateInput) {
  const result = await request<CreateResponse>(CREATE_PATH, input.apiKey, {
    cus_name: input.customerName,
    cus_email: input.customerEmail,
    amount: input.amount,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    meta_data: input.metadata,
  });
  if (!result.status || !result.payment_url) {
    throw new Error("Bd Payment did not return a payment URL");
  }
  const paymentUrl = new URL(result.payment_url);
  if (paymentUrl.protocol !== "https:" || paymentUrl.hostname !== "payment.bdpayment.online") {
    throw new Error("Bd Payment returned an invalid redirect URL");
  }
  return paymentUrl.toString();
}

export async function verifyBdPayPayment(apiKey: string, transactionId: string) {
  return request<VerifyResponse>(VERIFY_PATH, apiKey, {
    transaction_id: transactionId,
  });
}

export function paisaToGatewayAmount(paisa: bigint) {
  const hundred = BigInt(100);
  const whole = paisa / hundred;
  const fraction = paisa % hundred;
  return fraction === BigInt(0)
    ? whole.toString()
    : `${whole}.${fraction.toString().padStart(2, "0")}`;
}

export function gatewayAmountToPaisa(value: string) {
  if (!/^\d+(\.\d{1,2})?$/.test(value)) return null;
  const [whole, fraction = ""] = value.split(".");
  return BigInt(whole) * BigInt(100) + BigInt(fraction.padEnd(2, "0"));
}
