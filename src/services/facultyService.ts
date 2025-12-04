import { authService, ApiError } from './authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface GetFacultyStudentsParams {
  groupId?: number
  tutorId?: number
}

class FacultyService {
  async getAllFaculties() {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/faculties`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to fetch faculties',
          status: response.status
        })
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }

  async getFacultyStudents(facultyId: number, params?: GetFacultyStudentsParams) {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const queryParams = new URLSearchParams()
      if (params?.groupId !== undefined) queryParams.append('groupId', String(params.groupId))
      if (params?.tutorId !== undefined) queryParams.append('tutorId', String(params.tutorId))
      const qs = queryParams.toString()
      const url = qs
        ? `${API_BASE_URL}/faculties/${facultyId}/students?${qs}`
        : `${API_BASE_URL}/faculties/${facultyId}/students`

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to fetch faculty students',
          status: response.status
        })
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }
}

export const facultyService = new FacultyService()
