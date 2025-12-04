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

    location?: string

    meetingLink?: string
  }

  capacity: {
    registered: number
    total: number
  }

  status: 'Allow Register' | 'Registered' | 'Completed' | 'Full' | 'Canceled'

  isRegistered: boolean

  cancellationDeadline?: string

  feedback?: {
    id: number
    rating: number
    comment: string
  }
}

export interface GroupInformationProps {
  title: string

  description: string

  tutor: string

  faculty: string

  studentCount: number

  focusAreas?: string[]

  scheduleSummary?: string

  contactEmail?: string

  meetingMode?: 'Onsite' | 'Online' | 'Hybrid'

  onSelectGroup?: () => void

  isGroupSelected?: boolean

  isSelectionDisabled?: boolean
}
