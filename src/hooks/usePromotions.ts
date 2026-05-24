import { useState, useEffect, useCallback } from 'react'
import type { Promotion } from '../types'
import { promotionService } from '../services/promotionService'

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    const data = promotionService.getAll()
    setPromotions(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const create = useCallback(
    (data: Omit<Promotion, 'id' | 'createdAt'>) => {
      const newPromo = promotionService.create(data)
      load()
      return newPromo
    },
    [load]
  )

  const update = useCallback(
    (id: string, updates: Partial<Omit<Promotion, 'id' | 'createdAt'>>) => {
      const updated = promotionService.update(id, updates)
      if (updated) load()
      return updated
    },
    [load]
  )

  const toggle = useCallback(
    (id: string) => {
      const toggled = promotionService.toggle(id)
      if (toggled) load()
      return toggled
    },
    [load]
  )

  const remove = useCallback(
    (id: string) => {
      const success = promotionService.delete(id)
      if (success) load()
      return success
    },
    [load]
  )

  const activePromotions = promotions.filter((p) => p.active)

  return { promotions, activePromotions, loading, create, update, toggle, remove, reload: load }
}
