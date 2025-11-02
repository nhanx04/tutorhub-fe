import { MainLayout } from 'src/layouts'
import React, { useMemo } from 'react';
import Table, { type Column } from 'src/features/faculty/student-assessment/components/Table';
import { exportStudentPdf } from './components/exportPdf';

import { FiUser, FiDownload, FiSearch, FiMessageSquare } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";

import { useStudentAssessment } from './components/useStudentAssessment';
import type { TutorItem } from './mockdata/mock-data';

export const StudentAssessmentPage = () => {

  const {
    keyword, setKeyword,
    selectedTutor, setSelectedTutor,
    filteredData,
    uniqueTutors,
    handleSearch
  } = useStudentAssessment();

  const columns: Column<TutorItem>[] = useMemo(() => [
    { header: 'Stu. ID', accessor: 'stuId', width: '10%' },
    {
      header: 'Name',
      accessor: 'name',
      width: '20%',
      render: (row) => (
        <div className="flex items-center gap-2">
          <FiUser size={16} className="text-indigo-500" />
          {row.name}
        </div>
      ),
    },
    {
      header: 'Email',
      accessor: 'email',
      width: '25%',
      render: (row) => (
        <div className="flex items-center gap-2">
          <HiOutlineMail size={16} className="text-gray-500" />
          {row.email}
        </div>
      ),
    },
    {
      header: 'Score',
      accessor: 'score',
      width: '10%',
      render: (row) => (
        <div className={`font-semibold text-center ${row.score >= 9 ? 'text-green-600' : 'text-yellow-600'}`}>
          <FaStar size={14} className="inline mr-1 fill-current" />
          {row.score}
        </div>
      ),
    },
    {
      header: 'Feedback',
      accessor: 'feedback',
      width: '25%',
      render: (row) => (
        <div className="flex items-center gap-2">
          <FiMessageSquare size={16} className="text-blue-500" />
          <span className="italic">{row.feedback}</span>
        </div>
      ),
    },
    {
      header: 'Tutor',
      accessor: 'tutor',
      width: '10%',
      render: (row) => (
        <span className="font-medium text-indigo-600">{row.tutor}</span>
      ),
    },
  ], []);

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
