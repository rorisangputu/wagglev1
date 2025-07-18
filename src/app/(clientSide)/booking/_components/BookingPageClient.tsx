"use client";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import walk from "../../../../../public/Dog walking-rafiki.png";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { bookingSchema } from "@/lib/validationSchemas";
import { useRouter } from "next/navigation";

const timeOptions = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
];

export default function BookingPageClient() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    dogName: string;
    address: string;
    date: Date | undefined;
    time: string;
    notes: string;
  }>({
    name: "",
    dogName: "",
    address: "",
    date: undefined,
    time: "",
    notes: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: new Date(),
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleTimeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      time: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || isNaN(formData.date.getTime())) {
      setFormErrors({ date: "Please select a valid date." });
      return;
    }

    // Convert date to ISO string for consistent validation and server payload
    const preparedData = {
      ...formData,
      date: formData.date.toISOString(),
    };
    const result = bookingSchema.safeParse(preparedData);
    if (!result.success) {
      const formattedErrors = result.error.format();
      const errors: Record<string, string> = {};

      for (const [field, value] of Object.entries(formattedErrors)) {
        if (field === "_errors") continue; // skip general errors
        if (value && "_errors" in value && value._errors.length > 0) {
          errors[field] = value._errors[0];
        }
      }

      setFormErrors(errors);
      console.log(errors);
      return;
    }
    setFormErrors({});
    const validData = result.data;
    console.log("Booking validated:", validData);

    startTransition(async () => {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        body: JSON.stringify(validData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        alert("Failed to create booking");
        return;
      }

      const { refNumber } = await res.json();

      alert("Booking submitted!");
      setFormData({
        name: "",
        dogName: "",
        address: "",
        date: new Date(),
        time: "",
        notes: "",
      });
      router.push(`/booking/${refNumber}`);
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-gray-500 font-bold text-center text-2xl">
        Book a walk
      </h1>

      <div className="flex justify-center">
        <Image
          src={walk}
          alt="Dog walking illustration"
          className="w-64 h-auto"
          priority
        />
      </div>

      <div className="space-y-5">
        <div className="flex justify-between items-end">
          <h2 className="text-green-600 text-4xl font-bold">R 250.00</h2>
          <p className="text-gray-400">per walk</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-xl text-gray-500">Details</h3>
          <p className="text-gray-700">
            Waggle offers safe, fun dog walks around your neighbourhood in
            Johannesburg, ensuring your dog gets the exercise, socialisation,
            and sniff-time they need while you take care of your day. We pick
            up, walk, and drop off your dog with care and constant supervision,
            giving you peace of mind and your dog a wagging tail. Each walk is
            around 45 minutes, tailored to your dog&apos;s pace and energy.
          </p>
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition"
          >
            Book Now
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-xl font-bold text-gray-600">Booking Form</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="dogName"
                placeholder="Dog's Name"
                value={formData.dogName}
                onChange={handleChange}
                required
              />
              {formErrors.dogName && (
                <p className="text-red-500 text-sm">{formErrors.dogName}</p>
              )}

              <Input
                type="text"
                name="address"
                placeholder="Pickup Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm">{formErrors.address}</p>
              )}

              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={handleDateChange}
                className="rounded-lg border"
              />
              {formErrors.date && (
                <p className="text-red-500 text-sm">{formErrors.date}</p>
              )}

              <Select onValueChange={handleTimeChange} value={formData.time}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Preferred Time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.time && (
                <p className="text-red-500 text-sm">{formErrors.time}</p>
              )}

              <Textarea
                name="notes"
                placeholder="Additional Notes (optional)"
                value={formData.notes}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={isPending}
                className={`${
                  isPending ? "bg-gray-700" : "bg-green-600 hover:bg-green-700"
                }  text-white px-4 py-2 rounded-lg w-full transition`}
              >
                {isPending ? "Pending.." : "Confirm Booking"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
