import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import logo from "../assets/logo.png";
import heroImg01 from "../assets/hero-img01.png";
import heroImg02 from "../assets/hero-img02.png";
import heroImg03 from "../assets/hero-img03.png";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { FaUser, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <>
      <div className='sticky top-0 z-40 w-full bg-white/60 backdrop-blur-md shadow-lg transition-all duration-300'>
        <div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-3'>
          <img onClick={() => navigate('/')} className='w-44 cursor-pointer drop-shadow-sm' src={logo} alt="" />
          <ul className='md:flex items-center gap-8 font-semibold text-base hidden'>
            <NavLink to='/' className={({ isActive }) => `relative px-2 py-1 transition group ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              <li>HOME</li>
              <span className='absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full'></span>
            </NavLink>
            <NavLink to='/doctors' className={({ isActive }) => `relative px-2 py-1 transition group ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              <li>ALL DOCTORS</li>
              <span className='absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full'></span>
            </NavLink>
            <NavLink to='/about' className={({ isActive }) => `relative px-2 py-1 transition group ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              <li>ABOUT</li>
              <span className='absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full'></span>
            </NavLink>
            <NavLink to='/contact' className={({ isActive }) => `relative px-2 py-1 transition group ${isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
              <li>CONTACT</li>
              <span className='absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 rounded-full'></span>
            </NavLink>
          </ul>

          <div className='flex items-center gap-4'>
            {
              token && userData
                ? <div className="flex items-center gap-2 cursor-pointer group relative">
                  <img
                    className="w-9 h-9 rounded-full border-2 border-solid border-gray-300 shadow-md group-hover:shadow-lg transition-all duration-300"
                    src={userData.image}
                    alt="User"
                  />
                  <img
                    className="w-3 transition-transform duration-300 group-hover:rotate-180"
                    src={assets.dropdown_icon}
                    alt="Dropdown"
                  />
                  {/* Dropdown Menu */}
                  <div className="absolute top-0 right-0 pt-14 z-30 hidden group-hover:block">
                    <div className="min-w-48 bg-white/80 backdrop-blur-md shadow-xl rounded-xl px-4 py-3 flex flex-col gap-3 text-sm font-medium text-gray-700 transition-all duration-300 border border-gray-100">
                      <p
                        onClick={() => navigate('/my-profile')}
                        className="hover:text-primary cursor-pointer transition flex items-center gap-2"
                      >
                        <FaUser className="w-4 h-4" />
                        My Profile
                      </p>
                      <p
                        onClick={() => navigate('/my-appointments')}
                        className="hover:text-primary cursor-pointer transition flex items-center gap-2"
                      >
                        <FaCalendarAlt className="w-4 h-4" />
                        My Appointments
                      </p>
                      <p
                        onClick={logout}
                        className="hover:text-red-500 cursor-pointer transition flex items-center gap-2"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
                : <button onClick={() => navigate('/login')} className='bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block shadow hover:shadow-md transition'>Create account</button>
            }
            <img onClick={() => setShowMenu(true)} className='w-6 md:hidden z-50 relative' src={assets.menu_icon} alt="" />
          </div>
        </div>
      </div>
      {/* ---- Mobile Menu Overlay (root level) ---- */}
      {showMenu && (
        <div className='fixed inset-0 z-[999] bg-white h-screen w-screen flex flex-col items-center'>
          <div className='flex items-center justify-between px-5 py-6 w-full max-w-2xl mx-auto'>
            <img src={logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="" />
          </div>
          <ul className='flex flex-col items-center justify-center flex-1 gap-8 text-2xl font-semibold w-full'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><li className='px-4 py-2 rounded transition hover:bg-gray-100'>HOME</li></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><li className='px-4 py-2 rounded transition hover:bg-gray-100'>ALL DOCTORS</li></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><li className='px-4 py-2 rounded transition hover:bg-gray-100'>ABOUT</li></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><li className='px-4 py-2 rounded transition hover:bg-gray-100'>CONTACT</li></NavLink>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar