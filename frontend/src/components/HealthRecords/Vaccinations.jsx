import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaDownload } from 'react-icons/fa';

const Vaccinations = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    vaccineName: '',
    date: '',
    administeredBy: '',
    location: '',
    batchNumber: '',
    nextDoseDate: '',
    notes: '',
  });

  useEffect(() => {
    fetchVaccinations();
  }, []);

  const fetchVaccinations = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/health-records/vaccinations`, {
        headers: { token },
      });
      if (data.success) {
        setVaccinations(data.vaccinations);
      }
    } catch (error) {
      toast.error('Failed to fetch vaccinations');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/health-records/vaccinations`,
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success('Vaccination record added successfully');
        setShowForm(false);
        setFormData({
          vaccineName: '',
          date: '',
          administeredBy: '',
          location: '',
          batchNumber: '',
          nextDoseDate: '',
          notes: '',
        });
        fetchVaccinations();
      }
    } catch (error) {
      toast.error('Failed to add vaccination record');
    }
  };

  const handleDelete = async (vaccinationId) => {
    if (window.confirm('Are you sure you want to delete this vaccination record?')) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/health-records/vaccinations/${vaccinationId}`,
          { headers: { token } }
        );
        if (data.success) {
          toast.success('Vaccination record deleted successfully');
          fetchVaccinations();
        }
      } catch (error) {
        toast.error('Failed to delete vaccination record');
      }
    }
  };

  const downloadCertificate = async (vaccinationId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/health-records/vaccinations/${vaccinationId}/certificate`,
        {
          headers: { token },
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `vaccination-certificate-${vaccinationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Failed to download vaccination certificate');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Vaccinations</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add New Vaccination
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vaccine Name
              </label>
              <input
                type="text"
                value={formData.vaccineName}
                onChange={(e) =>
                  setFormData({ ...formData, vaccineName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Administered
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Administered By
              </label>
              <input
                type="text"
                value={formData.administeredBy}
                onChange={(e) =>
                  setFormData({ ...formData, administeredBy: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch Number
              </label>
              <input
                type="text"
                value={formData.batchNumber}
                onChange={(e) =>
                  setFormData({ ...formData, batchNumber: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Next Dose Date
              </label>
              <input
                type="date"
                value={formData.nextDoseDate}
                onChange={(e) =>
                  setFormData({ ...formData, nextDoseDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Vaccination Record
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {vaccinations.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No vaccination records found. Add your first record!
          </p>
        ) : (
          vaccinations.map((vaccination) => (
            <div
              key={vaccination._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {vaccination.vaccineName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(vaccination.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Administered by: {vaccination.administeredBy}
                  </p>
                  <p className="text-sm text-gray-600">
                    Location: {vaccination.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Batch Number: {vaccination.batchNumber}
                  </p>
                  {vaccination.nextDoseDate && (
                    <p className="text-sm text-gray-600">
                      Next Dose: {new Date(vaccination.nextDoseDate).toLocaleDateString()}
                    </p>
                  )}
                  {vaccination.notes && (
                    <p className="mt-2 text-sm text-gray-600">
                      Notes: {vaccination.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadCertificate(vaccination._id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Download Certificate"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => handleDelete(vaccination._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Record"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Vaccinations; 