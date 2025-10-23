import { signOut } from "@/lib/auth";
import Link from "next/link";
import MobileMenu from "./Nav/MobileMenu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { getCurrentUser } from "@/lib/actions";

type NavUser = {
  name: string;
  email: string;
  id: string;
  role?: string;
};

export default async function NavBar() {
  const user = (await getCurrentUser()) as NavUser;

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <nav className="w-full border-b bg-white">
      <div className="w-[90%] xl:w-[70%] mx-auto py-5">
        {/* Top row - Contact and Auth links */}
        {!user && (
          <div className="hidden lg:flex justify-end space-x-5 text-sm mb-4">
            <Link href="/user/login" className="hover:underline">
              Login
            </Link>
            <Link href="/user/sign-up" className="hover:underline">
              Sign Up
            </Link>
          </div>
        )}

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
              <Link
                href={`/user/profile`}
                className="hover:text-green-600 transition"
              >
                <Avatar className="rounded-lg bg-neutral-100 hover:bg-neutral-200 p-2">
                  <AvatarImage
                    src="https://res.cloudinary.com/dxsmixio5/image/upload/v1761158726/icons8-user-50_wlpsdf.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
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
