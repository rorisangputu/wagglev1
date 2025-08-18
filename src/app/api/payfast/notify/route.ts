import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const ref = formData.get("m_payment_id")?.toString();
  const paymentStatus = formData.get("payment_status")?.toString();

  if (!ref) return new NextResponse("No ref", { status: 400 });

  if (paymentStatus === "COMPLETE") {
    await db.booking.update({
      where: { refNumber: ref },
      data: { status: "paid" },
    });
  } else if (paymentStatus === "CANCELLED") {
    await db.booking.update({
      where: { refNumber: ref },
      data: { status: "cancelled" },
    });
  }

  return new NextResponse("OK", { status: 200 });
}
