import { Link } from 'react-router-dom'
import { PHYSIO_WHATSAPP, PHYSIO_PHONE, PHYSIO_EMAIL } from '../../data/constants'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/reservar', label: 'Reservar Cita' },
  { to: '/promociones', label: 'Promociones' },
  { to: '/sobre-ivan', label: 'Sobre Iván' },
  { to: '/contacto', label: 'Contacto' },
]

export function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-400 overflow-hidden">
      {/* Top gradient accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-900/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-900/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center shadow-lg shadow-green-600/20">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <div className="text-white font-extrabold text-base leading-tight group-hover:text-green-400 transition-colors">Iván Prisuelos</div>
                <div className="text-gray-500 text-xs leading-tight">Fisioterapia a Domicilio</div>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6">
              Fisioterapia profesional y personalizada en la comodidad de tu hogar.
              Madrid y área metropolitana. Con Iván, tu recuperación empieza en casa.
            </p>
            <a
              href={PHYSIO_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md shadow-green-600/25 hover:shadow-lg hover:shadow-green-500/30"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.998 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.53a.5.5 0 00.612.611l5.756-1.454A11.944 11.944 0 0011.998 24C18.626 24 24 18.627 24 12S18.626 0 11.998 0zm0 21.818a9.818 9.818 0 01-5.005-1.369l-.36-.213-3.715.938.968-3.628-.234-.373A9.818 9.818 0 012.182 12c0-5.416 4.4-9.818 9.816-9.818 5.415 0 9.818 4.402 9.818 9.818 0 5.415-4.403 9.818-9.818 9.818z"/>
              </svg>
              Contactar por WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 tracking-wide">Navegación</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-green-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-green-500 transition-all duration-200 overflow-hidden" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 tracking-wide">Contacto</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm">
                <span className="text-green-500 mt-0.5 flex-shrink-0">📍</span>
                <span className="text-gray-500">Madrid y área metropolitana</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <span className="text-green-500 flex-shrink-0">📞</span>
                <a href={`tel:+34${PHYSIO_PHONE}`} className="text-gray-500 hover:text-green-400 transition-colors">
                  +34 {PHYSIO_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <span className="text-green-500 flex-shrink-0">✉️</span>
                <a href={`mailto:${PHYSIO_EMAIL}`} className="text-gray-500 hover:text-green-400 transition-colors break-all">
                  {PHYSIO_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <span className="text-green-500 mt-0.5 flex-shrink-0">🕐</span>
                <div className="text-gray-500 leading-relaxed">
                  <div>Lun – Vie: 9:00 – 20:00</div>
                  <div>Sáb: 9:00 – 14:00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800/60 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Iván Prisuelos Fisioterapia · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">
              Acceso Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
