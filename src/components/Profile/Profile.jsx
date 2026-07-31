import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Compass, ShieldCheck, LogOut, ChevronRight, Award } from 'lucide-react';

export default function Profile() {
  // Mock active user profile data aligned with your Appwrite/auth context logic
  const [user, setUser] = useState({
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 98765 43210",
    state: "Uttarakhand, India",
    memberSince: "April 2025"
  });

  const activePasses = [
    {
      id: "EP-2026-8942",
      title: "Char Dham Yatra E-Pass",
      validUntil: "Oct 30, 2026",
      status: "Verified",
      destinations: "Kedarnath • Badrinath"
    }
  ];

  const recentBookings = [
    { id: "BK-9902", place: "Himalayan Retreat, Chamoli", date: "May 12, 2026", amount: "₹4,500", status: "Completed" },
    { id: "BK-8741", place: "Valley of Flowers Guide Service", date: "June 04, 2026", amount: "₹1,800", status: "Completed" }
  ];

  const handleLogout = () => {
    console.log("Logging out via authSlice action...");
    // You will dispatch your logout action here later
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen font-sans pb-12">
      
      {/* Banner Background */}
      <div className="w-full h-32 bg-emerald-900"></div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto px-6 -mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: User Profile Card */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm text-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-800 rounded-full mx-auto flex items-center justify-center border-2 border-white shadow-md mb-3">
            <User className="w-10 h-10" />
          </div>
          <h2 className="text-sm font-bold text-gray-800">{user.name}</h2>
          <div className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 mt-1">
            Verified Explorer
          </div>

          <hr className="my-4 border-gray-100" />

          {/* Contact details list */}
          <div className="space-y-3 text-left text-[11px] text-gray-600 font-medium">
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{user.state}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-gray-400 font-normal">Joined {user.memberSince}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full mt-6 flex items-center justify-center space-x-1.5 border border-red-200 hover:bg-red-50 text-red-600 transition text-xs font-bold py-2 rounded-md"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Right Columns: Dashboard Data */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Active Travel E-Passes */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center space-x-1.5 mb-4">
              <Compass className="w-4 h-4 text-emerald-800" />
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Active Travel Passes</h3>
            </div>

            {activePasses.map((pass) => (
              <div key={pass.id} className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-xl p-4 relative overflow-hidden shadow-sm">
                {/* Visual Accent Badge */}
                <div className="absolute right-[-10px] bottom-[-10px] text-emerald-800/20 pointer-events-none">
                  <Award className="w-32 h-32" />
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-bold">{pass.id}</span>
                    <h4 className="text-sm font-bold tracking-wide">{pass.title}</h4>
                  </div>
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[9px] font-bold bg-white/20 border border-white/20 text-white">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    <span>{pass.status}</span>
                  </span>
                </div>
                
                <div className="mt-4 pt-3 border-t border-emerald-800 flex justify-between items-end text-[10px]">
                  <div>
                    <span className="block text-emerald-400 text-[9px]">Route Scope</span>
                    <span className="font-semibold">{pass.destinations}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-emerald-400 text-[9px]">Valid Until</span>
                    <span className="font-semibold">{pass.validUntil}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent History / Bookings */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Recent Bookings</h3>
            </div>

            <div className="divide-y divide-gray-50 text-[11px] font-medium text-gray-700">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 flex justify-between items-center hover:bg-slate-50/50 transition group cursor-pointer">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-gray-800 group-hover:text-emerald-800 transition">{booking.place}</h4>
                    <p className="text-[10px] text-gray-400 font-normal">ID: {booking.id} • Date: {booking.date}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-right">
                    <div>
                      <span className="block font-bold text-gray-900">{booking.amount}</span>
                      <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-100">{booking.status}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-800 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}