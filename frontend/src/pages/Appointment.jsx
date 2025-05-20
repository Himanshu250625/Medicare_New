import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            toast.warning('Please select a time slot')
            return;
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <section className='py-10 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50/30 min-h-screen'>

            {/* ---------- Doctor Details ----------- */}
            <div className='w-full max-w-[1400px] mx-auto flex flex-col sm:flex-row gap-8 items-start relative'>
                {/* Doctor Image */}
                <div className='w-full sm:w-1/4 lg:w-1/5 rounded-2xl overflow-hidden shadow-2xl border border-white/30 bg-gradient-to-br from-blue-100/40 to-purple-100/40 backdrop-blur-sm flex-shrink-0 transform transition-all duration-300 hover:shadow-blue-200/50 hover:scale-[1.02] hover:border-blue-400'>
                    <img className='w-full h-auto object-cover h-full transform transition-transform duration-500 group-hover:scale-105' src={docInfo.image} alt={docInfo.name} />
                </div>

                {/* Doctor Info Card */}
                <div className='flex-1 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-lg shadow-2xl border border-white/20 w-full sm:w-3/4 lg:w-4/5 mt-[-20px] sm:mt-0 transform transition-all duration-300 hover:shadow-blue-200/50 hover:scale-[1.01] hover:border-blue-400'>

                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <h2 className='flex items-center gap-3 text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
                        {docInfo.name}
                        <img className='w-5 h-5' src={assets.verified_icon} alt="Verified Icon" />
                    </h2>
                    <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4'>
                        <p className='flex items-center gap-1'><span className='font-semibold text-blue-600'>Speciality:</span> {docInfo.speciality}</p>
                        <p className='flex items-center gap-1'><span className='font-semibold text-blue-600'>Degree:</span> {docInfo.degree}</p>
                        <span className='py-0.5 px-3 text-xs rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold flex-shrink-0 shadow-md'>
                            {docInfo.experience}
                        </span>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div className='mb-4'>
                        <p className='flex items-center gap-2 text-base font-semibold text-blue-600 mb-1'>
                            About <img className='w-4 h-4' src={assets.info_icon} alt="Info Icon" />
                        </p>
                        <p className='text-sm text-gray-600 max-w-[700px] leading-relaxed'>{docInfo.about}</p>
                    </div>

                    <p className='text-base font-semibold text-gray-700 mt-4'>
                        Appointment fee: <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>{currencySymbol}{docInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='container mx-auto mt-12 p-6 sm:p-8 bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-300 hover:shadow-blue-200/50'>
                <h3 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6'>Booking Slots</h3>

                {/* Date Slots */}
                <div className='flex gap-4 items-center w-full overflow-x-auto pb-4 custom-scrollbar'>
                    {docSlots.length > 0 ? docSlots.map((item, index) => (
                        item.length > 0 && (
                            <button 
                                onClick={() => setSlotIndex(index)}
                                key={index}
                                className={`flex-shrink-0 text-center py-3 px-6 min-w-[100px] rounded-xl cursor-pointer transition-all duration-200 ease-in-out 
                                ${slotIndex === index 
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                                    : 'border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:shadow-md'}
                                `}
                            >
                                <p className='text-sm font-semibold'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p className='text-lg font-bold'>{item[0] && item[0].datetime.getDate()}</p>
                            </button>
                        )
                    )) : <p className='text-gray-600'>No dates available.</p>}
                </div>

                {/* Time Slots */}
                <div className='flex flex-wrap gap-3 items-center mt-6'>
                    {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? docSlots[slotIndex].map((item, index) => (
                        <button 
                            onClick={() => setSlotTime(item.time)}
                            key={index} 
                            className={`text-sm font-medium flex-shrink-0 px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out 
                                ${item.time === slotTime 
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105 border border-green-600'
                                    : 'bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 rounded-lg shadow-sm hover:bg-white/30 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'}
                            `}
                        >
                            {item.time.toLowerCase()}
                        </button>
                    )) : docSlots.length > 0 && <p className='text-gray-600'>No time slots available for this date.</p>}
                </div>

                {/* Book Button */}
                <button 
                    onClick={bookAppointment} 
                    className='bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold px-10 py-3 rounded-full mt-8 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105'
                >
                    Book an appointment
                </button>
            </div>

            {/* Listing Releated Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </section>
    ) : null
}

export default Appointment