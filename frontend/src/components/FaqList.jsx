import { useState } from 'react';
import { faqs } from "../assets/data/faqs";
import FaqItem from "./FaqItem";
import { FiSearch } from 'react-icons/fi';

const FaqList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeId, setActiveId] = useState(null);

  // Default general FAQs
  const defaultGeneralFaqs = [
    {
      id: 'gen-1',
      question: 'What is Medicare?',
      content: 'Medicare is a federal health insurance program for people who are 65 or older, certain younger people with disabilities, and people with End-Stage Renal Disease.',
      category: 'general'
    },
    {
      id: 'gen-2',
      question: 'How do I apply for Medicare?',
      content: 'You can apply for Medicare through the Social Security Administration website, by visiting your local Social Security office, or by calling Social Security at 1-800-772-1213.',
      category: 'general'
    },
    {
      id: 'gen-3',
      question: 'What are the different parts of Medicare?',
      content: 'Medicare has four parts: Part A (Hospital Insurance), Part B (Medical Insurance), Part C (Medicare Advantage), and Part D (Prescription Drug Coverage).',
      category: 'general'
    }
  ];

  // Get unique categories from faqs
  const categories = ['all', ...new Set(faqs.map(faq => faq.category || 'general'))];

  // Filter faqs based on search term and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || (faq.category || 'general') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Add default general FAQs if no FAQs are found and general category is selected
  const displayFaqs = filteredFaqs.length > 0 ? filteredFaqs : 
    (selectedCategory === 'general' ? defaultGeneralFaqs : []);

  const handleToggle = (id) => {
    setActiveId(prevId => prevId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveId(null); // Close any open FAQ when searching
            }}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveId(null); // Close any open FAQ when changing category
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Category Description */}
        {selectedCategory === 'general' && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">General Information</h3>
            <p className="text-gray-600">
              Find answers to common questions about Medicare, including eligibility, enrollment, coverage options, and basic program information. These FAQs provide essential information to help you understand and navigate the Medicare system.
            </p>
          </div>
        )}
      </div>

      {/* FAQ List */}
      <ul className='space-y-4'>
        {displayFaqs.length > 0 ? (
          displayFaqs.map((item) => (
            <FaqItem 
              key={item.id} 
              item={item} 
              isOpen={activeId === item.id}
              onToggle={handleToggle}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No FAQs found matching your search criteria.
          </div>
        )}
      </ul>
    </div>
  );
};

export default FaqList;
