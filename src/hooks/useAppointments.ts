import { useState, useEffect, useCallback } from 'react'
import type { Appointment } from '../types'
import { appointmentService } from '../services/appointmentService'

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    const data = appointmentService.getAll()
    setAppointments(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const cancel = useCallback(
    (id: string) => {
      const success = appointmentService.cancel(id)
      if (success) load()
      return success
    },
    [load]
  )

  const complete = useCallback(
    (id: string) => {
      const success = appointmentService.complete(id)
      if (success) load()
      return success
    },
    [load]
  )

  const remove = useCallback(
    (id: string) => {
      const success = appointmentService.delete(id)
      if (success) load()
      return success
    },
    [load]
  )

  const stats = appointmentService.getStats()

  return { appointments, loading, stats, cancel, complete, remove, reload: load }
}
