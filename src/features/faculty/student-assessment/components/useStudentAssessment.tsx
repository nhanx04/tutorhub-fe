import { useState, useCallback, useMemo } from "react";
import type { TutorItem } from "../mockdata/mock-data";
import { tutorData } from "../mockdata/mock-data";

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

  return {
    keyword,
    setKeyword,
    selectedTutor,
    setSelectedTutor,
    filteredData,
    uniqueTutors,
    handleSearch,
  };
};
