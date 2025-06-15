import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaCartPlus,
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUser,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import medicineProducts from "../data/medicineProducts";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const product = medicineProducts.find((p) => p.id === Number(id));

  // Get related products (same category, excluding current product)
  const relatedProducts = medicineProducts
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleWishlistClick = () => {
    const wasWishlisted = isWishlisted(product.id);
    toggleWishlist(product.id);
    if (!wasWishlisted) {
      navigate("/medicine-store");
      setTimeout(() => {
        const wishlistBtn = document.querySelector('button[title="Wishlist"]');
        if (wishlistBtn) wishlistBtn.click();
      }, 100);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on our medicine store!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Product not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <button onClick={() => navigate(-1)} className="hover:text-blue-600">
            Medicine Store
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image */}
              <div className="md:w-1/2">
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[400px] object-contain rounded-xl bg-gray-50 p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={handleWishlistClick}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                      isWishlisted(product.id)
                        ? "bg-pink-100 text-pink-600"
                        : "bg-white text-gray-400 hover:text-pink-600"
                    }`}
                    aria-label={
                      isWishlisted(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <FaHeart className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="md:w-1/2">
                <div className="space-y-6">
                  {/* Title and Category */}
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h1>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-semibold text-green-700">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600">
                      {product.reviews} Reviews
                    </span>
                  </div>

                  {/* Price Section */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.oldPrice}
                      </span>
                      <span className="text-green-600 font-semibold">
                        {product.discount}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <label className="text-gray-700 font-medium">
                      Quantity:
                    </label>
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <FaCartPlus className="text-xl" /> Add to Cart
                    </button>
                  </div>

                  {/* Delivery Info */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                    <div className="flex items-center gap-3">
                      <FaTruck className="text-blue-600 text-xl" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Free Delivery
                        </p>
                        <p className="text-sm text-gray-500">
                          Delivery by 2-3 days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaUndo className="text-blue-600 text-xl" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Easy Returns
                        </p>
                        <p className="text-sm text-gray-500">
                          30 days return policy
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaShieldAlt className="text-blue-600 text-xl" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Genuine Product
                        </p>
                        <p className="text-sm text-gray-500">100% authentic</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaShare className="text-blue-600 text-xl" />
                      <div>
                        <p className="font-medium text-gray-900">Share</p>
                        <p className="text-sm text-gray-500">
                          Share with friends
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              {["description", "features", "usage", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description ||
                    "This medicine is designed to provide effective relief and treatment. It contains carefully selected ingredients that work together to deliver optimal results."}
                </p>
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600">
                      Fast-acting formula for quick relief
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600">
                      Clinically proven effectiveness
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600">
                      Easy to use and administer
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600">Long-lasting results</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "usage" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Usage Instructions
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Dosage Information
                  </h4>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-center gap-2">
                      <FaClock className="text-blue-500" />
                      <span>Take as directed by your healthcare provider</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaInfoCircle className="text-blue-500" />
                      <span>Store in a cool, dry place</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaExclamationTriangle className="text-blue-500" />
                      <span>Keep out of reach of children</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Customer Reviews
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <FaUser className="text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Customer {review}
                          </h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">
                        Great product! Works exactly as described. Very
                        satisfied with the results.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stock Status and Safety Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Stock Status
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>
            <p className="text-gray-600 mt-2">
              Available for immediate delivery
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Safety Information
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <FaShieldAlt className="text-blue-500" />
                <span>100% Authentic Product</span>
              </li>
              <li className="flex items-center gap-2">
                <FaShieldAlt className="text-blue-500" />
                <span>Manufactured in FDA-approved facilities</span>
              </li>
              <li className="flex items-center gap-2">
                <FaShieldAlt className="text-blue-500" />
                <span>Quality assured</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() =>
                    navigate(`/medicine-store/${relatedProduct.id}`)
                  }
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-contain p-4 bg-gray-50"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{relatedProduct.price}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          ₹{relatedProduct.oldPrice}
                        </p>
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <FaStar />
                        <span className="text-gray-600 ml-1">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineDetail;
