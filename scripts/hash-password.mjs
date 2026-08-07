import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error("Usage: node scripts/hash-password.mjs \"a-password-with-at-least-12-characters\"");
  process.exit(1);
}
const salt = randomBytes(16);
const scrypt = promisify(scryptCallback);
const hash = await scrypt(password, salt, 64);
console.log(`scrypt$${salt.toString("base64url")}$${Buffer.from(hash).toString("base64url")}`);
