import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppointmentForm } from '../components/booking/AppointmentForm'
import { availabilityService } from '../services/availabilityService'

export function Book() {
  const [success, setSuccess] = useState(false)
  const slots = availabilityService.getAvailable()

  if (success) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">¡Cita Reservada!</h2>
          <p className="text-gray-600 mb-6">
            Tu cita ha sido reservada con éxito. Iván se pondrá en contacto contigo pronto para
            confirmar todos los detalles.
          </p>
          <div className="p-4 bg-green-50 rounded-xl mb-6">
            <p className="text-sm text-green-700">
              📞 Si tienes alguna duda, puedes contactar directamente con Iván por WhatsApp o
              teléfono.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setSuccess(false)
                window.location.reload()
              }}
              className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors"
            >
              Reservar otra cita
            </button>
            <Link
              to="/"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            📅 Reserva online
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Reservar Cita</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Elige tu horario y cuéntanos tu caso. Iván acudirá a tu domicilio con todo lo necesario.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AppointmentForm slots={slots} onSuccess={() => setSuccess(true)} />
        </div>
      </section>

      {/* Info */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔒',
                title: 'Datos seguros',
                description: 'Tus datos se utilizan únicamente para gestionar tu cita.',
              },
              {
                icon: '📞',
                title: 'Confirmación rápida',
                description: 'Iván te llamará en menos de 24h para confirmar todos los detalles.',
              },
              {
                icon: '🔄',
                title: 'Cancelación flexible',
                description: 'Puedes cancelar o reprogramar contactando con 24h de antelación.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
