import React from 'react';
const featureSideImg = "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=800";

function FeaturesSection() {
  const features = [
    { title: "Sacred rivers and timeless rituals" },
    { title: "Trekking, skiing and paragliding" },
    { title: "Sanctuaries and biodiversity corridors" },
    { title: "Garhwali & Kumaoni traditions, arts and cuisine" }
  ];

  return (
    <section className="bg-[#eefcf4] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Content */}
        <div className="space-y-8">
          <h2 className="text-4xl font-serif text-[#1b3d2b] leading-tight">
            Why Uttarakhand?
          </h2>
          <p className="text-gray-600 font-light leading-relaxed">
            Known as "Dev Bhoomi" (Land of Gods), Uttarakhand is home to the majestic Himalayas, the source of the Ganges, and some of the world's most breathtaking alpine vistas.
          </p>
          
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[#1b3d2b] font-medium">
                <span className="text-[#59d585] mt-1">✔</span>
                <span>{feature.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Stacked Image & Rating Card */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-lg h-[450px]">
            <img 
              src={featureSideImg} 
              alt="Uttarakhand beauty" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Floated Rating Badge Overlay */}
          <div className="absolute -bottom-5 left-8 bg-white py-3 px-5 rounded-xl shadow-xl flex flex-col border border-gray-100">
            <span className="text-2xl font-bold text-[#1b3d2b] flex items-center gap-1">
              4.9 <span className="text-yellow-500 text-xl">★</span>
            </span>
            <span className="text-xs text-gray-500 font-medium">Avg. traveler rating</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;