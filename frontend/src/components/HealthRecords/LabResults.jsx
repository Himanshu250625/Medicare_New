import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaDownload, FaFileUpload } from 'react-icons/fa';

const LabResults = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [labResults, setLabResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    testName: '',
    testDate: '',
    labName: '',
    doctor: '',
    results: '',
    notes: '',
    file: null,
  });

  useEffect(() => {
    fetchLabResults();
  }, []);

  const fetchLabResults = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/health-records/lab-results`, {
        headers: { token },
      });
      if (data.success) {
        setLabResults(data.results);
      }
    } catch (error) {
      toast.error('Failed to fetch lab results');
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
        `${backendUrl}/api/health-records/lab-results`,
        formDataToSend,
        {
          headers: {
            token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success('Lab result added successfully');
        setShowForm(false);
        setFormData({
          testName: '',
          testDate: '',
          labName: '',
          doctor: '',
          results: '',
          notes: '',
          file: null,
        });
        fetchLabResults();
      }
    } catch (error) {
      toast.error('Failed to add lab result');
    }
  };

  const handleDelete = async (resultId) => {
    if (window.confirm('Are you sure you want to delete this lab result?')) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/health-records/lab-results/${resultId}`,
          { headers: { token } }
        );
        if (data.success) {
          toast.success('Lab result deleted successfully');
          fetchLabResults();
        }
      } catch (error) {
        toast.error('Failed to delete lab result');
      }
    }
  };

  const downloadResult = async (resultId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/health-records/lab-results/${resultId}/download`,
        {
          headers: { token },
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `lab-result-${resultId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Failed to download lab result');
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
        <h2 className="text-2xl font-semibold text-gray-800">Lab Results</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add New Result
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Name
              </label>
              <input
                type="text"
                value={formData.testName}
                onChange={(e) =>
                  setFormData({ ...formData, testName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Date
              </label>
              <input
                type="date"
                value={formData.testDate}
                onChange={(e) =>
                  setFormData({ ...formData, testDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Laboratory Name
              </label>
              <input
                type="text"
                value={formData.labName}
                onChange={(e) =>
                  setFormData({ ...formData, labName: e.target.value })
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Results
              </label>
              <textarea
                value={formData.results}
                onChange={(e) =>
                  setFormData({ ...formData, results: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              ></textarea>
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
                Upload Result File (PDF/Image)
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
              Save Result
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {labResults.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No lab results found. Add your first result!
          </p>
        ) : (
          labResults.map((result) => (
            <div
              key={result._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {result.testName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(result.testDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Laboratory: {result.labName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Doctor: {result.doctor}
                  </p>
                  <p className="mt-2 text-gray-700">{result.results}</p>
                  {result.notes && (
                    <p className="mt-2 text-sm text-gray-600">
                      Notes: {result.notes}
                    </p>
                  )}
                  {result.fileUrl && (
                    <div className="mt-4">
                      <img 
                        src={result.fileUrl} 
                        alt="Lab Result" 
                        className="max-w-full h-auto rounded-lg shadow-md"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(result._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Result"
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

export default LabResults; 