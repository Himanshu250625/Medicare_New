import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaFileUpload } from 'react-icons/fa';

const MedicalHistory = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    condition: '',
    diagnosis: '',
    date: '',
    doctor: '',
    notes: '',
    file: null,
  });

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/health-records/medical-history`, {
        headers: { token },
      });
      if (data.success) {
        setMedicalRecords(data.records);
      }
    } catch (error) {
      toast.error('Failed to fetch medical history');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/health-records/medical-history`,
        formDataToSend,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success('Medical record added successfully');
        setShowForm(false);
        setFormData({
          condition: '',
          diagnosis: '',
          date: '',
          doctor: '',
          notes: '',
          file: null,
        });
        fetchMedicalHistory();
      }
    } catch (error) {
      toast.error('Failed to add medical record');
    }
  };

  const handleDelete = async (recordId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/health-records/medical-history/${recordId}`,
          { headers: { token } }
        );
        if (data.success) {
          toast.success('Record deleted successfully');
          fetchMedicalHistory();
        }
      } catch (error) {
        toast.error('Failed to delete record');
      }
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
        <h2 className="text-2xl font-semibold text-gray-800">Medical History</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add New Record
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <input
                type="text"
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagnosis Date
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
                Doctor
              </label>
              <input
                type="text"
                value={formData.doctor}
                onChange={(e) =>
                  setFormData({ ...formData, doctor: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagnosis
              </label>
              <input
                type="text"
                value={formData.diagnosis}
                onChange={(e) =>
                  setFormData({ ...formData, diagnosis: e.target.value })
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Medical Document (PDF/Image)
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, file: e.target.files[0] })
                  }
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <FaFileUpload className="text-blue-600" />
                  <span>Choose File</span>
                </label>
                {formData.file && (
                  <span className="ml-3 text-sm text-gray-600">
                    {formData.file.name}
                  </span>
                )}
              </div>
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
              Save Record
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {medicalRecords.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No medical records found. Add your first record!
          </p>
        ) : (
          medicalRecords.map((record) => (
            <div
              key={record._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {record.condition}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Diagnosed on: {new Date(record.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Doctor: {record.doctor}
                  </p>
                  <p className="mt-2 text-gray-700">{record.diagnosis}</p>
                  {record.notes && (
                    <p className="mt-2 text-sm text-gray-600">
                      Notes: {record.notes}
                    </p>
                  )}
                  {record.fileUrl && (
                    <div className="mt-4">
                      <img 
                        src={record.fileUrl} 
                        alt="Medical Document" 
                        className="max-w-full h-auto rounded-lg shadow-md"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete Record"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicalHistory; 