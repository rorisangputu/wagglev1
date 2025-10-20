"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheckBig, XCircleIcon } from "lucide-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";

type waitlistFormProps = {
  setShowWaitlistModal: (value: boolean) => void;
};
<CircleCheckBig />;

const WaitlistForm = ({ setShowWaitlistModal }: waitlistFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [success, setSuccess] = useState(false);

  const [waitlistForm, setWaitlistForm] = useState({
    email: "",
    suburb: "",
    province: selectedProvince,
    city: "",
  });

  const provinces = [
    "Eastern Cape",
    "Free State",
    "Gauteng",
    "KwaZulu-Natal",
    "Limpopo",
    "Mpumalanga",
    "Northern Cape",
    "North West",
    "Western Cape",
  ];
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setWaitlistForm({ ...waitlistForm, province });
  };

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          body: JSON.stringify(waitlistForm),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          setSuccess(true);
          setSelectedProvince("");
          setWaitlistForm({
            email: "",
            suburb: "",
            province: selectedProvince,
            city: "",
          });
          setError("success: Added to waitlist! We'll notify you soon.");
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Failed to join waitlist");
        }
      } catch {
        setError("Failed to join waitlist. Please try again.");
      }
    });
  };
  if (success) {
    return (
      <div className="w-full h-[40vh] flex  items-center">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
          <div className="flex flex-col justify-center items-center text-center space-y-2">
            <CircleCheckBig className="text-green-600" />
            <div className="space-y-4">
              <p className="text-green-600 text-lg">
                You&apos;ve been added to the waitlist!
              </p>
              <p className=" text-neutral-500">
                Keep an eye out for our messages. We could be in your area soon!
              </p>
              <Link
                href={"/"}
                className="inline-block text-sm bg-green-500 text-neutral-50 rounded-sm p-2 transition-all duration-200 hover:scale-110 hover:bg-green-600"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Join Our Waitlist 🐾</h2>
        <p className="text-neutral-600">
          We&apos;ll let you know as soon as we start serving your area!
        </p>
      </div>

      <form onSubmit={handleWaitlistSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="waitEmail">
            Email
          </label>
          <input
            id="waitEmail"
            type="email"
            placeholder="your@email.com"
            value={waitlistForm.email}
            onChange={(e) =>
              setWaitlistForm({ ...waitlistForm, email: e.target.value })
            }
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="waitSuburb">
            Suburb
          </label>
          <input
            id="waitSuburb"
            type="text"
            placeholder="Your suburb"
            value={waitlistForm.suburb}
            onChange={(e) =>
              setWaitlistForm({ ...waitlistForm, suburb: e.target.value })
            }
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="waitSuburb">
            City
          </label>
          <input
            id="waitCity"
            type="text"
            placeholder="Your City"
            value={waitlistForm.city}
            onChange={(e) =>
              setWaitlistForm({ ...waitlistForm, city: e.target.value })
            }
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-neutral-400" htmlFor="province">
            Province
          </label>
          <select
            id="province"
            value={selectedProvince}
            onChange={handleProvinceChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-500 hover:bg-green-600 transition text-white py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Adding..." : "Add Me to Waitlist"}
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedProvince("");
            setShowWaitlistModal(false);
            setWaitlistForm({
              email: "",
              suburb: "",
              province: selectedProvince,
              city: "",
            });
            setError(null);
          }}
          className="w-full bg-gray-200 hover:bg-gray-300 transition text-gray-800 py-3 rounded-md"
        >
          Back to Sign Up
        </button>
      </form>

      {error && (
        <Alert
          variant={error.startsWith("success") ? "default" : "destructive"}
        >
          <XCircleIcon className="h-5 w-5" />
          <AlertTitle>
            {error.startsWith("success") ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{error.replace("success: ", "")}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WaitlistForm;
