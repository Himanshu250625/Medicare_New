import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import PaymentGateway from "./payment/PaymentGateway";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "N/A";
    const dateArray = slotDate.split("_");
    if (dateArray.length !== 3) return "N/A";
    const [day, month, year] = dateArray;
    const monthIndex = Number(month) - 1;
    if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) return "N/A";
    return `${day} ${months[monthIndex]} ${year}`;
  };

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      setAppointments(data.appointments ? data.appointments.reverse() : []);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const { data } = await axios.post(
          backendUrl + "/api/user/cancel-appointment",
          { appointmentId },
          { headers: { token } }
        );

        if (data.success) {
          toast.success(data.message);
          getUserAppointments();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Function to handle payment selection
  const handlePaymentClick = (appointment) => {
    console.log("Selected appointment for payment:", appointment);
    setSelectedAppointment(appointment);
  };

  // Function to handle payment completion
  const handlePaymentComplete = () => {
    setSelectedAppointment(null);
    getUserAppointments();
  };

  if (selectedAppointment) {
    return (
      <PaymentGateway
        appointmentId={selectedAppointment._id}
        amount={selectedAppointment.amount}
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-white to-blue-50/30 min-h-screen">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
          My Appointments
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">
            Loading appointments...
          </p>
        ) : appointments.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-20">
            <p>You have no appointments yet.</p>
            <button
              onClick={() => navigate("/doctors")}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-6 p-6 rounded-lg bg-white/50 backdrop-blur-lg shadow-xl border border-white/20"
              >
                {/* Doctor Image */}
                <div className="w-full sm:w-40 rounded-lg overflow-hidden shadow-md">
                  <img
                    className="w-full h-auto object-cover bg-blue-50/50"
                    src={item.docData.image}
                    alt={item.docData.name}
                  />
                </div>

                {/* Appointment Details */}
                <div className="flex-1 text-gray-700 text-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.docData.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {item.docData.speciality}
                  </p>

                  <p className="flex items-center gap-2 text-gray-600 mb-1">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>
                      {item.docData.address.line1}, {item.docData.address.line2}
                    </span>
                  </p>

                  <p className="flex items-center gap-2 text-gray-600 mb-1">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>{slotDateFormat(item.slotDate)}</span>
                  </p>

                  <p className="flex items-center gap-2 text-gray-600 mb-4">
                    <FaClock className="text-blue-500" />
                    <span>{item.slotTime}</span>
                  </p>

                  {/* Status Badge */}
                  {item.cancelled ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Completed
                    </span>
                  ) : item.payment ? (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                      Paid
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                      Pending Payment
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:self-center">
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <button
                      onClick={() => handlePaymentClick(item)}
                      className="px-6 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-sm"
                    >
                      Pay Online
                    </button>
                  )}

                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="px-6 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300 shadow-sm"
                    >
                      Cancel Appointment
                    </button>
                  )}

                  {/* Status Buttons */}
                  {item.cancelled && (
                    <button className="px-6 py-2 text-sm font-semibold text-red-700 bg-red-100 border border-red-300 rounded-full cursor-default">
                      Cancelled
                    </button>
                  )}
                  {item.isCompleted && (
                    <button className="px-6 py-2 text-sm font-semibold text-green-700 bg-green-100 border border-green-300 rounded-full cursor-default">
                      Completed
                    </button>
                  )}
                  {item.payment && !item.cancelled && !item.isCompleted && (
                    <button className="px-6 py-2 text-sm font-semibold text-blue-700 bg-blue-100 border border-blue-300 rounded-full cursor-default">
                      Paid
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAppointments;
