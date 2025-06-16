import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaUniversity,
  FaArrowLeft,
  FaMobileAlt,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const paymentMethods = [
  {
    id: "card",
    label: "Credit/Debit Card",
    icon: <FaCreditCard className="text-xl" />,
    path: "/payment/card",
  },
  {
    id: "upi",
    label: "UPI",
    icon: <FaMobileAlt className="text-xl" />,
    path: "/payment/upi",
  },
  {
    id: "netbanking",
    label: "Net Banking",
    icon: <FaUniversity className="text-xl" />,
    path: "/payment/netbanking",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: <FaMoneyBillWave className="text-xl" />,
    path: "/payment/cod",
  },
];

const PaymentOptions = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const { getCartTotal } = useCart();

  // Calculate total with tax
  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handleProceed = () => {
    const selectedMethod = paymentMethods.find(
      (method) => method.id === selected
    );
    if (selectedMethod) {
      navigate(selectedMethod.path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft /> Back to Cart
        </button>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Select Payment Method
        </h1>

        {/* Order Summary */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (18%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid gap-4 mb-8">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition
                ${
                  selected === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }
                hover:border-blue-300`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selected === method.id}
                onChange={() => setSelected(method.id)}
                className="form-radio accent-blue-600"
              />
              {method.icon}
              <span className="font-medium text-gray-700">{method.label}</span>
            </label>
          ))}
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          disabled={!selected}
          onClick={handleProceed}
        >
          {selected === "cod" ? "Place Order" : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
