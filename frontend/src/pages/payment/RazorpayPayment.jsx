import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const RazorpayPayment = ({ appointmentId, amount, onPaymentComplete }) => {
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "Appointment Payment",
          description: "Appointment Payment",
          order_id: data.order.id,
          receipt: data.order.receipt,
          handler: async (response) => {
            try {
              const { data } = await axios.post(
                backendUrl + "/api/user/verify-razorpay",
                response,
                { headers: { token } }
              );
              if (data.success) {
                toast.success("Payment successful!");
                if (onPaymentComplete) {
                  onPaymentComplete();
                } else {
                  navigate("/my-appointments");
                }
              } else {
                toast.error(data.message);
              }
            } catch (error) {
              console.log(error);
              toast.error(error.message);
            }
          },
          prefill: {
            name: "Patient Name",
            email: "patient@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#2563EB",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft /> Back to Payment Options
        </button>

        <div className="flex items-center gap-3 mb-6">
          <img
            src={assets.razorpay_logo}
            alt="Razorpay"
            className="h-8 w-auto object-contain"
          />
          <h1 className="text-2xl font-bold text-gray-800">Razorpay Payment</h1>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700">Amount to Pay:</span>
            <span className="font-bold text-gray-900">₹{amount}</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRazorpayPayment}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>
        </div>

        {loading && (
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>
            By proceeding with the payment, you agree to our terms and
            conditions.
          </p>
          <p className="mt-2">
            Your payment is secured by Razorpay's advanced security measures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RazorpayPayment;
