export interface StudentGroup {
  id: number
  title: string
  description: string
  tutor: string
  faculty: string
  currentStudents: number
  maxStudents: number
  focusAreas: string[]
  scheduleSummary: string
}

export interface ExplorerGroupCardProps {
  group: StudentGroup
  isSelected: boolean
  onSelect: (group: StudentGroup) => void
  onViewDetails?: (group: StudentGroup) => void
  disableSelection?: boolean
}

export type GroupStatus = 'Active' | 'Inactive'

export interface RegisteredGroup {
  id: number
  title: string
  description: string
  tutor: string
  faculty: string
  students: number
  status: GroupStatus
}

export interface DashboardGroupCardProps {
  group: RegisteredGroup
  onViewDetails?: (group: RegisteredGroup) => void
}
