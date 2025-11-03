import { useState, useCallback, useMemo } from "react";
import type { TutorItem } from "../mockdata/mock-data";
import { tutorData } from "../mockdata/mock-data";
import { HiOutlineMail } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import type { Column } from "src/features/faculty/student-assessment/components/Table";
import { FiUser, FiMessageSquare } from "react-icons/fi";
export const useStudentAssessment = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedTutor, setSelectedTutor] = useState("");
  const [filteredData, setFilteredData] = useState<TutorItem[]>(tutorData);

  const uniqueTutors = useMemo(() => {
    return [...new Set(tutorData.map((item) => item.tutor))].sort();
  }, []);

  const applyFilter = useCallback(() => {
    const lowerCaseKeyword = keyword.toLowerCase().trim();

    const result = tutorData.filter((item) => {
      const keywordMatch =
        item.name.toLowerCase().includes(lowerCaseKeyword) ||
        item.email.toLowerCase().includes(lowerCaseKeyword) ||
        item.feedback.toLowerCase().includes(lowerCaseKeyword);

      const tutorMatch = selectedTutor === "" || item.tutor === selectedTutor;

      return keywordMatch && tutorMatch;
    });

    setFilteredData(result);
  }, [keyword, selectedTutor]);

  const handleSearch = () => applyFilter();
  
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
  return {
    keyword,
    setKeyword,
    selectedTutor,
    setSelectedTutor,
    filteredData,
    uniqueTutors,
    handleSearch,
    columns,
  };
};
