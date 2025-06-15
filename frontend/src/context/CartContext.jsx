import React, { createContext, useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, userData } = useContext(AppContext);
  const [cart, setCart] = useState(() => {
    if (!token) return [];
    const savedCart = localStorage.getItem(`cart_${userData?._id}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (token && userData?._id) {
      localStorage.setItem(`cart_${userData._id}`, JSON.stringify(cart));
    }
  }, [cart, token, userData]);

  const addToCart = (product, quantity = 1) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    if (!token) return;
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (!token) return;
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    if (!token) return;
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
