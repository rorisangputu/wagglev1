import { NextResponse } from "next/server";
import db from "@/db/db";
import { bookingSchema } from "@/lib/validationSchemas";
import { generateBookingRef, getCurrentUser } from "@/lib/actions";

export async function POST(req: Request) {
  try {
    const body = req.json();
    const { dogName, address, date, notes, time } = bookingSchema.parse(body);

    const user = await getCurrentUser();
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
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal error" },
      { status: 401 }
    );
  }
}
