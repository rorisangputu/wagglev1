"use client";
import React, { useState } from "react";
import { HeadLink, Nav, NavLink } from "./Nav";
import { AlignJustify, X } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Nav>
      {/* Top right links */}
      <div className="flex justify-end space-x-5">
        <HeadLink href={"/sign-up"}>Contact Us</HeadLink>
        <HeadLink href={"/sign-up"}>Login</HeadLink>
      </div>

      {/* Main nav row */}
      <div className="flex justify-between items-center">
        <h1 className="text-green-600 text-4xl font-bold">Waggle</h1>

        {/* Desktop menu */}
        <div className="hidden lg:flex space-x-2">
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/book"}>Book A Walk</NavLink>
          <NavLink href={"/walks"}>My Walks</NavLink>
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

      {/* Mobile sidebar menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-2/3 h-screen bg-white shadow-md p-6 z-50 flex flex-col space-y-4 lg:hidden">
          <div>
            <h1 className="text-green-600 text-4xl py-6 font-bold">Waggle</h1>
          </div>
          <div className="flex flex-col space-y-3 lg:hidden">
            <NavLink href={"/"} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink href={"/book"} onClick={toggleMenu}>
              Book A Walk
            </NavLink>
            <NavLink href={"/walks"} onClick={toggleMenu}>
              My Walks
            </NavLink>
            <NavLink href={"/contact-us"} onClick={toggleMenu}>
              Contact Us
            </NavLink>
            <NavLink href={"/sign-in"} onClick={toggleMenu}>
              Login
            </NavLink>
            <NavLink href={"/sign-up"} onClick={toggleMenu}>
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </Nav>
  );
};

export default NavBar;
