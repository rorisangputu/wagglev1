import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import crypto from "crypto";

function buildQuery(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
}

export async function POST(req: NextRequest) {
  const { refNumber, email, amount } = await req.json();

  const booking = await db.booking.findUnique({ where: { refNumber } });
  if (!booking) {
    return NextResponse.json({ success: false, message: "Booking not found" });
  }
  const userId = booking.userId;
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  const pfData: Record<string, string> = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID!,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
    return_url: process.env.PAYFAST_RETURN_URL!,
    cancel_url: process.env.PAYFAST_CANCEL_URL!,
    notify_url: process.env.PAYFAST_NOTIFY_URL!,
    name_first: user?.name ?? "Customer",
    email_address: email,
    m_payment_id: refNumber, // internal ref
    amount: amount.toFixed(2),
    item_name: `Dog walk for ${booking.dogName}`,
  };

  // Optional: sign with passphrase
  const queryString = buildQuery(pfData);
  const signatureBase = process.env.PAYFAST_PASSPHRASE
    ? `${queryString}&passphrase=${encodeURIComponent(
        process.env.PAYFAST_PASSPHRASE
      )}`
    : queryString;

  const signature = crypto
    .createHash("md5")
    .update(signatureBase)
    .digest("hex");

  const checkoutUrl = `https://sandbox.payfast.co.za/eng/process?${queryString}&signature=${signature}`;

  return NextResponse.json({ checkoutUrl });
}
