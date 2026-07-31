import React from 'react';
import { Users, Building2, Compass, TrendingUp, Landmark, Download } from 'lucide-react';

export default function GovDashBoard() {
  // Mock Data from dashboard metrics
  const stats = [
    {
      title: "Total Visitors (2026)",
      value: "34,82,491",
      change: "+12.4% from last year",
      icon: <Users className="w-4 h-4 text-blue-600" />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Registered Hotels",
      value: "4,218",
      change: "+4.1% from last year",
      icon: <Building2 className="w-4 h-4 text-emerald-600" />,
      bgColor: "bg-emerald-50"
    },
    {
      title: "Active Tour Packages",
      value: "1,847",
      change: "+22.3% from last year",
      icon: <Compass className="w-4 h-4 text-orange-600" />,
      bgColor: "bg-orange-50"
    },
    {
      title: "Tourism Revenue (₹ Cr)",
      value: "12,450",
      change: "+18.7% from last year",
      icon: <TrendingUp className="w-4 h-4 text-purple-600" />,
      bgColor: "bg-purple-50"
    }
  ];

  const districtData = [
    { district: "Chamoli", type: "Char Dham + Nature", visitors: "8,20,000", hotels: 412, status: "Active" },
    { district: "Uttarkashi", type: "Gangotri + Yamunotri", visitors: "7,50,000", hotels: 356, status: "Active" },
    { district: "Rudraprayag", type: "Kedarnath Yatra", visitors: "9,10,000", hotels: 488, status: "Active" },
    { district: "Haridwar", type: "Religious", visitors: "14,20,000", hotels: 689, status: "Active" },
    { district: "Nainital", type: "Hill Station", visitors: "11,80,000", hotels: 742, status: "Active" },
    { district: "Dehradun", type: "Capital + Base", visitors: "6,80,000", hotels: 531, status: "Active" }
  ];

  // Dummy monthly dataset for manual bar chart representation
  const months = [
    { label: "Jan", height: "h-8" }, { label: "Feb", height: "h-12" }, { label: "Mar", height: "h-16" },
    { label: "Apr", height: "h-24" }, { label: "May", height: "h-32" }, { label: "Jun", height: "h-40" },
    { label: "Jul", height: "h-36" }, { label: "Aug", height: "h-28" }, { label: "Sep", height: "h-20" },
    { label: "Oct", height: "h-24" }, { label: "Nov", height: "h-16" }, { label: "Dec", height: "h-10" }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen font-sans pb-12">
      
      {/* --- DASHBOARD HEADER BANNER --- */}
      <div className="w-full bg-emerald-900 text-white px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-1.5 text-emerald-400 text-[10px] uppercase tracking-wider font-bold mb-1">
            <Landmark className="w-3 h-3" />
            <span>Government of Uttarakhand</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">Tourism Dashboard</h1>
          <p className="text-[10px] text-emerald-200/70 mt-0.5">Real-time tourism statistics FY 2026-27</p>
        </div>
        
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 bg-emerald-950/40 border border-emerald-800 px-2.5 py-1.5 rounded-md">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-emerald-300 font-medium text-[11px]">Live Data</span>
          </div>
          <button className="flex items-center space-x-1 bg-emerald-700 hover:bg-emerald-600 text-white font-medium px-3 py-1.5 rounded-md transition text-[11px]">
            <Download className="w-3 h-3" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto px-6 mt-8 space-y-6">
        
        {/* --- STATS GRID OVERVIEW --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((card, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                  {card.title}
                </span>
                <div className={`${card.bgColor} p-1.5 rounded-lg`}>
                  {card.icon}
                </div>
              </div>
              <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">{card.value}</h3>
              <p className="text-[10px] text-emerald-700 font-semibold">{card.change}</p>
            </div>
          ))}
        </div>

        {/* --- ANALYTICS CHARTS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Monthly Visitor Flow Chart Box */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-800">Monthly Visitor Flow</h4>
              <span className="text-[9px] text-gray-400">Visitors in Lakhs — 2026</span>
            </div>
            
            {/* Simple Visual Pure Tailwind Bar Chart */}
            <div className="h-44 flex items-end justify-between px-2 border-b border-gray-100 pb-2">
              {months.map((m, i) => (
                <div key={i} className="flex flex-col items-center flex-grow group">
                  <div className={`w-3 sm:w-5 bg-emerald-800/20 group-hover:bg-emerald-800 rounded-t-sm transition-all duration-300 ${m.height}`}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-2 mt-2">
              {months.map((m, i) => (
                <span key={i} className="text-[9px] font-medium text-gray-400 w-3 sm:w-5 text-center">{m.label}</span>
              ))}
            </div>
          </div>

          {/* Hotel Tier Split Percentage Matrix */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-gray-800">Hotel Tier Split</h4>
              <span className="text-[9px] text-gray-400">By registered properties</span>
            </div>

            <div className="space-y-4 my-auto py-4">
              {/* Diamond Tier */}
              <div>
                <div className="flex justify-between text-[10px] font-semibold text-gray-700 mb-1">
                  <span>Diamond</span>
                  <span className="text-gray-500">42 <span className="text-gray-400 font-normal">(1%)</span></span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-700 h-full w-[1%]"></div>
                </div>
              </div>

              {/* Gold Tier */}
              <div>
                <div className="flex justify-between text-[10px] font-semibold text-gray-700 mb-1">
                  <span>Gold</span>
                  <span className="text-gray-500">756 <span className="text-gray-400 font-normal">(18%)</span></span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[18%]"></div>
                </div>
              </div>

              {/* Silver Tier */}
              <div>
                <div className="flex justify-between text-[10px] font-semibold text-gray-700 mb-1">
                  <span>Silver</span>
                  <span className="text-gray-500">3420 <span className="text-gray-400 font-normal">(81%)</span></span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-800 h-full w-[81%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- DISTRICT STATISTICS DATA TABLE --- */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h4 className="text-xs font-bold text-gray-800">District-wise Statistics</h4>
            <span className="text-[9px] text-gray-400 font-semibold tracking-wider">FY 2026-27</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-gray-100 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3 px-5">District</th>
                  <th className="py-3 px-5">Tourism Type</th>
                  <th className="py-3 px-5 text-right">Visitors</th>
                  <th className="py-3 px-5 text-right">Hotels</th>
                  <th className="py-3 px-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-[11px] text-gray-700 font-medium">
                {districtData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-5 font-bold text-gray-800">{row.district}</td>
                    <td className="py-3.5 px-5 text-gray-400 font-normal">{row.type}</td>
                    <td className="py-3.5 px-5 text-right font-bold text-gray-900">{row.visitors}</td>
                    <td className="py-3.5 px-5 text-right text-gray-600">{row.hotels}</td>
                    <td className="py-3.5 px-5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        • {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}