"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Clock, Users, Package } from "lucide-react";

export default function ServicesCarousel() {
  const services = [
    {
      id: 1,
      name: "Quick Walk",
      duration: "30 minutes",
      price: "R150",
      description: "Perfect for a quick bathroom break and some fresh air.",
      icon: Clock,
    },
    {
      id: 2,
      name: "Standard Walk",
      duration: "1 hour",
      price: "R250",
      description: "Our most popular option. Full exercise and playtime.",
      icon: Clock,
    },
    {
      id: 3,
      name: "Extended Walk",
      duration: "1.5 hours",
      price: "R350",
      description: "For high-energy pups who need more playtime.",
      icon: Clock,
    },
    {
      id: 4,
      name: "Group Walk",
      duration: "1 hour",
      price: "R180",
      description: "Your pup gets to socialize with other friendly dogs.",
      icon: Users,
    },
    {
      id: 5,
      name: "Package Deal",
      duration: "Flexible",
      price: "R500+",
      description: "3+ walks per week. Save up to 15%.",
      icon: Package,
    },
  ];

  return (
    <section className="w-full px-6 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect walk for your pup&apos;s needs and budget.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <CarouselItem
                  key={service.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-green-300 transition-colors h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <Icon className="w-8 h-8 text-green-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {service.duration}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-8">{service.description}</p>

                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold text-green-600">
                        {service.price}
                      </span>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Book
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="absolute -left-12 top-1/2" />
          <CarouselNext className="absolute -right-12 top-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
