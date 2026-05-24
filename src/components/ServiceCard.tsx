import { Link } from 'react-router-dom'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  features?: string[]
  showCTA?: boolean
  accentColor?: string
}

const COLORS = [
  'from-green-500 to-emerald-600',
  'from-teal-500 to-cyan-600',
  'from-emerald-500 to-green-600',
  'from-cyan-500 to-teal-600',
  'from-green-600 to-teal-500',
  'from-teal-600 to-emerald-500',
]

let colorIndex = 0

export function ServiceCard({ icon, title, description, features, showCTA = true }: ServiceCardProps) {
  const gradient = COLORS[colorIndex % COLORS.length]
  colorIndex++

  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 card-hover gradient-border flex flex-col overflow-hidden">
      {/* Subtle gradient bg on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-teal-50/0 group-hover:from-green-50/60 group-hover:to-teal-50/40 transition-all duration-500 rounded-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl mb-4 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>

        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>

        {features && features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {showCTA && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link
              to="/reservar"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors group/link"
            >
              Reservar este servicio
              <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
