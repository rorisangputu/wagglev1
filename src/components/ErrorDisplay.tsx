import React from "react";
import Link from "next/link";
import { AlertCircle, Home, LogIn } from "lucide-react";

type ErrorDisplayProps = {
  title?: string;
  message?: string;
  showHomeLink?: boolean;
  showSignInLink?: boolean;
  homeUrl?: string;
  signInUrl?: string;
};

export default function ErrorDisplay({
  title = "Error",
  message = "Something went wrong. Please try again.",
  showHomeLink = true,
  showSignInLink = true,
  homeUrl = "/",
  signInUrl = "/sign-in",
}: ErrorDisplayProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">{message}</p>

          {/* Action Links */}
          <div className="flex flex-col sm:items-center sm:justify-center sm:flex-row gap-3 w-full">
            {showHomeLink && (
              <Link
                href={homeUrl}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            )}

            {showSignInLink && (
              <Link
                href={signInUrl}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
