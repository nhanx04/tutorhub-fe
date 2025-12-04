import React, { useState } from 'react'
import { MainLayout } from 'src/layouts'
import Table from 'src/features/faculty/student-assessment/components/Table'
import { CiCalendar, CiFilter } from 'react-icons/ci'
import { FiSearch, FiDownload } from 'react-icons/fi'
import { useStudentList } from './components/useStudentList'
import { exportStudentListPdf } from './components/exportStudentListPdf'
import { exportStudentListCsv } from './components/exportStudentListCsv'

export const StudentListPage = () => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel'>('pdf')
  const {
    facultyId,
    topicId,
    keyword,
    faculties,
    topics,
    setFacultyId,
    setTopicId,
    setKeyword,
    dateFrom,
    dateTo,
    setDateFrom,
    setDateTo,
    filteredData,
    loading,
    error,
    handleSearch,
    columns
  } = useStudentList()

  const handleExport = () => {
    if (exportFormat === 'pdf') {
      exportStudentListPdf(filteredData)
    } else {
      exportStudentListCsv(filteredData)
    }
  }

  return (
    <MainLayout>
      <div className='p-4 md:p-8 bg-white shadow-2xl rounded-xl'>
        {/* --- FILTER BLOCK --- */}
        <div className='grid grid-cols-2 md:grid-cols-7 gap-3 mb-8 items-end p-4 bg-gray-50 rounded-xl border border-gray-200'>
          {/* Faculty Dropdown */}
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>Faculty</label>
            <select
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg text-sm'
            >
              <option value=''>All Faculties</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Dropdown */}
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>Topic</label>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg text-sm'
            >
              <option value=''>All Topics</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Keyword Search */}
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>Search Keyword</label>
            <input
              type='text'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg text-sm'
              placeholder='Name or ID'
            />
          </div>

          {/* From Date */}
          <div className='relative'>
            <label className='block text-xs font-medium text-gray-700 mb-1'>From</label>
            <input
              type='date'
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg text-sm'
            />
            <CiCalendar size={18} className='absolute right-2 top-7 text-gray-400' />
          </div>

          {/* To Date */}
          <div className='relative'>
            <label className='block text-xs font-medium text-gray-700 mb-1'>To</label>
            <input
              type='date'
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg text-sm'
            />
            <CiCalendar size={18} className='absolute right-2 top-7 text-gray-400' />
          </div>

          {/* Search button */}
          <div className='flex'>
            <button
              onClick={handleSearch}
              disabled={loading}
              className='flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2.5 text-white font-medium shadow-md hover:bg-indigo-800 disabled:opacity-60'
            >
              <FiSearch size={18} />
              <span>Search</span>
            </button>
          </div>

          {/* Export Dropdown */}
          <div className='flex gap-2'>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'excel')}
              className='px-3 py-2 border rounded-lg text-sm'
            >
              <option value='pdf'>PDF</option>
              <option value='excel'>Excel</option>
            </select>
            <button
              onClick={handleExport}
              disabled={loading || filteredData.length === 0}
              className='flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-white font-medium shadow-md hover:bg-green-700 disabled:opacity-60'
            >
              <FiDownload size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {error && <div className='mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700'>{error}</div>}

        {/* ---- TABLE ---- */}
        <div className='mb-4 flex items-center gap-3 text-lg font-semibold text-gray-700'>
          <CiFilter size={20} className='text-indigo-500' />
          List of Students ({filteredData.length} entries)
        </div>

        <Table columns={columns} data={filteredData} />
      </div>
    </MainLayout>
  )
}
