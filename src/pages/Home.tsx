import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'
import { PromotionCard } from '../components/PromotionCard'
import { SERVICES } from '../data/constants'
import { promotionService } from '../services/promotionService'

const STEPS = [
  {
    num: '01',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Elige tu horario',
    description: 'Selecciona el día y la hora que mejor te convenga entre los horarios disponibles de Iván.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    num: '02',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Cuéntanos tu caso',
    description: 'Indica tu dolencia, el tipo de tratamiento que buscas y tus datos de contacto.',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    num: '03',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Iván acude a ti',
    description: 'Confirmamos la cita y Iván se desplaza a tu domicilio con todo el equipo necesario.',
    color: 'from-emerald-500 to-green-600',
  },
]

const TRUST = [
  { icon: '🎓', title: 'Titulado y colegiado', desc: 'Formación universitaria y colegiación oficial activa.' },
  { icon: '🏠', title: 'Servicio a domicilio', desc: 'Acudimos a tu hogar, residencia o lugar de trabajo en Madrid.' },
  { icon: '💚', title: 'Trato personalizado', desc: 'Cada sesión se adapta a tus necesidades y objetivos reales.' },
  { icon: '⚡', title: 'Disponibilidad real', desc: 'Horarios flexibles incluyendo tardes y fines de semana.' },
]

