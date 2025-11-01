import React, { useState } from 'react'
import type { GroupCardProps } from 'src/types'
import { FaRegEye } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { GraduationCap } from 'lucide-react'
import { Building2 } from 'lucide-react'
import { Headset } from 'lucide-react'
import { PenLine } from 'lucide-react'
import { Eye } from 'lucide-react'
import { Trash2 } from 'lucide-react'

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
            isOn ? 'translate-x-5 bg-green-300' : '-translate-x-1 bg-gray-300'
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
          <Headset className='mb-1 text-gray-600'></Headset>
          <span>Tutor: {tutor}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <Building2 className='mb-1 text-gray-600'></Building2>
          <span>Faculty: {faculty}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <GraduationCap className='mb-1 text-gray-600'></GraduationCap>
          <span>Student: {students}</span>
        </div>
      </div>

      {/* View Buttons */}
      <div className='flex flex-wrap justify-between items-center mt-auto gap-2'>
        <button
          onClick={handleViewDetails}
          className='flex justify-items-center gap-1 px-4 py-2.5 md:px-5 border border-blue-800 text-blue-800 rounded-md hover:bg-blue-800 duration-200 ease-in-out hover:text-white transition-colors cursor-pointer'
        >
          <Eye className='w-5 h-5' />
          <p className='text-sm hidden md:inline font-semibold'>View</p>
        </button>
        <button
          onClick={handleViewDetails}
          className='flex justify-items-center gap-1 px-4 py-2.5 md:px-6 border border-orange-600 text-orange-600 rounded-md hover:bg-orange-600 duration-200 ease-in-out hover:text-white transition-colors cursor-pointer'
        >
          <PenLine className='w-5 h-5' />
          <p className='text-sm hidden md:inline font-semibold'>Edit</p>
        </button>
        <button
          onClick={handleViewDetails}
          className='flex justify-items-center gap-1 px-4 py-2.5 md:px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-600 duration-200 ease-in-out hover:text-white transition-colors cursor-pointer'
        >
          <Trash2 className='w-5 h-5' />
          <p className='text-sm hidden md:inline font-semibold'>Delete</p>
        </button>
      </div>
    </div>
  )
}

export default GroupCard
