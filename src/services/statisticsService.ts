import { authService, ApiError } from './authService'
import type { PDTStatQuery, PDTStat } from 'src/types/pdt'
import type { CTSVQuery, StudentStat, TutorStat } from 'src/types/ctsv'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8080/api'

class StatisticsService {
  private async get<T>(url: string): Promise<T> {
    const token = authService.getToken()
    if (!token) throw new ApiError({ message: 'No authentication token found', status: 401 })

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}))
      throw new ApiError({ message: err.message || 'Failed to fetch statistics', status: resp.status })
    }

    return (await resp.json()) as T
  }

  // PDT
  async getByFaculty(params: PDTStatQuery): Promise<PDTStat[]> {
    const qp = new URLSearchParams()
    qp.append('startDate', params.startDate)
    qp.append('endDate', params.endDate)
    const url = `${API_BASE_URL}/statistics/by-faculty?${qp.toString()}`
    return this.get<PDTStat[]>(url)
  }

  async getByTopic(params: PDTStatQuery): Promise<PDTStat[]> {
    const qp = new URLSearchParams()
    qp.append('startDate', params.startDate)
    qp.append('endDate', params.endDate)
    const url = `${API_BASE_URL}/statistics/by-topic?${qp.toString()}`
    return this.get<PDTStat[]>(url)
  }

  // CTSV
  async getByStudent(params: CTSVQuery = {}): Promise<StudentStat[]> {
    const qp = new URLSearchParams()
    if (params.facultyId != null) qp.append('facultyId', String(params.facultyId))
    if (params.topicId != null) qp.append('topicId', String(params.topicId))
    if (params.tutorId != null) qp.append('tutorId', String(params.tutorId))
    if (params.startDate) qp.append('startDate', params.startDate)
    if (params.endDate) qp.append('endDate', params.endDate)
    const qs = qp.toString()
    const url = qs ? `${API_BASE_URL}/statistics/by-student?${qs}` : `${API_BASE_URL}/statistics/by-student`
    return this.get<StudentStat[]>(url)
  }

  async getByTutor(params: CTSVQuery = {}): Promise<TutorStat[]> {
    const qp = new URLSearchParams()
    if (params.facultyId != null) qp.append('facultyId', String(params.facultyId))
    if (params.topicId != null) qp.append('topicId', String(params.topicId))
    if (params.studentId != null) qp.append('studentId', String(params.studentId))
    if (params.startDate) qp.append('startDate', params.startDate)
    if (params.endDate) qp.append('endDate', params.endDate)
    const qs = qp.toString()
    const url = qs ? `${API_BASE_URL}/statistics/by-tutor?${qs}` : `${API_BASE_URL}/statistics/by-tutor`
    return this.get<TutorStat[]>(url)
  }
}

export const statisticsService = new StatisticsService()
