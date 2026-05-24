import type { Promotion } from '../types'
import { generateInitialPromotions } from '../data/initialData'
import { generateId } from '../utils/idGenerator'

const STORAGE_KEY = 'physio_promotions'

function loadPromotions(): Promotion[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  const initial = generateInitialPromotions()
  savePromotions(initial)
  return initial
}

function savePromotions(promotions: Promotion[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(promotions))
}

export const promotionService = {
  initialize(): void {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (!existing) {
      const initial = generateInitialPromotions()
      savePromotions(initial)
    }
  },

  getAll(): Promotion[] {
    return loadPromotions()
  },

  getActive(): Promotion[] {
    return loadPromotions().filter((p) => p.active)
  },

  getById(id: string): Promotion | undefined {
    return loadPromotions().find((p) => p.id === id)
  },

  create(data: Omit<Promotion, 'id' | 'createdAt'>): Promotion {
    const promotions = loadPromotions()
    const newPromotion: Promotion = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    promotions.push(newPromotion)
    savePromotions(promotions)
    return newPromotion
  },

  update(id: string, updates: Partial<Omit<Promotion, 'id' | 'createdAt'>>): Promotion | null {
    const promotions = loadPromotions()
    const idx = promotions.findIndex((p) => p.id === id)
    if (idx === -1) return null
    promotions[idx] = { ...promotions[idx], ...updates }
    savePromotions(promotions)
    return promotions[idx]
  },

  toggle(id: string): Promotion | null {
    const promotions = loadPromotions()
    const promo = promotions.find((p) => p.id === id)
    if (!promo) return null
    promo.active = !promo.active
    savePromotions(promotions)
    return promo
  },

  delete(id: string): boolean {
    const promotions = loadPromotions()
    const idx = promotions.findIndex((p) => p.id === id)
    if (idx === -1) return false
    promotions.splice(idx, 1)
    savePromotions(promotions)
    return true
  },
}
