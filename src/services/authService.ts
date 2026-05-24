import type { AdminSession } from '../types'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'
const SESSION_KEY = 'physio_admin_session'

export const authService = {
  login(username: string, password: string): boolean {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const session: AdminSession = {
        isAdmin: true,
        loggedAt: Date.now(),
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      return true
    }
    return false
  },

  logout(): void {
    localStorage.removeItem(SESSION_KEY)
  },

  isAuthenticated(): boolean {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (!raw) return false
      const session: AdminSession = JSON.parse(raw)
      // Session expires after 8 hours
      const eightHours = 8 * 60 * 60 * 1000
      if (Date.now() - session.loggedAt > eightHours) {
        localStorage.removeItem(SESSION_KEY)
        return false
      }
      return session.isAdmin === true
    } catch {
      return false
    }
  },

  getSession(): AdminSession | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (!raw) return null
      return JSON.parse(raw)
    } catch {
      return null
    }
  },
}
