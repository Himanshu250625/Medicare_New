import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard, FaMobile } from "react-icons/fa";
import { assets } from "../../assets/assets";
import StripePaymentForm from "./StripePaymentForm";
import RazorpayPaymentForm from "./RazorpayPaymentForm";

const PaymentGateway = ({ appointmentId, amount, onPaymentComplete }) => {
  const navigate = useNavigate();
  const [selectedGateway, setSelectedGateway] = useState(null);

  const handleBack = () => {
    if (selectedGateway) {
      setSelectedGateway(null);
    } else {
      navigate(-1);
    }
  };

  if (selectedGateway === "stripe") {
    return (
      <StripePaymentForm
        amount={amount}
        onPaymentComplete={onPaymentComplete}
      />
    );
  }

  if (selectedGateway === "razorpay") {
    return (
      <RazorpayPaymentForm
        amount={amount}
        onPaymentComplete={onPaymentComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft /> Back to Appointments
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Choose Payment Method
          </h1>
          <p className="text-gray-600">
            Select your preferred payment gateway to proceed
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Amount to Pay:</span>
            <span className="font-bold text-gray-900">₹{amount}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedGateway("stripe")}
            className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <img
              src={assets.stripe_logo}
              alt="Stripe"
              className="h-8 w-auto object-contain mb-4"
            />
            <div className="flex items-center gap-2 text-gray-700">
              <FaCreditCard />
              <span>Pay with Card</span>
            </div>
          </button>

          <button
            onClick={() => setSelectedGateway("razorpay")}
            className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <img
              src={assets.razorpay_logo}
              alt="Razorpay"
              className="h-8 w-auto object-contain mb-4"
            />
            <div className="flex items-center gap-2 text-gray-700">
              <FaMobile />
              <span>Pay with UPI/Card</span>
            </div>
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500 text-center">
          <p>Your payment is secured with industry-standard encryption.</p>
          <p className="mt-1">
            We never store your payment details on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
