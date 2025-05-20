import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.youtube.com",
    icon: <AiFillYoutube className="w-5 h-5" />,
  },
  {
    path: "https://github.com",
    icon: <AiFillGithub className="w-5 h-5" />,
  },
  {
    path: "https://www.instagram.com",
    icon: <AiOutlineInstagram className="w-5 h-5" />,
  },
  {
    path: "https://www.linkedin.com",
    icon: <RiLinkedinFill className="w-5 h-5" />,
  },
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
];

const quickLinks02 = [
  {
    path: "/find-a-doctor",
    display: "Find a Doctor",
  },
  {
    path: "/",
    display: "Request an Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get a Opinion",
  },
];

const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/Contact",
    display: "Contact Us",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-gradient-to-br from-blue-50 to-blue-100 mt-20 w-full">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Company Info */}
              <div className="space-y-3">
                <img src={logo} alt="Logo" className="h-12" />
                <p className="text-gray-600 text-sm leading-relaxed">
                  Copyright {year} developed by Himanshu Singh all right reserved.
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((link, index) => (
                    <Link
                      to={link.path}
                      key={index}
                      className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 
                      flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white 
                      hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      {link.icon}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h2>
                <ul className="space-y-2">
                  {quickLinks01.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.path}
                        className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors duration-300"></span>
                        {item.display}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* I want to */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">I want to:</h2>
                <ul className="space-y-2">
                  {quickLinks02.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.path}
                        className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors duration-300"></span>
                        {item.display}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Support</h2>
                <ul className="space-y-2">
                  {quickLinks03.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.path}
                        className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors duration-300"></span>
                        {item.display}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Border */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-center text-gray-500 text-xs">
                © {year} Medicare. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
