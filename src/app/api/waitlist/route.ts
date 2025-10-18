import db from "@/db/db";
import { waitlistSchema } from "@/lib/validationSchemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const { email, suburb, province, city } = waitlistSchema.parse(body);
    if (!province || !suburb || !email)
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );

    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use." },
        { status: 400 }
      );
    }

    const waitlistUser = await db.waitlist.create({
      data: {
        email,
        suburb,
        province,
        city,
      },
    });

    //Send user an email about being added to waitlist
    console.log(waitlistUser);
    return NextResponse.json(
      {
        message: `You've been added to our waitlist. We will contact you when we're in ${suburb}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
