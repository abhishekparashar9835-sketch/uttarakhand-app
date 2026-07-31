import React, { useEffect, useState } from "react";
import placeService from "../../services/placeService";

// ================= Place Card =================
const PlaceCard = ({
  image,
  category,
  title,
  location,
  elevation,
  description,
  tags,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-56 w-full">
        <img
          src={
            image && image.trim() !== ""
              ? image
              : "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt={title}
          className="w-full h-full object-cover"
        />

        <span
          className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full text-white ${
            category === "Temple" || category === "Religious"
              ? "bg-amber-500"
              : "bg-emerald-600"
          }`}
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow space-y-3">
        <h3 className="text-2xl font-serif text-[#1b3d2b]">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>📍 {location}</span>
          <span>🏔️ {elevation || "N/A"}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {(tags || []).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ================= Places Page =================
function Places() {
  const [placesData, setPlacesData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Places");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const places = await placeService.getPlaces();

      console.log("Places from API:", places);

      setPlacesData(places);
    } catch (error) {
      console.error("Failed to fetch places:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlaces =
    activeFilter === "All Places"
      ? placesData
      : placesData.filter((place) => {
          if (activeFilter === "Religious Sites") {
            return (
              place.category === "Temple" ||
              place.category === "Religious"
            );
          }

          if (activeFilter === "Tourist Spots") {
            return (
              place.category === "Tourist Spots" ||
              place.category === "Tourist"
            );
          }

          return true;
        });

  return (
    <>
      {/* Banner */}
      <section className="bg-[#1b3d2b] text-white pt-24 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 text-xs">
            📖 Discover Uttarakhand
          </div>

          <h1 className="text-5xl font-serif">
            Tourist & Sacred Places
          </h1>

          <p className="text-gray-300">
            Explore the beauty, spirituality and heritage of Uttarakhand.
          </p>
        </div>
      </section>

      {/* Places */}
      <section className="bg-[#f4fbf7] py-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              "All Places",
              "Tourist Spots",
              "Religious Sites",
            ].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full border transition ${
                  activeFilter === filter
                    ? "bg-[#1b3d2b] text-white"
                    : "bg-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-xl">
              Loading...
            </div>
          ) : filteredPlaces.length === 0 ? (
            <div className="text-center text-xl">
              No places found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlaces.map((place) => (
                <PlaceCard
                  key={place._id}
                  image={place.image}
                  category={place.category}
                  title={place.name}
                  location={place.location}
                  elevation={place.elevation}
                  description={place.description}
                  tags={place.tags}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Places;