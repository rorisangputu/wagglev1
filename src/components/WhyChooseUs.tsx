// components/WhyChooseUs.tsx
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import pitbull from "../../public/pitbull.png";

export default function WhyChooseUs() {
  return (
    <section className="px-6 py-20 bg-white text-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-700">
        Why Choose Waggle?
      </h2>

      <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
        {/* Left Text Cards */}
        <div className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-600">
                Vetted Walkers
              </h3>
              <p className="text-sm text-gray-600">
                Every walker is background-checked, trained, and dog-approved.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-600">
                Real-Time Tracking
              </h3>
              <p className="text-sm text-gray-600">
                Track your dog’s journey live with GPS updates and
                notifications.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-600">
                Flexible Scheduling
              </h3>
              <p className="text-sm text-gray-600">
                Book walks on your schedule, even last minute.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Center Image */}
        <div className="flex justify-center">
          <Image
            src={pitbull}
            alt="Happy dog"
            width={420}
            height={420}
            className=" w-full h-auto max-w-sm"
          />
        </div>

        {/* Right Text Cards */}
        <div className="space-y-4">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-600">
                Daily Pup-dates
              </h3>
              <p className="text-sm text-gray-600">
                Get adorable photo and walk summaries right after each stroll.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-600">
                Affordable Rates
              </h3>
              <p className="text-sm text-gray-600">
                Transparent pricing that works for your budget.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-green-600">
                Rain or Shine
              </h3>
              <p className="text-sm text-gray-600">
                Come sunshine or drizzle — we’ll still be there.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
