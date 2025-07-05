// app/booking/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user location
  useEffect(() => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            // Reverse geocoding (you'd replace this with your preferred API)
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${longitude}+${latitude}&key=f9189ea13a5140b889cfedebd9be237c`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              setLocation(data.results[0].formatted);
            } else {
              setLocation("Location not found");
            }
          } catch (error) {
            console.log(error);
            toast("Failed to fetch location details");
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.log(error);
          setIsLoadingLocation(false);
          toast("Please enable location services or enter address manually");
        }
      );
    } else {
      setIsLoadingLocation(false);
      toast("Geolocation is not supported by your browser");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you'd add your booking submission logic
    try {
      // Example API call
      // await fetch('/api/bookings', {
      //   method: 'POST',
      //   body: JSON.stringify({ date, time, duration, dogName, location }),
      // })

      toast(
        `Walk scheduled for ${dogName} on ${date?.toDateString()} at ${time}`
      );

      // Reset form
      setDogName("");
      setTime("");
      setDuration("");
      setDate(new Date());
    } catch (error) {
      console.log(error);
      toast("Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Book a Dog Walk</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dogName">Dog&apos;s Name</Label>
              <Input
                id="dogName"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="Enter your dog's name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter address or use current location"
                  required
                />
                {isLoadingLocation && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}
                {!isLoadingLocation && <MapPin className="h-5 w-5" />}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select value={time} onValueChange={setTime} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "08:00 AM",
                    "10:00 AM",
                    "12:00 PM",
                    "02:00 PM",
                    "04:00 PM",
                    "06:00 PM",
                  ].map((timeSlot) => (
                    <SelectItem key={timeSlot} value={timeSlot}>
                      {timeSlot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                "Book Walk"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
