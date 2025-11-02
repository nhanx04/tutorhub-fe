export interface TutorGroupCardProps {
  id: number

  groupName: string

  description: string

  tutor: string

  faculty: string

  studentLimit: number

  status: string
}
export interface ModalProps {
  show: boolean
  onClick: () => void
  title?: string
  message?: string
  icon?: React.ReactNode
}
