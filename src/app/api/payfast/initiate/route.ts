import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import crypto from "crypto";

// Payfast signature generator - MUST maintain parameter order as per API docs
const generateSignature = (
  data: Record<string, string>,
  passPhrase: string | null = null
) => {
  // Create parameter string
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
  // Remove last ampersand
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
    const { refNumber, email, amount } = await req.json();

    const booking = await db.booking.findUnique({ where: { refNumber } });
    if (!booking) {
      return NextResponse.json({
        success: false,
        message: "Booking not found",
      });
    }

    const user = await db.user.findUnique({ where: { id: booking.userId } });

    // Ensure amount is in Rands (2 decimal places)
    const amountInRands = (Number(amount) / 100).toFixed(2);

    // Build Payfast data object - MAINTAIN ORDER as per API documentation
    // Order matters for signature generation!
    const pfData: Record<string, string> = {};

    // Required fields in correct order
    pfData.merchant_id = process.env.PAYFAST_MERCHANT_ID!;
    pfData.merchant_key = process.env.PAYFAST_MERCHANT_KEY!;
    pfData.return_url = process.env.PAYFAST_RETURN_URL!;
    pfData.cancel_url = process.env.PAYFAST_CANCEL_URL!;
    pfData.notify_url = process.env.PAYFAST_NOTIFY_URL!;

    // Buyer details
    if (user?.name) {
      const nameParts = user.name.trim().split(" ");
      pfData.name_first = nameParts[0] || "Customer";
      if (nameParts.length > 1) {
        pfData.name_last = nameParts.slice(1).join(" ");
      }
    } else {
      pfData.name_first = "Customer";
    }

    pfData.email_address = email;

    // Transaction details
    pfData.m_payment_id = refNumber;
    pfData.amount = amountInRands;
    pfData.item_name = `Dog walk for ${booking.dogName}`;

    // Remove empty values
    const cleanedData: Record<string, string> = {};
    Object.entries(pfData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedData[key] = value.toString();
      }
    });

    // Generate signature using correct method
    const signature = generateSignature(
      cleanedData,
      process.env.PAYFAST_PASSPHRASE || null
    );

    // Build query string manually to preserve order
    let queryString = "";
    for (const key in cleanedData) {
      if (cleanedData.hasOwnProperty(key)) {
        if (cleanedData[key] !== "") {
          queryString += `${key}=${encodeURIComponent(
            cleanedData[key].trim()
          ).replace(/%20/g, "+")}&`;
        }
      }
    }
    queryString = queryString.slice(0, -1); // Remove last &

    // Use sandbox for testing, production for live
    const baseUrl = "https://sandbox.payfast.co.za";

    const checkoutUrl = `${baseUrl}/eng/process?${queryString}&signature=${signature}`;

    console.log("Payfast Debug Info:");
    console.log("Cleaned Data:", cleanedData);
    console.log("Query String:", queryString);
    console.log("Generated Signature:", signature);

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Payfast initiation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Payment initiation failed",
      },
      { status: 500 }
    );
  }
}
