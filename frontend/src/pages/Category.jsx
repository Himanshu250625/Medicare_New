import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Pain Relief",
    image:
      "https://northwichfootclinic.co.uk/wp-content/uploads/2020/09/Natural-Pain-Relief.jpg",
    description:
      "Medications for headaches, muscle pain, and general pain relief",
  },
  {
    id: 2,
    name: "Vitamins & Supplements",
    image:
      "https://img.freepik.com/free-photo/closeup-shot-fresh-fruits-with-different-medicine-wooden-spoon_181624-47231.jpg",
    description:
      "Essential vitamins and nutritional supplements for daily health",
  },
  {
    id: 3,
    name: "First Aid",
    image:
      "https://media.istockphoto.com/id/477984136/vector/first-aid-kit.jpg?s=612x612&w=0&k=20&c=zfKTAwJ6RVhOpvMGKOeTJ6_GyYDXOjwUBNxNZ_17Q1M=",
    description: "Essential first aid supplies and emergency care products",
  },
  {
    id: 4,
    name: "Skin Care",
    image:
      "https://blog.buywow.in/wp-content/uploads/2023/10/jpeg-optimizer_morning-routine-2023-01-06-11-09-55-utc.jpg",
    description: "Products for healthy skin and treatment of skin conditions",
  },
  {
    id: 5,
    name: "Digestive Health",
    image: "https://rajhospitals.com/img/blog/112.jpg",
    description: "Medications and supplements for digestive system health",
  },
  {
    id: 6,
    name: "Respiratory Care",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmdQa5L3f7Nf9svnPkjOO1QeR49bn1OuN3bNMolrzNnHW9pdo8Eaa1g2kZ-k3nB4Pm6fw&usqp=CAU",
    description: "Products for respiratory health and breathing conditions",
  },
];

const Category = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Browse Categories
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() =>
                navigate(`/medicine-store?category=${category.name}`)
              }
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                  {category.name}
                </h2>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
