import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import MobileMenu from "./Nav/MobileMenu";

type NavUser = {
  name: string;
  email: string;
  id: string;
  role?: string;
};

export default async function NavBar() {
  const session = await auth();
  const user = session?.user as NavUser | undefined;

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <nav className="w-full border-b bg-white">
      <div className="w-[90%] xl:w-[80%] mx-auto py-4">
        {/* Top row - Contact and Auth links */}
        <div className="hidden lg:flex justify-end space-x-5 text-sm mb-4">
          <Link href="/contact-us" className="hover:underline">
            Contact Us
          </Link>
          {user ? (
            <form action={handleSignOut} className="inline">
              <button type="submit" className="text-blue-500 hover:underline">
                Logout
              </button>
            </form>
          ) : (
            <>
              <Link href="/user/login" className="hover:underline">
                Login
              </Link>
              <Link href="/user/sign-up" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Main nav row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-green-600 text-3xl lg:text-4xl font-bold">
              The Waggle Club
            </h1>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="hover:text-green-600 transition">
              Home
            </Link>
            <Link href="/booking" className="hover:text-green-600 transition">
              Book A Walk
            </Link>
            {user && (
              <Link href="/walks" className="hover:text-green-600 transition">
                My Walks
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <MobileMenu user={user} onSignOut={handleSignOut} />
        </div>
      </div>
    </nav>
  );
}
