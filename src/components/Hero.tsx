import Image from "next/image";
import dogHero from "../../public/dogwalko.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20 px-6 overflow-hidden">
      <div className=" mx-auto">
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <p className="text-green-600 font-semibold text-sm tracking-wide uppercase">
                Dog Walking Made Simple
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                Life&apos;s Busy.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  We Handle the Walks.
                </span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Give your furry friend the exercise and care they deserve, while
              you focus on what matters most.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/booking" className="group">
                <button className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Book a Walk
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Happy Dogs Walked</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9★</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Booking Available</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative h-96 md:h-full min-h-96">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <Image
                src={dogHero}
                alt="Happy dog on a walk"
                className="w-full h-full object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
