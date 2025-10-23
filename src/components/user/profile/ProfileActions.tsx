"use client";
import {
  PawPrint,
  Calendar,
  MapPin,
  Settings,
  Bell,
  Heart,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const actions = [
  {
    href: "/user/walks",
    icon: PawPrint,
    title: "My Walks",
    description: "View and manage your walks",
  },
  {
    href: "/user/bookings",
    icon: Calendar,
    title: "Bookings",
    description: "Upcoming and past bookings",
  },
  {
    href: "/user/favorite-routes",
    icon: Heart,
    title: "Favorite Routes",
    description: "Your saved walking routes",
  },
  {
    href: "/user/locations",
    icon: MapPin,
    title: "Saved Locations",
    description: "Manage your walking spots",
  },
  {
    href: "/user/notifications",
    icon: Bell,
    title: "Notifications",
    description: "Updates and reminders",
  },
  {
    href: "/user/settings",
    icon: Settings,
    title: "Settings",
    description: "Account preferences",
  },
];

const ProfileActions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>

        <div className="grid gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 group-hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileActions;
