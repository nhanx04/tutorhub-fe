export interface Session {
  sid: number
  generalDetails: {
    topic: string
    description: string
    links: string[]
  }
  timeAndLocation: {
    time: string | string[]
    date: string
    location?: string
    meetingLink?: string
  }
  students: string
  status: 'Allow Register' | 'Completed' | 'Canceled'
}

export interface ConsulSession {
  id: number
  groupName: string
  groupDescription: string
  sessions: Session[]
}

export interface ConsulCardProps {
  session: Session | any
  groupId?: number
}

export interface NewConsul {
  onBack?: () => void
}
