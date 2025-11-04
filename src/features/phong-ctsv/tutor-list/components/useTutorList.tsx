import { useMemo, useCallback, useState, useEffect } from "react";
import type { StudentRow, TutorSummary } from "../mockdata/tutor-data";
import { tutorDataa, TUTOR_ID_MAP } from "../mockdata/tutor-data";
import { IoArrowForwardOutline } from "react-icons/io5";
import type { Column } from "src/features/faculty/student-assessment/components/Table";

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
    columns,
  };
};
