import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f241a] text-white pt-16 pb-8 px-6 md:px-12 border-t border-[#1b3d2b]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
        
        {/* Branding Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif text-[#59d585]">Uttarakhand Unlocked</h3>
          <p className="text-gray-400 text-xs font-light leading-relaxed">
            Discover the majestic Himalayas, deep heritage traditions, and luxury getaways in India's land of the gods.
          </p>
        </div>

        {/* Column 1: Quick Navigation Routes */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400 font-light flex flex-col">
            <Link to="/" className="hover:text-[#59d585] transition-colors">Home</Link>
            <Link to="/places" className="hover:text-[#59d585] transition-colors">Places</Link>
            <Link to="/hotels" className="hover:text-[#59d585] transition-colors">Hotels & Vendors</Link>
            <Link to="/menu" className="hover:text-[#59d585] transition-colors">Menu</Link>
            <Link to="/contact" className="hover:text-[#59d585] transition-colors">Contact</Link>
            <Link to="/dashboard" className="hover:text-[#59d585] transition-colors">Gov Dashboard</Link>
          </ul>
        </div>

        {/* Column 2: Hardcoded Structural Items from Video */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Char Dham Yatra</h4>
          <ul className="space-y-2 text-sm text-gray-400 font-light flex flex-col">
            <span className="hover:text-white transition-colors cursor-pointer">Kedarnath Temple</span>
            <span className="hover:text-white transition-colors cursor-pointer">Badrinath Dham</span>
            <span className="hover:text-white transition-colors cursor-pointer">Gangotri Temple</span>
            <span className="hover:text-white transition-colors cursor-pointer">Yamunotri Temple</span>
          </ul>
          <div className="pt-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-red-400">Emergency Helpline</h5>
            <p className="text-lg font-mono text-red-400 font-bold">1800-180-4141</p>
          </div>
        </div>

        {/* Column 3: Subscription Box block */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Newsletter</h4>
          <p className="text-gray-400 text-xs font-light leading-relaxed">
            Get travel tips, festival dates, and Char Dham updates direct to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 pt-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#59d585] flex-grow transition-colors"
            />
            <button className="bg-[#1b3d2b] border border-[#2d583f] text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-[#234e36] transition-colors">
              Join
            </button>
          </form>
        </div>

      </div>

      {/* Copyright Disclaimer Border Line Footer Block */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-light">
        <p>© {currentYear} Uttarakhand Unlocked • Government of Uttarakhand Tourism • All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;