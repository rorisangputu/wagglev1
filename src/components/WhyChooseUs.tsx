import Image from "next/image";
import pitbull from "../../public/Dog walking-bro.png";
import {
  CheckCircle,
  MapPin,
  Camera,
  Clock,
  Shield,
  Smile,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Vetted Walkers",
      description:
        "Every walker is background-checked, trained, and dog-approved.",
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description:
        "Track your dog's journey live with GPS updates and notifications.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book walks on your schedule, even last minute.",
    },
    {
      icon: Camera,
      title: "Daily Pup-dates",
      description:
        "Get adorable photo and walk summaries right after each stroll.",
    },
    {
      icon: Smile,
      title: "Affordable Rates",
      description: "Transparent pricing that works for your budget.",
    },
    {
      icon: CheckCircle,
      title: "Rain or Shine",
      description: "Come sunshine or drizzle — we'll still be there.",
    },
  ];

  return (
    <section className="px-6 py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              Waggle?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We&apos;re not just dog walkers. We&apos;re peace of mind, delivered
            daily.
          </p>
        </div>

        {/* Features Grid with Center Image */}
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Features */}
          <div className="space-y-4">
            {features.slice(0, 3).map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:border-green-200 border border-transparent transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
                        <Icon className="w-6 h-6 text-green-600 group-hover:text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Image */}
          <div className="flex justify-center lg:col-span-1">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-emerald-200 rounded-3xl blur-xl opacity-30" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={pitbull}
                  alt="Happy dog on a walk"
                  width={420}
                  height={420}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-4">
            {features.slice(3, 6).map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:border-green-200 border border-transparent transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
                        <Icon className="w-6 h-6 text-green-600 group-hover:text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Experience Waggle Today
          </button>
        </div>
      </div>
    </section>
  );
}
