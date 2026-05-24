import { Link } from 'react-router-dom'
import type { Promotion } from '../types'

interface PromotionCardProps {
  promotion: Promotion
  showCTA?: boolean
}

export function PromotionCard({ promotion, showCTA = true }: PromotionCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover gradient-border">
      {/* Top gradient accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-500" />

      {/* Decorative bg glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-50 via-teal-50/40 to-transparent rounded-bl-full pointer-events-none group-hover:from-green-100 transition-all duration-500" />

      <div className="relative p-6">
        {promotion.badge && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-green-600 to-teal-600 text-white text-[10px] font-bold rounded-full mb-3 tracking-wide uppercase shadow-sm shadow-green-500/30">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            {promotion.badge}
          </div>
        )}

        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">{promotion.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{promotion.description}</p>

        {promotion.discount && (
          <div className="mt-4 flex items-center gap-3">
            <div className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white font-black text-xl rounded-xl shadow-md shadow-green-500/30">
              {promotion.discount}
            </div>
            <span className="text-sm text-gray-500 font-medium">descuento</span>
          </div>
        )}

        {showCTA && (
          <div className="mt-5">
            <Link
              to="/reservar"
              className="group/btn inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-sm shadow-green-700/20 hover:shadow-md hover:shadow-green-700/30"
            >
              Aprovechar oferta
              <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
