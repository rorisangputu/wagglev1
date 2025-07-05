import { Instagram } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaTiktok } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-800 px-6 py-10 mt-16 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & tagline */}
        <div>
          <h2 className="text-2xl font-bold text-green-700">Waggle</h2>
          <p className="mt-2 text-sm text-gray-200">
            Trusted, loving dog walkers — just a tap away.
          </p>
        </div>

        {/* Navigation */}
        <div className="text-gray-200">
          <h3 className="font-semibold text-lg mb-2">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/how-it-works">How it Works</Link>
            </li>
            <li>
              <Link href="/why-choose-us">Why Choose Us</Link>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="text-gray-200">
          <h3 className="font-semibold text-lg mb-2">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/cookies">Cookie Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Location */}
        <div className="text-gray-200">
          <h3 className="font-semibold text-lg mb-2">Contact</h3>
          <p className="text-sm">Operating in Johannesburg</p>
          <p className="text-sm mt-1">Email: hello@waggle.co.za</p>
          <div className="flex gap-3 mt-3 items-center">
            {/* You can use lucide-react icons if needed */}
            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="#" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="#" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="Twitter">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} Waggle. All rights reserved.
      </div>
    </footer>
  );
}
