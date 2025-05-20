import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-6 py-20 bg-gradient-to-b from-white to-gray-50'>
            <div className='text-center space-y-4 max-w-3xl px-4'>
                <h1 className='text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-400 to-blue-600 drop-shadow-md'>
                    Find by Speciality
                </h1>
                <p className='text-gray-500 text-lg font-light leading-relaxed animate-fade-in'>
                    Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                </p>
            </div>
            
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 px-4 max-w-7xl w-full'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => scrollTo(0, 0)} 
                        className='group flex flex-col items-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 hover:bg-white/90 hover:backdrop-blur-md hover:shadow-xl transition-all duration-300 hover:scale-105' 
                        key={index}
                    >
                        <div className='relative w-20 h-20 sm:w-24 sm:h-24 mb-4 bg-gradient-to-br from-blue-50 to-white rounded-full p-3 shadow-inner'>
                            <img 
                                className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-300' 
                                src={item.image} 
                                alt={item.speciality} 
                            />
                        </div>
                        <p className='text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu