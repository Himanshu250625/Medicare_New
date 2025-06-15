import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaArrowLeft, FaTrash } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import medicineProducts from "../data/medicineProducts";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const wishlistProducts = medicineProducts.filter((p) =>
    wishlist.includes(p.id)
  );

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your wishlist is empty
        </h2>
        <button
          onClick={() => navigate("/medicine-store")}
          className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          <FaArrowLeft /> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <FaArrowLeft /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaHeart className="text-pink-500" /> My Wishlist
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden relative group cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/medicine-store/${product.id}`)}
            >
              <button
                className="absolute top-2 right-2 z-10 text-xl p-1 rounded-full transition-colors bg-pink-100 text-pink-600 hover:bg-pink-200"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                aria-label="Remove from wishlist"
              >
                <FaTrash />
              </button>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-2 rounded"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2 min-h-[40px] mb-2">
                  {product.name}
                </h3>
                <p className="text-red-600 font-bold">₹{product.price}</p>
                <p className="text-gray-500 text-sm line-through">
                  ₹{product.oldPrice}
                </p>
                <p className="text-green-600 text-sm">{product.discount}</p>
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

export default Wishlist;
