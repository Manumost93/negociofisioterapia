import { Link } from 'react-router-dom'
import { PromotionCard } from '../components/PromotionCard'
import { usePromotions } from '../hooks/usePromotions'

export function Promotions() {
  const { activePromotions, promotions, loading } = usePromotions()

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            🎯 Ofertas especiales
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Promociones</h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Aprovecha nuestras ofertas especiales para comenzar tu tratamiento con las mejores
            condiciones
          </p>
        </div>
      </section>

      {/* Active Promotions */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-2 animate-pulse">🎯</div>
              <p className="text-gray-500">Cargando promociones...</p>
            </div>
          ) : activePromotions.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📭</div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No hay promociones activas
              </h2>
              <p className="text-gray-500 mb-6">
                Próximamente nuevas ofertas. Contacta con Iván para consultar condiciones especiales.
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 transition-colors"
              >
                Contactar
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Promociones activas ({activePromotions.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePromotions.map((promo) => (
                  <PromotionCard key={promo.id} promotion={promo} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Terms */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">📋 Condiciones generales</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                Las promociones son válidas dentro del área de cobertura de Madrid y alrededores.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                Los bonos tienen una validez de 3 meses desde la primera sesión.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                Las promociones no son acumulables entre sí salvo indicación expresa.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                Iván se reserva el derecho de retirar o modificar las promociones en cualquier momento.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                Para consultar condiciones específicas, contacta directamente con Iván.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-teal-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para empezar?</h2>
          <p className="text-green-100 mb-6">
            Reserva tu primera sesión y descubre la diferencia de la fisioterapia personalizada
          </p>
          <Link
            to="/reservar"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
          >
            Reservar Cita Ahora
          </Link>
        </div>
      </section>
    </div>
  )
}
