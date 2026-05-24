import { useState, Fragment, type ReactNode } from 'react'
import type { BookingFormData, AvailabilitySlot } from '../../types'
import { AILMENTS, TREATMENT_TYPES, SESSION_TYPES } from '../../data/constants'
import { appointmentService } from '../../services/appointmentService'
import { formatDate, formatTime } from '../../utils/dateUtils'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { useToast } from '../ui/Toast'
import { availabilityService } from '../../services/availabilityService'

interface AppointmentFormProps {
  slots: AvailabilitySlot[]
  onSuccess: () => void
}

const STEPS = ['Seleccionar Horario', 'Tipo de Tratamiento', 'Tus Datos', 'Confirmación']

const initialFormData: BookingFormData = {
  slotId: '',
  date: '',
  startTime: '',
  endTime: '',
  ailment: '',
  treatmentType: '',
  sessionType: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  notes: '',
}

export function AppointmentForm({ slots, onSuccess }: AppointmentFormProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<BookingFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<BookingFormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const { showToast } = useToast()

  // Group slots by date
  const slotsByDate = slots.reduce<Record<string, AvailabilitySlot[]>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = []
    acc[slot.date].push(slot)
    return acc
  }, {})

  const sortedDates = Object.keys(slotsByDate).sort()

  const updateField = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const selectSlot = (slot: AvailabilitySlot) => {
    setFormData((prev) => ({
      ...prev,
      slotId: slot.id,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    }))
  }

  const validateStep = (): boolean => {
    const newErrors: Partial<BookingFormData> = {}

    if (step === 0) {
      if (!formData.slotId) {
        showToast('Por favor, selecciona un horario disponible', 'error')
        return false
      }
    }

    if (step === 1) {
      if (!formData.ailment) newErrors.ailment = 'Selecciona tu dolencia'
      if (!formData.treatmentType) newErrors.treatmentType = 'Selecciona el tipo de tratamiento'
      if (!formData.sessionType) newErrors.sessionType = 'Selecciona el tipo de sesión'
    }

    if (step === 2) {
      if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio'
      if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio'
      if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio'
      else if (!/^[0-9]{9}$/.test(formData.phone.replace(/\s/g, '')))
        newErrors.phone = 'Introduce un teléfono válido (9 dígitos)'
      if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }

    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setStep((s) => s - 1)
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      // Re-check slot availability
      const freshSlot = availabilityService.getById(formData.slotId)
      if (!freshSlot || freshSlot.status !== 'available') {
        showToast('Lo sentimos, este horario ya no está disponible. Por favor, selecciona otro.', 'error')
        setStep(0)
        setFormData((prev) => ({ ...prev, slotId: '', date: '', startTime: '', endTime: '' }))
        setSubmitting(false)
        return
      }

      const appointment = appointmentService.create({
        clientId: `client-${Date.now()}`,
        clientName: formData.firstName,
        clientLastName: formData.lastName,
        clientPhone: formData.phone,
        address: formData.address,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        ailment: formData.ailment,
        treatmentType: formData.treatmentType,
        sessionType: formData.sessionType,
        notes: formData.notes,
        status: 'pending',
        slotId: formData.slotId,
      })

      if (appointment) {
        showToast('¡Cita reservada con éxito! Te contactaremos para confirmar.', 'success')
        onSuccess()
      } else {
        showToast('Error al reservar la cita. El horario puede ya no estar disponible.', 'error')
        setStep(0)
      }
    } catch {
      showToast('Error inesperado. Inténtalo de nuevo.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center mb-8">
        {STEPS.map((label, idx) => (
          <Fragment key={label}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  idx < step
                    ? 'step-completed'
                    : idx === step
                    ? 'step-active'
                    : 'step-inactive'
                }`}
              >
                {idx < step ? '✓' : idx + 1}
              </div>
              <span className={`text-xs mt-1 hidden sm:block ${idx === step ? 'text-green-700 font-medium' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${idx < step ? 'bg-green-600' : 'bg-gray-200'}`} />
            )}
          </Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Step 0: Select Slot */}
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Selecciona un horario</h2>
            <p className="text-gray-500 text-sm mb-6">Elige el día y la hora que mejor te convenga</p>

            {sortedDates.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-4xl mb-2">📅</div>
                <p className="font-medium">No hay horarios disponibles</p>
                <p className="text-sm mt-1">Por favor, contacta directamente con Iván</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedDates.map((date) => (
                  <div key={date}>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 capitalize">
                      {formatDate(date)}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {slotsByDate[date].map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => selectSlot(slot)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                            formData.slotId === slot.id
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50 text-gray-700'
                          }`}
                        >
                          <div className="text-base font-bold">{formatTime(slot.startTime)}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            hasta {formatTime(slot.endTime)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {formData.slotId && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                ✓ Seleccionado: {formatDate(formData.date)} de {formatTime(formData.startTime)} a{' '}
                {formatTime(formData.endTime)}
              </div>
            )}
          </div>
        )}

        {/* Step 1: Treatment */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Tipo de tratamiento</h2>
              <p className="text-gray-500 text-sm mb-6">
                Cuéntanos sobre tu dolencia y qué tipo de atención necesitas
              </p>
            </div>

            <Select
              label="Dolencia principal"
              required
              value={formData.ailment}
              onChange={(e) => updateField('ailment', e.target.value)}
              options={AILMENTS.map((a) => ({ value: a, label: a }))}
              placeholder="Selecciona tu dolencia..."
              error={errors.ailment}
            />

            <Select
              label="Tipo de tratamiento"
              required
              value={formData.treatmentType}
              onChange={(e) => updateField('treatmentType', e.target.value)}
              options={TREATMENT_TYPES.map((t) => ({ value: t, label: t }))}
              placeholder="Selecciona el tratamiento..."
              error={errors.treatmentType}
            />

            <Select
              label="Tipo de sesión"
              required
              value={formData.sessionType}
              onChange={(e) => updateField('sessionType', e.target.value)}
              options={SESSION_TYPES.map((s) => ({ value: s, label: s }))}
              placeholder="Selecciona el tipo de sesión..."
              error={errors.sessionType}
            />
          </div>
        )}

        {/* Step 2: Personal Data */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Tus datos personales</h2>
              <p className="text-gray-500 text-sm mb-6">
                Necesitamos tus datos para confirmar la cita y acudir a tu domicilio
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nombre"
                required
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="Tu nombre"
                error={errors.firstName}
              />
              <Input
                label="Apellidos"
                required
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder="Tus apellidos"
                error={errors.lastName}
              />
            </div>

            <Input
              label="Teléfono"
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="612 345 678"
              hint="9 dígitos, sin espacios ni guiones"
              error={errors.phone}
            />

            <Input
              label="Dirección completa"
              required
              value={formData.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="Calle, número, piso, ciudad"
              hint="Incluye calle, número, piso/puerta y ciudad"
              error={errors.address}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Notas adicionales{' '}
                <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows={3}
                placeholder="Información relevante para Iván: historial médico, accesibilidad, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Confirma tu cita</h2>
            <p className="text-gray-500 text-sm mb-6">
              Revisa los datos antes de confirmar la reserva
            </p>

            <div className="space-y-3">
              <SummarySection title="Fecha y Hora">
                <SummaryRow label="Fecha" value={formatDate(formData.date)} />
                <SummaryRow
                  label="Hora"
                  value={`${formatTime(formData.startTime)} – ${formatTime(formData.endTime)}`}
                />
              </SummarySection>

              <SummarySection title="Tratamiento">
                <SummaryRow label="Dolencia" value={formData.ailment} />
                <SummaryRow label="Tratamiento" value={formData.treatmentType} />
                <SummaryRow label="Tipo sesión" value={formData.sessionType} />
              </SummarySection>

              <SummarySection title="Datos Personales">
                <SummaryRow label="Nombre" value={`${formData.firstName} ${formData.lastName}`} />
                <SummaryRow label="Teléfono" value={formData.phone} />
                <SummaryRow label="Dirección" value={formData.address} />
                {formData.notes && <SummaryRow label="Notas" value={formData.notes} />}
              </SummarySection>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-700 font-medium">
                ✓ Al confirmar, recibirás una llamada de Iván para verificar la cita
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-6 border-t border-gray-100">
          {step > 0 ? (
            <Button variant="outline" onClick={handleBack} disabled={submitting}>
              ← Anterior
            </Button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <Button variant="primary" onClick={handleNext}>
              Siguiente →
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit} loading={submitting}>
              Confirmar Cita
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function SummarySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right">{value}</span>
    </div>
  )
}
