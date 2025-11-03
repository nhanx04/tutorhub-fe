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

export interface GroupCardProps {
  group: StudentGroup
  isSelected: boolean
  onSelect: (group: StudentGroup) => void
  onViewDetails?: (group: StudentGroup) => void
  disableSelection?: boolean
}
