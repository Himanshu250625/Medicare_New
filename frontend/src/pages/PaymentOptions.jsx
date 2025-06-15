import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaMoneyBillWave,
  FaUniversity,
  FaArrowLeft,
  FaMobileAlt,
} from "react-icons/fa";

const paymentMethods = [
  {
    id: "card",
    label: "Credit/Debit Card",
    icon: <FaCreditCard className="text-xl" />,
  },
  {
    id: "upi",
    label: "UPI",
    icon: <FaMobileAlt className="text-xl" />,
  },
  {
    id: "netbanking",
    label: "Net Banking",
    icon: <FaUniversity className="text-xl" />,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: <FaMoneyBillWave className="text-xl" />,
  },
];

const PaymentOptions = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const orderTotal = 1234; // Example, replace with real total if available

  const handleProceed = () => {
    // Redirect to payment processing or confirmation page
    navigate("/order-confirmation", { state: { paymentMethod: selected } });
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
        <div className="mb-8 p-4 bg-blue-50 rounded-lg flex justify-between items-center">
          <span className="font-medium text-gray-700">Order Total:</span>
          <span className="text-xl font-bold text-blue-700">₹{orderTotal}</span>
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
