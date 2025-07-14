import { redirect } from "next/navigation";
import BookingPageClient from "./_components/BookingPageClient";
import { auth } from "@/lib/auth";

export default async function BookingPage() {
  const session = await auth();
  if (!session) {
    redirect(`/login?redirectTo=/book`);
  }
  return <BookingPageClient />;
}
