"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircleIcon } from "lucide-react";
import { isSuburbServiced, getServicedSuburbs } from "@/lib/serviceSuburbs";
import WaitlistForm from "./_components/WaitlistForm";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [suburbError, setSuburbError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedSuburb, setSelectedSuburb] = useState("");
  const [showWaitlistModal, setShowWaitlistModal] = useState<boolean>(false);

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

  const servicedSuburbs = getServicedSuburbs(selectedProvince);

  const handleSuburbChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const suburb = e.target.value;
    setSelectedSuburb(suburb);

    if (suburb && !isSuburbServiced(selectedProvince, suburb)) {
      setSuburbError("Sorry, we don't service that suburb yet");
    } else {
      setSuburbError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (suburbError) {
      setError("Please select a serviced suburb");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const province = selectedProvince;
    const suburb = selectedSuburb;
    const email = formData.get("email") as string;

    const data = {
      name: formData.get("name"),
      email: email,
      phone: formData.get("phone"),
      streetAddress: formData.get("streetAddress"),
      suburb: suburb,
      province: province,
      city: formData.get("city"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/sign-up", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          router.push("/booking");
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Something went wrong");
        }
      } catch {
        setError("Failed to sign up. Please try again.");
      }
    });
  };

  if (showWaitlistModal) {
    return <WaitlistForm setShowWaitlistModal={setShowWaitlistModal} />;
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-center">Create Your Account</h1>

      {error && (
        <Alert variant="destructive">
          <XCircleIcon className="h-5 w-5" />
          <AlertTitle>Sign Up Failed</AlertTitle>
          <AlertDescription>
            {Array.isArray(error) ? (
              error.map((e, idx) => (
                <div key={idx} className="text-red-500 text-sm">
                  {e.message}
                </div>
              ))
            ) : (
              <p>{error.toString()}</p>
            )}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone Number"
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label className="font-semibold">Address</label>

          <div className="flex flex-col space-y-1">
            <label className="text-sm text-neutral-400" htmlFor="streetAddress">
              Street Address
            </label>
            <input
              id="streetAddress"
              type="text"
              name="streetAddress"
              placeholder="e.g, 123 South Africa Rd"
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
              onChange={(e) => setSelectedProvince(e.target.value)}
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

          <div className="flex flex-col space-y-1">
            <label className="text-sm text-neutral-400" htmlFor="suburb">
              Suburb
            </label>
            {selectedProvince ? (
              <select
                id="suburb"
                name="suburb"
                value={selectedSuburb}
                onChange={handleSuburbChange}
                required
                className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 ${
                  suburbError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-500"
                }`}
              >
                <option value="">Select a suburb</option>
                {servicedSuburbs.map((suburb) => (
                  <option key={suburb} value={suburb}>
                    {suburb}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="suburb"
                type="text"
                name="suburb"
                placeholder="Select a province first"
                disabled
                className="w-full p-3 rounded-md border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            )}
            {suburbError && (
              <div className="text-red-500 text-sm">{suburbError}</div>
            )}
            <button
              type="button"
              onClick={() => setShowWaitlistModal(true)}
              className="text-blue-600 hover:underline text-sm mt-2"
            >
              Can&apos;t find your suburb? Add to waitlist
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm text-neutral-400" htmlFor="city">
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              placeholder="e.g, Johannesburg"
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <hr />

        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black transition text-white py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900"
        >
          {isPending ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
