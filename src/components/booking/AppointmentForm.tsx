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

const STEPS = ['Elige horario', 'Tratamiento', 'Tus datos', 'Confirmar']
const DAYS_ES = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const initialFormData: BookingFormData = {
  slotId: '', date: '', startTime: '', endTime: '',
  ailment: '', treatmentType: '', sessionType: '',
  firstName: '', lastName: '', phone: '', address: '', notes: '',
}

function buildCalendarGrid(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1)
  const lastDayNum = new Date(year, month + 1, 0).getDate()
  let startOffset = firstDay.getDay() - 1
  if (startOffset < 0) startOffset = 6
  const cells: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= lastDayNum; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function AppointmentForm({ slots, onSuccess }: AppointmentFormProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<BookingFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<BookingFormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const { showToast } = useToast()

  const slotsByDate = slots.reduce<Record<string, AvailabilitySlot[]>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = []
    acc[slot.date].push(slot)
    return acc
  }, {})
  const availableDateSet = new Set(Object.keys(slotsByDate))
  const todayStr = new Date().toISOString().split('T')[0]

  const firstAvailableDate = Object.keys(slotsByDate).sort()[0]
  const initYear = firstAvailableDate
    ? parseInt(firstAvailableDate.split('-')[0])
    : new Date().getFullYear()
  const initMonth = firstAvailableDate
    ? parseInt(firstAvailableDate.split('-')[1]) - 1
    : new Date().getMonth()

  const [calYear, setCalYear] = useState(initYear)
  const [calMonth, setCalMonth] = useState(initMonth)
  const [selectedDate, setSelectedDate] = useState('')

  const calDays = buildCalendarGrid(calYear, calMonth)
  const selectedSlots = selectedDate ? (slotsByDate[selectedDate] || []) : []

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }

  const updateField = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const selectSlot = (slot: AvailabilitySlot) => {
    setFormData(prev => ({ ...prev, slotId: slot.id, date: slot.date, startTime: slot.startTime, endTime: slot.endTime }))
  }

  const validateStep = (): boolean => {
    if (step === 0 && !formData.slotId) {
      showToast('Por favor, selecciona un horario disponible', 'error')
      return false
    }
    const newErrors: Partial<BookingFormData> = {}
    if (step === 1) {
      if (!formData.ailment) newErrors.ailment = 'Selecciona tu dolencia'
      if (!formData.treatmentType) newErrors.treatmentType = 'Selecciona el tratamiento'
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
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return false }
    return true
  }

  const handleNext = () => {
    if (validateStep()) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }
  const handleBack = () => { setStep(s => s - 1); setErrors({}); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const freshSlot = availabilityService.getById(formData.slotId)
      if (!freshSlot || freshSlot.status !== 'available') {
        showToast('Lo sentimos, este horario ya no está disponible.', 'error')
        setStep(0)
        setFormData(prev => ({ ...prev, slotId: '', date: '', startTime: '', endTime: '' }))
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
        showToast('¡Cita reservada con éxito!', 'success')
        onSuccess()
      } else {
        showToast('Error al reservar la cita.', 'error')
        setStep(0)
      }
    } catch {
      showToast('Error inesperado. Inténtalo de nuevo.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* ── Step indicator ── */}
      <div className="flex items-center mb-10 px-1">
        {STEPS.map((label, idx) => (
          <Fragment key={label}>
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 shadow-sm ${
                idx < step
                  ? 'bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-green-300/50'
                  : idx === step
                  ? 'bg-gradient-to-br from-green-700 to-green-600 text-white shadow-green-400/40 scale-110'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {idx < step
                  ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  : idx + 1
                }
              </div>
              <span className={`text-[10px] mt-1.5 font-semibold hidden sm:block whitespace-nowrap ${idx === step ? 'text-green-700' : idx < step ? 'text-green-500' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 sm:mx-2 rounded-full transition-all duration-500 ${idx < step ? 'bg-gradient-to-r from-green-500 to-teal-400' : 'bg-gray-200'}`} />
            )}
          </Fragment>
        ))}
      </div>

      {/* ── Card ── */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">

        {/* Step header strip */}
        <div className="h-1 w-full bg-gradient-to-r from-green-500 via-teal-400 to-emerald-500" />

        <div className="p-6 sm:p-8">

          {/* ── STEP 0: Calendar ── */}
          {step === 0 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-gray-900 mb-1">Elige tu horario</h2>
                <p className="text-gray-500 text-sm">Selecciona el día y la hora disponible</p>
              </div>

              {Object.keys(slotsByDate).length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-5xl mb-3">📅</div>
                  <p className="font-semibold text-gray-600">No hay horarios disponibles</p>
                  <p className="text-sm mt-1">Por favor, contacta directamente con Iván</p>
                </div>
              ) : (
                <>
                  {/* Calendar card */}
                  <div className="bg-gradient-to-br from-slate-50 to-green-50/30 rounded-2xl border border-gray-100 p-4 sm:p-5 mb-5">

                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-5">
                      <button
                        onClick={prevMonth}
                        className="w-9 h-9 rounded-xl bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 flex items-center justify-center transition-all duration-200 shadow-sm"
                        aria-label="Mes anterior"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <h3 className="text-base font-black text-gray-900 capitalize tracking-wide">
                        {MONTHS_ES[calMonth]} {calYear}
                      </h3>
                      <button
                        onClick={nextMonth}
                        className="w-9 h-9 rounded-xl bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 flex items-center justify-center transition-all duration-200 shadow-sm"
                        aria-label="Mes siguiente"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {DAYS_ES.map(d => (
                        <div key={d} className="text-center text-[11px] font-bold text-gray-400 py-1">{d}</div>
                      ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-1">
                      {calDays.map((day, i) => {
                        if (!day) return <div key={`empty-${i}`} />

                        const dateStr = toDateStr(calYear, calMonth, day)
                        const isAvailable = availableDateSet.has(dateStr)
                        const isPast = dateStr < todayStr
                        const isSelected = selectedDate === dateStr
                        const isToday = dateStr === todayStr

                        return (
                          <button
                            key={dateStr}
                            onClick={() => !isPast && isAvailable && setSelectedDate(dateStr)}
                            disabled={isPast || !isAvailable}
                            title={isAvailable ? `${slotsByDate[dateStr]?.length || 0} horarios disponibles` : undefined}
                            className={`
                              relative aspect-square rounded-xl text-sm font-bold flex flex-col items-center justify-center transition-all duration-200
                              ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                              ${!isPast && !isAvailable ? 'text-gray-400 hover:bg-gray-50 cursor-default' : ''}
                              ${!isPast && isAvailable && !isSelected ? 'text-gray-900 hover:bg-green-100 hover:text-green-800 cursor-pointer' : ''}
                              ${isSelected ? 'bg-gradient-to-br from-green-600 to-teal-500 text-white shadow-md shadow-green-400/40 scale-105' : ''}
                              ${isToday && !isSelected ? 'ring-2 ring-green-400 ring-offset-1' : ''}
                            `}
                          >
                            {day}
                            {isAvailable && !isPast && (
                              <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-green-500'}`} />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] text-gray-500">Disponible</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-lg bg-gradient-to-br from-green-600 to-teal-500 inline-block" />
                        <span className="text-[10px] text-gray-500">Seleccionado</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-lg ring-2 ring-green-400 inline-block" />
                        <span className="text-[10px] text-gray-500">Hoy</span>
                      </div>
                    </div>
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div className="bg-white rounded-2xl border border-green-100 p-4 sm:p-5 shadow-sm">
                      <h4 className="text-sm font-bold text-gray-900 mb-3 capitalize flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                        {formatDate(selectedDate)}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {selectedSlots.map(slot => (
                          <button
                            key={slot.id}
                            onClick={() => selectSlot(slot)}
                            className={`group relative px-3 py-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                              formData.slotId === slot.id
                                ? 'border-green-600 bg-gradient-to-br from-green-600 to-teal-500 text-white shadow-md shadow-green-400/30'
                                : 'border-gray-200 text-gray-700 hover:border-green-400 hover:bg-green-50 hover:text-green-800'
                            }`}
                          >
                            <div className="text-base leading-tight">{formatTime(slot.startTime)}</div>
                            <div className={`text-[10px] mt-0.5 font-normal ${formData.slotId === slot.id ? 'text-green-100' : 'text-gray-400'}`}>
                              hasta {formatTime(slot.endTime)}
                            </div>
                            {formData.slotId === slot.id && (
                              <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-white/30 flex items-center justify-center">
                                <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!selectedDate && (
                    <div className="text-center py-4 text-gray-400 text-sm">
                      👆 Selecciona un día disponible en el calendario
                    </div>
                  )}
                </>
              )}

              {/* Selected summary */}
              {formData.slotId && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-800 capitalize">{formatDate(formData.date)}</p>
                    <p className="text-xs text-green-700">{formatTime(formData.startTime)} — {formatTime(formData.endTime)}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 1: Treatment ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Tipo de tratamiento</h2>
                <p className="text-gray-500 text-sm">Cuéntanos sobre tu dolencia y qué necesitas</p>
              </div>
              <Select label="Dolencia principal" required value={formData.ailment} onChange={e => updateField('ailment', e.target.value)} options={AILMENTS.map(a => ({ value: a, label: a }))} placeholder="Selecciona tu dolencia..." error={errors.ailment} />
              <Select label="Tipo de tratamiento" required value={formData.treatmentType} onChange={e => updateField('treatmentType', e.target.value)} options={TREATMENT_TYPES.map(t => ({ value: t, label: t }))} placeholder="Selecciona el tratamiento..." error={errors.treatmentType} />
              <Select label="Tipo de sesión" required value={formData.sessionType} onChange={e => updateField('sessionType', e.target.value)} options={SESSION_TYPES.map(s => ({ value: s, label: s }))} placeholder="Selecciona el tipo de sesión..." error={errors.sessionType} />
            </div>
          )}

          {/* ── STEP 2: Personal data ── */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Tus datos</h2>
                <p className="text-gray-500 text-sm">Para confirmar y desplazarse a tu domicilio</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Nombre" required value={formData.firstName} onChange={e => updateField('firstName', e.target.value)} placeholder="Tu nombre" error={errors.firstName} />
                <Input label="Apellidos" required value={formData.lastName} onChange={e => updateField('lastName', e.target.value)} placeholder="Tus apellidos" error={errors.lastName} />
              </div>
              <Input label="Teléfono" required type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="612 345 678" hint="9 dígitos" error={errors.phone} />
              <Input label="Dirección completa" required value={formData.address} onChange={e => updateField('address', e.target.value)} placeholder="Calle, número, piso, ciudad" hint="Incluye calle, número, piso y ciudad" error={errors.address} />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Notas adicionales <span className="text-gray-400 font-normal text-xs">(opcional)</span>
                </label>
                <textarea
                  value={formData.notes}
                  onChange={e => updateField('notes', e.target.value)}
                  rows={3}
                  placeholder="Historial médico relevante, acceso al edificio, etc."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>
          )}

          {/* ── STEP 3: Confirmation ── */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Confirma tu cita</h2>
              <p className="text-gray-500 text-sm mb-6">Revisa todo antes de confirmar la reserva</p>
              <div className="space-y-3">
                <SummarySection title="📅 Fecha y Hora" gradient="from-green-50 to-teal-50" border="border-green-100">
                  <SummaryRow label="Fecha" value={formatDate(formData.date)} />
                  <SummaryRow label="Hora" value={`${formatTime(formData.startTime)} – ${formatTime(formData.endTime)}`} />
                </SummarySection>
                <SummarySection title="💆 Tratamiento" gradient="from-teal-50 to-cyan-50" border="border-teal-100">
                  <SummaryRow label="Dolencia" value={formData.ailment} />
                  <SummaryRow label="Tratamiento" value={formData.treatmentType} />
                  <SummaryRow label="Tipo sesión" value={formData.sessionType} />
                </SummarySection>
                <SummarySection title="👤 Datos personales" gradient="from-slate-50 to-gray-50" border="border-gray-100">
                  <SummaryRow label="Nombre" value={`${formData.firstName} ${formData.lastName}`} />
                  <SummaryRow label="Teléfono" value={formData.phone} />
                  <SummaryRow label="Dirección" value={formData.address} />
                  {formData.notes && <SummaryRow label="Notas" value={formData.notes} />}
                </SummarySection>
              </div>
              <div className="mt-5 p-4 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-800 font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Al confirmar, Iván se pondrá en contacto para verificar la cita
                </p>
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 0 ? (
              <button
                onClick={handleBack}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 font-semibold text-sm rounded-xl transition-all duration-200 disabled:opacity-40"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                Anterior
              </button>
            ) : <div />}

            {step < STEPS.length - 1 ? (
              <button
                onClick={handleNext}
                className="group inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-md shadow-green-700/25 hover:shadow-lg hover:shadow-green-700/35 hover:-translate-y-px"
              >
                Siguiente
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            ) : (
              <Button variant="primary" onClick={handleSubmit} loading={submitting} size="md" className="px-6 py-2.5 bg-gradient-to-r from-green-700 to-teal-600 hover:from-green-800 hover:to-teal-700 rounded-xl shadow-lg shadow-green-700/25">
                {submitting ? 'Reservando...' : 'Confirmar Cita'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SummarySection({ title, children, gradient, border }: { title: string; children: ReactNode; gradient: string; border: string }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-4 border ${border}`}>
      <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-900 text-right">{value}</span>
    </div>
  )
}
