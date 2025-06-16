import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaTruck,
  FaMapMarkerAlt,
  FaBox,
  FaCalendarAlt,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentMethod } = location.state || {};
  const { clearCart } = useCart();
  const [orderNumber] = useState(
    () => `ORD${Math.floor(Math.random() * 1000000)}`
  );

  // Generate estimated delivery date (2-3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(
    deliveryDate.getDate() + Math.floor(Math.random() * 2) + 2
  );

  // Clear cart when component mounts
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-green-50 p-8 text-center">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600">Thank you for your purchase</p>
          </div>

          {/* Order Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Order Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Order Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaBox className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Order Number</p>
                        <p className="font-medium">{orderNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-medium">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaTruck className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium capitalize">
                          {paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Delivery Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Delivery Address
                        </p>
                        <p className="font-medium">123 Healthcare Street</p>
                        <p className="text-gray-600">
                          Medical District, City - 123456
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Estimated Delivery
                        </p>
                        <p className="font-medium">
                          {deliveryDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Delivery Image */}
              <div className="relative">
                <div className="bg-blue-50 rounded-lg p-6 h-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1048/1048955.png"
                    alt="Delivery Vehicle"
                    className="w-full h-64 object-contain rounded-lg"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Your order is being prepared for delivery
                    </p>
                    <p className="text-sm font-medium text-blue-600 mt-1">
                      Estimated delivery in 2-3 days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/medicine-store")}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
