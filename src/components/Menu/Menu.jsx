import React from 'react';
import { Utensils, Soup, Flame, Coffee, Leaf } from 'lucide-react';

// Maps dynamic icon keys to Lucide React icons
const iconMap = {
  Utensils: <Utensils className="w-5 h-5 text-emerald-800" />,
  Soup: <Soup className="w-5 h-5 text-emerald-800" />,
  Flame: <Flame className="w-5 h-5 text-emerald-800" />,
  Coffee: <Coffee className="w-5 h-5 text-emerald-800" />
};

export default function Menu({ menuCategories, farmSourcedBanner = true }) {
  // Fallback default menu data if no props are passed
  const defaultMenu = [
    {
      category: "Garhwali Thali",
      iconType: "Utensils",
      items: [
        { name: "Kafuli", price: "₹180", desc: "Spinach and fenugreek leaves cooked in a thick gravy with bhatt (black soybeans)" },
        { name: "Chainsoo", price: "₹150", desc: "Black gram dal roasted and slow-cooked with spices — a Garhwali staple" },
        { name: "Mandua Roti", price: "₹60", desc: "Flatbread made from finger millet flour, rich in nutrients and earthy in taste" },
        { name: "Jholi", price: "₹130", desc: "Buttermilk curry with vegetables, seasoned with turmeric and whole spices" }
      ]
    },
    {
      category: "Kumaoni Cuisine",
      iconType: "Soup",
      items: [
        { name: "Bal Mithai", price: "₹80", desc: "Fudge-like chocolate-brown sweet made from roasted khoya, coated with sugar balls" },
        { name: "Bhaang Ki Chutney", price: "₹70", desc: "Hemp seed chutney — a pungent condiment unique to Kumaon kitchens" },
        { name: "Aloo Ke Gutke", price: "₹120", desc: "Spiced diced potatoes cooked dry with jakhiya seeds — the iconic Kumaoni breakfast" },
        { name: "Singori", price: "₹90", desc: "Sweet made of khoya and coconut wrapped in maalu leaves — a delicate Kumaoni dessert" }
      ]
    },
    {
      category: "Street Food & Snacks",
      iconType: "Flame",
      items: [
        { name: "Dubuk", price: "₹100", desc: "Black bean soup slow cooked with mountain spices" },
        { name: "Kandalee Ka Saag", price: "₹140", desc: "Stinging nettle cooked with mustard and garlic — a wild green foraged from forests" },
        { name: "Til Ki Barfi", price: "₹50", desc: "Sesame seed fudge sweetened with jaggery — crispy and aromatic" },
        { name: "Garhwali Pakoda", price: "₹90", desc: "Bhatt dal fritters deep-fried with green chilies and cumin" }
      ]
    },
    {
      category: "Beverages",
      iconType: "Coffee",
      items: [
        { name: "Buransh Juice", price: "₹90", desc: "Vibrant red juice made from Rhododendron flowers — the state flower of Uttarakhand" },
        { name: "Jakhiya Chai", price: "₹40", desc: "Mountain tea brewed with wild celery seeds for a unique aromatic kick" },
        { name: "Ginger Tulsi Kaada", price: "₹60", desc: "Traditional herbal infusion of ginger, tulsi and mountain herbs for immunity" },
        { name: "Malai Lassi", price: "₹70", desc: "Thick curd-based yoghurt drink with local herbs from high-altitude pastures" }
      ]
    }
  ];

  const categoriesToRender = menuCategories || defaultMenu;

  return (
    <div className="w-full bg-slate-50 py-10 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {categoriesToRender.map((section, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              
              {/* Category Header */}
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-4">
                {iconMap[section.iconType] || <Utensils className="w-5 h-5 text-emerald-800" />}
                <h2 className="font-bold text-gray-800 text-sm md:text-base">{section.category}</h2>
              </div>
              
              {/* Items List */}
              <div className="space-y-5">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="group">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-gray-800 text-xs group-hover:text-emerald-800 transition">
                        {item.name}
                      </h3>
                      <span className="text-xs font-bold text-gray-900 ml-4">{item.price}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Optional Sourced Banner */}
        {farmSourcedBanner && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start space-x-3 max-w-2xl mx-auto">
            <div className="bg-emerald-800 p-1.5 rounded-lg text-white mt-0.5">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-950 mb-0.5">All sourced from local farmers</h4>
              <p className="text-[11px] text-emerald-800/80 leading-relaxed">
                Our menu partners with 200+ Uttarakhand farmers growing organic, pesticide-free mountain produce using traditional methods.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}