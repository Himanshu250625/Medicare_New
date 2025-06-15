import React, { createContext, useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token, userData } = useContext(AppContext);
  const [wishlist, setWishlist] = useState(() => {
    if (!token) return [];
    const saved = localStorage.getItem(`wishlist_${userData?._id}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (token && userData?._id) {
      localStorage.setItem(
        `wishlist_${userData._id}`,
        JSON.stringify(wishlist)
      );
    }
  }, [wishlist, token, userData]);

  const addToWishlist = (id) => {
    if (!token) {
      toast.error("Please login to add items to wishlist");
      return;
    }
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromWishlist = (id) => {
    if (!token) return;
    setWishlist((prev) => prev.filter((pid) => pid !== id));
  };

  const toggleWishlist = (id) => {
    if (!token) {
      toast.error("Please login to manage wishlist");
      return;
    }
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const isWishlisted = (id) => wishlist.includes(id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
