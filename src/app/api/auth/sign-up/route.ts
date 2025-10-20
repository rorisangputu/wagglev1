import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/db/db";
import { addMinutes } from "date-fns";
import { signUpSchema } from "@/lib/validationSchemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const {
      name,
      email,
      phone,
      streetAddress,
      suburb,
      city,
      province,
      password,
    } = signUpSchema.parse(body);

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !streetAddress ||
      !suburb ||
      !city ||
      !province
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        streetAddress,
        suburb,
        province,
        city,
        emailVerified: null,
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await db.verificationToken.create({
      data: {
        identifier: user.email,
        token: code,
        expires: addMinutes(new Date(), 15),
      },
    });

    // Replace this with your actual email service (Resend, Nodemailer, etc.)
    console.log(`Verification code for ${user.email}: ${code}`);

    return NextResponse.json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
