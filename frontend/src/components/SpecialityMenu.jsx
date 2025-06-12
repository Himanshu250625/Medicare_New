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
                        className='group flex flex-col items-center p-6 rounded-2xl bg-white/40 backdrop-blur-xl shadow-lg border border-white/20 hover:bg-white/60 hover:backdrop-blur-2xl hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-500 hover:scale-105 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:rounded-2xl after:p-[2px] after:bg-gradient-to-r after:from-blue-400/50 after:via-blue-300/50 after:to-blue-400/50 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:-z-10' 
                        key={index}
                    >
                        <div className='relative w-20 h-20 sm:w-24 sm:h-24 mb-4 bg-gradient-to-br from-blue-50/90 to-white rounded-full p-3 shadow-inner group-hover:shadow-xl group-hover:shadow-blue-200/30 transition-all duration-500'>
                            <img 
                                className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 group-hover:drop-shadow-xl' 
                                src={item.image} 
                                alt={item.speciality} 
                            />
                        </div>
                        <p className='text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-500 group-hover:drop-shadow-md'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu