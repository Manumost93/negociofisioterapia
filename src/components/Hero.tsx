import { Link } from 'react-router-dom'
import { PHYSIO_WHATSAPP } from '../data/constants'

const CHECKS = [
  'Evaluación completa y personalizada',
  'Tratamiento en tu domicilio',
  'Sin desplazamientos ni esperas',
  'Seguimiento continuo de tu progreso',
]

const STATS = [
  { value: '+5', label: 'años de\nexperiencia' },
  { value: '100%', label: 'atención a\ndomicilio' },
  { value: '∞', label: 'trato\npersonalizado' },
]

// Deterministic particles (no random on each render)
const PARTICLES = [
  { x: 8,  y: 15, s: 4, d: 10, o: 0.35, delay: 0   },
  { x: 92, y: 70, s: 3, d: 13, o: 0.25, delay: 1.5 },
  { x: 25, y: 80, s: 5, d: 9,  o: 0.4,  delay: 3   },
  { x: 70, y: 10, s: 3, d: 14, o: 0.3,  delay: 0.8 },
  { x: 55, y: 55, s: 4, d: 11, o: 0.2,  delay: 4   },
  { x: 15, y: 45, s: 6, d: 8,  o: 0.3,  delay: 2   },
  { x: 80, y: 35, s: 3, d: 15, o: 0.25, delay: 5   },
  { x: 40, y: 90, s: 5, d: 10, o: 0.35, delay: 1   },
  { x: 62, y: 25, s: 4, d: 12, o: 0.2,  delay: 6   },
  { x: 35, y: 5,  s: 3, d: 9,  o: 0.3,  delay: 3.5 },
  { x: 88, y: 88, s: 5, d: 11, o: 0.25, delay: 2.5 },
  { x: 50, y: 40, s: 3, d: 13, o: 0.2,  delay: 7   },
]

// Sparkle/star positions
const SPARKLES = [
  { x: 20, y: 20, delay: 0    },
  { x: 75, y: 15, delay: 1.2  },
  { x: 85, y: 65, delay: 2.4  },
  { x: 10, y: 75, delay: 0.6  },
  { x: 50, y: 8,  delay: 1.8  },
  { x: 30, y: 60, delay: 3.0  },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/50">

      {/* ── Animated blob background ── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(#15803d 1px, transparent 1px), linear-gradient(90deg, #15803d 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute rounded-full bg-gradient-to-br from-green-400 to-teal-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              opacity: p.o,
              animation: `particle-float ${p.d}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* Sparkle stars */}
        {SPARKLES.map((sp, i) => (
          <div
            key={`sp-${i}`}
            aria-hidden="true"
            className="absolute"
            style={{
              left: `${sp.x}%`,
              top: `${sp.y}%`,
              animation: `sparkle-pulse 3s ease-in-out ${sp.delay}s infinite`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="url(#sg)" opacity="0.5"/>
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="16" y2="16">
                  <stop stopColor="#15803d"/>
                  <stop offset="1" stopColor="#0d9488"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        ))}

        {/* Radial glow center-right */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-radial from-green-200/30 via-teal-100/15 to-transparent rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(21,128,61,0.12) 0%, rgba(13,148,136,0.06) 40%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]" style={{ background: 'radial-gradient(ellipse, rgba(5,150,105,0.1) 0%, transparent 70%)' }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          <div className="hero-title-animate">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 shimmer-badge text-green-800 text-xs font-bold rounded-full mb-8 border border-green-200/60 shadow-sm tracking-wide">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block flex-shrink-0" />
              Fisioterapia a Domicilio · Madrid
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl xl:text-[4.5rem] font-black leading-[1.02] tracking-tight text-gray-900 mb-7">
              Tu recuperación,{' '}
              <span className="block gradient-text">en la comodidad</span>
              <span className="relative inline-block">
                de tu hogar
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 320 10" fill="none" aria-hidden="true">
                  <path d="M2 8C60 3 120 1 160 2.5C200 4 260 7 318 8" stroke="#15803d" strokeWidth="3" strokeLinecap="round" opacity="0.35"/>
                </svg>
              </span>
            </h1>

            {/* Sub */}
            <p className="hero-sub-animate text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-lg">
              Iván Prisuelos ofrece fisioterapia a domicilio orientada a mejorar tu movilidad,
              aliviar el dolor y acompañarte en tu recuperación con un trato{' '}
              <strong className="text-gray-700 font-semibold">cercano, profesional y personalizado.</strong>
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-animate flex flex-wrap gap-3 mb-12">
              <Link
                to="/reservar"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold text-base rounded-2xl transition-all duration-300 shadow-lg shadow-green-700/30 hover:shadow-xl hover:shadow-green-700/40 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Reservar Cita
                <svg className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={PHYSIO_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 hover:border-green-400 text-gray-700 hover:text-green-700 font-semibold text-base rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md shadow-sm whitespace-nowrap"
              >
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.998 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.83L.057 23.53a.5.5 0 00.612.611l5.756-1.454A11.944 11.944 0 0011.998 24C18.626 24 24 18.627 24 12S18.626 0 11.998 0zm0 21.818a9.818 9.818 0 01-5.005-1.369l-.36-.213-3.715.938.968-3.628-.234-.373A9.818 9.818 0 012.182 12c0-5.416 4.4-9.818 9.816-9.818 5.415 0 9.818 4.402 9.818 9.818 0 5.415-4.403 9.818-9.818 9.818z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Stats row */}
            <div className="hero-cta-animate flex gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-black gradient-text leading-none">{s.value}</div>
                  <div className="text-[11px] text-gray-400 mt-1 leading-tight whitespace-pre-line">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating card */}
          <div className="hero-card-animate flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px]">

              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/20 to-teal-400/20 blur-2xl scale-105" aria-hidden="true" />

              {/* Main card */}
              <div className="relative glass rounded-3xl p-7 shadow-2xl shadow-green-900/10 float-animate">

                {/* Profile */}
                <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/50">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center text-2xl shadow-lg shadow-green-600/30 flex-shrink-0">
                    🧑‍⚕️
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900 truncate">Iván Prisuelos</h3>
                    <p className="text-xs text-green-700 font-semibold">Fisioterapeuta Colegiado</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-3 h-3 text-amber-400 fill-current flex-shrink-0" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">5.0</span>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <ul className="space-y-3 mb-6">
                  {CHECKS.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-sm shadow-green-400/30">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 font-medium leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Free badge */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-3.5 border border-green-100/80">
                  <p className="text-xs text-green-800 font-bold text-center">
                    🎁 Primera valoración <span className="text-green-600">gratuita</span> para nuevos pacientes
                  </p>
                </div>
              </div>

              {/* Floating badge: availability */}
              <div className="absolute -bottom-4 left-6 glass rounded-xl px-3.5 py-2.5 shadow-xl float-animate-slow border border-green-100/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-xs font-bold text-gray-700 whitespace-nowrap">Disponible esta semana</span>
                </div>
              </div>

              {/* Floating badge: location */}
              <div className="absolute -top-4 right-6 glass rounded-xl px-3.5 py-2.5 shadow-xl float-animate border border-teal-100/60" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-sm flex-shrink-0">📍</span>
                  <span className="text-xs font-bold text-gray-700">Madrid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 70L1440 70L1440 25C1100 60 800 5 720 22C580 45 240 62 0 25L0 70Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
