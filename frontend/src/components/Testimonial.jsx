import React, { useRef, useEffect } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS
import patientAvatar from "../assets/patient-avatar.png";
import { HiStar } from "react-icons/hi";

const Testimonial = () => {
  // Ref to control Swiper instance
  const swiperRef = useRef(null);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  // Sample testimonials data
  const testimonials = [
    {
      name: "Himanshu Singh",
      feedback:
        "I have taken medical services from them. They treat so well and they are providing the best medical services.",
    },
    {
      name: "Ashwani",
      feedback:
        "The experience was great. Their services are exceptional and I would recommend them.",
    },
   {
      name: "Manohar",
       feedback:
        "I received the best medical care here. They are professional and supportive.",
    },
   {
      name: "Harsh Singh",
       feedback:
        "I received the best medical care here. They are professional and supportive.",
    },
   {
      name: "Divyanshu Singh",
       feedback:
        "I received the best medical care here. They are professional and supportive.",
    },
  ];

  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div
              className="py-[40px] px-5 rounded-3 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50 cursor-pointer" // Updated hover effects
              onMouseEnter={() => swiperRef.current.slideTo(index)}
              data-aos="fade-up"
            >
              <div className="flex items-center gap-[13px]">
                <img
                  src={patientAvatar}
                  alt={testimonial.name}
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                    {testimonial.name}
                  </h4>
                  <div className="flex items-center gap-[2px]">
                    <HiStar className="text-yellow-500 w-[18px] h-5" />
                    <HiStar className="text-yellow-500 w-[18px] h-5" />
                    <HiStar className="text-yellow-500 w-[18px] h-5" />
                    <HiStar className="text-yellow-500 w-[18px] h-5" />
                    <HiStar className="text-yellow-500 w-[18px] h-5" />
                  </div>
                </div>
              </div>
              <p className="text-[16px] leading-7 mt-4 text-gray-600 font-[400]">
                {testimonial.feedback}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
