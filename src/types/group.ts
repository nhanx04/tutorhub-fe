import type { Faculty } from './faculty'
import type { Topic } from './topic'

// This represents the nested tutor object within a group
export interface TutorInGroup {
  uid: number
  userName: string
  email: string
  role: string
}

// This is the main Group interface based on the API response
// Represents a research group
export interface Group {
  id: number
  groupName: string
  description: string
  studentLimit: number
  status: string // e.g., '1' for active
  startDate: string
  endDate: string
  tutor: TutorInGroup
  faculty: Faculty
  topics: Topic[]
}

// This is for the request body when creating/updating a group
export interface GroupFormData {
  groupName: string
  description: string
  studentLimit: number
  status: string
  startDate: string
  endDate: string
  topicIds: number[]
  facultyId: number
}
