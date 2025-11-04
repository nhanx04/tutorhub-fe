import type { StudentGroup } from 'src/types'

export const studentGroups: StudentGroup[] = [
  {
    id: 1,
    title: 'Capstone Coaching: Information Systems',
    description:
      'Coaching sessions that focus on planning, scope management and technical review for information system capstone projects.',
    tutor: 'Le Tran Tan Phat',
    faculty: 'Computer Science Faculty',
    currentStudents: 14,
    maxStudents: 18,
    focusAreas: ['Information Systems', 'Capstone', 'Project Planning'],
    scheduleSummary: 'Wed 14:00 - 16:00 | Room H6-201'
  },
  {
    id: 2,
    title: 'Security Fundamentals Learning Group',
    description:
      'Weekly deep-dive on network defence, vulnerability assessment labs and security tooling for junior students.',
    tutor: 'Le Tran Tan Phat',
    faculty: 'Computer Science Faculty',
    currentStudents: 18,
    maxStudents: 18,
    focusAreas: ['Network Security', 'Penetration Testing', 'Infrastructure'],
    scheduleSummary: 'Fri 19:30 - 21:00 | Online via MS Teams'
  },
  {
    id: 3,
    title: 'AI for Smart Mobility Research Club',
    description:
      'Reading group to explore computer vision and reinforcement learning techniques applied to mobility and transportation.',
    tutor: 'Le Tran Tan Phat',
    faculty: 'Software Engineering Faculty',
    currentStudents: 9,
    maxStudents: 15,
    focusAreas: ['Computer Vision', 'Reinforcement Learning', 'Research Skills'],
    scheduleSummary: 'Mon 09:00 - 11:00 | Lab B1-302'
  },
  {
    id: 4,
    title: 'Cloud Native Systems Mentoring',
    description:
      'Hands-on mentoring for students building distributed systems with Kubernetes, observability stacks and DevOps automation.',
    tutor: 'Le Tran Tan Phat',
    faculty: 'Computer Networks Faculty',
    currentStudents: 12,
    maxStudents: 20,
    focusAreas: ['Cloud Native', 'Kubernetes', 'DevOps'],
    scheduleSummary: 'Thu 15:00 - 17:00 | Innovation Hub'
  }
]
