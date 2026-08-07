import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const VERSION = "v1";

function encryptionKey() {
  const raw = process.env.PAYMENT_CREDENTIAL_ENCRYPTION_KEY?.trim();
  if (!raw) throw new Error("PAYMENT_CREDENTIAL_ENCRYPTION_KEY is not configured");
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error("PAYMENT_CREDENTIAL_ENCRYPTION_KEY must contain 32 base64-encoded bytes");
  }
  return key;
}

export function encryptCredential(value: string, merchantId: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  cipher.setAAD(Buffer.from(`bdpay:${merchantId}`));
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [VERSION, iv.toString("base64url"), tag.toString("base64url"), encrypted.toString("base64url")].join(".");
}

export function decryptCredential(payload: string, merchantId: string) {
  const [version, ivValue, tagValue, encryptedValue] = payload.split(".");
  if (version !== VERSION || !ivValue || !tagValue || !encryptedValue) {
    throw new Error("Unsupported encrypted credential");
  }
  const decipher = createDecipheriv(
    "aes-256-gcm",
    encryptionKey(),
    Buffer.from(ivValue, "base64url"),
  );
  decipher.setAAD(Buffer.from(`bdpay:${merchantId}`));
  decipher.setAuthTag(Buffer.from(tagValue, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(encryptedValue, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
