import React, { useState } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaShoppingBag,
  FaHistory,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import medicineProducts from "../data/medicineProducts";

const categories = [
  {
    name: "Pain Relief",
    icon: "💊",
    description: "Medicines for pain management and relief",
    subcategories: ["Headache", "Muscle Pain", "Joint Pain", "Dental Pain"],
  },
  {
    name: "Supplements",
    icon: "💪",
    description: "Nutritional supplements and vitamins",
    subcategories: ["Vitamins", "Minerals", "Protein", "Herbal Supplements"],
  },
  {
    name: "Ayurvedic",
    icon: "🌿",
    description: "Traditional Ayurvedic medicines",
    subcategories: ["Herbal", "Natural", "Traditional", "Wellness"],
  },
  {
    name: "Diabetes",
    icon: "🩺",
    description: "Diabetes management and care",
    subcategories: ["Blood Sugar", "Insulin", "Management", "Care"],
  },
  {
    name: "Immunity",
    icon: "🛡️",
    description: "Immunity boosting products",
    subcategories: ["Boosters", "Prevention", "Wellness", "Care"],
  },
  {
    name: "Personal Care",
    icon: "🧴",
    description: "Personal care and hygiene products",
    subcategories: ["Skincare", "Haircare", "Oral Care", "Hygiene"],
  },
];

const Category = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-4 rounded-xl border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200
                bg-white/80 backdrop-blur-sm shadow-sm
                placeholder-gray-400 text-gray-700"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            className="p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200
              hover:bg-gray-50 transition-colors duration-300
              focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <FaFilter className="text-gray-600" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.name}
              className="group bg-white/90 backdrop-blur-md rounded-xl p-6 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] 
                transition-all duration-300 cursor-pointer
                border border-gray-100/50 hover:border-blue-100/50
                before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r 
                before:from-blue-100/30 before:via-blue-50/30 before:to-blue-100/30 
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
              onClick={() =>
                navigate(`/medicine-store?category=${category.name}`)
              }
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{category.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 mt-1 text-sm">
                    {category.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category.subcategories.map((sub) => (
                      <span
                        key={sub}
                        className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm
                          group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No categories found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
