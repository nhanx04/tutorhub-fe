import React from 'react'

import TutorCard from 'src/features/student/dashboard/components/GroupCard'
import { tutorData } from './mock-data/card-data'
import { FaSearch } from 'react-icons/fa'
import { MainLayout } from 'src/layouts'
import { useState } from 'react'

export default function DashboardPage() {
  const [keyword, setKeyword] = useState('')
  const [selectedTutor, setSelectedTutor] = useState('')

  // Lấy danh sách các tutor duy nhất từ dữ liệu mẫu để điền vào dropdown
  const uniqueTutors = [...new Set(tutorData.map((item) => item.tutor))]

  // Hàm xử lý khi bấm nút search (hiện tại chỉ log ra console)
  const handleSearch = () => {
    console.log('Searching for:', { keyword, tutor: selectedTutor })
    // Tại đây, bạn sẽ thêm logic để lọc `tutorData` dựa trên
    // `keyword` và `selectedTutor` rồi cập nhật lại state hiển thị danh sách
  }

  return (
    <MainLayout>
      <div className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-6 gap-4 mb-6'>
          {/* Ô nhập keyword */}
          <div className='col-span-3'>
            <input
              type='text'
              id='keyword'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder='Enter keywords to search'
              className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            />
          </div>

          {/* Dropdown chọn Tutor */}
          <div className='md:col-span-2'>
            <select
              id='tutor'
              value={selectedTutor}
              onChange={(e) => setSelectedTutor(e.target.value)}
              className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            >
              <option value=''>All Tutors</option>
              {uniqueTutors.map((tutor, index) => (
                <option key={index} value={tutor}>
                  {tutor}
                </option>
              ))}
            </select>
          </div>

          {/* Nút Search */}
          <div className='flex items-end md:col-span-1'>
            <button
              onClick={handleSearch}
              className='cursor-pointer flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-700'
            >
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {tutorData.map((tutor, index) => (
          <TutorCard
            key={index}
            title={tutor.title}
            description={tutor.description}
            tutor={tutor.tutor}
            faculty={tutor.faculty}
            students={tutor.students}
          />
        ))}
      </div>
    </MainLayout>
  )
}
