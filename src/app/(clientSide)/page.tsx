import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <FAQ />
    </div>
  );
}
