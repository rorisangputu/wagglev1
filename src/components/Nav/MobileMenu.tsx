"use client";

import { useState } from "react";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";

type NavUser = {
  name: string;
  email: string;
  id: string;
  role?: string;
};

type MobileMenuProps = {
  user: NavUser | undefined;
  onSignOut: () => Promise<void>;
};

export default function MobileMenu({ user, onSignOut }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <button onClick={toggleMenu} className="lg:hidden">
        {menuOpen ? (
          <X className="text-black w-6 h-6" />
        ) : (
          <AlignJustify className="text-black w-6 h-6" />
        )}
      </button>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile sidebar menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-2/3 h-screen bg-white shadow-lg p-6 z-50 flex flex-col space-y-4 lg:hidden overflow-y-auto">
          <button onClick={closeMenu} className="self-end">
            <X className="text-black w-6 h-6" />
          </button>

          <h1 className="text-green-600 text-3xl font-bold mb-4">Waggle</h1>

          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-lg hover:text-green-600 transition"
            >
              Home
            </Link>
            <Link
              href="/book"
              onClick={closeMenu}
              className="text-lg hover:text-green-600 transition"
            >
              Book A Walk
            </Link>
            {user && (
              <Link
                href="/walks"
                onClick={closeMenu}
                className="text-lg hover:text-green-600 transition"
              >
                My Walks
              </Link>
            )}
            <Link
              href="/contact-us"
              onClick={closeMenu}
              className="text-lg hover:text-green-600 transition"
            >
              Contact Us
            </Link>

            <hr className="my-2" />

            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={closeMenu}
                  className="text-lg hover:text-green-600 transition"
                >
                  Account
                </Link>
                <form action={onSignOut}>
                  <button
                    type="submit"
                    onClick={closeMenu}
                    className="text-left text-lg text-red-500 hover:underline w-full"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/user/login"
                  onClick={closeMenu}
                  className="text-lg hover:text-green-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/user/sign-up"
                  onClick={closeMenu}
                  className="text-lg hover:text-green-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
