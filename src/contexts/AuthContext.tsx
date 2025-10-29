import { createContext, useContext, useState, ReactNode } from 'react'

export type UserType = 'buyer' | 'seller' | 'broker'

interface User {
  username: string
  userType: UserType
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string, userType: UserType) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (username: string, password: string, userType: UserType): boolean => {
    // Hardcoded credentials
    if (username === 'user' && password === 'password') {
      setUser({ username, userType })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
