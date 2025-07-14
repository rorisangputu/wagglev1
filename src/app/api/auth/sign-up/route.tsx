import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/db/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, address, password } = body;

    if (!name || !email || !password || !phone || !address) {
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

    await db.user.create({
      data: {
        name,
        email,
        phone,
        address,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
