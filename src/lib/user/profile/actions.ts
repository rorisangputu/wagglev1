import db from "@/db/db";
import { headerUser } from "@/lib/types/UserTypes";

export async function getUserInfo(id: string): Promise<headerUser | null> {
  const user = await db.user.findUnique({
    where: { id: id },
  });

  return user;
}
