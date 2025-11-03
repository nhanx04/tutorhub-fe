import type { RegisteredGroup } from 'src/types'

export const registeredGroups: RegisteredGroup[] = [
  {
    id: 1,
    title: 'Capstone mentoring - Information Systems',
    description:
      'Weekly touch-point to review graduation capstone progress, unblock data and deployment questions.',
    tutor: 'Tran Tuan Phat',
    faculty: 'Electronic and Telecommunication',
    students: 7,
    status: 'Active'
  },
  {
    id: 2,
    title: 'Security research coaching',
    description: 'Deep dives into threat modelling, incident response and security lab practice.',
    tutor: 'Tran Tuan Phat',
    faculty: 'Electronic and Telecommunication',
    students: 7,
    status: 'Active'
  },
  {
    id: 3,
    title: 'AI study roadmap guidance',
    description: 'Career guidance for AI learners, curated resources and skill development planning.',
    tutor: 'Tran Tuan Phat',
    faculty: 'Electronic and Telecommunication',
    students: 7,
    status: 'Active'
  },
  {
    id: 4,
    title: 'Well-being check-in for sophomores',
    description: 'Safe space to share struggles and build a balanced study-life plan.',
    tutor: 'Tran Tuan Phat',
    faculty: 'Electronic and Telecommunication',
    students: 7,
    status: 'Inactive'
  }
]
