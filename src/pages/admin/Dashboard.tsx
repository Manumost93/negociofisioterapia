import { Link } from 'react-router-dom'
import { DashboardCard } from '../../components/admin/DashboardCard'
import { useAppointments } from '../../hooks/useAppointments'
import { useAvailability } from '../../hooks/useAvailability'
import { usePromotions } from '../../hooks/usePromotions'
import { formatDate, formatTime } from '../../utils/dateUtils'

export function Dashboard() {
  const { appointments, stats } = useAppointments()
  const { availableSlots } = useAvailability()
  const { activePromotions } = usePromotions()

  const upcomingAppointments = appointments
    .filter((a) => a.status === 'pending')
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return a.startTime.localeCompare(b.startTime)
    })
    .slice(0, 5)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Resumen del estado de tu negocio de fisioterapia
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          title="Total Citas"
          value={stats.total}
          icon="📅"
          color="green"
          subtitle="registradas en el sistema"
        />
        <DashboardCard
          title="Pendientes"
          value={stats.pending}
          icon="⏳"
          color="yellow"
          subtitle="por realizar"
        />
        <DashboardCard
          title="Completadas"
          value={stats.completed}
          icon="✅"
          color="teal"
          subtitle="sesiones realizadas"
        />
        <DashboardCard
          title="Slots Disponibles"
          value={availableSlots.length}
          icon="🕐"
          color="blue"
          subtitle="horarios libres"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Próximas Citas</h2>
            <Link
              to="/admin/citas"
              className="text-xs text-green-700 hover:text-green-800 font-medium"
            >
              Ver todas →
            </Link>
          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-sm">No hay citas pendientes</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">
                      {apt.clientName} {apt.clientLastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(apt.date)} · {formatTime(apt.startTime)}
                    </div>
                    <div className="text-xs text-gray-400 truncate">{apt.ailment}</div>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full flex-shrink-0">
                    Pendiente
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { to: '/admin/horarios', icon: '🕐', label: 'Añadir Horario' },
                { to: '/admin/citas', icon: '📋', label: 'Ver Citas' },
                { to: '/admin/promociones', icon: '🎯', label: 'Gestionar Promos' },
                { to: '/', icon: '🌐', label: 'Ver Sitio Web' },
              ].map((action) => (
                <Link
                  key={action.to}
                  to={action.to}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-colors text-center border border-gray-100 hover:border-green-200"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Active Promos */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Promociones Activas</h2>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                {activePromotions.length} activas
              </span>
            </div>
            {activePromotions.length === 0 ? (
              <p className="text-sm text-gray-400">No hay promociones activas</p>
            ) : (
              <div className="space-y-2">
                {activePromotions.slice(0, 3).map((promo) => (
                  <div key={promo.id} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <span className="text-green-600">🎯</span>
                    <span className="text-sm text-gray-700 truncate">{promo.title}</span>
                    {promo.discount && (
                      <span className="text-xs font-bold text-green-700 ml-auto flex-shrink-0">
                        {promo.discount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
