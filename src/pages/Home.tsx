import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'
import { PromotionCard } from '../components/PromotionCard'
import { SERVICES } from '../data/constants'
import { promotionService } from '../services/promotionService'

export function Home() {
  const activePromotions = promotionService.getActive().slice(0, 3)

  return (
    <div>
      <Hero />

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Reservar una sesión de fisioterapia a domicilio es muy sencillo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: '📅',
                title: 'Elige tu horario',
                description:
                  'Selecciona el día y la hora que mejor te convenga entre los slots disponibles.',
              },
              {
                step: '02',
                icon: '📋',
                title: 'Cuéntanos tu caso',
                description:
                  'Indica tu dolencia, el tipo de tratamiento y tus datos de contacto.',
              },
              {
                step: '03',
                icon: '🏠',
                title: 'Iván acude a ti',
                description:
                  'Confirmamos la cita y Iván se desplaza a tu domicilio con todo el material necesario.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="inline-flex flex-col items-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full mb-3">
                    Paso {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/reservar"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Reservar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Servicios</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Tratamientos adaptados a tus necesidades, en tu propio entorno
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-green-700 text-green-700 hover:bg-green-50 font-medium rounded-xl transition-colors"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Promotions Preview */}
      {activePromotions.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Promociones Activas</h2>
              <p className="text-gray-600">Ofertas especiales para nuevos y antiguos pacientes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activePromotions.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/promociones"
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-green-700 text-green-700 hover:bg-green-50 font-medium rounded-xl transition-colors"
              >
                Ver todas las promociones
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para empezar tu recuperación?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Primera valoración gratuita para nuevos pacientes. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservar"
              className="px-8 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
            >
              Reservar Cita Gratis
            </Link>
            <Link
              to="/contacto"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Más información
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
