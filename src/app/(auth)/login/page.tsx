"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useTransition } from "react";

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
    <div className="w-full h-[50%] p-16 flex justify-center items-center max-w-sm mx-auto space-y-6">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <div className="w-full flex items-center justify-center gap-5">
            <input
              className="bg-slate-100 py-2 px-2 rounded-lg focus:outline-0"
              name="email"
              placeholder="Email"
              type="email"
              required
              autoComplete="email"
            />
            <input
              className="bg-slate-100 py-2 px-2 rounded-lg focus:outline-0"
              name="password"
              placeholder="Password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
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
