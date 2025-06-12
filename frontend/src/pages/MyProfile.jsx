import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData ? (
    <div className="max-w-xl mx-auto p-6 mt-6 rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 text-sm text-gray-800 transition-all duration-300">
  <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-center bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900 text-transparent bg-clip-text shadow-md hover:scale-105 hover:shadow-blue-500/50 transition duration-300 ease-in-out mt-6 mb-10 tracking-wide">
  Profile & Patient's Information
</h1>



      <div className="flex flex-col items-center gap-4">
        <label htmlFor="image" className="relative cursor-pointer group">
          <img
            className={`w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg transition-all duration-300 ${isEdit ? 'opacity-80 group-hover:opacity-100' : ''}`}
            src={image ? URL.createObjectURL(image) : userData.image}
            alt="User"
          />
          {isEdit && (
            <>
              <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <img className="w-8" src={assets.upload_icon} alt="Upload Icon" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </>
          )}
        </label>

        {isEdit ? (
          <input
            className="text-3xl font-semibold text-center bg-gray-100 backdrop-blur-md border border-gray-300 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            type="text"
            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            value={userData.name}
          />
        ) : (
          <p className="text-3xl font-semibold mt-2">{userData.name}</p>
        )}
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Contact Info */}
      <div className="space-y-4">
        <p className="text-lg font-semibold text-primary">Contact Information</p>
        <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
          <span className="font-medium">Email:</span>
          <span className="text-blue-600 break-all">{userData.email}</span>

          <span className="font-medium">Phone:</span>
          {isEdit ? (
            <input
              type="text"
              className="bg-gray-100 backdrop-blur-md border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
              value={userData.phone}
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <span className="text-blue-600">{userData.phone}</span>
          )}

          <span className="font-medium">Address:</span>
          {isEdit ? (
            <div className="space-y-2">
              <input
                className="w-full bg-gray-100 backdrop-blur-md border border-gray-300 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-primary"
                type="text"
                onChange={(e) =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />
              <input
                className="w-full bg-white/30 backdrop-blur-md border border-white/40 rounded px-3 py-1"
                type="text"
                onChange={(e) =>
                  setUserData(prev => ({
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
        <p className="text-lg font-semibold text-primary">Basic Information</p>
        <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
          <span className="font-medium">Gender:</span>
          {isEdit ? (
            <select
              className="bg-gray-100 backdrop-blur-md border border-gray-300 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
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
              className="bg-gray-100 backdrop-blur-md border border-gray-300 rounded px-3 py-1 outline-none focus:ring-2 focus:ring-primary"
              type="date"
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
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
            className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all shadow-md"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all shadow-md"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  ) : null
}

export default MyProfile
