import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaDownload } from 'react-icons/fa';

const Prescriptions = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    prescribedBy: '',
    notes: '',
  });

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/health-records/prescriptions`, {
        headers: { token },
      });
      if (data.success) {
        setPrescriptions(data.prescriptions);
      }
    } catch (error) {
      toast.error('Failed to fetch prescriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/health-records/prescriptions`,
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success('Prescription added successfully');
        setShowForm(false);
        setFormData({
          medication: '',
          dosage: '',
          frequency: '',
          startDate: '',
          endDate: '',
          prescribedBy: '',
          notes: '',
        });
        fetchPrescriptions();
      }
    } catch (error) {
      toast.error('Failed to add prescription');
    }
  };

  const handleDelete = async (prescriptionId) => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/health-records/prescriptions/${prescriptionId}`,
          { headers: { token } }
        );
        if (data.success) {
          toast.success('Prescription deleted successfully');
          fetchPrescriptions();
        }
      } catch (error) {
        toast.error('Failed to delete prescription');
      }
    }
  };

  const downloadPrescription = async (prescriptionId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/health-records/prescriptions/${prescriptionId}/download`,
        {
          headers: { token },
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `prescription-${prescriptionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Failed to download prescription');
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
        <h2 className="text-2xl font-semibold text-gray-800">Prescriptions</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add New Prescription
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medication
              </label>
              <input
                type="text"
                value={formData.medication}
                onChange={(e) =>
                  setFormData({ ...formData, medication: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage
              </label>
              <input
                type="text"
                value={formData.dosage}
                onChange={(e) =>
                  setFormData({ ...formData, dosage: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <input
                type="text"
                value={formData.frequency}
                onChange={(e) =>
                  setFormData({ ...formData, frequency: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prescribed By
              </label>
              <input
                type="text"
                value={formData.prescribedBy}
                onChange={(e) =>
                  setFormData({ ...formData, prescribedBy: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
              Save Prescription
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {prescriptions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No prescriptions found. Add your first prescription!
          </p>
        ) : (
          prescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {prescription.medication}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Dosage: {prescription.dosage}
                  </p>
                  <p className="text-sm text-gray-600">
                    Frequency: {prescription.frequency}
                  </p>
                  <p className="text-sm text-gray-600">
                    Prescribed by: {prescription.prescribedBy}
                  </p>
                  <p className="text-sm text-gray-600">
                    Period: {new Date(prescription.startDate).toLocaleDateString()} -{' '}
                    {new Date(prescription.endDate).toLocaleDateString()}
                  </p>
                  {prescription.notes && (
                    <p className="mt-2 text-sm text-gray-600">
                      Notes: {prescription.notes}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => downloadPrescription(prescription._id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Download Prescription"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => handleDelete(prescription._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Prescription"
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

export default Prescriptions; 