import React, { useState } from 'react';

// Sub-component for individual Hotel Cards
const HotelCard = ({ name, location, rating, price, tags, image, tierColor }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
    {/* Image Container with Badge */}
    <div className="relative h-52 w-full">
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full text-white ${tierColor.badge}`}>
        {tierColor.icon} {tierColor.name}
      </span>
    </div>

    {/* Details Body */}
    <div className="p-5 flex flex-col flex-grow space-y-3">
      {/* Title & Rating */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-xl font-serif text-[#1b3d2b] font-medium leading-snug">{name}</h3>
        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
          ⭐ <span>{rating}</span>
        </div>
      </div>

      {/* Location */}
      <p className="text-xs text-gray-400 font-light flex items-center gap-1">
        📍 {location}
      </p>

      {/* Facilities / Amenities Tags */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer / Price & CTA Button */}
      <div className="flex justify-between items-center pt-4 mt-auto border-t border-gray-100">
        <div>
          <span className="text-lg font-bold text-[#1b3d2b]">{price}</span>
          <span className="text-xs text-gray-400 font-light"> / night</span>
        </div>
        <button className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
          Book Now
        </button>
      </div>
    </div>
  </div>
);

function HotelsVendors() {
  const [activeTier, setActiveTier] = useState('Gold');

  // Theme Config definitions for Silver, Gold, Diamond tiers
  const tierConfigs = {
    Silver: {
      name: 'Silver',
      icon: '⭐',
      tagline: 'Budget-friendly with great value',
      bg: 'bg-slate-50 border-slate-200 text-slate-700',
      badge: 'bg-slate-500',
      tabActive: 'bg-white text-slate-700 border-slate-300 shadow-sm'
    },
    Gold: {
      name: 'Gold',
      icon: '👑',
      tagline: 'Premium comfort with curated experiences',
      bg: 'bg-amber-50 border-amber-200 text-amber-800',
      badge: 'bg-amber-500',
      tabActive: 'bg-white text-amber-600 border-amber-400 shadow-sm'
    },
    Diamond: {
      name: 'Diamond',
      icon: '💎',
      tagline: 'Ultra-luxury private Himalayan escapes',
      bg: 'bg-purple-50 border-purple-200 text-purple-800',
      badge: 'bg-purple-600',
      tabActive: 'bg-white text-purple-600 border-purple-400 shadow-sm'
    }
  };

  // Structured Mock Data corresponding to the visual cards video source
  const hotelsData = {
    Silver: [
      {
        name: "Green Valley Homestay",
        location: "Lansdowne",
        rating: "4.1",
        price: "₹1,200",
        tags: ["WiFi", "Breakfast", "Parking"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "Corbett Nature Lodge",
        location: "Ramnagar",
        rating: "4.0",
        price: "₹1,500",
        tags: ["WiFi", "Garden", "Meals"],
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "Himalayan Breeze Inn",
        location: "Almora",
        rating: "4.2",
        price: "₹1,800",
        tags: ["Breakfast", "Mountain View", "WiFi"],
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600"
      }
    ],
    Gold: [
      {
        name: "Rishikesh Riviera",
        location: "Rishikesh",
        rating: "4.5",
        price: "₹4,500",
        tags: ["Spa", "Pool", "Restaurant", "Yoga"],
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "Nainital Grand",
        location: "Nainital",
        rating: "4.6",
        price: "₹5,200",
        tags: ["Lake View", "Fine Dining", "Spa", "WiFi"],
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "Mussoorie Heights",
        location: "Mussoorie",
        rating: "4.4",
        price: "₹3,800",
        tags: ["Valley View", "Pool", "Restaurant"],
        image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=600"
      }
    ],
    Diamond: [
      {
        name: "Ananda in the Himalayas",
        location: "Narendra Nagar",
        rating: "4.9",
        price: "₹22,000",
        tags: ["Ayurvedic Spa", "Private Pool", "Helipad", "Butler"],
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "Taj Corbett Resort",
        location: "Jim Corbett",
        rating: "4.8",
        price: "₹18,500",
        tags: ["Jungle Safari", "Infinity Pool", "Private Dining", "Spa"],
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=600"
      },
      {
        name: "Kumaon Hills Palace",
        location: "Binsar",
        rating: "4.9",
        price: "₹26,000",
        tags: ["Himalayan View", "Private Chef", "Fireplace Suite", "Helipad"],
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600"
      }
    ]
  };

  return (
    <>
      {/* Dynamic Header Block Banner */}
      <section className="bg-[#1b3d2b] text-white pt-24 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs tracking-wider text-gray-200">
            🏨 Hotels & Vendors
          </div>
          <h1 className="text-5xl md:text-6xl font-serif tracking-wide">Stay in Style</h1>
          <p className="text-gray-300 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
            From cozy homestays to palatial retreats — find your perfect base to explore Uttarakhand.
          </p>
        </div>
      </section>

      {/* Main Content & Tiers Selection Area */}
      <section className="bg-[#f4fbf7] py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Centered Pill Tab Button Controls */}
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1.5 rounded-full flex items-center gap-2 border border-gray-200 shadow-inner">
              {Object.keys(tierConfigs).map((tierKey) => {
                const tier = tierConfigs[tierKey];
                const isSelected = activeTier === tierKey;
                return (
                  <button
                    key={tierKey}
                    onClick={() => setActiveTier(tierKey)}
                    className={`flex items-center gap-1.5 px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      isSelected ? tier.tabActive : 'text-gray-500 hover:text-gray-700 bg-transparent'
                    }`}
                  >
                    <span>{tier.icon}</span>
                    {tier.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Informative Sub-banner */}
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl border ${tierConfigs[activeTier].bg}`}>
            <span className="text-xl">{tierConfigs[activeTier].icon}</span>
            <div>
              <strong className="font-semibold">{tierConfigs[activeTier].name} Category</strong>
              <span className="mx-2 text-gray-400 font-light">|</span>
              <span className="text-sm opacity-90">{tierConfigs[activeTier].tagline}</span>
            </div>
          </div>

          {/* Cards Display Dynamic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {hotelsData[activeTier].map((hotel, index) => (
              <HotelCard 
                key={index} 
                {...hotel} 
                tierColor={tierConfigs[activeTier]} 
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default HotelsVendors;