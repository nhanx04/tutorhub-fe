import React from 'react'
import { FaUserGraduate, FaUniversity, FaChalkboardTeacher } from 'react-icons/fa'
import type { GroupInformationProps } from 'src/types'

export const GroupInformation: React.FC<GroupInformationProps> = ({
  title,
  description,
  tutor,
  faculty,
  studentCount
}) => {
  return (
    <div className='bg-white p-6 shadow-sm border border-gray-300 flex justify-between items-start'>
      {/* Phần bên trái: Tiêu đề và mô tả */}
      <div className='w-2/3 pr-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-3'>{title}</h1>
        <p className='text-gray-600 text-sm'>{description}</p>
      </div>

      {/* Phần bên phải: Thông tin chi tiết */}
      <div className='w-1/3 pl-6 border-l border-gray-200'>
        <ul className='space-y-3'>
          <li className='flex items-center text-blue-700'>
            <FaChalkboardTeacher className='mr-3 text-lg' />
            <div>
              <span className='font-medium'>Tutor:</span>
              <span className='ml-2'>{tutor}</span>
            </div>
          </li>
          <li className='flex items-center text-blue-700'>
            <FaUniversity className='mr-3 text-lg' />
            <div>
              <span className='font-medium'>Faculty:</span>
              <span className='ml-2'>{faculty}</span>
            </div>
          </li>
          <li className='flex items-center text-blue-700'>
            <FaUserGraduate className='mr-3 text-lg' />
            <div>
              <span className='font-medium'>Student:</span>
              <span className='ml-2'>{studentCount}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default GroupInformation
