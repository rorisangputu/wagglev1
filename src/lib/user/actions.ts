import db from "@/db/db";

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
  });
}

// Generate 6-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
