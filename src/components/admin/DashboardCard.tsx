
interface DashboardCardProps {
  title: string
  value: string | number
  icon: string
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'teal' | 'purple'
  subtitle?: string
  trend?: { value: string; up: boolean }
}

const colorMap = {
  green: {
    bg: 'bg-green-50',
    icon: 'bg-green-100 text-green-700',
    value: 'text-green-700',
    border: 'border-green-100',
  },
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-100 text-blue-700',
    value: 'text-blue-700',
    border: 'border-blue-100',
  },
  yellow: {
    bg: 'bg-yellow-50',
    icon: 'bg-yellow-100 text-yellow-700',
    value: 'text-yellow-700',
    border: 'border-yellow-100',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'bg-red-100 text-red-700',
    value: 'text-red-700',
    border: 'border-red-100',
  },
  teal: {
    bg: 'bg-teal-50',
    icon: 'bg-teal-100 text-teal-700',
    value: 'text-teal-700',
    border: 'border-teal-100',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'bg-purple-100 text-purple-700',
    value: 'text-purple-700',
    border: 'border-purple-100',
  },
}

export function DashboardCard({ title, value, icon, color = 'green', subtitle, trend }: DashboardCardProps) {
  const colors = colorMap[color]

  return (
    <div className={`${colors.bg} rounded-2xl p-5 border ${colors.border} card-hover`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold mt-1 ${colors.value}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend.up ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.up ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className={`w-11 h-11 ${colors.icon} rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
