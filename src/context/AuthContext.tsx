import React, { createContext, useState, useEffect, type ReactNode } from 'react'
import type { User, Credentials } from '../types'
import { authService } from '../services/authService'

interface AuthContextType {
  user: User | null
  login: (credential: Credentials) => Promise<void>
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
    // Check for token and user data in localStorage on initial load
    const token = authService.getToken()
    const storedUser = localStorage.getItem('user')
    if (token && storedUser) {
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

  const login = async (credential: Credentials) => {
    // First, get the token from login
    const loginResponse = await authService.login(credential)
    authService.setToken(loginResponse.token)

    // Then, get user info using the token
    const user = await authService.getCurrentUser()
    localStorage.setItem('user', JSON.stringify(user)) // Store user data
    setUser(user)
  }

  const logout = () => {
    authService.removeToken()
    localStorage.removeItem('user') // Remove user data
    setUser(null)
  }

  const value = { user, login, logout, isAuthenticated: !loading && !!user }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
