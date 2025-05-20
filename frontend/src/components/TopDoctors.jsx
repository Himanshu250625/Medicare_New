import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-6 my-16 text-[#262626] md:mx-10'>
            <h1 className='text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 mb-2'>
                Top Doctors to Book
            </h1>
            <p className='sm:w-1/2 text-center text-lg text-gray-500 font-light mb-2'>
                Simply browse through our extensive list of trusted doctors.
            </p>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='bg-white/80 backdrop-blur-md border-2 border-blue-200 rounded-2xl shadow-lg overflow-hidden cursor-pointer min-h-[370px] hover:-translate-y-2 hover:shadow-blue-200/60 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 flex flex-col'
                        key={index}
                    >
                        <img className='bg-[#EAEFFF] w-full h-56 object-cover rounded-t-2xl' src={item.image} alt="" />
                        <div className='p-6 flex-1 flex flex-col gap-2'>
                            <div className='flex items-center gap-2'>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${item.available ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                    {item.available ? 'Available' : 'Not Available'}
                                </span>
                            </div>
                            <p className='text-[#262626] text-lg font-bold mt-1'>{item.name}</p>
                            <p className='text-blue-500 text-sm italic tracking-wide'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-3 rounded-full mt-10 font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-300'
            >
                See More
            </button>
        </div>

    )
}

export default TopDoctors