import type { AvailabilitySlot } from '../types'
import { generateInitialSlots } from '../data/initialData'
import { generateId } from '../utils/idGenerator'
import { getTodayString } from '../utils/dateUtils'

const STORAGE_KEY = 'physio_slots'

function loadSlots(): AvailabilitySlot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  const initial = generateInitialSlots()
  saveSlots(initial)
  return initial
}

function saveSlots(slots: AvailabilitySlot[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slots))
}

export const availabilityService = {
  initialize(): void {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (!existing) {
      const initial = generateInitialSlots()
      saveSlots(initial)
    }
  },

  getAll(): AvailabilitySlot[] {
    return loadSlots()
  },

  getAvailable(): AvailabilitySlot[] {
    const today = getTodayString()
    return loadSlots()
      .filter((s) => s.status === 'available' && s.date >= today)
      .sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date)
        return a.startTime.localeCompare(b.startTime)
      })
  },

  getById(id: string): AvailabilitySlot | undefined {
    return loadSlots().find((s) => s.id === id)
  },

  create(slot: Omit<AvailabilitySlot, 'id'>): AvailabilitySlot {
    const slots = loadSlots()
    const newSlot: AvailabilitySlot = { ...slot, id: generateId() }
    slots.push(newSlot)
    saveSlots(slots)
    return newSlot
  },

  update(id: string, updates: Partial<AvailabilitySlot>): AvailabilitySlot | null {
    const slots = loadSlots()
    const idx = slots.findIndex((s) => s.id === id)
    if (idx === -1) return null
    slots[idx] = { ...slots[idx], ...updates }
    saveSlots(slots)
    return slots[idx]
  },

  reserve(id: string): boolean {
    const slots = loadSlots()
    const slot = slots.find((s) => s.id === id)
    if (!slot || slot.status !== 'available') return false
    slot.status = 'reserved'
    saveSlots(slots)
    return true
  },

  release(id: string): boolean {
    const slots = loadSlots()
    const slot = slots.find((s) => s.id === id)
    if (!slot) return false
    slot.status = 'available'
    saveSlots(slots)
    return true
  },

  delete(id: string): boolean {
    const slots = loadSlots()
    const idx = slots.findIndex((s) => s.id === id)
    if (idx === -1) return false
    slots.splice(idx, 1)
    saveSlots(slots)
    return true
  },

  resetData(): void {
    const initial = generateInitialSlots()
    saveSlots(initial)
  },
}
