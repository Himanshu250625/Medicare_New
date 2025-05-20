import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import heroImg01 from "../assets/hero-img01.png";
import heroImg02 from "../assets/hero-img02.png";
import heroImg03 from "../assets/hero-img03.png";
import group_profiles from "../assets/group_profiles.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="relative flex flex-col lg:flex-row bg-gradient-to-br from-blue-600 via-blue-400 to-blue-700 rounded-2xl px-6 sm:px-10 lg:px-20 py-10 gap-6 overflow-hidden shadow-2xl mt-6 ">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-300/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-100/10 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl pointer-events-none"></div>
      </div>

      {/* Left: Heading */}
      <div
        className="relative flex flex-col items-start justify-center gap-6 text-white md:w-1/2 z-10"
        data-aos="fade-right"
      >
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-lg">
            Book Appointment <br />
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-100">
              With Trusted Doctors
            </span>
          </h1>
          <p className="text-white/90 text-lg sm:text-xl max-w-xl font-light animate-fade-in">
            Experience healthcare at your fingertips with our expert medical professionals.
          </p>
        </div>

        <div className="flex items-start gap-6 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-white/50">
              <img 
                src={group_profiles} 
                alt="Group Profiles" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-bold">2k+</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-blue-50 text-sm font-medium">Active Community</p>
            </div>
            <p className="text-blue-50 text-sm sm:text-base font-light leading-relaxed max-w-md">
              Join our community of satisfied patients. 
            </p>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.8
              </span>
              <span>•</span>
              <span>Trusted by 2000+ patients</span>
            </div>
          </div>
        </div>

        <a
          href="#speciality"
          className="group flex items-center gap-3 bg-gradient-to-r from-white to-blue-100 text-blue-700 font-semibold text-base px-10 py-4 rounded-full mt-4 shadow-lg hover:from-blue-100 hover:to-white hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <img 
            src={assets.arrow_icon} 
            alt="Arrow" 
            className="w-4 group-hover:translate-x-1 transition-transform duration-300" 
          />
        </a>
      </div>

      {/* Right: Image Layout */}
      <div className="relative flex flex-row justify-center gap-6 md:gap-10 md:w-1/2 z-10" data-aos="zoom-in">
        {/* Left main image */}
        <div
          className="flex justify-center items-center"
          data-aos="zoom-in"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl transform rotate-3"></div>
            <img
              src={heroImg01}
              alt="Hero 1"
              className="relative w-[160px] sm:w-[240px] md:w-[260px] lg:w-[250px] rounded-2xl shadow-2xl border-2 border-blue-100 transform hover:scale-105 transition-transform duration-300 bg-white/60 backdrop-blur-md"
            />
          </div>
        </div>

        {/* Right stacked images */}
        <div className="flex flex-col justify-evenly gap-6 mt-6 sm:mt-10">
          <div className="relative" data-aos="fade-up">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl transform -rotate-3"></div>
            <img
              src={heroImg02}
              alt="Hero 2"
              className="relative w-[140px] sm:w-[160px] md:w-[180px] rounded-2xl shadow-2xl border-2 border-blue-100 transform hover:scale-105 transition-transform duration-300 bg-white/60 backdrop-blur-md"
            />
          </div>
          <div className="relative" data-aos="fade-up" data-aos-delay="200">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl transform rotate-3"></div>
            <img
              src={heroImg03}
              alt="Hero 3"
              className="relative w-[140px] sm:w-[160px] md:w-[180px] rounded-2xl shadow-2xl border-2 border-blue-100 transform hover:scale-105 transition-transform duration-300 bg-white/60 backdrop-blur-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
