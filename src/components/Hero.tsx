import { Link } from 'react-router-dom'
import { PHYSIO_WHATSAPP } from '../data/constants'

const CHECKS = [
  'Evaluación completa y personalizada',
  'Tratamiento en tu domicilio',
  'Sin desplazamientos ni esperas',
  'Seguimiento continuo de tu progreso',
]

const STATS = [
  { value: '+5', unit: 'años', label: 'de experiencia clínica' },
  { value: '100%', unit: '', label: 'atención a domicilio' },
  { value: '∞', unit: '', label: 'trato personalizado' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/40">

      {/* ── Animated blob background ── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#15803d 1px, transparent 1px), linear-gradient(90deg, #15803d 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left column */}
          <div className="hero-title-animate">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 shimmer-badge text-green-800 text-xs font-semibold rounded-full mb-7 border border-green-200/60 shadow-sm">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block" />
              Fisioterapia a Domicilio · Madrid
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 mb-6">
              Tu recuperación,{' '}
              <span className="gradient-text">en la comodidad</span>{' '}
              <span className="relative">
                de tu hogar
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9.5C50 4 100 2 150 3C200 4 250 7 298 9.5"
                    stroke="#15803d"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-sub-animate text-lg sm:text-xl text-gray-600 leading-relaxed mb-9 max-w-lg">
              Iván Prisuelos ofrece fisioterapia a domicilio orientada a mejorar tu movilidad,
              aliviar el dolor y acompañarte en tu recuperación con un trato{' '}
              <strong className="text-gray-800 font-semibold">cercano, profesional y personalizado.</strong>
            </p>

            {/* CTAs */}
            <div className="hero-cta-animate flex flex-col sm:flex-row gap-3 mb-12">
              <Link
                to="/reservar"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-lg shadow-green-700/30 hover:shadow-xl hover:shadow-green-700/40 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Reservar Cita
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={PHYSIO_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-green-400 text-gray-800 hover:text-green-700 font-semibold text-base rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.998 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.53a.5.5 0 00.612.611l5.756-1.454A11.944 11.944 0 0011.998 24C18.626 24 24 18.627 24 12S18.626 0 11.998 0zm0 21.818a9.818 9.818 0 01-5.005-1.369l-.36-.213-3.715.938.968-3.628-.234-.373A9.818 9.818 0 012.182 12c0-5.416 4.4-9.818 9.816-9.818 5.415 0 9.818 4.402 9.818 9.818 0 5.415-4.403 9.818-9.818 9.818z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="hero-cta-animate flex gap-6 sm:gap-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-black gradient-text leading-none">
                    {s.value}<span className="text-lg">{s.unit}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — floating card */}
          <div className="hero-card-animate relative flex justify-center lg:justify-end">

            {/* Decorative rings */}
            <div className="absolute -inset-10 rounded-full border border-green-200/40 animate-spin" style={{ animationDuration: '30s' }} aria-hidden="true" />
            <div className="absolute -inset-6 rounded-full border border-teal-200/30 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} aria-hidden="true" />

            {/* Main card */}
            <div className="relative w-full max-w-sm glass rounded-3xl p-7 shadow-2xl shadow-green-900/10 float-animate">

              {/* Profile header */}
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center text-2xl shadow-lg shadow-green-600/30 flex-shrink-0">
                  🧑‍⚕️
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Iván Prisuelos</h3>
                  <p className="text-xs text-green-700 font-semibold">Fisioterapeuta Colegiado</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">5.0</span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <ul className="space-y-3 mb-6">
                {CHECKS.map((item, i) => (
                  <li key={item} className="flex items-center gap-3 reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-sm shadow-green-400/40">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA inside card */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-3.5 border border-green-100">
                <p className="text-xs text-green-800 font-semibold text-center leading-snug">
                  🎁 Primera valoración gratuita para nuevos pacientes
                </p>
              </div>
            </div>

            {/* Floating badge — availability */}
            <div className="absolute -bottom-3 -left-4 glass rounded-xl px-3.5 py-2.5 shadow-xl float-animate-slow border border-green-100/50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-gray-700">Disponible esta semana</span>
              </div>
            </div>

            {/* Floating badge — location */}
            <div className="absolute -top-4 -right-2 glass rounded-xl px-3.5 py-2.5 shadow-xl float-animate border border-teal-100/50" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-2">
                <span className="text-sm">📍</span>
                <span className="text-xs font-semibold text-gray-700">Madrid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 20C1200 50 960 5 720 20C480 35 240 55 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
