import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppointmentForm } from '../components/booking/AppointmentForm'
import { availabilityService } from '../services/availabilityService'
import { PHYSIO_WHATSAPP } from '../data/constants'

const INFO_ITEMS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Datos seguros',
    description: 'Tus datos solo se usan para gestionar tu cita.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Confirmación rápida',
    description: 'Iván te llama en menos de 24h.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Cancelación flexible',
    description: 'Cancela con 24h de antelación.',
  },
]

export function Book() {
  const [success, setSuccess] = useState(false)
  const slots = availabilityService.getAvailable()

  if (success) {
    return (
      <div className="pt-16 min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-teal-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />

        <div className="relative glass rounded-3xl shadow-2xl shadow-green-900/10 p-8 sm:p-12 max-w-md w-full text-center">
          {/* Animated checkmark */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-xl shadow-green-500/30">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-3">¡Cita Reservada!</h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Tu cita ha sido confirmada. Iván se pondrá en contacto contigo pronto para verificar todos los detalles.
          </p>

          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-100 mb-7">
            <p className="text-sm text-green-800 font-medium">
              📞 Si tienes alguna duda, contacta directamente con Iván por WhatsApp
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setSuccess(false); window.location.reload() }}
              className="w-full px-6 py-3.5 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-md shadow-green-700/25 hover:shadow-lg hover:shadow-green-700/35"
            >
              Reservar otra cita
            </button>
            <a
              href={PHYSIO_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-3.5 border-2 border-green-200 text-green-700 hover:bg-green-50 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Contactar por WhatsApp
            </a>
            <Link
              to="/"
              className="w-full px-6 py-3.5 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-medium rounded-2xl transition-all duration-300"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">

      {/* ── Hero header ── */}
      <div className="relative pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-teal-800" />
        {/* Patterns */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-900/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs font-semibold mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse inline-block" />
            Reserva online · Gratis
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Reservar Cita
          </h1>
          <p className="text-green-100 text-lg max-w-xl mx-auto leading-relaxed">
            Elige tu horario y cuéntanos tu caso. Iván acudirá a tu domicilio con todo lo necesario.
          </p>

          {/* Steps mini preview */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {['Horario', 'Tratamiento', 'Datos', 'Confirmar'].map((s, i, arr) => (
              <div key={s} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black text-white">{i+1}</span>
                  <span className="text-white/70 text-xs font-medium hidden sm:block">{s}</span>
                </div>
                {i < arr.length - 1 && <div className="w-4 h-px bg-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 -mt-4">
        <AppointmentForm slots={slots} onSuccess={() => setSuccess(true)} />
      </div>

      {/* ── Trust bar ── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INFO_ITEMS.map(item => (
            <div key={item.title} className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
