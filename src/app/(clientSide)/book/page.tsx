import Image from "next/image";
import walk from "../../../../public/Dog walking-rafiki.png";
export default function BookingPage() {
  return (
    <div>
      <h1 className="text-gray-500 font-bold text-center">Book a walk</h1>
      <div className="">
        <Image src={walk} alt="image" />
      </div>
      <div>
        <div className="flex justify-between items-end">
          <h2 className="text-green-600 text-4xl font-bold">R 250.00</h2>
          <p className="text-gray-400">p/walk</p>
        </div>
      </div>
    </div>
  );
}
