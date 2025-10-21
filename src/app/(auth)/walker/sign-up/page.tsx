"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircleIcon } from "lucide-react";

export default function WalkerSignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [idCopyFile, setIdCopyFile] = useState<File | null>(null);
  const [walkerImageFile, setWalkerImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      idNumber: formData.get("idNumber"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate ID copy file
    if (!idCopyFile) {
      setError("Please upload a copy of your ID");
      return;
    }

    startTransition(async () => {
      try {
        // Create FormData for file uploads
        const uploadData = new FormData();

        // Add all text fields
        Object.entries(data).forEach(([key, value]) => {
          if (
            value !== null &&
            value !== undefined &&
            key !== "confirmPassword"
          ) {
            uploadData.append(key, value.toString());
          }
        });

        // Add ID copy file (required)
        uploadData.append("idCopy", idCopyFile);

        // Add walker image file (optional)
        if (walkerImageFile) {
          uploadData.append("walkerImage", walkerImageFile);
        }

        const res = await fetch("/api/auth/walker-sign-up", {
          method: "POST",
          body: uploadData,
        });

        if (res.ok) {
          // Redirect to pending approval page
          router.push("/walker/pending-approval");
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Something went wrong");
        }
      } catch {
        setError("Failed to sign up. Please try again.");
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white rounded-2xl shadow space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Become a Walker</h1>
        <p className="text-sm text-gray-600">
          Join our team of professional dog walkers
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <XCircleIcon className="h-5 w-5" />
          <AlertTitle>Sign Up Failed</AlertTitle>
          <AlertDescription>
            <p>{error.toString()}</p>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="name">
                First Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="First Name"
                required
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="lastname">
                Last Name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Last Name"
                required
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
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
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="address">
              Full Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Street Address, Suburb, City"
              rows={3}
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Identification */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Identification
          </h2>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="idNumber">
              ID Number
            </label>
            <input
              id="idNumber"
              name="idNumber"
              type="text"
              placeholder="SA ID Number"
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="idCopy">
              ID Copy <span className="text-red-500">*</span>
            </label>
            <input
              id="idCopy"
              name="idCopy"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setIdCopyFile(e.target.files?.[0] || null)}
              required
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-sm text-gray-500">
              Upload a clear copy of your ID (PDF or image)
            </p>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Profile Photo</h2>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="walkerImage">
              Profile Photo <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              id="walkerImage"
              name="walkerImage"
              type="file"
              accept="image/*"
              onChange={(e) => setWalkerImageFile(e.target.files?.[0] || null)}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-sm text-gray-500">
              Upload a professional photo of yourself
            </p>
          </div>
        </div>

        {/* Password */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Create Password
          </h2>

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
              minLength={8}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="font-semibold" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              minLength={8}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">
            Application Process
          </h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Your application will be reviewed by our team</li>
            <li>
              We&apos;ll verify your identity and conduct background checks
            </li>
            <li>
              You&apos;ll receive an email once your application is approved
            </li>
            <li>Approval typically takes 2-3 business days</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black transition text-white py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900"
        >
          {isPending ? "Submitting Application..." : "Submit Application"}
        </button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/walker/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
