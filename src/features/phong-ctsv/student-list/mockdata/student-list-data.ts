export interface StudentRow {
  stuId: string;
  name: string;
  faculty: string;
  topic: string;
  tutor: string;
  groups: number;
  sessions: number;
}

export const FACULTY_TOPIC_MAP: Record<string, string[]> = {
  'Computer Science and Engineering': ['Data Structures', 'Web Programming', 'Database Systems', 'Network Security'],
  'Business Administration': ['Financial Accounting', 'Digital Marketing', 'Macroeconomics'],
  'Foreign Languages': ['Academic English', 'Business Japanese'],
  'Mechanical Engineering': ['Engineering Drawing', 'Solid Mechanics'],
};

export const tutorDataa: StudentRow[] = [
  { stuId: '123123', name: 'Nguyen Trong Nhan', faculty: 'Computer Science and Engineering', topic: 'Web Programming', groups: 1, sessions: 1, tutor: 'Le Tran Tan Phat' },
  { stuId: '123124', name: 'Tran Thi Thuy', faculty: 'Computer Science and Engineering', topic: 'Data Structures', groups: 2, sessions: 2, tutor: 'Le Tran Tan Phat' },
  { stuId: '123125', name: 'Le Van Khai', faculty: 'Business Administration', topic: 'Financial Accounting', groups: 3, sessions: 3, tutor: 'Hoang Giu Tien Nhat' },
  { stuId: '123126', name: 'Phan Anh Dung', faculty: 'Business Administration', topic: 'Digital Marketing', groups: 4, sessions: 4, tutor: 'Le Tran Tan Phat' },
  { stuId: '123127', name: 'Bui Thi Lan', faculty: 'Foreign Languages', topic: 'Academic English', groups: 5, sessions: 5, tutor: 'Hoang Giu Tien Nhat' },
  { stuId: '123128', name: 'Do Minh Tuan', faculty: 'Mechanical Engineering', topic: 'Engineering Drawing', groups: 6, sessions: 6, tutor: 'Le Tran Tan Phat' },
  { stuId: '123129', name: 'Hoang Van Cuong', faculty: 'Computer Science and Engineering', topic: 'Network Security', groups: 7, sessions: 7, tutor: 'Hoang Giu Tien Nhat' },
];
