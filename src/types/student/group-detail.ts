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
