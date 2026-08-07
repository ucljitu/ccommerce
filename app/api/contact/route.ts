import { appendFile, mkdir } from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  cleanContactText,
  normalizeBangladeshMobile,
  validateContactForm,
  type ContactFormData,
  type InquiryType,
} from "@/lib/contact-validation";
import { contactConfig } from "@/lib/contact-config";

export const runtime = "nodejs";

type StoredInquiry = {
  id: string;
  referenceNumber: string;
  fullName: string;
  mobile: string | null;
  email: string | null;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  status: "New";
  source: "public-contact-form";
  createdAt: string;
};

const rateBuckets = new Map<string, number[]>();
const recentMessages = new Map<string, number>();
const HOUR = 60 * 60 * 1000;
const DUPLICATE_WINDOW = 10 * 60 * 1000;

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256")
    .update(`${address}:${process.env.CONTACT_RATE_LIMIT_SALT ?? "c-commerce-contact"}`)
    .digest("hex");
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function checkRateLimit(key: string, now: number) {
  const recent = (rateBuckets.get(key) ?? []).filter((time) => now - time < HOUR);
  if (recent.length >= 5) return false;
  recent.push(now);
  rateBuckets.set(key, recent);
  return true;
}

function createReference(now: Date) {
  const date = now.toISOString().slice(0, 10).replaceAll("-", "");
  return `CC-${date}-${randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
}

async function persistInquiry(inquiry: StoredInquiry) {
  const configuredPath = process.env.CONTACT_STORAGE_PATH?.trim();
  const filePath =
    configuredPath || path.join(process.cwd(), ".data", "contact-inquiries.jsonl");
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(inquiry)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
}

async function notifySupport(inquiry: StoredInquiry) {
  const webhook = process.env.CONTACT_NOTIFICATION_WEBHOOK_URL?.trim();
  if (!webhook) return;
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...inquiry, supportEmail: contactConfig.supportEmail }),
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error(`Contact notification returned ${response.status}`);
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json({ message: "We could not send your message." }, 403);
  }
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_384) {
    return json({ message: "The message is too large." }, 413);
  }

  let raw: Partial<ContactFormData>;
  try {
    raw = await request.json();
  } catch {
    return json({ message: "Please check the form and try again." }, 400);
  }

  const data: ContactFormData = {
    fullName: cleanContactText(raw.fullName, 100),
    mobile: cleanContactText(raw.mobile, 30),
    email: cleanContactText(raw.email, 254).toLowerCase(),
    inquiryType: cleanContactText(raw.inquiryType, 50),
    subject: cleanContactText(raw.subject, 150),
    message: cleanContactText(raw.message, 3000),
    website: cleanContactText(raw.website, 200),
    startedAt: Number(raw.startedAt) || 0,
  };

  if (data.website) {
    return json({ message: "Your message has been received." }, 200);
  }
  const now = Date.now();
  if (!data.startedAt || now - data.startedAt < 3_000 || now - data.startedAt > 24 * HOUR) {
    return json({ message: "Please review the form and try again." }, 400);
  }

  const errors = validateContactForm(data);
  if (Object.keys(errors).length) {
    return json({ message: "Please correct the highlighted fields.", errors }, 422);
  }

  const key = clientKey(request);
  if (!checkRateLimit(key, now)) {
    return json({ message: "Too many messages were sent. Please try again later." }, 429);
  }

  const duplicateKey = createHash("sha256")
    .update(
      `${key}:${data.email}:${data.mobile}:${data.inquiryType}:${data.subject.toLowerCase()}:${data.message.toLowerCase()}`,
    )
    .digest("hex");
  const duplicateTime = recentMessages.get(duplicateKey);
  if (duplicateTime && now - duplicateTime < DUPLICATE_WINDOW) {
    return json(
      { message: "This message was already sent. Please wait before sending it again." },
      409,
    );
  }

  const createdAt = new Date(now);
  const inquiry: StoredInquiry = {
    id: randomUUID(),
    referenceNumber: createReference(createdAt),
    fullName: data.fullName,
    mobile: data.mobile ? normalizeBangladeshMobile(data.mobile) : null,
    email: data.email || null,
    inquiryType: data.inquiryType as InquiryType,
    subject: data.subject,
    message: data.message,
    status: "New",
    source: "public-contact-form",
    createdAt: createdAt.toISOString(),
  };

  try {
    await persistInquiry(inquiry);
    recentMessages.set(duplicateKey, now);
  } catch (error) {
    console.error(
      "Contact inquiry persistence failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return json({ message: "We could not send your message. Please try again." }, 503);
  }

  try {
    await notifySupport(inquiry);
  } catch (error) {
    console.warn(
      "Contact notification failed",
      error instanceof Error ? error.message : "Unknown error",
    );
  }

  return json(
    {
      message: "Your message has been sent.",
      referenceNumber: inquiry.referenceNumber,
    },
    201,
  );
}
