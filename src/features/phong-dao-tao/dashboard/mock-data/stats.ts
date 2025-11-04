export type StatRow = {
  id: number;
  faculty: string;
  tutor?: number;
  student?: number;
  group?: number;
  consultation?: number;
  date: string; // ISO yyyy-mm-dd dùng để lọc
};

// ví dụ ngày rải từ Jan → Jun 2025
export const facultyStats: StatRow[] = [
  { id: 1, faculty: 'Computer Science and Engineering', date: '2025-01-10' },
  { id: 2, faculty: 'Computer Science and Engineering', date: '2025-02-05' },
  { id: 3, faculty: 'Computer Science and Engineering', date: '2025-03-12' },
  { id: 4, faculty: 'Computer Science and Engineering', date: '2025-04-20' },
  { id: 5, faculty: 'Computer Science and Engineering', date: '2025-05-08' },
  { id: 6, faculty: 'Computer Science and Engineering', date: '2025-06-15' },
  { id: 7, faculty: 'Computer Science and Engineering', date: '2025-06-25' },
];

export const topicStats: StatRow[] = [
  { id: 1, faculty: 'Cyber Security', date: '2025-01-03' },
  { id: 2, faculty: 'Cyber Security', date: '2025-02-14' },
  { id: 3, faculty: 'Cyber Security', date: '2025-03-01' },
  { id: 4, faculty: 'Cyber Security', date: '2025-04-18' },
  { id: 5, faculty: 'Cyber Security', date: '2025-05-22' },
  { id: 6, faculty: 'Cyber Security', date: '2025-06-05' },
  { id: 7, faculty: 'Cyber Security', date: '2025-06-28' },
];
