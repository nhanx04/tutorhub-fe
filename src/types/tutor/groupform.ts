export interface TutorGroupFormProps {
  mode: 'create' | 'edit'
  initialData?: {
    groupName: string
    description: string
    studentLimit: number
    startDate: string
    endDate: string
    topicIds: {
      id: number
      name: string
    }[]
    status: string
  }
  onCancel: () => void
  onSubmit: (data: any) => void
}
