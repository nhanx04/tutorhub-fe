export interface TutorGroupFormProps {
  mode: 'create' | 'edit'
  initialData?: {
    topic: string
    title: string
    description: string
    fromDate: string
    toDate: string
    students: number
    status: string
  }
  onCancel: () => void
  onSubmit: (data: any) => void
}