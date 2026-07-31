import React from 'react';

function StatsSection() {
  const stats = [
    { number: "5", label: "National Parks" },
    { number: "12", label: "Districts" },
    { number: "100+", label: "Sacred Temples" } // Added an extra item to complete the row context
  ];

  return (
    <section className="bg-[#1b3d2b] text-white py-12 border-b border-[#2d583f]">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 text-center divide-x divide-white/15">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-1">
            <h3 className="text-4xl md:text-5xl font-serif text-[#59d585]">{stat.number}</h3>
            <p className="text-sm uppercase tracking-widest text-gray-300 font-light">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;