import type { Credentials, User } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface LoginResponse {
  token: string
  type: string
}

export class ApiError extends Error {
  status: number

  constructor({ message, status }: { message: string; status: number }) {
    super(message)
    this.status = status
    this.name = 'ApiError'
  }
}

class AuthService {
  async login(credentials: Credentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Đăng nhập thất bại',
          status: response.status
        })
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({
        message: 'Không thể kết nối đến server',
        status: 0
      })
    }
  }

  // Token management methods
  setToken(token: string): void {
    localStorage.setItem('authToken', token)
  }

  getToken(): string | null {
    return localStorage.getItem('authToken')
  }

  removeToken(): void {
    localStorage.removeItem('authToken')
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  // Get current user info from token
  async getCurrentUser(): Promise<User> {
    const token = this.getToken()
    if (!token) {
      throw new ApiError({
        message: 'No authentication token found',
        status: 401
      })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError({
          message: errorData.message || 'Failed to get user info',
          status: response.status
        })
      }

      const userData = await response.json()
      return {
        user_id: userData.uid.toString(),
        name: userData.userName,
        email: userData.email,
        role: userData.role
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({
        message: 'Không thể kết nối đến server',
        status: 0
      })
    }
  }
}

// Create and export a singleton instance
export const authService = new AuthService()
