import { AppointmentTable } from '../../components/admin/AppointmentTable'
import { useAppointments } from '../../hooks/useAppointments'
import { useToast } from '../../components/ui/Toast'

export function AppointmentsAdmin() {
  const { appointments, cancel, complete, remove } = useAppointments()
  const { showToast } = useToast()

  const handleCancel = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      const success = cancel(id)
      if (success) showToast('Cita cancelada correctamente', 'success')
      else showToast('Error al cancelar la cita', 'error')
    }
  }

  const handleComplete = (id: string) => {
    const success = complete(id)
    if (success) showToast('Cita marcada como completada', 'success')
    else showToast('Error al actualizar la cita', 'error')
  }

  const handleDelete = (id: string) => {
    if (window.confirm('¿Eliminar esta cita? Esta acción no se puede deshacer.')) {
      const success = remove(id)
      if (success) showToast('Cita eliminada', 'success')
      else showToast('Error al eliminar la cita', 'error')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Citas</h1>
        <p className="text-gray-500 text-sm mt-1">
          {appointments.length} cita{appointments.length !== 1 ? 's' : ''} en total
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <AppointmentTable
          appointments={appointments}
          onCancel={handleCancel}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}
