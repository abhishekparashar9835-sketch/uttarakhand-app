import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Compass,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Award,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";
import { logout } from "../../store/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.auth.userData);
  

  console.log("Redux User:", authUser);

  const activePasses = [
    {
      id: "EP-2026-8942",
      title: "Char Dham Yatra E-Pass",
      validUntil: "Oct 30, 2026",
      status: "Verified",
      destinations: "Kedarnath • Badrinath",
    },
  ];

  const recentBookings = [
    {
      id: "BK-9902",
      place: "Himalayan Retreat, Chamoli",
      date: "May 12, 2026",
      amount: "₹4,500",
      status: "Completed",
    },
    {
      id: "BK-8741",
      place: "Valley of Flowers Guide Service",
      date: "June 04, 2026",
      amount: "₹1,800",
      status: "Completed",
    },
  ];

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-12">

      <div className="w-full h-32 bg-emerald-900"></div>

      <div className="max-w-4xl mx-auto px-6 -mt-16 grid md:grid-cols-3 gap-6">

        {/* Left */}
        <div className="bg-white rounded-xl shadow-sm border p-6 text-center">

          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <User size={40} className="text-emerald-800" />
          </div>

          <h2 className="text-xl font-bold">
            {authUser?.name || "Guest User"}
          </h2>

          <p className="text-gray-500 mt-2">
            {authUser?.email || "Not Available"}
          </p>

          <div className="mt-6 space-y-3 text-left">

            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{authUser?.email || "Not Available"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{authUser?.phone || "Not Available"}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{authUser?.state || "Uttarakhand, India"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                Joined{" "}
                {authUser?.createdAt
                  ? new Date(authUser.createdAt).toLocaleDateString()
                  : "Recently"}
              </span>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Sign Out
          </button>

        </div>

        {/* Right */}
        <div className="md:col-span-2 space-y-6">

          <div className="bg-white rounded-xl p-6 shadow-sm">

            <div className="flex items-center gap-2 mb-4">
              <Compass />
              <h3 className="font-bold">Active Travel Passes</h3>
            </div>

            {activePasses.map((pass) => (
              <div
                key={pass.id}
                className="bg-emerald-900 text-white rounded-xl p-5"
              >
                <div className="flex justify-between">

                  <div>
                    <p className="text-xs">{pass.id}</p>
                    <h3 className="text-xl font-bold">{pass.title}</h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <ShieldCheck size={18} />
                    {pass.status}
                  </div>

                </div>

                <div className="flex justify-between mt-6">

                  <div>
                    <p className="text-sm opacity-70">Destinations</p>
                    <p>{pass.destinations}</p>
                  </div>

                  <div>
                    <p className="text-sm opacity-70">Valid Till</p>
                    <p>{pass.validUntil}</p>
                  </div>

                </div>

              </div>
            ))}

          </div>

          <div className="bg-white rounded-xl shadow-sm">

            <div className="p-4 border-b">
              <h3 className="font-bold">Recent Bookings</h3>
            </div>

            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex justify-between items-center p-4 border-b"
              >
                <div>

                  <h4 className="font-semibold">{booking.place}</h4>

                  <p className="text-sm text-gray-500">
                    {booking.id} • {booking.date}
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <div className="text-right">
                    <h4>{booking.amount}</h4>
                    <span className="text-green-600 text-sm">
                      {booking.status}
                    </span>
                  </div>

                  <ChevronRight size={18} />

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}