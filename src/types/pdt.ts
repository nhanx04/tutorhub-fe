// PDT statistics types
export interface PDTStat {
  id: number
  name: string
  tutorCount: number
  studentCount: number
  groupCount: number
  consultationCount: number
}

export interface PDTStatQuery {
  startDate: string // yyyy-mm-dd
  endDate: string   // yyyy-mm-dd
}

