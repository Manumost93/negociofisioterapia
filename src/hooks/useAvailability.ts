import { useState, useEffect, useCallback } from 'react'
import type { AvailabilitySlot } from '../types'
import { availabilityService } from '../services/availabilityService'

export function useAvailability() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([])
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    const all = availabilityService.getAll()
    const available = availabilityService.getAvailable()
    setSlots(all)
    setAvailableSlots(available)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const createSlot = useCallback(
    (slot: Omit<AvailabilitySlot, 'id'>) => {
      const newSlot = availabilityService.create(slot)
      load()
      return newSlot
    },
    [load]
  )

  const updateSlot = useCallback(
    (id: string, updates: Partial<AvailabilitySlot>) => {
      const updated = availabilityService.update(id, updates)
      if (updated) load()
      return updated
    },
    [load]
  )

  const deleteSlot = useCallback(
    (id: string) => {
      const success = availabilityService.delete(id)
      if (success) load()
      return success
    },
    [load]
  )

  const blockSlot = useCallback(
    (id: string) => {
      const updated = availabilityService.update(id, { status: 'blocked' })
      if (updated) load()
      return updated
    },
    [load]
  )

  const unblockSlot = useCallback(
    (id: string) => {
      const updated = availabilityService.update(id, { status: 'available' })
      if (updated) load()
      return updated
    },
    [load]
  )

  return {
    slots,
    availableSlots,
    loading,
    createSlot,
    updateSlot,
    deleteSlot,
    blockSlot,
    unblockSlot,
    reload: load,
  }
}
