import { Link } from 'react-router-dom'
import { PHYSIO_WHATSAPP } from '../data/constants'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-green-50 via-white to-teal-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-6">
              <span>🌿</span>
              Fisioterapia a Domicilio · Madrid
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Tu recuperación,{' '}
              <span className="gradient-text">en la comodidad de tu hogar</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Iván Prisuelos ofrece fisioterapia a domicilio orientada a mejorar tu movilidad,
              aliviar el dolor y acompañarte en tu recuperación con un trato cercano, profesional y
              personalizado.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/reservar"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <span>📅</span>
                Reservar Cita
              </Link>
              <a
                href={PHYSIO_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold rounded-xl transition-all duration-200"
              >
                <span>💬</span>
                Consultar por WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: '+5 años', label: 'de experiencia' },
                { value: '100%', label: 'a domicilio' },
                { value: 'Personalizado', label: 'cada tratamiento' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-green-700">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              {/* Abstract physio illustration */}
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">🏥</div>
                <h3 className="text-xl font-bold text-gray-900">Iván Prisuelos</h3>
                <p className="text-green-700 font-medium">Fisioterapeuta Colegiado</p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: '✓', text: 'Evaluación completa y personalizada' },
                  { icon: '✓', text: 'Tratamiento en tu domicilio' },
                  { icon: '✓', text: 'Resultados verificables' },
                  { icon: '✓', text: 'Sin desplazamientos ni esperas' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-green-50 rounded-xl">
                <p className="text-xs text-green-700 text-center font-medium">
                  📞 Primera valoración gratuita para nuevos pacientes
                </p>
              </div>
            </div>

            {/* Background decorations */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-teal-100 rounded-full opacity-40 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-green-100 rounded-full opacity-40 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
