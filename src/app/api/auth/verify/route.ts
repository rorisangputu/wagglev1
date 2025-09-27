import { NextResponse } from "next/server";
import db from "@/db/db";
import { verifyCodeSchema } from "@/lib/validationSchemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, code } = verifyCodeSchema.parse(body);

    const tokenRecord = await db.verificationToken.findFirst({
      where: { identifier: email, token: code },
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { message: "Verification code not found or invalid." },
        { status: 400 }
      );
    }

    // check expiry
    if (tokenRecord.expires < new Date()) {
      return NextResponse.json(
        { message: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // mark email verified
    await db.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    // delete token by ID
    await db.verificationToken.delete({
      where: { id: tokenRecord.id },
    });

    return NextResponse.json({ message: "Email verified successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to verify email." },
      { status: 500 }
    );
  }
}
