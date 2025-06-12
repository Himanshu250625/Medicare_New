import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {

    const navigate = useNavigate()
    useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
        });
      }, []);
    
    return (
        <div className='relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-blue-600 via-blue-400 to-blue-700 rounded-3xl shadow-2xl px-6 sm:px-10 md:px-14 lg:px-20 py-10 md:py-16 my-20 md:mx-10 overflow-hidden' data-aos="fade-up">
            {/* Glassy overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl pointer-events-none"></div>

            {/* ------- Left Side ------- */}
            <div className='relative flex-1 z-10 flex flex-col gap-6 items-start py-6 md:py-0'>
                <div className='space-y-2'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-lg'>
                        Book Appointment
                    </h1>
                    <div className='flex items-center gap-3 mt-2'>
                        <span className='inline-flex items-center gap-2 bg-white/70 text-blue-700 font-semibold text-xs px-4 py-1 rounded-full shadow backdrop-blur-md animate-fade-in'>
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 7.293a1 1 0 00-1.414 0L9 12.586 7.707 11.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" /></svg>
                            100+ Trusted Doctors
                        </span>
                        <span className='inline-flex items-center gap-1 bg-white/70 text-yellow-600 font-semibold text-xs px-3 py-1 rounded-full shadow backdrop-blur-md animate-fade-in'>
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            4.8/5 Rating
                        </span>
                    </div>
                    <p className='text-white/90 text-lg font-light max-w-lg mt-4 animate-fade-in'>
                        With 100+ trusted doctors, book your appointment in seconds and experience premium healthcare at your fingertips.
                    </p>
                </div>
                <button
                    onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                    className='group bg-gradient-to-r from-white to-blue-100 text-blue-700 font-semibold text-base px-10 py-4 rounded-full mt-2 shadow-lg hover:from-blue-100 hover:to-white hover:scale-105 transition-all duration-300 flex items-center gap-3'
                    data-aos="fade-up"
                >
                    <svg className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" /></svg>
                    Create account
                </button>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:flex items-center justify-center md:w-1/2 lg:w-[370px] relative z-10' data-aos="zoom-in">
                <div className='bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-100 p-4 flex items-center justify-center'>
                    <img className='w-full max-w-xs md:max-w-sm lg:max-w-md object-contain' src={assets.appointment_img} alt="Appointment" />
                </div>
            </div>
        </div>
    )
}

export default Banner