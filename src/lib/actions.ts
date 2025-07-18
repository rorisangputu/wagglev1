import db from "@/db/db";
import { User } from "@/generated/prisma";
import { auth } from "@/lib/auth";

export async function getCurrentUser(): Promise<User> {
  const userSession = await auth();
  if (!userSession?.user?.email) {
    throw new Error("Not authenticated");
  }

  const user = await db.user.findUnique({
    where: { email: userSession.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

/**
 * Generates a unique booking reference number (e.g., WAG-83491X).
 */
export async function generateBookingRef(): Promise<string> {
  const prefix = "WAG";
  let ref: string = "";
  let exists = true;

  while (exists) {
    // Example: "WAG-3948K"
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    ref = `${prefix}-${randomPart}`;

    const existingBooking = await db.booking.findUnique({
      where: { refNumber: ref },
      select: { id: true },
    });

    exists = !!existingBooking;
  }

  return ref;
}
