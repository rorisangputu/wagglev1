"use client";

import { useState } from "react";

export default function PayfastButton({
  refNumber,
  email,
  amount,
}: {
  refNumber: string;
  email: string;
  amount: number;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const res = await fetch("/api/payfast/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refNumber, email, amount }),
    });

    const data = await res.json();
    setLoading(false);
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert(data.message || "Payment init failed");
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2 rounded-lg"
    >
      {loading ? "Redirecting..." : "Proceed to Payment"}
    </button>
  );
}
