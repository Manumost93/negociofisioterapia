import { useState } from 'react'
import type { Appointment } from '../../types'
import { formatDate, formatTime } from '../../utils/dateUtils'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'

interface AppointmentTableProps {
  appointments: Appointment[]
  onCancel: (id: string) => void
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

const statusLabels = {
  pending: 'Pendiente',
  completed: 'Completada',
  cancelled: 'Cancelada',
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
}

export function AppointmentTable({ appointments, onCancel, onComplete, onDelete }: AppointmentTableProps) {
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null)
  const [filter, setFilter] = useState<'all' | Appointment['status']>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = appointments
    .filter((a) => filter === 'all' || a.status === filter)
    .filter((a) => {
      if (!searchTerm) return true
      const term = searchTerm.toLowerCase()
      return (
        a.clientName.toLowerCase().includes(term) ||
        a.clientLastName.toLowerCase().includes(term) ||
        a.clientPhone.includes(term) ||
        a.ailment.toLowerCase().includes(term)
      )
    })
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return a.startTime.localeCompare(b.startTime)
    })

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono o dolencia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex gap-1">
          {(['all', 'pending', 'completed', 'cancelled'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                filter === f
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'Todas' : statusLabels[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 mb-3">
        Mostrando {filtered.length} de {appointments.length} citas
      </p>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-2">📋</div>
          <p>No hay citas que mostrar</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Paciente</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Fecha y Hora</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Dolencia</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Estado</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => (
                <tr
                  key={apt.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {apt.clientName} {apt.clientLastName}
                    </div>
                    <div className="text-xs text-gray-500">{apt.clientPhone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-900">{formatDate(apt.date)}</div>
                    <div className="text-xs text-gray-500">
                      {formatTime(apt.startTime)} – {formatTime(apt.endTime)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-700">{apt.ailment}</div>
                    <div className="text-xs text-gray-500">{apt.treatmentType}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[apt.status]}`}
                    >
                      {statusLabels[apt.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedApt(apt)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onComplete(apt.id)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Marcar completada"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => onCancel(apt.id)}
                            className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Cancelar cita"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => onDelete(apt.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedApt}
        onClose={() => setSelectedApt(null)}
        title="Detalle de Cita"
        size="lg"
      >
        {selectedApt && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Paciente</p>
                <p className="text-gray-900 font-medium mt-1">
                  {selectedApt.clientName} {selectedApt.clientLastName}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Teléfono</p>
                <p className="text-gray-900 mt-1">{selectedApt.clientPhone}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha</p>
                <p className="text-gray-900 mt-1">{formatDate(selectedApt.date)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Hora</p>
                <p className="text-gray-900 mt-1">
                  {formatTime(selectedApt.startTime)} – {formatTime(selectedApt.endTime)}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dirección</p>
                <p className="text-gray-900 mt-1">{selectedApt.address}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Dolencia</p>
                <p className="text-gray-900 mt-1">{selectedApt.ailment}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tratamiento</p>
                <p className="text-gray-900 mt-1">{selectedApt.treatmentType}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tipo de sesión</p>
                <p className="text-gray-900 mt-1">{selectedApt.sessionType}</p>
              </div>
              {selectedApt.notes && (
                <div className="col-span-2">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Notas</p>
                  <p className="text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                    {selectedApt.notes}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Estado</p>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${statusColors[selectedApt.status]}`}
                >
                  {statusLabels[selectedApt.status]}
                </span>
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              {selectedApt.status === 'pending' && (
                <>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      onComplete(selectedApt.id)
                      setSelectedApt(null)
                    }}
                  >
                    Marcar Completada
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onCancel(selectedApt.id)
                      setSelectedApt(null)
                    }}
                  >
                    Cancelar Cita
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" onClick={() => setSelectedApt(null)}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
