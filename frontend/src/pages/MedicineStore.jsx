import React, { useState, useContext } from "react";
import {
  FaStar,
  FaCartPlus,
  FaFilter,
  FaHome,
  FaShoppingCart,
  FaTags,
  FaList,
  FaUser,
  FaBoxOpen,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import medicineProducts from "../data/medicineProducts";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";
import { AppContext } from "../context/AppContext";
import Category from "./Category";

// Carousel images (replace with your own URLs or use placeholders)
const carouselImages = [
  "https://assets.truemeds.in/Images/BannerImages/BannerImage_10_56_033_05_Jun_2025.png",
  "https://assets.truemeds.in/Images/BannerImages/BannerImage_09_30_059_12_Dec_2024.png",
  "https://assets.truemeds.in/Images/BannerImages/BannerImage_10_47_029_05_Jun_2025.png",
];

const categories = [
  "All",
  "Pain Relief",
  "Supplements",
  "Ayurvedic",
  "Diabetes",
  "Immunity",
  "Personal Care",
  "More...",
];

const products = medicineProducts;

const sidebarLinks = [
  {
    label: "Home",
    icon: <FaHome />,
    action: (navigate) => navigate("/medicine-store"),
  },
  {
    label: "Cart",
    icon: <FaShoppingCart />,
    action: (navigate) => navigate("/cart"),
    showCount: true,
  },
  {
    label: "Wishlist",
    icon: <FaHeart />,
    action: (navigate) => navigate("/wishlist"),
  },
  {
    label: "Offers",
    icon: <FaTags />,
    action: (navigate) => navigate("/offers"),
  },
  {
    label: "Categories",
    icon: <FaList />,
    action: (navigate) => navigate("/category"),
  },
  {
    label: "Account",
    icon: <FaUser />,
    action: (navigate) => navigate("/account"),
  },
];

const MedicineStore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showWishlist, setShowWishlist] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();
  const { getCartCount, addToCart } = useCart();
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const { token } = useContext(AppContext);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Carousel state and handlers
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handlePrev = () => {
    setCurrent(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % carouselImages.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  React.useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % carouselImages.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Sidebar actions
  const handleSidebarAction = (label) => {
    if (label === "Wishlist") {
      setShowWishlist(true);
      setIsMobileMenuOpen(false);
    } else if (label === "Home") {
      setShowWishlist(false);
      setIsMobileMenuOpen(false);
    }
  };

  // Which products to show
  const displayProducts = showWishlist ? wishlistProducts : filteredProducts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Vertical Sidebar */}
      <aside
        className={`fixed top-[80px] left-0 h-[calc(100vh-160px)] w-12
          bg-white/80 backdrop-blur-md
          md:bg-white/90 md:h-[calc(100vh-200px)] md:w-16 md:inset-y-16 md:top-auto md:bottom-auto md:my-0
          shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 rounded-2xl border border-gray-100 my-10`}
      >
        <div className="flex flex-col h-full py-4 gap-4">
          {sidebarLinks.map((link, idx) => (
            <button
              key={idx}
              className={`flex items-center justify-center text-blue-700 hover:text-blue-900 focus:outline-none group relative ${
                showWishlist && link.label === "Wishlist" ? "text-pink-600" : ""
              }`}
              title={link.label}
              onClick={() => {
                if (
                  (link.label === "Cart" || link.label === "Wishlist") &&
                  !token
                ) {
                  toast.error("Please login to access this feature");
                  navigate("/login");
                  return;
                }
                link.action(navigate);
                setIsMobileMenuOpen(false);
              }}
            >
              <span className="text-xl">{link.icon}</span>
              {link.showCount && token && getCartCount() > 0 && (
                <span className="absolute -top-0.5 right-0.5 bg-blue-500/90 backdrop-blur-sm text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
              {link.label === "Wishlist" && token && wishlist.length > 0 && (
                <span className="absolute -top-0.5 right-0.5 bg-pink-500/90 backdrop-blur-sm text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-16">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-1/2 -translate-y-1/2 left-2 z-50 p-1.5 rounded-full bg-white/80 backdrop-blur-lg shadow-xl md:hidden"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M15 19l-7-7 7-7" />
            ) : (
              <path d="M9 5l7 7-7 7" />
            )}
          </svg>
        </button>

        {/* Enhanced Carousel */}
        <div
          className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg mb-8 min-h-[200px] md:min-h-[300px] group mt-8 md:mt-12 bg-gray-50"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Images with Enhanced Transitions */}
          {carouselImages.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out transform ${
                current === idx
                  ? "opacity-100 translate-x-0 z-10"
                  : idx < current
                  ? "opacity-0 -translate-x-full z-0"
                  : "opacity-0 translate-x-full z-0"
              }`}
            >
              <img
                src={src}
                alt={`Banner ${idx + 1}`}
                className="w-full h-full object-contain transition-all duration-700 ease-in-out transform hover:scale-105"
              />
            </div>
          ))}

          {/* Enhanced Navigation Arrows with Hover Effects */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Enhanced Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200/50 z-20">
            <div
              className="h-full bg-blue-500 transition-all duration-300 ease-linear"
              style={{
                width: `${((current + 1) / carouselImages.length) * 100}%`,
                transition: isAutoPlaying ? "width 3.5s linear" : "none",
              }}
            />
          </div>

          {/* Enhanced Dots with Labels */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className="group flex flex-col items-center"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === idx
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
                <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                  {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-bold mt-2 mb-6 px-4 md:px-6 text-gray-800">
          {showWishlist ? "My Wishlist" : "Best of Home Medicines"}
        </h2>

        {/* Category & Search */}
        {!showWishlist && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 px-4 md:px-6">
            {/* Categories Scroll Container */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex gap-2 md:gap-3 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap
                      ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200/50"
                          : "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700"
                      }
                      border border-transparent
                      focus:outline-none focus:ring-2 focus:ring-blue-100
                      transform hover:scale-105 active:scale-95`}
                  >
                    <span className="relative z-10 text-sm font-medium">
                      {category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-auto flex items-center gap-3">
              <div className="relative flex-grow md:flex-grow-0 md:w-72">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 pr-4 rounded-full border border-gray-200 
                    focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200
                    bg-white/80 backdrop-blur-sm shadow-sm
                    placeholder-gray-400 text-gray-700"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                className="p-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200
                  hover:bg-gray-50 transition-colors duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-100"
                aria-label="Filter"
              >
                <FaFilter className="text-gray-600 w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-12">
          {displayProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12 text-lg">
              No products found.
            </div>
          )}
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white/90 backdrop-blur-md rounded-xl p-4 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] 
                transition-all duration-300 cursor-pointer flex flex-col 
                border border-gray-100/50 hover:border-blue-100/50
                before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r 
                before:from-blue-100/30 before:via-blue-50/30 before:to-blue-100/30 
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r 
                after:from-blue-50/10 after:via-transparent after:to-blue-50/10 
                after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300"
              onClick={() => navigate(`/medicine-store/${product.id}`)}
            >
              {/* Like button */}
              <button
                className={`absolute top-3 right-3 z-10 text-xl p-2 rounded-full transition-all duration-300 
                  backdrop-blur-md ${
                    isWishlisted(product.id)
                      ? "text-pink-500 bg-pink-50/60 shadow-sm"
                      : "text-gray-400 bg-white/80 hover:text-pink-400 hover:bg-pink-50/60 shadow-sm"
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product.id);
                  toast.success(
                    isWishlisted(product.id)
                      ? "Removed from wishlist"
                      : "Added to wishlist",
                    {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    }
                  );
                }}
                aria-label={
                  isWishlisted(product.id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <FaHeart className="transform group-hover:scale-110 transition-transform" />
              </button>

              {/* Product Image */}
              <div className="relative w-full h-40 mb-3 overflow-hidden rounded-lg bg-gray-50/30 backdrop-blur-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-2 transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow relative z-10">
                <h3 className="text-sm font-semibold text-gray-700 line-clamp-2 min-h-[40px] group-hover:text-blue-500 transition-colors">
                  {product.name}
                </h3>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-red-500 font-bold text-lg">
                      ₹{product.price}
                    </p>
                    <p className="text-gray-400 text-sm line-through">
                      ₹{product.oldPrice}
                    </p>
                  </div>

                  <p className="text-green-500 text-sm font-medium bg-green-50/60 backdrop-blur-sm px-2 py-0.5 rounded-full inline-block">
                    {product.discount}
                  </p>

                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-600">{product.rating}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">
                      {product.reviews} Reviews
                    </span>
                  </div>
                </div>

                {/* Quick Add to Cart Button */}
                <button
                  className="mt-3 w-full py-2 px-4 bg-blue-50/60 backdrop-blur-sm text-blue-500 rounded-lg font-medium
                    hover:bg-blue-100/60 transition-all duration-300 flex items-center justify-center gap-2
                    opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0
                    shadow-sm hover:shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                    toast.success(`${product.name} added to cart!`, {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                    });
                  }}
                >
                  <FaCartPlus className="text-lg" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineStore;
