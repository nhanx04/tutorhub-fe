import React, { createContext, useState, type ReactNode } from 'react'
import type { User, Credentials } from '../types'

const student: User = {
  user_id: '2312345',
  name: 'HCMUT Student',
  email: 'student@hcmut.edu.vn'
}

interface AuthContextType {
  user: User | null
  login: (credential: Credentials) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProdivderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProdivderProps) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (credential: Credentials) => {
    console.log('Logging in with: ', credential)

    if (credential.email === 'student@hcmut.edu.vn' && credential.password === 'tutorhub@251') {
      setUser(student)
    } else {
      throw new Error('Sai email hoặc mật khẩu')
    }
  }

  const logout = () => {
    setUser(null)
  }

  const value = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
