import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import heroImg01 from "../assets/hero-img01.png";
import heroImg02 from "../assets/hero-img02.png";
import heroImg03 from "../assets/hero-img03.png";
import AOS from "aos";
import "aos/dist/aos.css";
const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out",
      once: true, // Animation should happen only once
    });
  }, []);
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* --------- Header Left --------- */}
      <div
        className="w-1/2 lg:w-1/3 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]"
        data-aos="fade-right"
      >
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-25" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* --------- Header Right --------- */}
      <div className="flex gap-[30px] justify-end">
        <div
          className="flex justify-center items-center w-full"
          data-aos="zoom-in"
        >
          <img className="w-[350px] " src={heroImg01} alt="" />
        </div>
        <div className="mt-[80px] h-[480px] flex flex-col justify-evenly">
          <img
            className="w-full mb-[30px]"
            src={heroImg02}
            alt=""
            data-aos="fade-up"
          />
          <img
            className="w-full"
            src={heroImg03}
            alt=""
            data-aos="fade-up"
            data-aos-delay="200"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
