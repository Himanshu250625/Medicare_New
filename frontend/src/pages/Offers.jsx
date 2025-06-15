import React, { useState } from "react";
import {
  FaTags,
  FaCopy,
  FaCheck,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import medicineProducts from "../data/medicineProducts";

const coupons = [
  { code: "SAVE10", desc: "Get 10% off on orders above ₹500" },
  { code: "FREESHIP", desc: "Free shipping on your first order" },
  { code: "BOGO50", desc: "Buy 1 Get 1 50% Off on select items" },
];

const getTopDiscounts = () =>
  medicineProducts.filter((p) => parseInt(p.discount) >= 18).slice(0, 8);

const getBOGO = () =>
  medicineProducts
    .filter(
      (p) =>
        p.name.toLowerCase().includes("balm") ||
        p.name.toLowerCase().includes("gel")
    )
    .slice(0, 8);

const Offers = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState("");
  const [carousel1, setCarousel1] = useState(0);
  const [carousel2, setCarousel2] = useState(0);
  const topDiscounts = getTopDiscounts();
  const bogoProducts = getBOGO();

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(""), 1200);
  };

  // Carousel helpers
  const scroll = (carousel, setCarousel, dir, arr) => {
    let next = carousel + dir;
    if (next < 0) next = 0;
    if (next > arr.length - 4) next = arr.length - 4;
    setCarousel(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 ml-4"
      >
        <FaArrowLeft /> Back
      </button>
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto mb-8 px-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2">
              <FaTags className="text-yellow-300" /> Special Offers & Coupons
            </h1>
            <p className="text-white/90 text-lg mb-4 max-w-xl">
              Save more on your medicines and wellness essentials. Grab the
              latest deals, discounts, and exclusive coupons below!
            </p>
            <button
              onClick={() => navigate("/medicine-store")}
              className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-semibold px-6 py-2 rounded-full shadow transition"
            >
              Shop Now
            </button>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVo-IiM-iLgFnZrN9llQmBaS3wz2JSTyWDRA&s"
            alt="Offers Banner"
            className="w-40 md:w-56 drop-shadow-xl"
          />
        </div>
      </div>

      {/* Coupons Section */}
      <div className="max-w-3xl mx-auto mb-10 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FaTags className="text-blue-500" /> Available Coupons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="bg-white rounded-xl shadow flex items-center justify-between p-4 border border-blue-100"
            >
              <div>
                <div className="font-bold text-blue-700 text-lg flex items-center gap-2">
                  <span className="bg-blue-100 px-2 py-1 rounded text-blue-700 tracking-widest text-base">
                    {c.code}
                  </span>
                  <button
                    onClick={() => handleCopy(c.code)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    title="Copy coupon code"
                  >
                    {copied === c.code ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaCopy />
                    )}
                  </button>
                </div>
                <div className="text-gray-600 text-sm mt-1">{c.desc}</div>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold ml-4 transition">
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Top Discounts Carousel */}
      <div className="max-w-6xl mx-auto mb-12 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FaTags className="text-pink-500" /> Top Discounts
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(carousel1, setCarousel1, -1, topDiscounts)}
              className="p-2 rounded-full bg-white shadow hover:bg-blue-100"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll(carousel1, setCarousel1, 1, topDiscounts)}
              className="p-2 rounded-full bg-white shadow hover:bg-blue-100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {topDiscounts.slice(carousel1, carousel1 + 4).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md min-w-[220px] max-w-[220px] flex-shrink-0 overflow-hidden relative group cursor-pointer hover:shadow-lg transition"
            >
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                {product.discount} OFF
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-contain mb-2 rounded"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold line-clamp-2 min-h-[40px] mb-2">
                  {product.name}
                </h3>
                <p className="text-red-600 font-bold">₹{product.price}</p>
                <p className="text-gray-500 text-sm line-through">
                  ₹{product.oldPrice}
                </p>
                <p className="text-yellow-500 text-sm mt-1">
                  ⭐ {product.rating} | {product.reviews} Reviews
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOGO Carousel */}
      <div className="max-w-6xl mx-auto mb-12 px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FaTags className="text-green-500" /> Buy 1 Get 1 50% Off
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(carousel2, setCarousel2, -1, bogoProducts)}
              className="p-2 rounded-full bg-white shadow hover:bg-blue-100"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll(carousel2, setCarousel2, 1, bogoProducts)}
              className="p-2 rounded-full bg-white shadow hover:bg-blue-100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {bogoProducts.slice(carousel2, carousel2 + 4).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md min-w-[220px] max-w-[220px] flex-shrink-0 overflow-hidden relative group cursor-pointer hover:shadow-lg transition"
            >
              <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                BOGO 50% OFF
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-contain mb-2 rounded"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold line-clamp-2 min-h-[40px] mb-2">
                  {product.name}
                </h3>
                <p className="text-red-600 font-bold">₹{product.price}</p>
                <p className="text-gray-500 text-sm line-through">
                  ₹{product.oldPrice}
                </p>
                <p className="text-yellow-500 text-sm mt-1">
                  ⭐ {product.rating} | {product.reviews} Reviews
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
