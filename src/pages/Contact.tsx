import { useState, type FormEvent } from 'react'
import { PHYSIO_PHONE, PHYSIO_EMAIL, PHYSIO_WHATSAPP } from '../data/constants'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            📞 Contacto directo
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Elige el canal que prefieras.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cómo contactarnos</h2>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: '💬',
                    title: 'WhatsApp',
                    value: `+34 ${PHYSIO_PHONE}`,
                    description: 'Respuesta rápida. Puedes enviar fotos o documentos.',
                    href: PHYSIO_WHATSAPP,
                    cta: 'Abrir WhatsApp',
                    external: true,
                  },
                  {
                    icon: '📞',
                    title: 'Teléfono',
                    value: `+34 ${PHYSIO_PHONE}`,
                    description: 'Llamadas de lunes a viernes de 9:00 a 20:00h.',
                    href: `tel:+34${PHYSIO_PHONE}`,
                    cta: 'Llamar ahora',
                    external: false,
                  },
                  {
                    icon: '✉️',
                    title: 'Email',
                    value: PHYSIO_EMAIL,
                    description: 'Para consultas detalladas o envío de informes médicos.',
                    href: `mailto:${PHYSIO_EMAIL}`,
                    cta: 'Enviar email',
                    external: false,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-green-700 font-medium text-sm">{item.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                    </div>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="self-center px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                    >
                      {item.cta}
                    </a>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
                <h3 className="font-semibold text-gray-900 mb-3">🕐 Horario de atención</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunes – Viernes</span>
                    <span className="font-medium text-gray-900">9:00 – 20:00h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sábados</span>
                    <span className="font-medium text-gray-900">9:00 – 14:00h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domingos</span>
                    <span className="font-medium text-gray-900">Cerrado</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  * Para urgencias, consulta disponibilidad por WhatsApp
                </p>
              </div>

              <div className="mt-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">📍 Área de cobertura</h3>
                <p className="text-sm text-gray-600">
                  Madrid capital y municipios del área metropolitana. Para zonas alejadas, consulta
                  disponibilidad. Se puede añadir suplemento de desplazamiento en casos específicos.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envía un mensaje</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-600 mb-4">
                    Gracias por contactar. Iván te responderá en menos de 24h.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Tu nombre"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">Teléfono</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="612 345 678"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Cuéntanos tu caso o lo que necesites saber..."
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                  </div>

                  <p className="text-xs text-gray-500">
                    Tus datos se usan únicamente para responder a tu consulta.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
