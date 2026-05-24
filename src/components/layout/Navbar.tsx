import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
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
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  const handleLogout = () => {
    authService.logout()
    navigate('/')
  }

  const transparent = isHome && !scrolled && !isOpen

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center shadow-md shadow-green-600/30 group-hover:shadow-lg group-hover:shadow-green-600/40 transition-shadow">
              <span className="text-lg">🌿</span>
            </div>
            <div>
              <div className={`font-extrabold text-sm leading-tight transition-colors duration-300 ${transparent ? 'text-white drop-shadow' : 'text-gray-900'}`}>
                Iván Prisuelos
              </div>
              <div className={`text-[10px] leading-tight font-medium transition-colors duration-300 ${transparent ? 'text-white/70' : 'text-gray-500'}`}>
                Fisioterapia a Domicilio
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? transparent
                        ? 'bg-white/20 text-white'
                        : 'bg-green-50 text-green-700'
                      : transparent
                        ? 'text-white/80 hover:text-white hover:bg-white/15'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50/80'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-all ${
                    transparent ? 'text-white/80 hover:bg-white/15 hover:text-white' : 'text-green-700 hover:bg-green-50'
                  }`}
                >
                  Panel Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-all ${
                    transparent ? 'text-white/60 hover:bg-white/10 hover:text-white' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                to="/reservar"
                className="px-5 py-2.5 bg-gradient-to-r from-green-700 to-green-600 text-white text-sm font-bold rounded-xl hover:from-green-800 hover:to-green-700 transition-all duration-300 shadow-md shadow-green-700/25 hover:shadow-lg hover:shadow-green-700/35 hover:-translate-y-px"
              >
                Reservar Cita
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              transparent ? 'text-white hover:bg-white/15' : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } bg-white/95 backdrop-blur-xl border-t border-gray-100/80`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-3">
            {isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="block px-4 py-3 text-sm font-semibold text-green-700 hover:bg-green-50 rounded-xl">
                  Panel Admin
                </Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl">
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/reservar"
                className="block px-4 py-3 bg-gradient-to-r from-green-700 to-green-600 text-white text-sm font-bold rounded-xl text-center shadow-md"
              >
                Reservar Cita
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
