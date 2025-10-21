import { NextRequest, NextResponse } from "next/server";
import { verifyCodeSchema } from "@/lib/validationSchemas";
import { resendVerificationCode, verifyUser } from "@/lib/user/account/actions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code, action } = verifyCodeSchema.parse(body);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    //Handle resend verification code action
    if (action == "resend") {
      const result = await resendVerificationCode(email);

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }

      return NextResponse.json(
        { success: "Verification code resent" },
        { status: 200 }
      );
    }

    //Handle Verification Code
    if (!code) {
      return NextResponse.json(
        { error: "Verification code is required" },
        { status: 400 }
      );
    }

    const result = await verifyUser(email, code);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(
      {
        success: "User account verified successfully. You can now sign in.",
        redirectTo: "/login",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to verify email." },
      { status: 500 }
    );
  }
}
