import React from 'react';
// Import your local destination thumbnail images here
const rishikesh = "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/03/24142827/Places-to-visit-in-Rishikesh-FI.jpg";
const jimCorbettImg = "https://wildlifenavigator.com/wp-content/uploads/2024/09/jim-corbett-national-park.webp"
const masoorie = "https://th.bing.com/th/id/OIP.IJUgDKZdB3T8V4RrHwXwzgHaFj?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
const devprayag = "https://th.bing.com/th/id/OIP.IJUgDKZdB3T8V4RrHwXwzgHaFj?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
const kedarnath = "https://tse4.mm.bing.net/th/id/OIP.YQj2Themksw6bpGPlkLShQHaFw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"


function TopDestinations() {
  const destinations = [
    {
      title: "Jim Corbett",
      subtitle: "Wildlife & forests",
      image: jimCorbettImg
    },
    {
      title: "Rishikesh",
      subtitle: "Adventure & Spirituality",
      image: rishikesh
    },
    {
      title: "Massorie",
      subtitle: "Family Tourism",
      image: masoorie
    },
    {
      title: "Devprayag",
      subtitle: "Sacred Point",
      image: devprayag
    },
    {
      title: "Kedarnath",
      subtitle: "Mahadev",
      image: kedarnath
    }, 
  ];
 
  return (
    <section className="bg-[#f4fbf7] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-4xl font-serif text-[#1b3d2b]">Top Destinations</h2>
          <p className="text-gray-6xl text-gray-6 text-sm md:text-base">
            From spiritual peaks to wild jungles — Uttarakhand holds wonders for every traveller.
          </p>
        </div>

        {/* Horizontal Scroll / Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <div 
              key={index} 
              className="group relative h-96 rounded-2xl overflow-hidden shadow-md cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image background wrapper */}
              <img 
                src={dest.image} 
                alt={dest.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Text content absolute position at bottom left */}
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <h4 className="text-2xl font-serif font-semibold">{dest.title}</h4>
                <p className="text-xs uppercase tracking-wider text-gray-300 font-light">{dest.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopDestinations;