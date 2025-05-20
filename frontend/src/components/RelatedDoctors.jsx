import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16'>
            {/* Heading */}
            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg'>
                Related Doctors
            </h1>
            {/* Subheading */}
            <p className='sm:w-2/3 text-center text-sm text-gray-600 leading-relaxed'>
                Simply browse through our extensive list of trusted doctors with similar specialities.
            </p>

            {relDoc.length === 0 ? (
                <p className='text-center text-gray-600 text-base mt-8'>No related doctors found for this speciality.</p>
            ) : (
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-5 px-3 sm:px-0'>
                    {relDoc.map((item, index) => (
                        <div 
                            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                            className='relative border border-white/20 rounded-2xl overflow-hidden cursor-pointer backdrop-blur-lg bg-white/30 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group hover:border-blue-300' 
                            key={index}
                        >
                            {/* Doctor Image */}
                            <div className='relative h-56 sm:h-64 overflow-hidden bg-blue-50/50'>
                                <img className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-110' src={item.image} alt={item.name} />
                                {/* Availability Badge */}
                                {item.available ? (
                                    <span className='absolute bottom-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1'>
                                        <FaCheckCircle /> Available
                                    </span>
                                ) : (
                                    <span className='absolute bottom-2 left-2 bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1'>
                                        <FaTimesCircle /> Not Available
                                    </span>
                                )}
                            </div>
                            
                            {/* Doctor Info */}
                            <div className='p-4'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors'>{item.name}</h3>
                                <p className='text-sm text-gray-600 mb-2'>{item.speciality}</p>
                                {/* Add more details if needed */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* More button - optional */}
            {/* {relDoc.length > 0 && (
                 <button className='bg-blue-600 text-white font-semibold px-10 py-3 rounded-full mt-8 transition-colors duration-300 hover:bg-blue-700 shadow-lg'>
                    View All
                 </button>
            )} */}
        </div>
    )
}

export default RelatedDoctors