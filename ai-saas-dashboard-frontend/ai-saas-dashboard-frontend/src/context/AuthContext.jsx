import { createContext, useCallback, useEffect, useState } from 'react'
import authService from '../services/authService'
import { tokenStorage } from '../services/api'

export const AuthContext = createContext(null)

// Roles as defined by the backend's role-based authorization scheme.
export const ROLES = {
  ADMIN: 'admin',
  PREMIUM: 'premium',
  FREE: 'free',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      setUser(null)
      setIsLoading(false)
      return
    }
    try {
      const profile = await authService.getProfile()
      setUser(profile)
    } catch {
      tokenStorage.clear()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const login = async (credentials) => {
    const loggedInUser = await authService.login(credentials)
    setUser(loggedInUser)
    return loggedInUser
  }

  const register = async (payload) => authService.register(payload)

  const logout = async () => {
    await authService.logout()
    setUser(null)
  }

  const updateUser = (partial) => setUser((prev) => ({ ...prev, ...partial }))

  const hasRole = (...roles) => Boolean(user) && roles.includes(user.role)

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser, hasRole, refresh: loadProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}
