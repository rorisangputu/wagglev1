import Image from "next/image";
import workingDog from "../../public/workingDog.png";
import walker from "../../public/Dog walking-rafiki.png";
import track from "../../public/Cautious dog-bro.png";
import returnHome from "../../public/return.png";
import { Check } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Book a Walk",
      description:
        "Choose a time that works for you. Book a walk in seconds — right from your phone or laptop.",
      image: workingDog,
      reverse: false,
    },
    {
      number: 2,
      title: "Walker Arrives",
      description:
        "Your friendly Waggle walker picks up your dog from home with a smile (and a leash).",
      image: walker,
      reverse: true,
    },
    {
      number: 3,
      title: "Track the Walk",
      description:
        "Watch the walk live or get notified when it's done. You focus on life — we've got your dog.",
      image: track,
      reverse: false,
    },
    {
      number: 4,
      title: "Happy Return",
      description:
        "Your dog comes home happy, exercised, and ready for a nap — while you stayed productive.",
      image: returnHome,
      reverse: true,
    },
  ];

  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            How{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              Waggle
            </span>{" "}
            Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We know life gets hectic — that&apos;s why we&apos;re here. Whether
            you&apos;re stuck in meetings or just overwhelmed, we&apos;ll walk
            your pup so you don&apos;t have to.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Vertical connector line (hidden on mobile) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-emerald-500 transform -translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col ${
                  step.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-8 lg:gap-12`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={500}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-start gap-4">
                    {/* Step number circle */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-2 text-green-600 font-medium">
                        <Check className="w-5 h-5" />
                        <span>Simple & Secure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-6">
              Your dog deserves a walk. Book one today.
            </p>
            <button className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Your First Walk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
