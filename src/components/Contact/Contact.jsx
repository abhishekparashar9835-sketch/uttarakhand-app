import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Contact Data:', formData);
  };

  return (
    <div className="w-full bg-slate-50 flex flex-col font-sans">
      
      {/* Banner / Header Section */}
      <div className="w-full bg-emerald-900 text-center py-10 px-4">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 tracking-wide">
          Contact Us
        </h1>
        <p className="text-[11px] md:text-xs text-emerald-100/80 max-w-md mx-auto leading-relaxed">
          We're here to help plan your perfect Uttarakhand experience.<br />
          Reach out anytime.
        </p>
      </div>

      {/* Content Form & Info Container */}
      <div className="max-w-4xl w-full mx-auto px-6 py-12 flex-grow grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        
        {/* Left Column: Get in Touch */}
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-5">
              Get in Touch
            </h2>
            
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-emerald-50 rounded text-emerald-800 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Address</span>
                  <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                    Uttarakhand Tourism Office, 1 Subhash Road, Dehradun — 248001
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-emerald-50 rounded text-emerald-800 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Phone</span>
                  <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                    +91-135-2559898 / 1800-180-4141 (Toll Free)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-emerald-50 rounded text-emerald-800 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email</span>
                  <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                    tourism@uk.gov.in / info@uttarakhandunlocked.in
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-emerald-50 rounded text-emerald-800 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Hours</span>
                  <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                    Mon–Sat: 9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Helpline Container */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <div className="flex items-center space-x-2 border-b border-emerald-100 pb-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-emerald-800" />
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                Emergency Helpline
              </h3>
            </div>
            <div className="space-y-2 text-[11px] font-medium text-emerald-900">
              <div className="flex justify-between">
                <span className="text-emerald-800/80">Tourist Helpline</span>
                <span className="font-bold">1800-180-4141</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800/80">Mountain Rescue</span>
                <span className="font-bold">9557444486</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800/80">Police Emergency</span>
                <span className="font-bold">112</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Send a Message Form */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Priya Sharma"
                  className="w-full text-xs bg-slate-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-emerald-700 placeholder-gray-300"
                  required
                />
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="priya@example.com"
                  className="w-full text-xs bg-slate-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-emerald-700 placeholder-gray-300"
                  required
                />
              </div>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                Phone (Optional)
              </label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full text-xs bg-slate-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-emerald-700 placeholder-gray-300"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                Subject
              </label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full text-xs bg-slate-50 border border-gray-200 rounded-md px-3 py-2 text-gray-600 focus:outline-none focus:border-emerald-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_12px_center] bg-no-repeat"
                required
              >
                <option value="" disabled>Select a topic</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Trip Planning">Trip Planning Help</option>
                <option value="Vendor Partner">Vendor Partnership</option>
                <option value="Complaints/Feedback">Feedback & Support</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                Message
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your travel plans..."
                className="w-full text-xs bg-slate-50 border border-gray-200 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:border-emerald-700 placeholder-gray-300 resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-900 transition text-white py-2 rounded-md font-medium text-xs shadow-sm mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}