"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo,
      });

      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 space-y-6">
        <h1 className="text-green-600 text-4xl font-bold text-center">
          Waggle.
        </h1>
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Continue with email
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full flex flex-col"
        >
          <input
            className="bg-slate-100 py-3 px-3 rounded-lg focus:outline-none"
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
          />
          <input
            className="bg-slate-100 py-3 px-3 rounded-lg focus:outline-none"
            name="password"
            placeholder="Password"
            type="password"
            required
            autoComplete="current-password"
          />
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <button
            className="w-full bg-black text-white py-3 rounded-xl"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-500" href={"/sign-up"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
