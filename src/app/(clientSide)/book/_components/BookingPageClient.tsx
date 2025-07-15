"use client";
import React, { useEffect, useState } from "react";
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
    console.log(formData);
    alert("Booking submitted!");
    // Later: send `formData` to your API route
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
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="dogName"
                placeholder="Dog's Name"
                value={formData.dogName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="address"
                placeholder="Pickup Address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={handleDateChange}
                className="rounded-lg border"
              />

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

              <Textarea
                name="notes"
                placeholder="Additional Notes (optional)"
                value={formData.notes}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
