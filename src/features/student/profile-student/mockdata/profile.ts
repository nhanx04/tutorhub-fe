import type { StudentProfile } from 'src/types'

export const mockStudentProfile: StudentProfile = {
  id: 'profile-001',
  fullName: 'Nguyen Thi Mai',
  studentId: '2253001',
  faculty: 'Computer Science and Engineering',
  major: 'Information Systems',
  year: 'Year 3',
  avatarUrl: 'https://i.pravatar.cc/160?img=12',
  email: '2253001@student.hcmut.edu.vn',
  phone: '+84 912 345 678',
  location: 'Ho Chi Minh City, Vietnam',
  linkedin: 'https://linkedin.com/in/mainguyen',
  bio: 'Active member of the SIS mentoring community. Passionate about bridging data analytics with student support services.',
  goals:
    'Complete capstone in data-driven student engagement, improve public speaking skills, and mentor junior students through the SIS community.',
  supportNeeds:
    'Guidance on structuring research methodology, feedback on storytelling for presentations, and resources for academic writing.',
  expertiseTags: ['Business Intelligence', 'Data Visualization', 'Project Coordination'],
  achievements: [
    'Top 10 TutorHub Student Mentee 2024',
    'Outstanding Academic Performance Award - Semester 221',
    'Co-lead, Student Success Analytics Initiative'
  ],
  languages: ['Vietnamese (native)', 'English (IELTS 7.5)'],
  availability: ['Tuesday 14:00 - 17:00', 'Thursday 09:00 - 11:00', 'Saturday 19:00 - 21:00 (online)'],
  preferredConsultationMode: 'Hybrid',
  emergencyContact: {
    name: 'Nguyen Van An',
    relation: 'Father',
    phone: '+84 987 654 321'
  }
}
