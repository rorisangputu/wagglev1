import { NextResponse } from "next/server";
import { signUpSchema } from "@/lib/validationSchemas";
import { createUser } from "@/lib/user/account/actions";
import { getUserByEmail } from "@/lib/user/actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const user = signUpSchema.parse(body);

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.phone ||
      !user.streetAddress ||
      !user.suburb ||
      !user.city ||
      !user.province
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(user.email);

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use." },
        { status: 400 }
      );
    }

    //Create User
    const res = await createUser(user);

    if (!res.ok)
      return NextResponse.json(
        {
          message: "User could not be created. Please try again",
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        message: "User created successfully.",
        redirectTo: `/user/verify?email=${encodeURIComponent(user.email)}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
