export interface TutorGroupInformationProps {
  id: number

  groupName: string

  description: string
}

export interface ConsulSession {
  id: number
  groupName: string
  groupDescription: string
  sessions: Session[]
}

export interface Session {
  sid: number
  generalDetails: GeneralDetails
  timeAndLocation: TimeAndLocation
  students: string
  status: 'Allow Register' | 'Completed' | 'Canceled'
}

export interface GeneralDetails {
  topic: string
  description: string
  links: string[]
}

export interface TimeAndLocation {
  time: string[]
  date: string
  location: string
  meetingLink: string
}

export interface ConsulCardProps {
  session: Session
}

export interface NewConsul {
  onBack?: () => void
}
