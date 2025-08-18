// app/booking/[refNumber]/page.tsx

import { redirect } from "next/navigation";
import db from "@/db/db";
import { auth } from "@/lib/auth";
import PayfastButton from "./_components/PayfastButton";

type ConfirmBookingPageProps = {
  params: Promise<{ refNumber: string }>;
};

export default async function ConfirmBookingPage({
  params,
}: ConfirmBookingPageProps) {
  const session = await auth();

  const { refNumber } = await params;
  if (!session?.user) {
    redirect("/sign-in"); // or your custom sign-in route
  }

  const booking = await db.booking.findUnique({
    where: { refNumber: refNumber },
    include: { user: true },
  });

  if (!booking || booking.user.email !== session.user.email) {
    return (
      <div className="text-center mt-8 text-red-600">
        Booking not found or you do not have access to this booking.
      </div>
    );
  }

  const amount = booking.pricePaidInCents;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-5">
        <h1 className="text-yellow-500 text-2xl font-bold text-center">
          Booking Pending Payment
        </h1>
        <p className="text-center text-gray-600">
          Your booking has been created, but payment is required to confirm it.
        </p>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold text-gray-700">Reference:</span>{" "}
            {booking.refNumber}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Dog Name:</span>{" "}
            {booking.dogName}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Address:</span>{" "}
            {booking.address}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Date:</span>{" "}
            {booking.date.toDateString()}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Time:</span>{" "}
            {booking.time}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Booked by:</span>{" "}
            {booking.user.name ?? booking.user.email}
          </p>
        </div>

        <div className="pt-4">
          {/* Replace with your Stripe Checkout or Payfast integration */}
          <PayfastButton
            refNumber={refNumber}
            email={booking.user.email}
            amount={amount}
          />
        </div>

        <p className="text-xs text-center text-gray-400">
          Waggle - your dog&apos;s happiness, one walk at a time 🐾
        </p>
      </div>
    </div>
  );
}
