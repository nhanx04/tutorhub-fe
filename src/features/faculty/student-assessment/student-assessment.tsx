import { MainLayout } from 'src/layouts'
import React from 'react';
import Table  from 'src/features/faculty/student-assessment/components/Table';
import { exportStudentPdf } from './components/exportPdf';
import {FiDownload, FiSearch} from "react-icons/fi";
import { TfiMenuAlt } from "react-icons/tfi";
import { useStudentAssessment } from './components/useStudentAssessment';

export const StudentAssessmentPage = () => {

  const {
    keyword, setKeyword,
    selectedTutor, setSelectedTutor,
    filteredData,
    uniqueTutors,
    handleSearch,
    columns
  } = useStudentAssessment();
  return (
    <MainLayout>
      <div className='p-8 bg-white shadow-2xl rounded-xl'>

        {/* --- KHỐI LỌC VÀ TÌM KIẾM --- */}
        <div className='grid grid-cols-1 md:grid-cols-6 gap-4 mb-8 items-end p-4 rounded-lg border border-indigo-200'>

          <div className='col-span-3'>
            <input
              type='text'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder='Enter keywords to search...'
              className='w-full px-4 py-2 border rounded-lg'
            />
          </div>

          <div className='md:col-span-2'>
            <select
              value={selectedTutor}
              onChange={(e) => setSelectedTutor(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg bg-white focus:outline-none'
            >
              <option value=''>--- All Tutors ---</option>
              {uniqueTutors.map((tutor, index) => (
                <option key={index} value={tutor}>
                  {tutor}
                </option>
              ))}
            </select>
          </div>

          <div className='flex md:col-span-1'>
            <button
              onClick={handleSearch}
              className='flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white  hover:bg-indigo-800'
            >
              <FiSearch size={18} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Title + Export */}
        <div className='flex justify-between items-center mb-5 p-4 bg-blue-100 rounded-lg border border-blue-100' >
          <h3 className='text-xl font-bold text-blue-800 flex items-center gap-2' >
            <TfiMenuAlt className='w-6 h-6' />
            Student Review ({filteredData.length} items)
          </h3>
        <button
         onClick={() => exportStudentPdf(filteredData)}
          className='flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white  hover:bg-green-700'
        >
          <FiDownload size={18} />
          <span>Export</span>
        </button>
        </div>

        {/* Table */}
        <Table columns={columns} data={filteredData} />
      </div>
    </MainLayout>
  );
};
