import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-lg mb-6 text-center">
          Thank you for your purchase. Your order has been placed and will be
          processed soon.
          <br />
          {paymentMethod === "cod" ? (
            <>
              You chose{" "}
              <span className="font-semibold text-blue-600">
                Cash on Delivery
              </span>{" "}
              as your payment method.
            </>
          ) : paymentMethod ? (
            <>
              You chose{" "}
              <span className="font-semibold text-blue-600">
                {paymentMethod.replace(/^(.)/, (c) => c.toUpperCase())}
              </span>{" "}
              as your payment method.
            </>
          ) : null}
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          onClick={() => navigate("/medicine-store")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
