// Service for fetching and updating user profile data

import { authService, ApiError } from './authService'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8080/api'

export interface Profile {
  uid: number
  userName: string
  email: string
  role: string
  personalEmail: string | null
  phoneNumber: string | null
  address: string | null
  faculty: { id: number; name: string } | null
}

export interface UpdateProfilePayload {
  personalEmail?: string | null
  phoneNumber?: string | null
  address?: string | null
}

class ProfileService {
  async getProfile(): Promise<Profile> {
    const token = authService.getToken()
    if (!token) throw new ApiError({ message: 'No authentication token found', status: 401 })

    const resp = await fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}))
      throw new ApiError({ message: err.message || 'Failed to fetch profile', status: resp.status })
    }

    return (await resp.json()) as Profile
  }

  async updateProfile(payload: UpdateProfilePayload): Promise<Profile> {
    const token = authService.getToken()
    if (!token) throw new ApiError({ message: 'No authentication token found', status: 401 })

    const resp = await fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}))
      throw new ApiError({ message: err.message || 'Failed to update profile', status: resp.status })
    }

    return (await resp.json()) as Profile
  }
}

export const profileService = new ProfileService()
