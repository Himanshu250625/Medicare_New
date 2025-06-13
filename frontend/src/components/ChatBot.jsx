import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUserMd, FaTimes, FaChevronRight, FaHeartbeat, FaStethoscope, 
  FaCalendarAlt, FaHospital, FaPills, FaAmbulance, FaUserNurse,
  FaClipboardList, FaFileMedical, FaCreditCard, FaQuestionCircle,
  FaShieldAlt, FaUserFriends, FaChartLine, FaBrain, FaTooth,
  FaEye, FaBone, FaLungs, FaHeart, FaBaby, FaWheelchair,
  FaTemperatureHigh,
  FaToilet, FaAllergies, FaSkull, FaVirus,
  FaThermometerHalf, FaBiohazard, FaBurn, FaDizzy, FaSadTear,
  FaUserTie, FaRunning, FaVials, FaFlask, FaMale
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const messagesEndRef = useRef(null);

  const menuOptions = {
    'Health Checkup': {
      icon: FaHeartbeat,
      options: {
        'General Checkup': {
          icon: FaClipboardList,
          description: 'Comprehensive overall health assessment',
          subOptions: {
            'Basic Checkup': { icon: FaUserMd, content: 'Includes physical exam, blood pressure, and basic blood tests.' },
            'Full Body Scan': { icon: FaHospital, content: 'Advanced imaging and detailed health metrics.' },
            'Executive Health': { icon: FaUserTie, content: 'Tailored checkup for professionals with advanced diagnostics.' },
            'Preventive Screening': { icon: FaShieldAlt, content: 'Early detection for common health risks.' }
          }
        },
        'Cardiac Screening': {
          icon: FaHeart,
          description: 'Detailed heart health assessment',
          subOptions: {
            'ECG Test': { icon: FaChartLine, content: 'Evaluates heart\'s electrical activity.' },
            'Stress Test': { icon: FaRunning, content: 'Checks heart function during physical activity.' },
            'Cholesterol Profile': { icon: FaVials, content: 'Measures good and bad cholesterol levels.' },
            'Cardiac MRI': { icon: FaFlask, content: 'Detailed images of heart structure and function.' }
          }
        },
        'Diabetes Screening': {
          icon: FaPills,
          description: 'Checks for diabetes risk and management',
          subOptions: {
            'Blood Glucose Test': { icon: FaVials, content: 'Measures current blood sugar levels.' },
            'HbA1c Test': { icon: FaVials, content: 'Average blood sugar levels over 2-3 months.' },
            'Insulin Resistance Test': { icon: FaFlask, content: 'Assesses body\'s response to insulin.' },
            'Diabetic Foot Exam': { icon: FaPills, content: 'Checks for nerve damage and circulation issues.' }
          }
        },
        'Cancer Screening': {
          icon: FaPills,
          description: 'Early detection and prevention of cancer',
          subOptions: {
            'Mammogram': { icon: FaHospital, content: 'Screening for breast cancer.' },
            'Colonoscopy': { icon: FaPills, content: 'Screening for colorectal cancer.' },
            'Pap Test': { icon: FaPills, content: 'Screening for cervical cancer.' },
            'Prostate Exam': { icon: FaMale, content: 'Screening for prostate cancer.' }
          }
        }
      }
    },
    'Diseases & Symptoms': {
      icon: FaVirus,
      options: {
        'Respiratory Issues': {
          icon: FaLungs,
          description: 'Common respiratory problems and their symptoms',
          subOptions: {
            'Common Cold': { icon: FaPills, content: 'Symptoms: Runny nose, sore throat, cough, mild fever. Rest and stay hydrated.' },
            'Flu': { icon: FaVirus, content: 'Symptoms: High fever, body aches, fatigue, cough. Seek medical attention if severe.' },
            'Bronchitis': { icon: FaLungs, content: 'Symptoms: Persistent cough, chest discomfort, fatigue. May require antibiotics.' },
            'Asthma': { icon: FaLungs, content: 'Symptoms: Wheezing, shortness of breath, chest tightness. Use prescribed inhalers.' }
          }
        },
        'Fever & Infections': {
          icon: FaTemperatureHigh,
          description: 'Various types of fevers and infections',
          subOptions: {
            'Viral Fever': { icon: FaThermometerHalf, content: 'Symptoms: High temperature, body aches, fatigue. Rest and take prescribed medication.' },
            'Bacterial Infection': { icon: FaBiohazard, content: 'Symptoms: Persistent fever, localized pain, swelling. May require antibiotics.' },
            'Dengue': { icon: FaVirus, content: 'Symptoms: High fever, severe body pain, rash. Seek immediate medical attention.' },
            'Malaria': { icon: FaVirus, content: 'Symptoms: Cyclic fever, chills, sweating. Requires immediate medical treatment.' }
          }
        },
        'Digestive Problems': {
          icon: FaPills,
          description: 'Common digestive system issues',
          subOptions: {
            'Gastritis': { icon: FaPills, content: 'Symptoms: Stomach pain, nausea, loss of appetite. Avoid spicy foods.' },
            'Food Poisoning': { icon: FaPills, content: 'Symptoms: Vomiting, diarrhea, abdominal pain. Stay hydrated.' },
            'Acid Reflux': { icon: FaBurn, content: 'Symptoms: Heartburn, chest pain, difficulty swallowing. Avoid lying down after meals.' },
            'Constipation': { icon: FaToilet, content: 'Symptoms: Infrequent bowel movements, abdominal discomfort. Increase fiber intake.' }
          }
        },
        'Head & Brain': {
          icon: FaBrain,
          description: 'Neurological and head-related conditions',
          subOptions: {
            'Migraine': { icon: FaSkull, content: 'Symptoms: Severe headache, nausea, sensitivity to light. Rest in dark room.' },
            'Tension Headache': { icon: FaPills, content: 'Symptoms: Dull pain, pressure around head. Manage stress and stay hydrated.' },
            'Vertigo': { icon: FaDizzy, content: 'Symptoms: Dizziness, balance problems, nausea. Avoid sudden movements.' },
            'Anxiety': { icon: FaSadTear, content: 'Symptoms: Restlessness, rapid heartbeat, excessive worry. Practice relaxation techniques.' }
          }
        },
        'Skin Conditions': {
          icon: FaPills,
          description: 'Common skin problems and their treatments',
          subOptions: {
            'Eczema': { icon: FaPills, content: 'Symptoms: Itchy, red, dry skin. Use prescribed creams and avoid triggers.' },
            'Acne': { icon: FaPills, content: 'Symptoms: Pimples, blackheads, oily skin. Maintain proper skincare routine.' },
            'Rash': { icon: FaPills, content: 'Symptoms: Red, itchy skin patches. Identify and avoid allergens.' },
            'Hives': { icon: FaAllergies, content: 'Symptoms: Raised, itchy welts. Take antihistamines as prescribed.' }
          }
        }
      }
    },
    'Emergency Services': {
      icon: FaAmbulance,
      options: {
        '24/7 Emergency': 'Our emergency department is open 24/7. Call our emergency hotline for immediate assistance.',
        'Ambulance Service': 'Quick response ambulance service available. Call our emergency number for immediate dispatch.',
        'Trauma Care': 'Specialized trauma care unit with state-of-the-art facilities and expert medical staff.',
        'Critical Care': 'Advanced critical care unit for patients requiring intensive medical attention.',
      }
    },
    'Medical Records': {
      icon: FaFileMedical,
      options: {
        'View Records': 'Access your complete medical history, test results, and treatment records online.',
        'Download Reports': 'Download your medical reports and prescriptions in PDF format.',
        'Share Records': 'Securely share your medical records with other healthcare providers.',
        'Update Information': 'Update your personal information and medical history.',
      }
    },
    'Insurance & Billing': {
      icon: FaCreditCard,
      options: {
        'Insurance Claims': 'Get assistance with insurance claims and documentation.',
        'Payment Options': 'Multiple payment options available including EMI and insurance coverage.',
        'Bill Details': 'View and download your medical bills and payment history.',
        'Financial Aid': 'Information about financial assistance programs and payment plans.',
      }
    },
    'Wellness Programs': {
      icon: FaChartLine,
      options: {
        'Fitness Assessment': 'Complete fitness evaluation and personalized workout plans.',
        'Nutrition Counseling': 'Expert nutrition advice and personalized diet plans.',
        'Mental Health': 'Professional counseling and mental health support services.',
        'Yoga & Meditation': 'Regular yoga and meditation classes for overall wellness.',
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMainMenuSelect = (category) => {
    setCurrentCategory(category);
    setShowMainMenu(false);
    setShowSubMenu(true);
    setSelectedOption(null);
    setMessages(prev => [...prev, { role: 'user', content: `Selected: ${category}` }]);
  };

  const handleSubMenuSelect = (option) => {
    const value = menuOptions[currentCategory].options[option];
    
    if (typeof value === 'string') {
      setMessages(prev => [
        ...prev,
        { role: 'user', content: option },
        { role: 'assistant', content: value }
      ]);
      setShowSubMenu(false);
      setShowMainMenu(true);
    } else {
      setSelectedOption(option);
    }
  };

  const handleSubOptionSelect = (option, subOption) => {
    const { content: response } = menuOptions[currentCategory].options[option].subOptions[subOption];
    setMessages(prev => [
      ...prev,
      { role: 'user', content: `${option} - ${subOption}` },
      { role: 'assistant', content: response }
    ]);
    setSelectedOption(null);
    setShowSubMenu(false);
    setShowMainMenu(true);
  };

  const handleBack = () => {
    if (selectedOption) {
      setSelectedOption(null);
    } else {
      setShowSubMenu(false);
      setShowMainMenu(true);
    }
  };

  const IconComponent = ({ icon: Icon }) => {
    return <Icon className="text-xl" />;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <FaUserMd className="text-2xl" />
            <span className="font-semibold">Health Assistant</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full">
                  <FaUserMd className="text-2xl text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Health Assistant</h3>
                  <p className="text-sm text-blue-100">Your Health, Our Priority</p>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-700 p-2 rounded-full transition-colors"
              >
                <FaTimes className="text-xl" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 && showMainMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center p-4 bg-white rounded-lg shadow-lg"
                >
                  <FaUserMd className="text-6xl text-blue-500 mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to Health Assistant!</h3>
                  <p className="text-sm text-gray-600">I'm here to provide quick information on health checkups, diseases, emergencies, and more. Choose an option below to get started!</p>
                </motion.div>
              )}
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 shadow-md relative ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t">
              {showMainMenu && (
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(menuOptions).map(([category, { icon: Icon }]) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMainMenuSelect(category)}
                      className="bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-3 rounded-xl text-left flex items-center gap-2 transition-all duration-300"
                    >
                      <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <IconComponent icon={Icon} />
                      </div>
                      <span className="font-semibold text-blue-800 text-sm text-center">{category}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {showSubMenu && (
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className="w-full bg-blue-50 text-blue-600 p-3 rounded-xl text-left mb-2 flex items-center gap-2"
                  >
                    <FaChevronRight className="rotate-180" />
                    {selectedOption ? 'Back to Categories' : 'Back to Menu'}
                  </motion.button>

                  {!selectedOption ? (
                    Object.entries(menuOptions[currentCategory].options).map(([option, value]) => {
                      if (typeof value === 'string') {
                        return (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSubMenuSelect(option)}
                            className="w-full bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-3 rounded-xl text-left flex items-center gap-2 transition-all duration-300"
                          >
                            <div className="bg-blue-600 p-2 rounded-lg text-white">
                              <FaChevronRight />
                            </div>
                            <span className="font-medium text-blue-800 text-sm">{option}</span>
                          </motion.button>
                        );
                      } else {
                        return (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSubMenuSelect(option)}
                            className="w-full bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-3 rounded-xl text-left flex items-center gap-2 transition-all duration-300"
                          >
                            <div className="bg-blue-600 p-2 rounded-lg text-white">
                              <IconComponent icon={value.icon} />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-800 text-sm">{option}</h4>
                              <p className="text-xs text-blue-600">{value.description}</p>
                            </div>
                          </motion.button>
                        );
                      }
                    })
                  ) : (
                    Object.entries(menuOptions[currentCategory].options[selectedOption].subOptions).map(([subOption, { icon: SubOptionIcon, content }]) => (
                      <motion.button
                        key={subOption}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSubOptionSelect(selectedOption, subOption)}
                        className="w-full bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 p-3 rounded-xl text-left flex items-center gap-2 transition-all duration-300"
                      >
                        <div className="bg-blue-600 p-2 rounded-lg text-white">
                          <IconComponent icon={SubOptionIcon} />
                        </div>
                        <span className="font-medium text-blue-800 text-sm">{subOption}</span>
                      </motion.button>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot; 