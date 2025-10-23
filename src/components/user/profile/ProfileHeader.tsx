"use client";
import React from "react";
import { Mail, Phone, MapPin, Edit, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { headerUser } from "@/lib/types/UserTypes";

type HeaderProps = {
  user: headerUser;
};

const ProfileHeader = ({ user }: HeaderProps) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/${user.id}/profile/edit`);
  };

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-2xl shadow-lg overflow-hidden mb-8">
      {/* Decorative Blurs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl" />

      <div className="relative z-10 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* User Info */}
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <User className="w-12 h-12" strokeWidth={2} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center border-4 border-white">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-3">
                {user.name}
              </h1>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">{user.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">
                    {user.suburb}, {user.city}, {user.province}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={handleEditClick}
            className="group self-start md:self-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Edit Profile
          </button>
        </div>

        {/* Address Bar */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-2">
            Service Address
          </p>
          <p className="text-gray-700 font-medium">
            {user.streetAddress}, {user.suburb}, {user.city}, {user.province}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
