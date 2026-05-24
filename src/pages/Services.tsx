import { Link } from 'react-router-dom'
import { ServiceCard } from '../components/ServiceCard'
import { SERVICES } from '../data/constants'

export function Services() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            🌿 Tratamientos especializados
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tratamientos adaptados a tus necesidades, en tu propio entorno. Iván Prisuelos acude a tu
            domicilio con todo el equipo necesario para brindarte la mejor atención.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Mi metodología de trabajo</h2>
            <p className="text-gray-600">
              Cada sesión está diseñada para maximizar tu recuperación y bienestar
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: '🔍',
                title: 'Valoración inicial',
                description:
                  'Evaluación exhaustiva de tu estado: historial clínico, exploración física, análisis del dolor y limitaciones funcionales. Tiempo dedicado exclusivamente a entenderte.',
              },
              {
                icon: '📋',
                title: 'Plan de tratamiento personalizado',
                description:
                  'Diseño de un protocolo específico para ti, con objetivos claros y medibles. Combinación de técnicas según tus necesidades y respuesta al tratamiento.',
              },
              {
                icon: '💪',
                title: 'Tratamiento activo',
                description:
                  'Aplicación de técnicas manuales, ejercicio terapéutico y otras modalidades según el plan. Siempre con explicaciones claras sobre lo que se hace y por qué.',
              },
              {
                icon: '📈',
                title: 'Seguimiento y progresión',
                description:
                  'Evaluación continua de los resultados y ajuste del tratamiento. Ejercicios para casa y recomendaciones para acelerar la recuperación entre sesiones.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-teal-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-green-100 mb-6">
            Contacta con Iván para comentar tu caso específico. Probablemente podamos ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/reservar"
              className="px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors"
            >
              Reservar Cita
            </Link>
            <Link
              to="/contacto"
              className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
