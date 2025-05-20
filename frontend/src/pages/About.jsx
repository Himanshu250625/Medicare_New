import React from 'react'
import { assets } from '../assets/assets'
import { FaBullseye, FaHandshake, FaUserCheck } from 'react-icons/fa';

const About = () => {
  return (
    <section className='py-10 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 min-h-screen'>
      <div className='container mx-auto max-w-[1200px]'>

        {/* ---------- ABOUT US Section ---------- */}
        <div className='text-center mb-16'>
          <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg mb-4'>
            ABOUT <span className='text-indigo-600'>US</span>
          </h1>
          <p className='text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed'>
            Welcome to Medicare, your trusted partner in managing your healthcare needs conveniently and efficiently.
          </p>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-12 items-center'>
          {/* About Image */}
          <div className='w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl border border-white/30 bg-blue-100/30 backdrop-blur-sm'>
             <img className='w-full h-auto object-cover' src={assets.about_image} alt="About Us" />
          </div>

          {/* About Content */}
          <div className='flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-700 leading-relaxed'>
            <p>At Medicare, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p>Medicare is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Medicare is here to support you every step of the way.</p>
            <div>
                <h3 className='text-lg font-bold text-blue-600 mb-2'>Our Vision</h3>
                <p>Our vision at Medicare is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
            </div>
          </div>
        </div>

        {/* ---------- WHY CHOOSE US Section ---------- */}
        <div className='text-center my-16'>
          <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg mb-4'>
            WHY <span className='text-indigo-600'>CHOOSE US</span>
          </h2>
          <p className='text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed'>
             Discover the benefits of using Medicare for your healthcare journey.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
          {/* Reason Card 1: Efficiency */}
          <div className='border border-white/30 px-8 py-12 rounded-2xl flex flex-col items-center text-center gap-6 text-gray-700 cursor-pointer backdrop-blur-lg bg-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300'>
             <FaBullseye className='text-blue-600 text-4xl mb-4' />
             <h3 className='text-xl font-bold text-gray-800 mb-2'>EFFICIENCY</h3>
             <p className='text-sm leading-relaxed'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>

          {/* Reason Card 2: Convenience */}
          <div className='border border-white/30 px-8 py-12 rounded-2xl flex flex-col items-center text-center gap-6 text-gray-700 cursor-pointer backdrop-blur-lg bg-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300'>
              <FaHandshake className='text-green-600 text-4xl mb-4' />
              <h3 className='text-xl font-bold text-gray-800 mb-2'>CONVENIENCE</h3>
              <p className='text-sm leading-relaxed'>Access to a network of trusted healthcare professionals in your area.</p>
          </div>

          {/* Reason Card 3: Personalization */}
          <div className='border border-white/30 px-8 py-12 rounded-2xl flex flex-col items-center text-center gap-6 text-gray-700 cursor-pointer backdrop-blur-lg bg-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300'>
             <FaUserCheck className='text-purple-600 text-4xl mb-4' />
             <h3 className='text-xl font-bold text-gray-800 mb-2'>PERSONALIZATION</h3>
             <p className='text-sm leading-relaxed'>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
