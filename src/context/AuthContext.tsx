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

  // Hardcoded login: derive role from email and set a fake token
  const login = async (credential: Credentials): Promise<User> => {
    const email = credential.email.toLowerCase()

    let role: User['role'] = 'student'
    if (email.includes('tutor')) role = 'tutor'
    else if (email.includes('faculty')) role = 'faculty'
    else if (email.includes('pctsv')) role = 'pctsv'
    else if (email.includes('pdt')) role = 'pdt'

    const fakeUser: User = {
      user_id: `hardcoded-${role}`,
      name: email.split('@')[0] || 'User',
      email,
      role
    }

    // set a fake token to keep existing flows that rely on token
    authService.setToken('hardcoded-token')
    localStorage.setItem('user', JSON.stringify(fakeUser))
    setUser(fakeUser)
    return fakeUser
  }

  const logout = () => {
    authService.removeToken()
    localStorage.removeItem('user') // Remove user data
    setUser(null)
  }

  const value = { user, login, logout, isAuthenticated: !loading && !!user }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
