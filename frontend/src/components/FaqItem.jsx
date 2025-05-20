import React, { useState } from 'react'
import {AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'

const FaqItem = ({item}) => {
  const [isOpen,setIsOpen]=useState(false)

  const toggleAccordion=()=>{
    setIsOpen(!isOpen);
  }

  return (
    <div className='p-4 lg:p-6 rounded-xl border border-blue-100 bg-gradient-to-br from-white/95 via-blue-50/40 to-indigo-50/30 backdrop-blur-md shadow-lg mb-4 cursor-pointer group hover:from-white hover:via-blue-50/50 hover:to-indigo-50/40 transition-all duration-300'>
      <div className="flex items-center justify-between gap-4" onClick={toggleAccordion}>
        <h3 className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${isOpen ? 'opacity-100' : 'opacity-80'} cursor-pointer mb-2 transition-opacity duration-300`}>
          {item.question}
        </h3>
        <button 
          className={`${isOpen ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent" : "bg-white text-blue-500 border-blue-200"} w-7 h-7 lg:w-8 lg:h-8 border rounded-full flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 active:scale-95`}
          aria-expanded={isOpen}
          aria-controls={`faq-content-${item.id}`}
        >
          {isOpen ? 
            <AiOutlineMinus className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300" /> : 
            <AiOutlinePlus className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform duration-300" />
          }
        </button>
      </div>
      <div id={`faq-content-${item.id}`} className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
      }`}>
        <p className="text-gray-600 leading-relaxed text-base mt-2 font-medium">
          {item.content}
        </p>
      </div>
    </div>
  )
}

export default FaqItem
