import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaFileMedical, FaHistory, FaPrescriptionBottle, FaVial, FaSyringe } from 'react-icons/fa';
import MedicalHistory from './MedicalHistory';
import Prescriptions from './Prescriptions';
import LabResults from './LabResults';
import Vaccinations from './Vaccinations';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('medical-history');
  const { token } = useContext(AppContext);

  const tabs = [
    { id: 'medical-history', label: 'Medical History', icon: <FaHistory /> },
    { id: 'prescriptions', label: 'Prescriptions', icon: <FaPrescriptionBottle /> },
    { id: 'lab-results', label: 'Lab Results', icon: <FaVial /> },
    { id: 'vaccinations', label: 'Vaccinations', icon: <FaSyringe /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'medical-history':
        return <MedicalHistory />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'lab-results':
        return <LabResults />;
      case 'vaccinations':
        return <Vaccinations />;
      default:
        return <MedicalHistory />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Health Records
          </h1>
          <p className="text-gray-600 mt-2">
            Access and manage your complete medical history in one place
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default HealthRecords; 