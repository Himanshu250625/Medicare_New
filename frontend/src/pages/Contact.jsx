import React from 'react'
import { assets } from '../assets/assets'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className='py-10 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 min-h-screen'>
      <div className='container mx-auto max-w-[1200px]'>

        {/* ---------- CONTACT US Section ---------- */}
        <div className='text-center mb-16'>
          <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg mb-4'>
            CONTACT <span className='text-indigo-600'>US</span>
          </h1>
          <p className='text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed'>
            Get in touch with us for any inquiries or support.
          </p>
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-20 items-start'>
          {/* Contact Image */}
          <div className='w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl border border-white/30 bg-blue-100/30 backdrop-blur-sm transform transition-all duration-300 hover:shadow-2xl hover:border-blue-400 h-[300px] sm:h-[350px] md:h-[400px]'>
             <img className='w-full h-full object-cover' src={assets.contact_image} alt="Contact Us" />
          </div>

          {/* Contact Info Card */}
          <div className='flex flex-col justify-center gap-6 md:w-1/2 p-8 rounded-2xl bg-white/50 backdrop-blur-lg shadow-xl border border-white/20'>
            
            {/* Our Office */}
            <div>
                <h3 className='font-bold text-xl text-gray-800 mb-3'>OUR OFFICE</h3>
                <p className='flex items-start gap-2 text-gray-600 mb-2'>
                   <FaMapMarkerAlt className='text-blue-500 mt-1 flex-shrink-0' />
                   <span>Knowledge Park 3, Greater Noida</span>
                </p>
                <p className='flex items-center gap-2 text-gray-600 mb-2'>
                   <FaPhone className='text-blue-500' />
                   <span>(91) 7084721408</span>
                </p>
                <p className='flex items-center gap-2 text-gray-600'>
                   <FaEnvelope className='text-blue-500' />
                   <span>shyambabu_jayswal@yahoo.com</span>
                </p>
            </div>

            {/* Careers */}
            <div>
                <h3 className='font-bold text-xl text-gray-800 mb-3'>CAREERS AT MEDICARE</h3>
                <p className='text-gray-600 mb-4'>Learn more about our teams and job openings.</p>
                 <button className='bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300'>
                    Explore Jobs
                 </button>
            </div>
          </div>
        </div>

        {/* ---------- Contact Form Section ---------- */}
        <div className='my-16 p-8 rounded-2xl bg-white/50 backdrop-blur-lg shadow-xl border border-white/20 max-w-[800px] mx-auto'>
          <h2 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg mb-8 text-center'>
            Send us a message
          </h2>
          <form className='flex flex-col gap-6'>
            {/* Name Input */}
            <div>
              <label htmlFor='name' className='block text-gray-700 font-semibold mb-2'>Your Name</label>
              <input 
                type='text' 
                id='name' 
                name='name'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                placeholder='Enter your name'
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>Your Email</label>
              <input 
                type='email' 
                id='email' 
                name='email'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                placeholder='Enter your email'
              />
            </div>

            {/* Subject Input */}
            <div>
              <label htmlFor='subject' className='block text-gray-700 font-semibold mb-2'>Subject</label>
              <input 
                type='text' 
                id='subject' 
                name='subject'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                placeholder='Enter the subject'
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor='message' className='block text-gray-700 font-semibold mb-2'>Your Message</label>
              <textarea 
                id='message' 
                name='message'
                rows='6'
                className='w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none'
                placeholder='Enter your message'
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type='submit'
              className='w-full bg-blue-600 text-white text-lg font-semibold px-10 py-3 rounded-full mt-4 transition-colors duration-300 hover:bg-blue-700 shadow-lg'>
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}

export default Contact
