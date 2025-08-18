import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import crypto from "crypto";

function buildQuery(data: Record<string, string>) {
  return Object.entries(data)
    .filter(([value]) => value !== "" && value != null) // Remove empty values
    .sort(([a], [b]) => a.localeCompare(b)) // Alphabetical order
    .map(
      ([key, value]) =>
        `${key}=${encodeURIComponent(value.toString().trim()).replace(
          /%20/g,
          "+"
        )}`
    )
    .join("&");
}

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

    // Build Payfast data object - order matters for signature
    const pfData: Record<string, string> = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: process.env.PAYFAST_RETURN_URL!,
      cancel_url: process.env.PAYFAST_CANCEL_URL!,
      notify_url: process.env.PAYFAST_NOTIFY_URL!,
      name_first: user?.name?.split(" ")[0] || "Customer", // Only first name
      email_address: email,
      m_payment_id: refNumber,
      amount: amountInRands,
      item_name: `Dog walk for ${booking.dogName}`,
    };

    // Add optional fields only if they exist
    if (user?.name?.split(" ")[1]) {
      pfData.name_last = user.name.split(" ")[1];
    }

    // Remove any undefined or empty values
    const cleanedData: Record<string, string> = {};
    Object.entries(pfData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedData[key] = value.toString();
      }
    });

    const queryString = buildQuery(cleanedData);

    // Generate signature
    let signatureString = queryString;

    if (process.env.PAYFAST_PASSPHRASE) {
      signatureString += `&passphrase=${encodeURIComponent(
        process.env.PAYFAST_PASSPHRASE
      )}`;
    }

    const signature = crypto
      .createHash("md5")
      .update(signatureString)
      .digest("hex");

    // Use www.payfast.co.za for production, sandbox.payfast.co.za for testing
    const baseUrl = "https://sandbox.payfast.co.za";

    const checkoutUrl = `${baseUrl}/eng/process?${queryString}&signature=${signature}`;

    console.log("Payfast Debug Info:");
    console.log("Query String:", queryString);
    console.log("Signature String:", signatureString);
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
