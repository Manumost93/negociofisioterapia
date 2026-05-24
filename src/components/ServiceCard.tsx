import { Link } from 'react-router-dom'

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  features?: string[]
  showCTA?: boolean
}

export function ServiceCard({ icon, title, description, features, showCTA = true }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover flex flex-col">
      <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed flex-1">{description}</p>
      {features && features.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-4 h-4 text-green-600 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
      {showCTA && (
        <div className="mt-5">
          <Link
            to="/reservar"
            className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            Reservar este servicio
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}
