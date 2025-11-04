import type { ConsultationSession } from 'src/types'

export const sampleData: ConsultationSession[] = [
  {
    id: 1,
    conId: 'CONS-101',
    generalDetails: {
      title: 'Kick-off: project charter review',
      description: 'Bring your draft scope statement and risk register for quick feedback.',
      links: ['https://canvas.hcmut.edu.vn/resources/capstone-charter-template.pdf']
    },
    timeAndLocation: {
      time: '14:00 - 15:30',
      date: '2025-12-12',
      location: 'H6-201'
    },
    capacity: {
      registered: 18,
      total: 20
    },
    status: 'Allow Register',
    isRegistered: false,
    cancellationDeadline: '2025-12-11T14:00:00'
  },
  {
    id: 2,
    conId: 'CONS-205',
    generalDetails: {
      title: 'Sprint planning and workload balance',
      description: 'Hands-on working session to craft sprint goals and capacity plan for your team.',
      links: ['https://canvas.hcmut.edu.vn/resources/sprint-planning-checklist.pdf']
    },
    timeAndLocation: {
      time: '09:00 - 10:30',
      date: '2025-12-18',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/abc123'
    },
    capacity: {
      registered: 15,
      total: 15
    },
    status: 'Completed',
    isRegistered: false,
    cancellationDeadline: '2025-12-17T09:00:00'
  },
  {
    id: 3,
    conId: 'CONS-310',
    generalDetails: {
      title: 'Retrospective and wrap-up',
      description: 'Share outcomes, key lessons and prepare the capstone showcase narrative together.',
      links: ['https://canvas.hcmut.edu.vn/resources/retrospective-template.pdf']
    },
    timeAndLocation: {
      time: '15:00 - 16:30',
      date: '2025-10-20',
      location: 'Innovation Hub 3rd floor'
    },
    capacity: {
      registered: 16,
      total: 20
    },
    status: 'Completed',
    isRegistered: true,
    feedback: {
      rating: 4,
      comment: 'The retrospective format helped us align on improvements for next semester.'
    }
  }
]