const TESTIMONIALS = [
  { name: 'María G.', text: 'Increíble profesional. Después de semanas con dolor de espalda, en 3 sesiones noté un cambio brutal. Lo recomiendo al 100%.', stars: 5 },
  { name: 'Carlos R.', text: 'Iván es muy cercano y profesional. La comodidad de que venga a casa es un lujo. Muy contento con los resultados.', stars: 5 },
  { name: 'Ana P.', text: 'Me recuperé de una lesión deportiva mucho antes de lo previsto. Conoce perfectamente su trabajo y te explica todo.', stars: 5 },
]

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
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

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px]" style={{ background: 'radial-gradient(ellipse, rgba(21,128,61,0.04) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(13,148,136,0.04) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          {/* Section header */}
          <div className="max-w-xl mx-auto text-center mb-20 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 border border-green-100 rounded-full text-green-700 text-xs font-bold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Proceso
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-5 leading-tight">
              Reservar es{' '}
              <span className="gradient-text">muy sencillo</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              En tan sólo 3 pasos tienes a Iván en tu casa con todo lo necesario
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-14">
            {STEPS.map((s, i) => (
              <div key={s.num} className={`reveal delay-${(i+1)*150} group`}>
                <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-green-900/5 hover:border-green-100 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col">
                  {/* Step number bg */}
                  <div className="absolute top-6 right-6 text-5xl font-black text-gray-100 leading-none select-none group-hover:text-green-50 transition-colors">
                    {s.num}
                  </div>
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center reveal">
            <Link
              to="/reservar"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-xl shadow-green-700/25 hover:shadow-2xl hover:shadow-green-700/35 hover:-translate-y-0.5 shine-on-hover"
            >
              Reservar ahora — Primera valoración gratis
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-32 relative overflow-hidden">
        {/* Gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-white to-white" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 right-0 w-[600px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(13,148,136,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div className="reveal-left max-w-lg">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-xs font-bold tracking-widest uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                Servicios
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                Tratamientos<br />
                <span className="gradient-text">adaptados a ti</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                En tu propio entorno, con el mismo nivel de excelencia que en clínica.
              </p>
            </div>
            <div className="reveal-right">
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-200 text-green-700 hover:border-green-500 hover:bg-green-50 font-semibold rounded-2xl transition-all duration-300 whitespace-nowrap"
              >
                Ver todos los servicios
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {SERVICES.slice(0, 6).map((service, i) => (
              <div key={service.id} className={`reveal delay-${Math.min((i+1)*100, 500)}`}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY IVÁN ═══ */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px]" style={{ background: 'radial-gradient(ellipse, rgba(21,128,61,0.05) 0%, transparent 60%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* Text */}
            <div className="reveal-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 border border-green-100 rounded-full text-green-700 text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                ¿Por qué Iván?
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                Fisioterapia de<br />
                <span className="gradient-text">confianza, en casa</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Más de 5 años de experiencia clínica tratando a pacientes de toda edad en Madrid.
                Iván combina formación académica de alto nivel con un trato cercano y resultados reales y verificables.
              </p>
              <Link
                to="/sobre-ivan"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-green-700/25 hover:shadow-xl hover:shadow-green-700/35 hover:-translate-y-0.5"
              >
                Conocer a Iván
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-2 gap-4">
              {TRUST.map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal delay-${(i+1)*120} group bg-gradient-to-br from-white to-stone-50 rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-900/5 transition-all duration-400 hover:-translate-y-1 ${i % 2 !== 0 ? 'mt-4' : ''}`}
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1.5">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROMOTIONS ═══ */}
      {activePromotions.length > 0 && (
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white to-green-50/20" />
          <div className="absolute pointer-events-none" aria-hidden="true" style={{ inset: 0 }}>
            <div className="absolute top-0 right-0 w-[400px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
            <div className="max-w-xl mx-auto text-center mb-16 reveal">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-100 rounded-full text-amber-700 text-xs font-bold tracking-widest uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse" />
                Ofertas activas
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-5">
                Promociones <span className="gradient-text">especiales</span>
              </h2>
              <p className="text-gray-500 text-lg">Por tiempo limitado para nuevos y antiguos pacientes</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {activePromotions.map((promo, i) => (
                <div key={promo.id} className={`reveal delay-${(i+1)*150}`}>
                  <PromotionCard promotion={promo} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10 reveal">
              <Link
                to="/promociones"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-200 text-amber-700 hover:border-amber-400 hover:bg-amber-50 font-semibold rounded-2xl transition-all duration-300"
              >
                Ver todas las promociones
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(21,128,61,0.04) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 border border-green-100 rounded-full text-green-700 text-xs font-bold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Testimonios
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Lo que dicen<br />
              <span className="gradient-text">los pacientes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`reveal delay-${(i+1)*150} group bg-gradient-to-br from-white to-stone-50 rounded-3xl p-7 border border-gray-100 hover:border-green-100 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500 hover:-translate-y-1`}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <svg className="w-8 h-8 text-green-100 mb-3" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                </svg>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-2.5 pt-4 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-white text-xs font-black">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">Paciente verificado</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-28 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-teal-800" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-900/30 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-700/10 rounded-full blur-3xl" aria-hidden="true" />

        {/* Sparkles in CTA */}
        {[
          { x: 10, y: 20, d: 0    },
          { x: 85, y: 70, d: 1.2  },
          { x: 20, y: 80, d: 2.1  },
          { x: 75, y: 15, d: 0.7  },
        ].map((sp, i) => (
          <div key={i} className="absolute pointer-events-none" style={{ left: `${sp.x}%`, top: `${sp.y}%`, animation: `sparkle-pulse 3s ease-in-out ${sp.d}s infinite` }} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="rgba(255,255,255,0.4)"/>
            </svg>
          </div>
        ))}

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs font-bold mb-7 backdrop-blur-sm tracking-wide">
            <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse inline-block" />
            Plazas disponibles esta semana
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            ¿Listo para empezar<br />
            tu recuperación?
          </h2>
          <p className="text-green-100/80 text-xl mb-12 max-w-lg mx-auto leading-relaxed">
            Primera valoración gratuita. Sin compromiso. Iván acude a ti con todo lo necesario.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservar"
              className="group px-9 py-4 bg-white text-green-900 font-black text-base rounded-2xl hover:bg-green-50 transition-all duration-300 shadow-2xl shadow-black/25 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 shine-on-hover"
            >
              Reservar Cita Gratis
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/contacto"
              className="px-9 py-4 border-2 border-white/30 text-white font-bold text-base rounded-2xl hover:bg-white/10 hover:border-white/60 transition-all duration-300 flex items-center justify-center"
            >
              Más información
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
