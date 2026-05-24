import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'
import { PromotionCard } from '../components/PromotionCard'
import { SERVICES } from '../data/constants'
import { promotionService } from '../services/promotionService'

const STEPS = [
  {
    step: '01',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Elige tu horario',
    description: 'Selecciona el día y la hora que mejor te convenga entre los horarios disponibles de Iván.',
  },
  {
    step: '02',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Cuéntanos tu caso',
    description: 'Indica tu dolencia, el tipo de tratamiento que buscas y tus datos de contacto.',
  },
  {
    step: '03',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Iván acude a ti',
    description: 'Confirmamos la cita y Iván se desplaza a tu domicilio con todo el equipo necesario.',
  },
]

const TRUST_ITEMS = [
  { icon: '🎓', title: 'Titulado y colegiado', desc: 'Fisioterapeuta con formación universitaria y colegiación oficial.' },
  { icon: '🏠', title: 'Servicio a domicilio', desc: 'Acudimos a tu hogar, residencia o lugar de trabajo en Madrid.' },
  { icon: '💚', title: 'Trato personalizado', desc: 'Cada tratamiento se adapta a tus necesidades y objetivos.' },
  { icon: '⚡', title: 'Disponibilidad real', desc: 'Horarios flexibles incluyendo tardes y fines de semana.' },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [])
  return ref
}

export function Home() {
  const activePromotions = promotionService.getActive().slice(0, 3)
  const pageRef = useReveal()

  return (
    <div ref={pageRef}>
      <Hero />

      {/* ── How it works ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(21,128,61,0.04),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

          <div className="text-center mb-16 reveal">
            <span className="inline-block text-xs font-bold text-green-700 tracking-widest uppercase mb-3 px-3 py-1 bg-green-50 rounded-full border border-green-100">
              Proceso
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Reservar es muy <span className="gradient-text">sencillo</span>
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-lg">
              En 3 pasos tienes a Iván en tu casa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.66%-8px)] right-[calc(16.66%-8px)] h-px bg-gradient-to-r from-green-200 via-teal-300 to-green-200 z-0" aria-hidden="true" />

            {STEPS.map((item, i) => (
              <div key={item.step} className={`reveal delay-${(i + 1) * 200} relative z-10`}>
                <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-300 text-center h-full">
                  <div className="relative inline-flex mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 flex items-center justify-center text-green-700">
                      {item.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center shadow-sm">
                      <span className="text-white text-[10px] font-black">{i + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Link
              to="/reservar"
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-green-700/25 hover:shadow-xl hover:shadow-green-700/35 hover:-translate-y-0.5"
            >
              Reservar ahora — Es gratis
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(13,148,136,0.05),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div className="reveal-left">
              <span className="inline-block text-xs font-bold text-teal-700 tracking-widest uppercase mb-3 px-3 py-1 bg-teal-50 rounded-full border border-teal-100">
                Servicios
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Tratamientos<br />
                <span className="gradient-text">adaptados a ti</span>
              </h2>
            </div>
            <p className="reveal-right text-gray-500 max-w-xs text-base leading-relaxed sm:text-right">
              En tu propio entorno, con el mismo nivel de excelencia que en una clínica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map((service, i) => (
              <div key={service.id} className={`reveal delay-${Math.min((i + 1) * 100, 600)}`}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-200 text-green-700 hover:border-green-600 hover:bg-green-50 font-semibold rounded-2xl transition-all duration-300"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why choose Iván ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="reveal-left">
              <span className="inline-block text-xs font-bold text-green-700 tracking-widest uppercase mb-3 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                ¿Por qué Iván?
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
                Fisioterapia de<br />
                <span className="gradient-text">confianza, en casa</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Más de 5 años de experiencia clínica tratando a cientos de pacientes en Madrid.
                Iván combina formación académica de alto nivel con un trato cercano y resultados reales.
              </p>
              <Link
                to="/sobre-ivan"
                className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-900 transition-colors group"
              >
                Conocer a Iván
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRUST_ITEMS.map((item, i) => (
                <div key={item.title} className={`reveal delay-${(i + 1) * 150} bg-gradient-to-br from-stone-50 to-white rounded-2xl p-5 border border-gray-100 hover:border-green-100 hover:shadow-md transition-all duration-300`}>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Promotions ── */}
      {activePromotions.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">

            <div className="text-center mb-14 reveal">
              <span className="inline-block text-xs font-bold text-amber-700 tracking-widest uppercase mb-3 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                Ofertas
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
                Promociones <span className="gradient-text">activas</span>
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">Ofertas especiales para nuevos y antiguos pacientes. Por tiempo limitado.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activePromotions.map((promo, i) => (
                <div key={promo.id} className={`reveal delay-${(i + 1) * 150}`}>
                  <PromotionCard promotion={promo} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10 reveal">
              <Link
                to="/promociones"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-200 text-amber-700 hover:border-amber-500 hover:bg-amber-50 font-semibold rounded-2xl transition-all duration-300"
              >
                Ver todas las promociones
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-teal-700" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-900/30 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs font-semibold mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse inline-block" />
            Plazas disponibles esta semana
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
            ¿Listo para empezar<br />tu recuperación?
          </h2>
          <p className="text-green-100 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Primera valoración gratuita para nuevos pacientes. Sin compromiso. Iván acude a ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservar"
              className="group px-8 py-4 bg-white text-green-800 font-black rounded-2xl hover:bg-green-50 transition-all duration-300 shadow-2xl shadow-black/20 hover:-translate-y-0.5 hover:shadow-2xl flex items-center justify-center gap-2"
            >
              Reservar Cita Gratis
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/contacto"
              className="px-8 py-4 border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/70 transition-all duration-300 flex items-center justify-center"
            >
              Más información
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
