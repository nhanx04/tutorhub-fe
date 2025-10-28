import React from 'react'
import type { GroupCardProps } from 'src/types'
import { FaRegEye } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const GroupCard: React.FC<GroupCardProps> = ({ title, description, tutor, faculty, students, isActive = true }) => {
  const nevigate = useNavigate()
  const handleViewDetails = () => {
    nevigate(`/student/group-detail`)
  }

  return (
    <div className='flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'>
      {/* Active Badge */}
      {isActive && (
        <div className='flex justify-end mb-4'>
          <span className='bg-green-500 text-white text-xs px-3 py-1 rounded-full'>Active</span>
        </div>
      )}

      <div className='flex-grow'>
        {/* Title */}
        <h3 className='text-lg font-semibold text-gray-800 mb-3 line-clamp-2'>{title}</h3>

        {/* Description */}
        <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{description}</p>
      </div>

      {/* Details */}
      <div className='space-y-2 mb-6'>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <span>Tutor: {tutor}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <span>Faculty: {faculty}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <span>Student: {students}</span>
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={handleViewDetails}
        className='w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 duration-200 ease-in-out hover:text-white transition-colors cursor-pointer'
      >
        <FaRegEye className='mr-2 inline-block' /> View details
      </button>
    </div>
  )
}

export default GroupCard
