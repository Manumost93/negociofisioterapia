export interface Client {
  id: string
  firstName: string
  lastName: string
  phone: string
  address: string
}

export interface Appointment {
  id: string
  clientId: string
  clientName: string
  clientLastName: string
  clientPhone: string
  address: string
  date: string
  startTime: string
  endTime: string
  ailment: string
  treatmentType: string
  sessionType: string
  notes?: string
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: string
  slotId: string
}

export interface AvailabilitySlot {
  id: string
  date: string
  startTime: string
  endTime: string
  status: 'available' | 'reserved' | 'blocked' | 'cancelled'
}

export interface Promotion {
  id: string
  title: string
  description: string
  discount?: string
  badge?: string
  active: boolean
  createdAt: string
}

export interface AdminUser {
  username: string
  password: string
}

export interface AdminSession {
  isAdmin: boolean
  loggedAt: number
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

export interface BookingFormData {
  slotId: string
  date: string
  startTime: string
  endTime: string
  ailment: string
  treatmentType: string
  sessionType: string
  firstName: string
  lastName: string
  phone: string
  address: string
  notes: string
}
