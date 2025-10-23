import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import { bookingSchema } from "@/lib/validationSchemas";
import { generateBookingRef, getCurrentUser } from "@/lib/actions";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dogName, address, date, notes, time } = bookingSchema.parse(body);

    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 400 });

    const refNumber = await generateBookingRef();

    const booking = await db.booking.create({
      data: {
        dogName,
        address,
        notes,
        time,
        date,
        userId: user.id,
        refNumber,
        pricePaidInCents: 25000,
      },
    });

    return NextResponse.json({ refNumber: booking.refNumber }, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.format() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal error" },
      { status: 401 }
    );
  }
}
