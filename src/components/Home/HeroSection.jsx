import React from 'react';
import { Link } from 'react-router-dom';

const heroBg = "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1920"; 

function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 text-white bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${heroBg})` }}
    >
      <div className="max-w-3xl space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#1b3d2b]/80 border border-[#448b5b]/50 rounded-full px-4 py-1.5 text-sm tracking-wide text-[#59d585]">
          <span className="text-xs">🌐</span> Dev Bhoomi – Land of Gods
        </div>

        {/* Headings */}
        <h1 className="text-6xl md:text-8xl font-serif tracking-wide leading-tight">
          Uttarakhand <br />
          <span className="text-[#59d585] italic font-normal">Unlocked</span>
        </h1>

        {/* Paragraph */}
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
          Explore the majestic Himalayas, ancient temples, roaring rivers and lush forests of India's most sacred state. Your journey into the divine begins here.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Link to="/places" className="flex items-center gap-2 bg-[#234e36] hover:bg-[#1b3d2b] text-white px-8 py-3.5 rounded-full font-medium transition-colors group">
            Explore Destinations 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          
          {/* SWAPPED BUTTON TO LINK DETECTED HERE */}
          <Link to="/hotels" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-full font-medium backdrop-blur-sm transition-colors text-center flex items-center justify-center">
            View Hotels
          </Link>
        </div>
      </div>

      {/* Bounce Down Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white/70">
          ↓
        </div>
      </div>
    </section>
  );
}

export default HeroSection;