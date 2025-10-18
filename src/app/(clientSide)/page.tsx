import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ServicesCarousel from "@/components/ServiceCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ServicesCarousel />
      <HowItWorks />
      <WhyChooseUs />
      <FAQ />
    </div>
  );
}
