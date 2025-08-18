// app/api/payfast/notify/route.ts
import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

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

    // Build verification string exactly as Payfast sends it
    // Include ALL parameters, even empty ones, in the exact order received
    const itnParams = [
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

    let verificationString = "";

    // Process each parameter - include ALL parameters, even empty ones
    itnParams.forEach((param) => {
      if (data.hasOwnProperty(param)) {
        const value = data[param];
        // Include parameter even if empty - this is key for Payfast ITN
        verificationString += `${param}=${encodeURIComponent(value).replace(
          /%20/g,
          "+"
        )}&`;
      }
    });

    // Remove trailing &
    verificationString = verificationString.slice(0, -1);

    // Add passphrase if exists
    if (process.env.PAYFAST_PASSPHRASE) {
      verificationString += `&passphrase=${encodeURIComponent(
        process.env.PAYFAST_PASSPHRASE
      ).replace(/%20/g, "+")}`;
    }

    console.log("Full verification string:", verificationString);

    const computedSignature = crypto
      .createHash("md5")
      .update(verificationString)
      .digest("hex");

    console.log("Received signature:", receivedSignature);
    console.log("Computed signature:", computedSignature);

    if (receivedSignature !== computedSignature) {
      // The signature still doesn't match - let's skip validation for now
      // This is common in development with Payfast sandbox
      console.error(
        "Signature mismatch - proceeding anyway (development mode)"
      );

      // In production, you might want to be stricter:
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Validate merchant details
    if (
      data.merchant_id !== process.env.PAYFAST_MERCHANT_ID ||
      !process.env.PAYFAST_MERCHANT_KEY // We don't have merchant_key in ITN
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
