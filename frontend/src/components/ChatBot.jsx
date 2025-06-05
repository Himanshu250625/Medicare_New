import React, { useState, useRef, useEffect } from 'react';
import { FaUserMd, FaTimes, FaChevronRight, FaPhone, FaCalendarAlt, FaInfoCircle, FaExclamationTriangle, FaRobot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [currentOptions, setCurrentOptions] = useState([]);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const questions = [
    {
      question: "What type of medical assistance do you need?",
      options: [
        "Disease Symptoms & Advice",
        "General Health Information",
        "Medication Information",
        "Appointment Scheduling",
        "Emergency Services"
      ]
    },
    {
      question: "What is your age group?",
      options: [
        "Under 18",
        "18-30",
        "31-50",
        "Above 50"
      ]
    },
    {
      question: "Do you have any existing medical conditions?",
      options: [
        "Yes",
        "No",
        "Not sure"
      ]
    }
  ];

  const diseaseCategories = {
    "Respiratory": [
      "Common Cold",
      "Flu",
      "Asthma",
      "Bronchitis"
    ],
    "Cardiovascular": [
      "High Blood Pressure",
      "Heart Disease",
      "Arrhythmia",
      "Chest Pain"
    ],
    "Digestive": [
      "Gastritis",
      "Irritable Bowel Syndrome",
      "Acid Reflux",
      "Food Poisoning"
    ],
    "Neurological": [
      "Migraine",
      "Anxiety",
      "Depression",
      "Insomnia"
    ]
  };

  const diseaseInfo = {
    "Common Cold": {
      symptoms: "Runny nose, sore throat, cough, mild fever, sneezing, congestion",
      advice: "Rest, stay hydrated, use over-the-counter cold medications, avoid contact with others",
      prescription: "Decongestants, pain relievers, throat lozenges",
      warning: "Seek medical attention if symptoms worsen or last more than 10 days"
    },
    "Flu": {
      symptoms: "High fever, body aches, fatigue, cough, sore throat, headache",
      advice: "Rest, stay hydrated, take fever reducers, avoid contact with others",
      prescription: "Antiviral medications (if prescribed), pain relievers, fever reducers",
      warning: "Seek immediate medical attention if experiencing difficulty breathing or severe symptoms"
    },
    "Asthma": {
      symptoms: "Wheezing, shortness of breath, chest tightness, coughing",
      advice: "Avoid triggers, use inhaler as prescribed, maintain clean environment",
      prescription: "Inhalers (rescue and controller), oral medications",
      warning: "Seek emergency care if experiencing severe breathing difficulty"
    },
    "Bronchitis": {
      symptoms: "Persistent cough, mucus production, fatigue, chest discomfort",
      advice: "Rest, stay hydrated, use humidifier, avoid smoking",
      prescription: "Bronchodilators, cough suppressants, antibiotics (if bacterial)",
      warning: "Seek medical attention if symptoms persist or worsen"
    },
    "High Blood Pressure": {
      symptoms: "Often asymptomatic, headaches, dizziness, nosebleeds",
      advice: "Reduce salt intake, exercise regularly, maintain healthy weight",
      prescription: "ACE inhibitors, beta-blockers, diuretics",
      warning: "Regular monitoring required, seek immediate care for severe symptoms"
    },
    "Heart Disease": {
      symptoms: "Chest pain, shortness of breath, fatigue, irregular heartbeat",
      advice: "Maintain heart-healthy diet, regular exercise, stress management",
      prescription: "Blood thinners, beta-blockers, statins",
      warning: "Seek emergency care for chest pain or severe symptoms"
    },
    "Gastritis": {
      symptoms: "Stomach pain, nausea, vomiting, loss of appetite",
      advice: "Avoid spicy foods, alcohol, and smoking, eat smaller meals",
      prescription: "Antacids, proton pump inhibitors, antibiotics (if H. pylori)",
      warning: "Seek medical attention if symptoms persist or worsen"
    },
    "Migraine": {
      symptoms: "Severe headache, nausea, sensitivity to light and sound",
      advice: "Rest in dark room, stay hydrated, identify triggers",
      prescription: "Pain relievers, triptans, preventive medications",
      warning: "Seek emergency care for severe or unusual symptoms"
    }
  };

  const followUpOptions = {
    "General Health Information": [
      "Schedule a Check-up",
      "Learn about Preventive Care",
      "Get Health Tips",
      "Find a Specialist"
    ],
    "Medication Information": [
      "Check Drug Interactions",
      "Get Prescription Refill",
      "Learn about Side Effects",
      "Find Pharmacy"
    ],
    "Appointment Scheduling": [
      "Book Online",
      "Call Reception",
      "View Available Slots",
      "Cancel/Reschedule"
    ],
    "Emergency Services": [
      "Call Emergency Hotline",
      "Find Nearest Hospital",
      "Get First Aid Info",
      "Contact On-call Doctor"
    ],
    "Disease Symptoms & Advice": Object.keys(diseaseCategories)
  };

  const followUpAnswers = {
    "Schedule a Check-up": "You can schedule a check-up through our online portal or by calling our reception. We recommend annual check-ups for maintaining good health.",
    "Learn about Preventive Care": "Our preventive care services include regular health screenings, vaccinations, and lifestyle counseling. We focus on early detection and prevention of health issues.",
    "Get Health Tips": "Here are some general health tips: 1) Stay hydrated, 2) Exercise regularly, 3) Get adequate sleep, 4) Eat a balanced diet, 5) Manage stress effectively.",
    "Find a Specialist": "We have specialists in various fields including cardiology, neurology, orthopedics, and more. Would you like to know about a specific specialty?",
    
    "Check Drug Interactions": "Please provide the names of your medications, and we can check for potential interactions. Always consult your doctor before taking new medications.",
    "Get Prescription Refill": "You can request a prescription refill through our online portal or by calling our pharmacy. Please have your prescription details ready.",
    "Learn about Side Effects": "Each medication has specific side effects. Please let us know which medication you'd like to learn about.",
    "Find Pharmacy": "We have an in-house pharmacy, and we can also recommend nearby pharmacies. Would you like to know about our in-house pharmacy services?",
    
    "Book Online": "You can book your appointment online through our patient portal. Please have your insurance information and preferred date/time ready.",
    "Call Reception": "Our reception is available at (555) 123-4567 from 8 AM to 6 PM, Monday through Friday.",
    "View Available Slots": "You can view available appointment slots through our online portal. Would you like me to guide you through the process?",
    "Cancel/Reschedule": "You can cancel or reschedule your appointment through our online portal or by calling our reception at least 24 hours in advance.",
    
    "Call Emergency Hotline": "For emergencies, please call 911 immediately. Our emergency hotline is available 24/7 at (555) 999-8888.",
    "Find Nearest Hospital": "The nearest emergency room is located at 123 Medical Center Drive. Would you like directions or more information?",
    "Get First Aid Info": "I can provide basic first aid information. Please specify what type of first aid information you need.",
    "Contact On-call Doctor": "Our on-call doctor can be reached at (555) 777-6666. Please have your patient ID and symptoms ready."
  };

  const answers = {
    "General Health Information": {
      main: "Our general health services include regular check-ups, preventive care, and health education. We offer comprehensive health assessments and personalized wellness plans.",
      followUp: "Would you like to:"
    },
    "Medication Information": {
      main: "We can provide detailed information about medications, their side effects, and proper usage. Our pharmacists are available for consultation and can help with prescription management.",
      followUp: "How can we assist you with your medications?"
    },
    "Appointment Scheduling": {
      main: "You can schedule an appointment through our online portal or by calling our reception. We offer flexible scheduling options including same-day appointments for urgent cases.",
      followUp: "How would you like to proceed with scheduling?"
    },
    "Emergency Services": {
      main: "For emergencies, please call our emergency hotline at 911 or visit the nearest emergency room immediately. Our emergency response team is available 24/7.",
      followUp: "What emergency service do you need?"
    },
    "Disease Symptoms & Advice": {
      main: "I can provide information about various diseases, their symptoms, and recommended treatments. Please note that this is for informational purposes only and not a substitute for professional medical advice.",
      followUp: "Which category of disease would you like to know about?"
    },
    "Under 18": "For patients under 18, we recommend consulting with our pediatric specialists. Our pediatric department offers comprehensive care including vaccinations, growth monitoring, and developmental assessments.",
    "18-30": "As a young adult, we recommend regular health check-ups and preventive care. Our wellness programs include fitness assessments, nutritional counseling, and mental health support.",
    "31-50": "For this age group, we recommend regular health screenings and preventive care. Our comprehensive health check-ups include cardiovascular screening, cancer screening, and stress management.",
    "Above 50": "For patients above 50, we recommend regular health screenings and preventive care. Our senior care programs include geriatric assessments, chronic disease management, and mobility support.",
    "Yes": "Please provide details about your medical conditions so we can better assist you. Our specialists can help manage chronic conditions and create personalized treatment plans.",
    "No": "That's good to hear! We recommend our preventive care services to maintain your good health. Would you like to know about our wellness programs and health screenings?",
    "Not sure": "We recommend scheduling a consultation with our doctors for a thorough health assessment. Our comprehensive check-ups can help identify any underlying conditions early."
  };

  const handleDiseaseCategorySelect = (category) => {
    setMessages(prev => [...prev, 
      { role: 'user', content: category },
      { role: 'assistant', content: `Please select a specific condition from the ${category} category:` }
    ]);
    setSelectedOption(category);
    setCurrentOptions(diseaseCategories[category]);
  };

  const handleDiseaseSelect = (disease) => {
    const info = diseaseInfo[disease];
    const response = `
Symptoms: ${info.symptoms}
Advice: ${info.advice}
Prescription: ${info.prescription}
⚠️ Warning: ${info.warning}
    `.trim();

    setMessages(prev => [...prev, 
      { role: 'user', content: disease },
      { role: 'assistant', content: response }
    ]);
    setSelectedOption('');
    setCurrentOptions([]);
  };

  const handleFollowUpSelect = (option) => {
    if (followUpAnswers[option]) {
      simulateTyping(() => {
        setMessages(prev => [...prev, 
          { role: 'user', content: option },
          { role: 'assistant', content: followUpAnswers[option] }
        ]);
        setSelectedOption('');
        setCurrentOptions([]);
      });
    } else if (option === 'Disease Symptoms & Advice') {
      simulateTyping(() => {
        setMessages(prev => [...prev, 
          { role: 'user', content: option },
          { role: 'assistant', content: answers[option].main }
        ]);
        setSelectedOption(option);
        setCurrentOptions(Object.keys(diseaseCategories));
      });
    } else if (followUpOptions[option]) {
      simulateTyping(() => {
        setMessages(prev => [...prev, 
          { role: 'user', content: option },
          { role: 'assistant', content: answers[option].main }
        ]);
        setSelectedOption(option);
        setCurrentOptions(followUpOptions[option]);
      });
    } else {
      simulateTyping(() => {
        setMessages(prev => [...prev, 
          { role: 'user', content: option },
          { role: 'assistant', content: answers[option].main || answers[option] }
        ]);
        setSelectedOption('');
        setCurrentOptions([]);
      });
    }
  };

  const simulateTyping = (callback) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000);
  };

  const handleOptionSelect = (option) => {
    if (followUpOptions[option]) {
      simulateTyping(() => handleFollowUpSelect(option));
    } else if (currentQuestionIndex < questions.length - 1) {
      simulateTyping(() => {
        setMessages(prev => [...prev, 
          { role: 'user', content: option },
          { role: 'assistant', content: answers[option].main || answers[option] }
        ]);
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeout(() => {
          setMessages(prev => [...prev, 
            { role: 'assistant', content: questions[currentQuestionIndex + 1].question }
          ]);
          setCurrentOptions(questions[currentQuestionIndex + 1].options);
        }, 1000);
        setSelectedOption('');
        setCurrentOptions([]);
      });
    } else {
      simulateTyping(() => {
        setMessages(prev => [...prev, 
          { role: 'user', content: option },
          { role: 'assistant', content: answers[option].main || answers[option] }
        ]);
        setSelectedOption('');
        setCurrentOptions([]);
      });
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setCurrentOptions(questions[0].options);
    setMessages(prev => [...prev, 
      { role: 'assistant', content: questions[0].question }
    ]);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      resetChat();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
            <span className="font-semibold">Medical Assistant</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-md">
                  <FaUserMd className="text-2xl text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Medical Assistant</h3>
                  <p className="text-sm text-blue-100">How can I help you today?</p>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-700 p-2 rounded-full transition-colors"
              >
                <FaTimes className="text-xl" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm shadow-md'
                        : 'bg-white text-gray-800 shadow-md text-sm border border-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 shadow-md text-sm rounded-2xl p-3 border border-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {currentOptions.length > 0 && (
              <div className="p-3 bg-white border-t">
                {answers[selectedOption]?.followUp && (
                  <p className="text-gray-600 mb-2 text-sm font-medium">{answers[selectedOption].followUp}</p>
                )}
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto custom-scrollbar">
                  {currentOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (diseaseCategories[selectedOption]) {
                           handleDiseaseSelect(option);
                        } else if (selectedOption === 'Disease Symptoms & Advice') {
                           handleDiseaseCategorySelect(option);
                        } else {
                          handleFollowUpSelect(option);
                        }
                      }}
                      className="w-[85%] mx-auto text-left p-2 rounded-lg border border-gray-200 hover:border-blue-500 transition-all flex items-center justify-between text-sm group"
                    >
                      <span className="group-hover:text-blue-600 transition-colors">{option}</span>
                      <FaChevronRight className="text-blue-600 text-xs transform group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
};

export default ChatBot; 