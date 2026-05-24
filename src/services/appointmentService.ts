import type { Appointment } from '../types'
import { generateInitialAppointments, generateInitialSlots } from '../data/initialData'
import { generateId } from '../utils/idGenerator'
import { availabilityService } from './availabilityService'

const STORAGE_KEY = 'physio_appointments'
const INITIALIZED_KEY = 'physio_appointments_initialized'

function loadAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return []
}

function saveAppointments(appointments: Appointment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
}

export const appointmentService = {
  initialize(): void {
    const initialized = localStorage.getItem(INITIALIZED_KEY)
    if (!initialized) {
      availabilityService.initialize()
      const slots = availabilityService.getAll()
      const seedSlots = generateInitialSlots()
      const slotsToUse = slots.length > 0 ? slots : seedSlots
      const initial = generateInitialAppointments(slotsToUse)
      saveAppointments(initial)
      localStorage.setItem(INITIALIZED_KEY, 'true')
    }
  },

  getAll(): Appointment[] {
    return loadAppointments()
  },

  getById(id: string): Appointment | undefined {
    return loadAppointments().find((a) => a.id === id)
  },

  getPending(): Appointment[] {
    return loadAppointments().filter((a) => a.status === 'pending')
  },

  getCompleted(): Appointment[] {
    return loadAppointments().filter((a) => a.status === 'completed')
  },

  getCancelled(): Appointment[] {
    return loadAppointments().filter((a) => a.status === 'cancelled')
  },

  create(data: Omit<Appointment, 'id' | 'createdAt'>): Appointment | null {
    // Check slot is still available
    const slot = availabilityService.getById(data.slotId)
    if (!slot || slot.status !== 'available') return null

    // Reserve the slot atomically
    const reserved = availabilityService.reserve(data.slotId)
    if (!reserved) return null

    const appointments = loadAppointments()
    const newAppointment: Appointment = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    appointments.push(newAppointment)
    saveAppointments(appointments)
    return newAppointment
  },

  updateStatus(id: string, status: Appointment['status']): Appointment | null {
    const appointments = loadAppointments()
    const idx = appointments.findIndex((a) => a.id === id)
    if (idx === -1) return null
    appointments[idx] = { ...appointments[idx], status }
    saveAppointments(appointments)
    return appointments[idx]
  },

  cancel(id: string): boolean {
    const appointments = loadAppointments()
    const apt = appointments.find((a) => a.id === id)
    if (!apt) return false
    apt.status = 'cancelled'
    saveAppointments(appointments)
    // Release the slot back to available
    availabilityService.release(apt.slotId)
    return true
  },

  complete(id: string): boolean {
    const appointments = loadAppointments()
    const apt = appointments.find((a) => a.id === id)
    if (!apt) return false
    apt.status = 'completed'
    saveAppointments(appointments)
    return true
  },

  delete(id: string): boolean {
    const appointments = loadAppointments()
    const apt = appointments.find((a) => a.id === id)
    if (!apt) return false
    const idx = appointments.findIndex((a) => a.id === id)
    appointments.splice(idx, 1)
    saveAppointments(appointments)
    return true
  },

  getStats() {
    const all = loadAppointments()
    return {
      total: all.length,
      pending: all.filter((a) => a.status === 'pending').length,
      completed: all.filter((a) => a.status === 'completed').length,
      cancelled: all.filter((a) => a.status === 'cancelled').length,
    }
  },
}
