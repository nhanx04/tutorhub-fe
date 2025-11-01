import React, { useState } from 'react'
import type { GroupCardProps } from 'src/types'
import { useNavigate } from 'react-router'
import { PiGraduationCap } from "react-icons/pi";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { RiCustomerService2Line } from "react-icons/ri";
import { LuPenLine } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoTrash } from "react-icons/io5";

const GroupCard: React.FC<GroupCardProps> = ({ title, description, tutor, faculty, students, isActive = true }) => {
  const nevigate = useNavigate()
  const [isOn, setIsOn] = useState(false)

  const handleViewDetails = () => {
    nevigate(`/student/group-detail`)
  }
  const toggleSwitch = () => {
    setIsOn(!isOn)
  }

  return (
    <div className='flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-300 p-6 hover:shadow-md transition-shadow min-h-110'>
      {/* Active button */}

      <div
        onClick={toggleSwitch}
        className={`w-11 h-4 mr-5 mb-4 flex items-center ml-auto rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isOn ? 'bg-green-600' : 'bg-gray-500'
        }`}
      >
        <div
          className={`w-5.5 h-5.5 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? 'translate-x-5 bg-green-300' : '-translate-x-2 bg-gray-300'
          }`}
        ></div>
      </div>

      <div className='flex-grow'>
        {/* Title */}
        <h3 className='text-lg font-semibold text-gray-800 mb-3 break-words'>{title}</h3>

        {/* Description */}
        <p className='text-gray-600 text-sm mb-4 break-words'>{description}</p>
      </div>

      {/* Details */}
      <div className='space-y-2 mb-6'>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <RiCustomerService2Line size={20} className='mb-1 text-gray-600'></RiCustomerService2Line>
          <span>Tutor: {tutor}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <HiBuildingOffice2 size={20} className='mb-1 text-gray-600'></HiBuildingOffice2>  
          <span>Faculty: {faculty}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <PiGraduationCap size={20} className='mb-1 text-gray-600'></PiGraduationCap>
          <span>Student: {students}</span>
        </div>
      </div>

      {/* View Buttons */}
      <div className='flex items-center justify-between gap-2 mt-auto flex-wrap'>
        {/* View button */}
        <button
          onClick={handleViewDetails}
          className='flex items-center gap-1 px-3 md:w-22 py-2 border border-blue-800 text-blue-800 rounded-md hover:bg-blue-800 hover:text-white transition-all duration-200 ease-in-out'
        >
          <MdOutlineRemoveRedEye className='w-4 h-4 sm:w-5 sm:h-5' />
          <p className='text-xs hidden md:inline font-semibold'>View</p>
        </button>

        {/* Edit button */}
        <button
          onClick={handleViewDetails}
          className='flex items-center gap-1 px-3 md:w-22 py-2 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-600 hover:text-white transition-all duration-200 ease-in-out'
        >
          <LuPenLine className='w-4 h-4 sm:w-5 sm:h-5' />
          <p className='text-xs hidden md:inline font-semibold'>Edit</p>
        </button>

        {/* Delete button */}
        <button
          onClick={handleViewDetails}
          className='flex items-center gap-1 px-3 md:w-22 py-2 border border-red-800 text-red-800 rounded-md hover:bg-red-800 hover:text-white transition-all duration-200 ease-in-out'
        >
          <IoTrash className='w-4 h-4 sm:w-5 sm:h-5' />
          <p className='text-xs hidden md:inline font-semibold'>Delete</p>
        </button>
      </div>
    </div>
  )
}

export default GroupCard
