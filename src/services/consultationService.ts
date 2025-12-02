import type { Consultation, ConsultationFormData } from 'src/types'
import { authService } from './authService'

const API_BASE_URL = 'http://localhost:8080/api/consultations'

const getAuthHeaders = () => {
  const token = authService.getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export const consultationService = {
  /**
   * Get all consultations for a specific group
   * GET /api/consultations/group/{groupId}
   */
  async getConsultationsByGroup(groupId: number): Promise<Consultation[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/group/${groupId}`, {
        headers: getAuthHeaders()
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch consultations: ${response.statusText}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching consultations:', error)
      throw error
    }
  },

  /**
   * Get a single consultation by ID
   * GET /api/consultations/{id}
   */
  async getConsultationById(id: number): Promise<Consultation> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        headers: getAuthHeaders()
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch consultation: ${response.statusText}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching consultation:', error)
      throw error
    }
  },

  /**
   * Create a new consultation
   * POST /api/consultations
   */
  async createConsultation(formData: ConsultationFormData): Promise<Consultation> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error(`Failed to create consultation: ${response.statusText}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error creating consultation:', error)
      throw error
    }
  },

  /**
   * Update an existing consultation
   * PUT /api/consultations/{id}
   */
  async updateConsultation(id: number, formData: Partial<ConsultationFormData>): Promise<Consultation> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        throw new Error(`Failed to update consultation: ${response.statusText}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error updating consultation:', error)
      throw error
    }
  },

  /**
   * Delete a consultation
   * DELETE /api/consultations/{id}
   */
  async deleteConsultation(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      if (!response.ok) {
        throw new Error(`Failed to delete consultation: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error deleting consultation:', error)
      throw error
    }
  }
}
