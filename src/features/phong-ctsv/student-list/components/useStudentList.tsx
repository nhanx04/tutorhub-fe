import { useState, useMemo, useCallback, useEffect } from "react";
import type { StudentRow } from "../mockdata/student-list-data";
import { tutorDataa, FACULTY_TOPIC_MAP } from "../mockdata/student-list-data";
import type { Column } from "src/features/faculty/student-assessment/components/Table";
import { IoArrowForwardOutline } from "react-icons/io5";

export const useStudentList = () => {
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedTutor, setSelectedTutor] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filteredData, setFilteredData] = useState<StudentRow[]>(tutorDataa);

  useEffect(() => {
    applyFilter(selectedFaculty, selectedTopic, selectedTutor);
  }, []);

  const uniqueFaculties = useMemo(() => {
    return [...new Set(tutorDataa.map((item) => item.faculty))].sort();
  }, []);

  const uniqueTutors = useMemo(() => {
    return [...new Set(tutorDataa.map((item) => item.tutor))].sort();
  }, []);

  const availableTopics = useMemo(() => {
    return selectedFaculty ? FACULTY_TOPIC_MAP[selectedFaculty] || [] : [];
  }, [selectedFaculty]);

  const applyFilter = useCallback((faculty: string, topic: string, tutor: string) => {
    const result = tutorDataa.filter((item) => {
      const facultyMatch = faculty === "" || item.faculty === faculty;
      const topicMatch = topic === "" || item.topic === topic;
      const tutorMatch = tutor === "" || item.tutor === tutor;
      return facultyMatch && topicMatch && tutorMatch;
    });

    setFilteredData(result);
  }, []);

  const handleFacultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFaculty = e.target.value;
    setSelectedFaculty(newFaculty);
    if (newFaculty !== selectedFaculty) {
      setSelectedTopic("");
    }
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
  };

  const handleTutorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTutor(e.target.value);
  };

  const handleSearch = () => {
    applyFilter(selectedFaculty, selectedTopic, selectedTutor);
  };

  const columns: Column<StudentRow>[] = useMemo(
    () => [
      { header: "Stu. ID", accessor: "stuId", width: "10%" },
      { header: "Name", accessor: "name", width: "20%" },
      {
        header: "Faculty",
        accessor: "faculty",
        width: "20%",
        render: (row) => <span className="font-medium text-indigo-600">{row.faculty}</span>,
      },
      {
        header: "Topic",
        accessor: "topic",
        width: "15%",
        render: (row) => <span className="text-sm text-gray-700">{row.topic}</span>,
      },
      {
        header: "Groups/Sessions",
        accessor: "groups",
        width: "15%",
        textAlign: "center",
        render: (row) => (
          <span className="font-mono text-gray-800">
            {row.groups} / {row.sessions}
          </span>
        ),
      },
      {
        header: "View",
        width: "10%",
        textAlign: "center",
        render: (row) => (
          <button
            className="flex items-center justify-center mx-auto gap-1 rounded-full bg-cyan-500 px-3 py-1.5 text-white text-sm font-medium shadow-md hover:bg-cyan-600 hover:scale-105"
          >
            <IoArrowForwardOutline size={16} />
          </button>
        ),
      },
    ],
    []
  );

  return {
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
  };
};
