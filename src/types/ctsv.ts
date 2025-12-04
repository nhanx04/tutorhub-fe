export interface StudentStat {
  userId: string
  userName: string
  facultyName: string
  groupCount: number
  consultationCount: number
}

export interface TutorStat {
  userId: string
  userName: string
  facultyName: string
  groupCount: number
  consultationCount: number
}

export interface CTSVQuery {
  facultyId?: number
  topicId?: number
  tutorId?: number
  studentId?: number
  startDate?: string
  endDate?: string
}

