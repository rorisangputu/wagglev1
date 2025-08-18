import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Same signature function for ITN verification
const generateSignature = (
  data: Record<string, string>,
  passPhrase: string | null = null
) => {
  let pfOutput = "";
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(
          /%20/g,
          "+"
        )}&`;
      }
    }
  }
  let getString = pfOutput.slice(0, -1);
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
      /%20/g,
      "+"
    )}`;
  }
  return crypto.createHash("md5").update(getString).digest("hex");
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    console.log("ITN Data received:", data);

    // Verify the signature
    const receivedSignature = data.signature;
    delete data.signature; // Remove signature from data for verification

    // Generate signature for verification
    const computedSignature = generateSignature(
      data,
      process.env.PAYFAST_PASSPHRASE || null
    );

    if (receivedSignature !== computedSignature) {
      console.error("Signature mismatch:", {
        receivedSignature,
        computedSignature,
        data,
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Additional validations
    // const validIps = [
    //   "197.97.145.144",
    //   "197.97.145.145",
    //   "197.97.145.146",
    //   "197.97.145.147",
    //   "197.97.145.148",
    //   "41.74.179.194",
    //   "41.74.179.195",
    //   "41.74.179.196",
    //   "41.74.179.197",
    //   "41.74.179.198",
    //   "41.74.179.199",
    // ];

    // const clientIp =
    //   req.headers.get("x-forwarded-for")?.split(",")[0] ||
    //   req.headers.get("x-real-ip") ||
    //   "unknown";

    // Skip IP validation in development
    // if (process.env.NODE_ENV === "production" && !validIps.includes(clientIp)) {
    //   console.error("Invalid IP:", clientIp);
    //   return NextResponse.json({ error: "Invalid IP" }, { status: 403 });
    // }

    // Validate merchant details
    if (
      data.merchant_id !== process.env.PAYFAST_MERCHANT_ID ||
      data.merchant_key !== process.env.PAYFAST_MERCHANT_KEY
    ) {
      console.error("Invalid merchant details");
      return NextResponse.json({ error: "Invalid merchant" }, { status: 400 });
    }

    // Update booking status based on payment status
    const refNumber = data.m_payment_id;
    const paymentStatus = data.payment_status;

    if (paymentStatus === "COMPLETE") {
      await db.booking.update({
        where: { refNumber },
        data: {
          status: "paid",
          updatedAt: new Date(),
        },
      });

      console.log(`Payment completed for booking: ${refNumber}`);
    } else {
      console.log(`Payment status: ${paymentStatus} for booking: ${refNumber}`);
    }

    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error("ITN processing error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
