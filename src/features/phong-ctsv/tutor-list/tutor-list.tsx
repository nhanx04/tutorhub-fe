import { MainLayout } from 'src/layouts';
import Table, { type Column } from "src/features/faculty/student-assessment/components/Table";

import { FiDownload, FiSearch } from "react-icons/fi";
import { CiFilter, CiCalendar } from "react-icons/ci";
import { IoArrowForwardOutline } from "react-icons/io5";

import type { TutorSummary } from "./mockdata/tutor-data";
import { useTutorList } from "./components/useTutorList";

export const TutorListPage = () => {
  const {
    selectedFaculty, selectedTutor,
    dateFrom, dateTo,
    filteredData,
    uniqueFaculties, uniqueTutors,
    setSelectedFaculty, setSelectedTutor,
    setDateFrom, setDateTo,
    handleSearch,
  } = useTutorList();

  const columns: Column<TutorSummary>[] = [
    { header: 'Tutor ID', accessor: 'tutorId', width: '10%' },
    { header: 'Tutor Name', accessor: 'tutor', width: '20%' },
    { header: 'Faculties Taught', accessor: 'faculties', width: '35%' },
    { header: 'Total Groups', accessor: 'totalGroups', width: '10%', textAlign: 'center' },
    { header: 'Total Sessions', accessor: 'totalSessions', width: '15%', textAlign: 'center' },
    {
      header: 'View',
      width: '10%',
      textAlign: 'center',
      render: (row) => (
        <button className='flex items-center justify-center mx-auto gap-1 rounded-full bg-cyan-500 px-3 py-1.5 text-white shadow-md hover:bg-cyan-600 hover:scale-105'>
          <IoArrowForwardOutline size={16} />
        </button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className='p-4 md:p-8 bg-white shadow-2xl rounded-xl'>
        {/* FILTER BLOCK */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8 items-end p-4 bg-gray-50 rounded-xl border border-gray-200">

          {/* Faculty */}
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>Faculty</label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
            >
              <option value=''>--- All Faculties ---</option>
              {uniqueFaculties.map((f, i) => (
                <option key={i} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Tutor */}
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>Tutor</label>
            <select
              value={selectedTutor}
              onChange={(e) => setSelectedTutor(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg'
            >
              <option value=''>--- All Tutors ---</option>
              {uniqueTutors.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Date From */}
          <div className='relative'>
            <label className='block text-xs font-medium text-gray-700 mb-1'>From</label>
            <input type='date'
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg pr-8'
            />
            <CiCalendar size={18} className='absolute right-2 top-7 text-gray-400' />
          </div>

          {/* Date To */}
          <div className='relative'>
            <label className='block text-xs font-medium text-gray-700 mb-1'>To</label>
            <input type='date'
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg pr-8'
            />
            <CiCalendar size={18} className='absolute right-2 top-7 text-gray-400' />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2.5 text-white font-medium shadow-md hover:bg-indigo-800"
          >
            <FiSearch size={18} /> Search
          </button>

         {/* Export */}
          <div className="flex">
            <button
              onClick={() => console.log("Export CSV…")}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-white font-medium shadow-md hover:bg-green-700"
            >
              <FiDownload size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className='mb-4 flex items-center gap-3 text-lg font-semibold text-gray-700'>
          <CiFilter size={20} className='text-indigo-500' />
          List of Tutors ({filteredData.length} entries)
        </div>

        <Table columns={columns} data={filteredData} />
      </div>
    </MainLayout>
  );
};
