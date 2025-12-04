import { authService, ApiError } from './authService'
import type { PDTStatQuery, PDTStat } from 'src/types/pdt'

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
}

export const statisticsService = new StatisticsService()
