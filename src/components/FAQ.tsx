// components/FAQ.tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="px-6 py-20 bg-green-50 text-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">
        Frequently Asked Questions 🐾
      </h2>

      <div className="max-w-3xl mx-auto">
        <Accordion type="multiple" className="space-y-4">
          <AccordionItem value="q1">
            <AccordionTrigger>How do I book a dog walk?</AccordionTrigger>
            <AccordionContent>
              Just tap “Book a Walk”, choose a time that works for you, and
              we’ll handle the rest!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger>
              Can I meet the walker beforehand?
            </AccordionTrigger>
            <AccordionContent>
              Yes! You can schedule a free meet-and-greet to get to know your
              walker before the first stroll.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger>What if it’s raining?</AccordionTrigger>
            <AccordionContent>
              We walk rain or shine — unless conditions are unsafe. Safety is
              our top priority.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger>How do I track the walk?</AccordionTrigger>
            <AccordionContent>
              You’ll receive real-time GPS tracking and a report with cute pics
              once the walk is done!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q5">
            <AccordionTrigger>Is Waggle available in my area?</AccordionTrigger>
            <AccordionContent>
              We’re expanding quickly! Enter your zip code or suburb during
              sign-up to check availability.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
