import bcrypt from "bcryptjs";
import { generateVerificationCode, getUserByEmail } from "../actions";
import db from "@/db/db";
import { sendAccountVerificationEmail } from "../emails/actions";
import { NextResponse } from "next/server";
//import { sendTestVerificationEmail } from "../emails/Test";

export async function createUser(data: {
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  suburb: string;
  city: string;
  province: string;
  password: string;
}) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        streetAddress: data.streetAddress,
        suburb: data.suburb,
        city: data.city,
        province: data.province,
        password: hashedPassword,
        verificationCode: verificationCode,
        verificationCodeExpires: verificationCodeExpires,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Failed to create user account" },
        { status: 500 }
      );
    }

    // const emailResult = await sendAccountVerificationEmail(
    //   data.email,
    //   data.name,
    //   verificationCode,
    //   verificationCodeExpires
    // );
    // const emailResult = await sendTestVerificationEmail(
    //   data.email,
    //   data.name,
    //   verificationCode,
    //   verificationCodeExpires
    // );

    // if (emailResult.error) {
    //   // Log error but don't fail user creation
    //   console.error(
    //     "⚠️ User created but email failed to send:",
    //     emailResult.error
    //   );
    // }

    // Console log for testing/backup
    console.log("🔐 USER VERIFICATION CODE:");
    console.log(`📧 Email: ${data.email}`);
    console.log(`🔢 Code: ${verificationCode}`);
    console.log(`⏰ Expires: ${verificationCodeExpires}`);
    //console.log(`📬 Email sent: ${emailResult.success ? "✅" : "❌"}`);
    console.log("=".repeat(50));

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating user:", error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      // Check for unique constraint violation (duplicate email)
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create user account. Please try again." },
      { status: 500 }
    );
  }
}

export async function verifyUser(email: string, code: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (user.isVerified) {
    return { success: false, error: "User already verified" };
  }

  if (!user.verificationCode || !user.verificationCodeExpires) {
    return { success: false, error: "No verification code found" };
  }

  if (new Date() > user.verificationCodeExpires) {
    return { success: false, error: "Verification code expired" };
  }

  if (user.verificationCode !== code) {
    console.log(`❌ VERIFICATION FAILED:`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔢 Entered: ${code}`);
    console.log(`✅ Expected: ${user.verificationCode}`);
    console.log("=".repeat(50));
    return { success: false, error: "Invalid verification code" };
  }

  // Verify the user
  await db.user.update({
    where: { email },
    data: {
      isVerified: true,
      emailVerified: true,
      emailVerifiedDate: new Date(),
      verificationCode: null,
      verificationCodeExpires: null,
    },
  });

  return { success: true };
}

export async function resendVerificationCode(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user || !user.name) {
    return { success: false, error: "User not found" };
  }

  if (user.isVerified) {
    return { success: false, error: "User already verified" };
  }

  const verificationCode = generateVerificationCode();
  const verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Update user with new code
  await db.user.update({
    where: { email },
    data: {
      verificationCode,
      verificationCodeExpires,
    },
  });

  // Send new verification email
  const emailResult = await sendAccountVerificationEmail(
    email,
    verificationCode,
    user.name,
    verificationCodeExpires
  );

  if (!emailResult.success) {
    console.error(
      "⚠️ Code generated but email failed to send:",
      emailResult.error
    );
    // Still return success since the code was updated in DB
  }

  // Console log for testing
  console.log("🔄 RESEND VERIFICATION CODE:");
  console.log(`📧 Email: ${email}`);
  console.log(`🔢 New Code: ${verificationCode}`);
  console.log(`⏰ Expires: ${verificationCodeExpires}`);
  console.log(`📬 Email sent: ${emailResult.success ? "✅" : "❌"}`);
  console.log("=".repeat(50));

  return { success: true, verificationCode };
}
