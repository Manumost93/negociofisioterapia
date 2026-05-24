import { useState } from 'react'
import { usePromotions } from '../../hooks/usePromotions'
import { useToast } from '../../components/ui/Toast'
import type { Promotion } from '../../types'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const emptyForm = {
  title: '',
  description: '',
  discount: '',
  badge: '',
  active: true,
}

export function PromotionsAdmin() {
  const { promotions, create, update, toggle, remove } = usePromotions()
  const { showToast } = useToast()
  const [showModal, setShowModal] = useState(false)
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null)
  const [form, setForm] = useState(emptyForm)

  const handleOpenCreate = () => {
    setEditingPromo(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const handleOpenEdit = (promo: Promotion) => {
    setEditingPromo(promo)
    setForm({
      title: promo.title,
      description: promo.description,
      discount: promo.discount || '',
      badge: promo.badge || '',
      active: promo.active,
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.title.trim() || !form.description.trim()) {
      showToast('El título y descripción son obligatorios', 'error')
      return
    }

    if (editingPromo) {
      update(editingPromo.id, {
        title: form.title,
        description: form.description,
        discount: form.discount || undefined,
        badge: form.badge || undefined,
        active: form.active,
      })
      showToast('Promoción actualizada', 'success')
    } else {
      create({
        title: form.title,
        description: form.description,
        discount: form.discount || undefined,
        badge: form.badge || undefined,
        active: form.active,
      })
      showToast('Promoción creada', 'success')
    }

    setShowModal(false)
    setForm(emptyForm)
  }

  const handleToggle = (id: string, currentActive: boolean) => {
    toggle(id)
    showToast(currentActive ? 'Promoción desactivada' : 'Promoción activada', 'success')
  }

  const handleDelete = (id: string) => {
    if (window.confirm('¿Eliminar esta promoción?')) {
      remove(id)
      showToast('Promoción eliminada', 'success')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Promociones</h1>
          <p className="text-gray-500 text-sm mt-1">
            {promotions.filter((p) => p.active).length} activas de {promotions.length} totales
          </p>
        </div>
        <Button variant="primary" onClick={handleOpenCreate}>
          + Nueva Promoción
        </Button>
      </div>

      {/* Promotions List */}
      {promotions.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🎯</div>
          <p className="font-medium">No hay promociones</p>
          <p className="text-sm">Crea la primera promoción para tu negocio</p>
        </div>
      ) : (
        <div className="space-y-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm transition-all ${
                promo.active ? 'border-green-100' : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{promo.title}</h3>
                    {promo.badge && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {promo.badge}
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        promo.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {promo.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{promo.description}</p>
                  {promo.discount && (
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-lg">
                      Descuento: {promo.discount}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(promo.id, promo.active)}
                    className={`p-1.5 rounded-lg transition-colors text-sm ${
                      promo.active
                        ? 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                        : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                    }`}
                    title={promo.active ? 'Desactivar' : 'Activar'}
                  >
                    {promo.active ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(promo)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(promo.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingPromo ? 'Editar Promoción' : 'Nueva Promoción'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Título"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ej: Bono 5 Sesiones"
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe la promoción en detalle..."
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Descuento (opcional)"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              placeholder="Ej: 10% descuento"
            />
            <Input
              label="Badge (opcional)"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="Ej: ¡Nuevo!"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active-check"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4 text-green-600 rounded"
            />
            <label htmlFor="active-check" className="text-sm font-medium text-gray-700">
              Activar promoción inmediatamente
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="primary" onClick={handleSave} className="flex-1">
              {editingPromo ? 'Guardar Cambios' : 'Crear Promoción'}
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
