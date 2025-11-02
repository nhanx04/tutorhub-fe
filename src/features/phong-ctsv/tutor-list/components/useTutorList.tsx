import { useMemo, useCallback, useState, useEffect } from "react";
import type { StudentRow, TutorSummary } from "../mockdata/tutor-data";
import { tutorDataa, TUTOR_ID_MAP } from "../mockdata/tutor-data";

// ✅ Hàm tổng hợp dữ liệu tutor
const aggregateTutorData = (students: StudentRow[]): TutorSummary[] => {
  type Temp = Omit<TutorSummary, 'faculties' | 'numFaculties'> & { faculties: Set<string> };

  const tutorMap: Record<string, Temp> = {};

  students.forEach((student) => {
    const tutorName = student.tutor;
    const tutorId = TUTOR_ID_MAP[tutorName] || 'TUNK';

    if (!tutorMap[tutorName]) {
      tutorMap[tutorName] = {
        tutorId,
        tutor: tutorName,
        faculties: new Set(),
        totalGroups: 1,
        totalSessions: 3,
        students: []
      };
    }

    const entry = tutorMap[tutorName];
    entry.faculties.add(student.faculty);
    // entry.totalGroups += student.groups;
    // entry.totalSessions += student.sessions;
    entry.students.push(student);
  });

  return Object.values(tutorMap).map((tutor) => ({
    ...tutor,
    faculties: Array.from(tutor.faculties).join(', '),
    numFaculties: tutor.faculties.size,
  }));
};

export const useTutorList = () => {
  const baseTutorData = useMemo(() => aggregateTutorData(tutorDataa), []);

  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedTutor, setSelectedTutor] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredData, setFilteredData] = useState<TutorSummary[]>([]);

  const uniqueFaculties = useMemo(
    () => [...new Set(tutorDataa.map((i) => i.faculty))].sort(),
    []
  );
  const uniqueTutors = useMemo(
    () => [...new Set(tutorDataa.map((i) => i.tutor))].sort(),
    []
  );

  const applyFilter = useCallback((faculty: string, tutor: string) => {
    const result = baseTutorData.filter((item) => {
      const facultyMatch = faculty === '' || item.faculties.includes(faculty);
      const tutorMatch = tutor === '' || item.tutor === tutor;
      return facultyMatch && tutorMatch;
    });

    setFilteredData(result);
  }, [baseTutorData]);

  useEffect(() => {
    applyFilter('', '');
  }, [applyFilter]);

  const handleSearch = () => {
    applyFilter(selectedFaculty, selectedTutor);
  };

  return {
    filteredData,
    uniqueFaculties,
    uniqueTutors,

    selectedFaculty,
    selectedTutor,
    dateFrom,
    dateTo,

    setSelectedFaculty,
    setSelectedTutor,
    setDateFrom,
    setDateTo,
    handleSearch,
  };
};
