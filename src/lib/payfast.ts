// utils/payfast.ts
import crypto from "crypto";

export function generatePayfastSignature(
  params: Record<string, string>,
  passphrase?: string
) {
  // Remove signature if it exists
  const entries = Object.entries(params).filter(([key]) => key !== "signature");

  // Sort alphabetically
  entries.sort(([a], [b]) => a.localeCompare(b));

  // Build query string
  const queryString = entries
    .map(
      ([key, value]) =>
        `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, "+")}`
    )
    .join("&");

  const fullString = passphrase
    ? `${queryString}&passphrase=${passphrase}`
    : queryString;

  return crypto.createHash("md5").update(fullString).digest("hex");
}
