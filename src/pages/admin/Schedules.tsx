import { useState } from 'react'
import { useAvailability } from '../../hooks/useAvailability'
import { useToast } from '../../components/ui/Toast'
import type { AvailabilitySlot } from '../../types'
import { formatDate, formatTime, getTodayString } from '../../utils/dateUtils'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'

const STATUS_LABELS = {
  available: 'Disponible',
  reserved: 'Reservado',
  blocked: 'Bloqueado',
  cancelled: 'Cancelado',
}

const STATUS_COLORS = {
  available: 'bg-green-100 text-green-700 border-green-200',
  reserved: 'bg-blue-100 text-blue-700 border-blue-200',
  blocked: 'bg-red-100 text-red-700 border-red-200',
  cancelled: 'bg-gray-100 text-gray-500 border-gray-200',
}

export function Schedules() {
  const { slots, createSlot, updateSlot, deleteSlot, blockSlot, unblockSlot, reload } =
    useAvailability()
  const { showToast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'all' | AvailabilitySlot['status']>('all')

  const [newSlot, setNewSlot] = useState({
    date: getTodayString(),
    startTime: '09:00',
    endTime: '10:00',
  })

  const handleCreate = () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      showToast('Completa todos los campos', 'error')
      return
    }
    if (newSlot.startTime >= newSlot.endTime) {
      showToast('La hora de inicio debe ser anterior a la de fin', 'error')
      return
    }
    createSlot({ ...newSlot, status: 'available' })
    showToast('Horario creado correctamente', 'success')
    setShowModal(false)
    setNewSlot({ date: getTodayString(), startTime: '09:00', endTime: '10:00' })
  }

  const handleBlock = (id: string) => {
    blockSlot(id)
    showToast('Horario bloqueado', 'success')
  }

  const handleUnblock = (id: string) => {
    unblockSlot(id)
    showToast('Horario desbloqueado', 'success')
  }

  const handleDelete = (id: string) => {
    if (window.confirm('¿Eliminar este horario?')) {
      deleteSlot(id)
      showToast('Horario eliminado', 'success')
    }
  }

  const filtered = slots
    .filter((s) => filterStatus === 'all' || s.status === filterStatus)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return a.startTime.localeCompare(b.startTime)
    })

  // Stats
  const stats = {
    total: slots.length,
    available: slots.filter((s) => s.status === 'available').length,
    reserved: slots.filter((s) => s.status === 'reserved').length,
    blocked: slots.filter((s) => s.status === 'blocked').length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Horarios</h1>
          <p className="text-gray-500 text-sm mt-1">
            Administra los slots de disponibilidad para reservas
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Añadir Horario
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total', value: stats.total, color: 'bg-gray-50 text-gray-700' },
          { label: 'Disponibles', value: stats.available, color: 'bg-green-50 text-green-700' },
          { label: 'Reservados', value: stats.reserved, color: 'bg-blue-50 text-blue-700' },
          { label: 'Bloqueados', value: stats.blocked, color: 'bg-red-50 text-red-700' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4 text-center`}>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-1 mb-4">
        {(['all', 'available', 'reserved', 'blocked'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilterStatus(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterStatus === f ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'Todos' : STATUS_LABELS[f]}
          </button>
        ))}
      </div>

      {/* Slots Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">🕐</div>
            <p>No hay horarios que mostrar</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Hora</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Estado</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((slot) => (
                  <tr
                    key={slot.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{formatDate(slot.date)}</div>
                    </td>
                    <td className="px-4 py-3">
                      {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[slot.status]}`}
                      >
                        {STATUS_LABELS[slot.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {slot.status === 'available' && (
                          <button
                            onClick={() => handleBlock(slot.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Bloquear"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                          </button>
                        )}
                        {slot.status === 'blocked' && (
                          <button
                            onClick={() => handleUnblock(slot.id)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Desbloquear"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                          </button>
                        )}
                        {slot.status !== 'reserved' && (
                          <button
                            onClick={() => handleDelete(slot.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Slot Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Añadir Nuevo Horario">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Fecha <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={newSlot.date}
              min={getTodayString()}
              onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Hora inicio <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={newSlot.startTime}
                onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Hora fin <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={newSlot.endTime}
                onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="primary" onClick={handleCreate} className="flex-1">
              Crear Horario
            </Button>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
