import React, { useRef, useEffect } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS
import patientAvatar from "../assets/patient-avatar.png";
import { HiStar } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";
import { BsTwitter, BsLinkedin } from "react-icons/bs";

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
      role: "Patient",
      feedback:
        "I have taken medical services from them. They treat so well and they are providing the best medical services.",
      date: "March 15, 2024",
      rating: 5,
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Ashwani",
      role: "Patient",
      feedback:
        "The experience was great. Their services are exceptional and I would recommend them.",
      date: "March 10, 2024",
      rating: 5,
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Manohar",
      role: "Patient",
      feedback:
        "I received the best medical care here. They are professional and supportive.",
      date: "March 5, 2024",
      rating: 5,
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Harsh Singh",
      role: "Patient",
      feedback:
        "I received the best medical care here. They are professional and supportive.",
      date: "March 1, 2024",
      rating: 5,
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Divyanshu Singh",
      role: "Patient",
      feedback:
        "I received the best medical care here. They are professional and supportive.",
      date: "February 28, 2024",
      rating: 5,
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
  ];

  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="testimonial-swiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl cursor-pointer group mb-6"
              onMouseEnter={() => swiperRef.current.slideTo(index)}
              data-aos="fade-up"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="absolute top-6 right-6 text-blue-500/20 text-4xl transform -rotate-12" />
              
              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={patientAvatar}
                    alt={testimonial.name}
                    className="w-[60px] h-[60px] rounded-full object-cover border-2 border-blue-500/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {testimonial.role}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <HiStar 
                    key={i} 
                    className="text-yellow-400 w-5 h-5 transform transition-transform hover:scale-110" 
                  />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {testimonial.feedback}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <a 
                  href={testimonial.social.twitter} 
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsTwitter className="w-5 h-5" />
                </a>
                <a 
                  href={testimonial.social.linkedin} 
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles for pagination dots */}
      <style jsx>{`
        .testimonial-swiper .swiper-pagination {
          margin-top: 40px; /* Added margin top */
        }

        .testimonial-swiper .swiper-pagination-bullet {
          background: #007bff; /* Default color */
          opacity: 0.5;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #0056b3; /* Active color */
          opacity: 1;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;
