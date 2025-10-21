"use client";

import React, { useState } from "react";
import { HeadLink, Nav, NavLink } from "./Nav";
import { AlignJustify, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Nav>
      {/* Top right links */}
      <div className="flex justify-end space-x-5">
        <HeadLink href={"/contact-us"}>Contact Us</HeadLink>

        {status === "loading" ? null : session ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-blue-500 hover:underline"
          >
            Logout
          </button>
        ) : (
          <>
            <HeadLink href={"/user/login"}>Login</HeadLink>
            <HeadLink href={"/user/sign-up"}>Sign Up</HeadLink>
          </>
        )}
      </div>

      {/* Main nav row */}
      <div className="flex justify-between items-center">
        <h1 className="text-green-600 text-4xl font-bold">The Waggle Club</h1>

        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-2">
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/book"}>Book A Walk</NavLink>
          {session && <NavLink href={"/walks"}>My Walks</NavLink>}
        </div>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="lg:hidden">
          {menuOpen ? (
            <X className="text-black" />
          ) : (
            <AlignJustify className="text-black" />
          )}
        </button>
      </div>

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
            <X className="text-black" />
          </button>
          <h1 className="text-green-600 text-3xl font-bold">Waggle</h1>

          <div className="flex flex-col space-y-3">
            <NavLink href={"/"} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink href={"/book"} onClick={closeMenu}>
              Book A Walk
            </NavLink>
            {session && (
              <NavLink href={"/walks"} onClick={closeMenu}>
                My Walks
              </NavLink>
            )}
            <NavLink href={"/contact-us"} onClick={closeMenu}>
              Contact Us
            </NavLink>

            {status === "loading" ? null : session ? (
              <>
                <NavLink href={"/account"} onClick={closeMenu}>
                  Account
                </NavLink>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    closeMenu();
                  }}
                  className="text-left text-sm text-blue-500 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink href={"/user/login"} onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink href={"/user/sign-up"} onClick={closeMenu}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </Nav>
  );
};

export default NavBar;
