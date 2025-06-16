import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMobileAlt, FaArrowLeft } from "react-icons/fa";

const upiApps = [
  {
    name: "Google Pay",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzaBF2M98Xp1_7uBP4sVRzl7D7L_DrNrMzQ&s",
    color: "bg-[#F7F7F7]",
    borderColor: "border-[#E0E0E0]",
    hoverColor: "hover:bg-[#F0F0F0]",
  },
  {
    name: "PhonePe",
    logo: "https://i.pinimg.com/474x/81/aa/84/81aa84e607f0a0432c54fd11642b3d0d.jpg",
    color: "bg-[#5F259F]",
    borderColor: "border-[#5F259F]",
    hoverColor: "hover:bg-[#4A1D7D]",
  },
  {
    name: "Paytm",
    logo: "https://seeklogo.com/images/P/paytm-logo-092D33ED90-seeklogo.com.png",
    color: "bg-[#00BAF2]",
    borderColor: "border-[#00BAF2]",
    hoverColor: "hover:bg-[#0099CC]",
  },
  {
    name: "Amazon Pay",
    logo: "https://eu-images.contentstack.com/v3/assets/blt7dacf616844cf077/bltc7e9ccc31d38b301/679942b638500824a637c176/AmazonPayLogo-543.jpg",
    color: "bg-[#FF9900]",
    borderColor: "border-[#FF9900]",
    hoverColor: "hover:bg-[#E68A00]",
  },
];

const UPIPayment = () => {
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      navigate("/order-confirmation", { state: { paymentMethod: "upi" } });
    }, 1500);
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
          <FaMobileAlt className="text-2xl text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">UPI Payment</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UPI ID
            </label>
            <input
              type="text"
              placeholder="example@upi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-4">Popular UPI Apps</h3>
            <div className="grid grid-cols-2 gap-4">
              {upiApps.map((app) => (
                <button
                  key={app.name}
                  type="button"
                  onClick={() => setSelectedApp(app.name)}
                  className={`flex items-center justify-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    selectedApp === app.name
                      ? `${app.color} ${app.borderColor} ${
                          app.name === "Google Pay"
                            ? "text-gray-800"
                            : "text-white"
                        }`
                      : "bg-white border-gray-200 hover:border-blue-500"
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    <img
                      src={app.logo}
                      alt={app.name}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="font-medium">{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">How to Pay</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>Enter your UPI ID</li>
              <li>Select your preferred UPI app</li>
              <li>Complete the payment in your UPI app</li>
              <li>Wait for the confirmation</li>
            </ol>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default UPIPayment;
