import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Doctors = () => {
  const { speciality } = useParams();

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilterAndSearch = () => {
    let filtered = doctors;

    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilterAndSearch();
  }, [doctors, speciality, searchTerm]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container mx-auto">
        {/* Search and Filter Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
            Find a Doctor
          </h2>
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search doctors or specialities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white/50 backdrop-blur-lg rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Specialities</h3>
              <ul className="space-y-3">
                <li
                  key="all"
                  onClick={() => navigate("/doctors")}
                  className={`cursor-pointer text-gray-700 hover:text-blue-600 transition-colors py-2 px-3 rounded-md ${!speciality ? 'bg-blue-100 text-blue-800 font-medium' : ''}`}
                >
                  All Specialities
                </li>
                {specialities.map((item) => (
                  <li
                    key={item}
                    onClick={() => navigate(`/doctors/${item}`)}
                    className={`cursor-pointer text-gray-700 hover:text-blue-600 transition-colors py-2 px-3 rounded-md ${speciality === item ? 'bg-blue-100 text-blue-800 font-medium' : ''}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Doctors List */}
          <main className="w-full lg:w-3/4">
            {filterDoc.length === 0 ? (
              <p className="text-center text-gray-600 text-lg">No doctors found matching your criteria.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
                {filterDoc.map((item) => (
                  <div
                    onClick={() => {
                      navigate(`/appointment/${item._id}`);
                      window.scrollTo(0, 0);
                    }}
                    className="relative border border-green-500/20 rounded-xl overflow-hidden cursor-pointer backdrop-blur-lg bg-white/30 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group hover:border-green-500/50"
                    key={item._id}
                  >
                    <div className="relative h-[400px] sm:h-64 md:h-72 overflow-hidden bg-blue-50/50">
                      <img 
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                        src={item.image} 
                        alt={item.name} 
                      />
                      {item.available ? (
                        <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="absolute bottom-2 left-2 bg-gray-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Not Available
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">{item.speciality}</p>
                      {/* Add more doctor details here if needed */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
