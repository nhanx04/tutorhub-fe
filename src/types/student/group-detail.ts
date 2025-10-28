export interface ConsultationSession {
  id: number

  conId: string

  generalDetails: {
    title: string

    description: string

    links: string[]
  }

  timeAndLocation: {
    time: string

    date: string

    location: string

    meetingLink?: string
  }

  students: string

  status: 'Allow Register' | 'Completed'
}

export interface GroupInformationProps {
  title: string

  description: string

  tutor: string

  faculty: string

  studentCount: number
}
