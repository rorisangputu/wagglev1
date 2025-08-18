import { NextResponse } from "next/server";
import db from "@/db/db";
import { verifyCodeSchema } from "@/lib/validationSchemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, code } = verifyCodeSchema.parse(body);

    // Find the verification token
    const tokenRecord = await db.verificationToken.findUnique({
      where: { identifier: email },
    });

    if (!tokenRecord) {
      return NextResponse.json(
        { message: "Verification code not found. Please request a new one." },
        { status: 400 }
      );
    }

    if (tokenRecord.token !== code) {
      return NextResponse.json(
        { message: "Invalid verification code." },
        { status: 400 }
      );
    }

    if (tokenRecord.expires < new Date()) {
      return NextResponse.json(
        { message: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Update the user's emailVerified field
    await db.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    // Optionally, delete the verification token now that it is used
    // await db.verificationToken.delete({
    //   where: { identifier: email },
    // });

    return NextResponse.json({ message: "Email verified successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to verify email." },
      { status: 500 }
    );
  }
}
