// app/payment/success/page.tsx

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-700">
          Thank you for your payment. Your booking has been confirmed and is now
          active.
        </p>

        <Link
          href="/dashboard" // or wherever you want them to land after success
          className="inline-block bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Go to Dashboard
        </Link>

        <p className="text-xs text-gray-400">
          Waggle 🐾 – your dog&apos;s happiness, one walk at a time
        </p>
      </div>
    </div>
  );
}
