import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center px-4 pt-16">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold text-green-700 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          La página que buscas no existe o ha sido movida. Vuelve al inicio para continuar navegando.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            to="/reservar"
            className="px-6 py-3 border-2 border-green-700 text-green-700 hover:bg-green-50 font-semibold rounded-xl transition-colors"
          >
            Reservar Cita
          </Link>
        </div>
      </div>
    </div>
  )
}
