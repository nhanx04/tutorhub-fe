// ✅ Định nghĩa kiểu dữ liệu cho 1 sinh viên
export interface StudentRow {
  stuId: string;
  name: string;
  faculty: string;
  topic: string;
  tutor: string;
  groups: number;
  sessions: number;
}

// ✅ Dữ liệu mẫu
export const tutorDataa: StudentRow[] = [
  { stuId: '123123', name: 'Nguyễn Trọng Nhân', faculty: 'Computer Science and Engineering', topic: 'Web Programming', groups: 1, sessions: 1, tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123124', name: 'Trần Thị Thuý', faculty: 'Computer Science and Engineering', topic: 'Data Structures', groups: 2, sessions: 2, tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123125', name: 'Lê Văn Khải', faculty: 'Business Administration', topic: 'Financial Accounting', groups: 3, sessions: 3, tutor: 'Hoàng Giữ Tiên Nhất' },
  { stuId: '123126', name: 'Phan Anh Dũng', faculty: 'Business Administration', topic: 'Digital Marketing', groups: 4, sessions: 4, tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123127', name: 'Bùi Thị Lan', faculty: 'Foreign Languages', topic: 'Academic English', groups: 5, sessions: 5, tutor: 'Hoàng Giữ Tiên Nhất' },
  { stuId: '123128', name: 'Đỗ Minh Tuấn', faculty: 'Mechanical Engineering', topic: 'Engineering Drawing', groups: 6, sessions: 6, tutor: 'Lê Trần Tấn Phát' },
  { stuId: '123129', name: 'Hoàng Văn Cường', faculty: 'Computer Science and Engineering', topic: 'Network Security', groups: 7, sessions: 7, tutor: 'Hoàng Giữ Tiên Nhất' },
];

// ✅ Mã ID cố định cho Tutor
export const TUTOR_ID_MAP: Record<string, string> = {
  'Lê Trần Tấn Phát': '0001',
  'Hoàng Giữ Tiên Nhất': '0002',
};

// ✅ Định nghĩa cơ sở cho dữ liệu tutor tổng hợp
export interface TutorSummary {
  faculties: string;
  numFaculties: number;
  tutorId: string;
  tutor: string;
  totalGroups: number;
  totalSessions: number;
  students: StudentRow[];
}
