import { authService, ApiError } from './authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface FeedbackData {
  rating: number
  comment: string
  consultationId: number
}

class FeedbackService {
  async postFeedback(feedbackData: FeedbackData) {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/feedbacks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to submit feedback',
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

  async updateFeedback(feedbackId: number, feedbackData: Partial<FeedbackData>) {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/feedbacks/${feedbackId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to update feedback',
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

  async deleteFeedback(feedbackId: number) {
    const token = authService.getToken()
    if (!token) {
      throw new ApiError({ message: 'No authentication token found', status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/feedbacks/${feedbackId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to delete feedback',
          status: response.status
        })
      }

      // DELETE requests might not return a body, so we return a success status
      return { success: true }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({ message: 'Cannot connect to the server', status: 0 })
    }
  }
}
// }

export const feedbackService = new FeedbackService()
