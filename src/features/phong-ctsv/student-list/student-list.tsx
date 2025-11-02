import React from "react";
import { MainLayout } from "src/layouts";
import Table from "src/features/faculty/student-assessment/components/Table";
import { CiCalendar, CiFilter } from "react-icons/ci";
import { FiSearch, FiDownload } from "react-icons/fi";
import { useStudentList } from "./components/useStudentList";

export const StudentListPage = () => {
  const {
    selectedFaculty,
    selectedTopic,
    selectedTutor,
    dateFrom,
    dateTo,
    filteredData,
    uniqueFaculties,
    uniqueTutors,
    availableTopics,
    setDateFrom,
    setDateTo,
    handleFacultyChange,
    handleTopicChange,
    handleTutorChange,
    handleSearch,
    columns,
  } = useStudentList();

  return (
    <MainLayout>
      <div className="p-4 md:p-8 bg-white shadow-2xl rounded-xl">

        {/* --- FILTER BLOCK --- */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-8 items-end p-4 bg-gray-50 rounded-xl border border-gray-200">

          {/* Faculty */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Faculty
            </label>
            <select
              value={selectedFaculty}
              onChange={handleFacultyChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-sm"
            >
              <option value="">--- All Faculties ---</option>
              {uniqueFaculties.map((faculty, index) => (
                <option key={index} value={faculty}>
                  {faculty}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Topic
            </label>
            <select
              value={selectedTopic}
              onChange={handleTopicChange}
              disabled={!selectedFaculty}
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-sm"
            >
              <option value="">--- All Topics ---</option>
              {availableTopics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {/* Tutor */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tutor
            </label>
            <select
              value={selectedTutor}
              onChange={handleTutorChange}
              className="w-full px-3 py-2 border rounded-lg shadow-sm text-sm"
            >
              <option value="">--- All Tutors ---</option>
              {uniqueTutors.map((tutor, index) => (
                <option key={index} value={tutor}>
                  {tutor}
                </option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            <CiCalendar size={18} className="absolute right-2 top-7 text-gray-400" />
          </div>

          {/* To Date */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            <CiCalendar size={18} className="absolute right-2 top-7 text-gray-400" />
          </div>

          {/* Search button */}
          <div className="flex">
            <button
              onClick={handleSearch}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2.5 text-white font-medium shadow-md hover:bg-indigo-800"
            >
              <FiSearch size={18} />
              <span>Search</span>
            </button>
          </div>

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

        {/* ---- TABLE ---- */}
        <div className="mb-4 flex items-center gap-3 text-lg font-semibold text-gray-700">
          <CiFilter size={20} className="text-indigo-500" />
          List of Students ({filteredData.length} entries)
        </div>

        <Table columns={columns} data={filteredData} />
      </div>
    </MainLayout>
  );
}
