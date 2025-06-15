import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Account = () => {
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const navigate = useNavigate();

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const accountMenuItems = [
    {
      icon: <FaUser className="text-xl" />,
      label: "Profile",
      action: () => navigate("/my-profile"),
    },
    {
      icon: <FaHeart className="text-xl" />,
      label: "Wishlist",
      action: () => navigate("/wishlist"),
    },
    {
      icon: <FaSignOutAlt className="text-xl" />,
      label: "Logout",
      action: handleLogout,
    },
  ];

  return userData ? (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/medicine-store")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
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
          <span>Back to Store</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
            <div className="flex flex-col items-center gap-4 mb-6">
              <img
                className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                src={userData.image}
                alt="User"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {userData.name}
              </h2>
              <p className="text-sm text-gray-600">{userData.email}</p>
            </div>

            <div className="space-y-2">
              {accountMenuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
            <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900 text-transparent bg-clip-text shadow-md hover:scale-105 hover:shadow-blue-500/50 transition duration-300 ease-in-out mb-8">
              Account Information
            </h1>

            {/* Contact Info */}
            <div className="space-y-4">
              <p className="text-lg font-semibold text-blue-600">
                Contact Information
              </p>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
                <span className="font-medium">Email:</span>
                <span className="text-blue-600 break-all">
                  {userData.email}
                </span>

                <span className="font-medium">Phone:</span>
                {isEdit ? (
                  <input
                    type="text"
                    className="bg-gray-100 backdrop-blur-md border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span className="text-blue-600">{userData.phone}</span>
                )}

                <span className="font-medium">Address:</span>
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      className="w-full bg-gray-100 backdrop-blur-md border border-gray-300 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={userData.address.line1}
                    />
                    <input
                      className="w-full bg-gray-100 backdrop-blur-md border border-gray-300 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={userData.address.line2}
                    />
                  </div>
                ) : (
                  <span className="text-gray-600 whitespace-pre-line">
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </span>
                )}
              </div>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Basic Info */}
            <div className="space-y-4">
              <p className="text-lg font-semibold text-blue-600">
                Basic Information
              </p>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
                <span className="font-medium">Gender:</span>
                {isEdit ? (
                  <select
                    className="bg-gray-100 backdrop-blur-md border border-gray-300 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    value={userData.gender}
                  >
                    <option value="Not Selected">Not Selected</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <span className="text-gray-600">{userData.gender}</span>
                )}

                <span className="font-medium">Birthday:</span>
                {isEdit ? (
                  <input
                    className="bg-gray-100 backdrop-blur-md border border-gray-300 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500"
                    type="date"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    value={userData.dob}
                  />
                ) : (
                  <span className="text-gray-600">{userData.dob}</span>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              {isEdit ? (
                <button
                  onClick={updateUserProfileData}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-md"
                >
                  Save Information
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Account;
