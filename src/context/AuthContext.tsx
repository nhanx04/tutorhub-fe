import { createContext, useState, useEffect, type ReactNode } from 'react'
import type { User, Credentials } from '../types'
import { authService } from '../services/authService'

interface AuthContextType {
  user: User | null
  login: (credential: Credentials) => Promise<User>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProdivderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProdivderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on initial load (hardcoded mode)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error)
        authService.removeToken() // Clear corrupted data
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  // Login with API call
  const login = async (credential: Credentials): Promise<User> => {
    try {
      // Call API to get token
      const loginResponse = await authService.login(credential)

      // Store token
      authService.setToken(loginResponse.token)

      // Get user info from API
      const user = await authService.getCurrentUser()

      // Store user data
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)

      return user
    } catch (error) {
      // Clear any stored data on login failure
      authService.removeToken()
      localStorage.removeItem('user')
      throw error
    }
  }

  const logout = () => {
    authService.removeToken()
    localStorage.removeItem('user') // Remove user data
    setUser(null)
  }

  const value = { user, login, logout, isAuthenticated: !loading && !!user }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
