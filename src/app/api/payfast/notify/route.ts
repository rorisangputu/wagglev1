import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// ITN signature verification - must use Payfast's parameter order
const generateITNSignature = (
  data: Record<string, string>,
  passPhrase: string | null = null
) => {
  // Payfast ITN parameter order (based on their documentation)
  const paramOrder = [
    "m_payment_id",
    "pf_payment_id",
    "payment_status",
    "item_name",
    "item_description",
    "amount_gross",
    "amount_fee",
    "amount_net",
    "custom_str1",
    "custom_str2",
    "custom_str3",
    "custom_str4",
    "custom_str5",
    "custom_int1",
    "custom_int2",
    "custom_int3",
    "custom_int4",
    "custom_int5",
    "name_first",
    "name_last",
    "email_address",
    "merchant_id",
  ];

  let pfOutput = "";

  // Process parameters in Payfast's expected order
  paramOrder.forEach((key) => {
    if (data.hasOwnProperty(key) && data[key] !== "") {
      pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  });

  // Remove last ampersand
  let getString = pfOutput.slice(0, -1);

  if (passPhrase !== null && passPhrase !== "") {
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

    // Generate signature for verification using ITN-specific function
    const computedSignature = generateITNSignature(
      data,
      process.env.PAYFAST_PASSPHRASE || null
    );

    console.log("ITN Signature Debug:");
    console.log("Received signature:", receivedSignature);
    console.log("Computed signature:", computedSignature);

    // Create verification string for debugging
    const paramOrder = [
      "m_payment_id",
      "pf_payment_id",
      "payment_status",
      "item_name",
      "item_description",
      "amount_gross",
      "amount_fee",
      "amount_net",
      "custom_str1",
      "custom_str2",
      "custom_str3",
      "custom_str4",
      "custom_str5",
      "custom_int1",
      "custom_int2",
      "custom_int3",
      "custom_int4",
      "custom_int5",
      "name_first",
      "name_last",
      "email_address",
      "merchant_id",
    ];

    let debugString = "";
    paramOrder.forEach((key) => {
      if (data.hasOwnProperty(key) && data[key] !== "") {
        debugString += `${key}=${encodeURIComponent(data[key].trim()).replace(
          /%20/g,
          "+"
        )}&`;
      }
    });
    debugString = debugString.slice(0, -1);
    if (process.env.PAYFAST_PASSPHRASE) {
      debugString += `&passphrase=${encodeURIComponent(
        process.env.PAYFAST_PASSPHRASE.trim()
      ).replace(/%20/g, "+")}`;
    }
    console.log("Verification string:", debugString);

    if (receivedSignature !== computedSignature) {
      console.error("Signature mismatch:", {
        receivedSignature,
        computedSignature,
        data,
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // // Additional validations
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

    // // Skip IP validation in development
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
