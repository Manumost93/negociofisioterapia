import { useState, useCallback } from 'react'
import { authService } from '../services/authService'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated())

  const login = useCallback((username: string, password: string): boolean => {
    const success = authService.login(username, password)
    if (success) setIsAuthenticated(true)
    return success
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setIsAuthenticated(false)
  }, [])

  const checkAuth = useCallback(() => {
    const auth = authService.isAuthenticated()
    setIsAuthenticated(auth)
    return auth
  }, [])

  return { isAuthenticated, login, logout, checkAuth }
}
