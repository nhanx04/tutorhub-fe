export type ConsultationModePreference = 'Onsite' | 'Online' | 'Hybrid'

export interface EmergencyContact {
  name: string
  relation: string
  phone: string
}

export interface StudentProfile {
  id: string
  fullName: string
  studentId: string
  faculty: string
  major: string
  year: string
  avatarUrl: string
  email: string
  phone: string
  location: string
  linkedin?: string
  bio: string
  goals: string
  supportNeeds: string
  expertiseTags: string[]
  achievements: string[]
  languages: string[]
  availability: string[]
  preferredConsultationMode: ConsultationModePreference
  emergencyContact?: EmergencyContact
}
