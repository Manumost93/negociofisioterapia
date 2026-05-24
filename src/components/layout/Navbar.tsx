import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/reservar', label: 'Reservar Cita' },
  { to: '/promociones', label: 'Promociones' },
  { to: '/sobre-ivan', label: 'Sobre Iván' },
  { to: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isAdmin = authService.isAuthenticated()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const handleLogout = () => {
    authService.logout()
    navigate('/')
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center group-hover:bg-green-800 transition-colors">
              <span className="text-white text-lg">🌿</span>
            </div>
            <div>
              <div className="text-green-700 font-bold text-sm leading-tight">Iván Prisuelos</div>
              <div className="text-gray-500 text-xs leading-tight">Fisioterapia</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                >
                  Panel Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                to="/reservar"
                className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors shadow-sm"
              >
                Reservar Cita
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2">
              {isAdmin ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="block px-3 py-2.5 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg"
                  >
                    Panel Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  to="/reservar"
                  className="block px-3 py-2.5 bg-green-700 text-white text-sm font-medium rounded-lg text-center hover:bg-green-800 transition-colors"
                >
                  Reservar Cita
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
