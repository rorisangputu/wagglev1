import Image from "next/image";
import dogHero from "../../public/dogwalko.png"; // Replace with your image
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-white py-16 px-6 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-5xl sm:text-5xl xl:text-6xl  mx-auto font-bold text-green-700 mb-4">
            Life&apos;s Busy. We&apos;ll Handle the Walks.
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            Waggle helps busy pet parents keep tails wagging.
          </p>
          <Link href="/book">
            <button className="px-6 py-3 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition">
              Book a Walk
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <Image
            src={dogHero}
            alt="Happy dog on a walk"
            className="w-full h-auto max-w-md mx-auto md:mx-0"
            priority
          />
        </div>
      </div>
    </section>
  );
}
