import React from 'react';

function CallToAction() {
  return (
    <section className="bg-[#1b3d2b] text-white py-20 text-center px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-4xl font-serif tracking-wide">Ready to explore?</h2>
        <p className="text-gray-300 font-light leading-relaxed max-w-lg mx-auto">
          Book your stay, discover sacred sites, and plan your perfect Uttarakhand journey today.
        </p>
        <div className="pt-4">
          <button className="bg-white hover:bg-gray-100 text-[#1b3d2b] font-semibold px-8 py-3.5 rounded-full transition-colors shadow-md">
            Browse Hotels & Packages
          </button>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;