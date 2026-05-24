import { Link } from 'react-router-dom'
import type { Promotion } from '../types'

interface PromotionCardProps {
  promotion: Promotion
  showCTA?: boolean
}

export function PromotionCard({ promotion, showCTA = true }: PromotionCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-50 to-transparent rounded-bl-full pointer-events-none" />

      {/* Badge */}
      {promotion.badge && (
        <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3">
          {promotion.badge}
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{promotion.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{promotion.description}</p>

      {/* Discount highlight */}
      {promotion.discount && (
        <div className="mt-4 flex items-center gap-3">
          <div className="px-4 py-2 bg-green-700 text-white font-bold text-lg rounded-xl shadow-sm">
            {promotion.discount}
          </div>
          <span className="text-sm text-gray-500">de descuento</span>
        </div>
      )}

      {showCTA && (
        <div className="mt-5">
          <Link
            to="/reservar"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Aprovechar oferta
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}
