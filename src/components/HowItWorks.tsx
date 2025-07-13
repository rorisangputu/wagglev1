import Image from "next/image";
import workingDog from "../../public/workingDog.png";
import walker from "../../public/Dog walking-rafiki.png";
import track from "../../public/Cautious dog-bro.png";
import returnHome from "../../public/return.png";

export default function HowItWorks() {
  return (
    <section className="w-full px-7 py-20 rounded-md">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold  text-green-700 text-center mb-4">
          How Waggle Works
        </h2>
        <p className="text-center text-lg text-gray-700 mb-12  max-w-2xl mx-auto">
          We know life gets hectic — that&apos;s why we&apos;re here. Whether
          you&apos;re stuck in meetings or just overwhelmed, we&apos;ll walk
          your pup so you don&apos;t have to.
        </p>

        <div className="space-y-10 sm:space-y-5">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8 sm:py-20">
            <div className="w-full md:w-1/2">
              <Image
                src={workingDog}
                alt="Book a walk"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Step 1: Book a Walk
              </h3>
              <p className="text-gray-700 text-lg">
                Choose a time that works for you. Book a walk in seconds — right
                from your phone or laptop.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-green-50 px-10 py-10 md:py-12 rounded-xl">
            <div className="w-full md:w-1/2">
              <Image
                src={walker}
                alt="Walker arrives"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg "
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Step 2: Walker Arrives
              </h3>
              <p className="text-gray-700 text-lg">
                Your friendly Waggle walker picks up your dog from home with a
                smile (and a leash).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8 py-20">
            <div className="w-full md:w-1/2">
              <Image
                src={track}
                alt="Track the walk"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Step 3: Track the Walk
              </h3>
              <p className="text-gray-700 text-lg">
                Watch the walk live or get notified when it&apos;s done. You
                focus on life — we&apos;ve got your dog.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-green-50 px-10 py-20 rounded-xl">
            <div className="w-full md:w-1/2">
              <Image
                src={returnHome}
                alt="Dog is returned"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Step 4: Happy Return
              </h3>
              <p className="text-gray-700 text-lg">
                Your dog comes home happy, exercised, and ready for a nap —
                while you stayed productive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
