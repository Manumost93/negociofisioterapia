import { Link } from 'react-router-dom'
import { PHYSIO_WHATSAPP, PHYSIO_PHONE, PHYSIO_EMAIL } from '../../data/constants'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🌿</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">Iván Prisuelos</div>
                <div className="text-gray-400 text-xs">Fisioterapia a Domicilio</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Fisioterapia profesional y personalizada en la comodidad de tu hogar. Madrid y
              alrededores.
            </p>
            <div className="mt-4">
              <a
                href={PHYSIO_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
              >
                <span>💬</span>
                Contactar por WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/servicios', label: 'Servicios' },
                { to: '/reservar', label: 'Reservar Cita' },
                { to: '/promociones', label: 'Promociones' },
                { to: '/sobre-ivan', label: 'Sobre Iván' },
                { to: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span className="mt-0.5">📍</span>
                <span>Madrid y área metropolitana</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span>📞</span>
                <a
                  href={`tel:+34${PHYSIO_PHONE}`}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  +34 {PHYSIO_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span>✉️</span>
                <a
                  href={`mailto:${PHYSIO_EMAIL}`}
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  {PHYSIO_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <span className="mt-0.5">🕐</span>
                <div>
                  <div>Lun – Vie: 9:00 – 20:00</div>
                  <div>Sáb: 9:00 – 14:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Iván Prisuelos Fisioterapia. Todos los derechos reservados.
          </p>
          <Link
            to="/admin/login"
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Acceso Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
