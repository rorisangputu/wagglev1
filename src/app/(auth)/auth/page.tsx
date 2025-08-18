"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let message = "An error occurred. Please try again.";

  if (error === "UserNotFound") {
    message = "User not found. Please sign up first.";
  } else if (error === "CredentialsSignin") {
    message = "Invalid email or password.";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold text-red-600">Sign In Error</h1>
      <p className="mt-2">{message}</p>

      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
