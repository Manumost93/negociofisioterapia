import { Link } from 'react-router-dom'
import { PHYSIO_WHATSAPP } from '../data/constants'

export function About() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-teal-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
                👨‍⚕️ Sobre mí
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Iván Prisuelos</h1>
              <p className="text-xl text-green-700 font-medium mb-6">
                Fisioterapeuta Colegiado · Especialista en Atención Domiciliaria
              </p>
              <p className="text-gray-600 leading-relaxed">
                Con más de cinco años de experiencia clínica en el campo de la fisioterapia, me he
                especializado en ofrecer una atención completamente personalizada y de calidad en el
                domicilio de mis pacientes. Creo firmemente que la recuperación es más efectiva
                cuando se produce en un entorno familiar y cómodo, sin el estrés de los
                desplazamientos ni los tiempos de espera.
              </p>
            </div>

            {/* Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                    👨‍⚕️
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Iván Prisuelos</h2>
                  <p className="text-green-700 font-medium text-sm">Fisioterapeuta Colegiado</p>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: '🎓', label: 'Grado en Fisioterapia', value: 'Universidad Complutense' },
                    { icon: '🏥', label: 'Experiencia', value: '+5 años en clínica y domicilio' },
                    { icon: '📍', label: 'Área de cobertura', value: 'Madrid y alrededores' },
                    { icon: '🗣️', label: 'Idiomas', value: 'Español, inglés básico' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-xs text-gray-500">{item.label}</div>
                        <div className="text-sm font-medium text-gray-900">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Mi trayectoria profesional comenzó en el ámbito clínico, donde tuve la oportunidad de
              trabajar con pacientes de muy diverso perfil: desde deportistas de alto rendimiento con
              lesiones agudas hasta personas mayores en procesos de rehabilitación postoperatoria. Esta
              variedad me permitió desarrollar una visión global del tratamiento fisioterapéutico y
              una gran capacidad de adaptación a las necesidades individuales de cada paciente.
            </p>

            <p className="text-lg leading-relaxed">
              Con el tiempo, me di cuenta de que muchos de mis pacientes —especialmente los mayores,
              los que atravesaban recuperaciones complicadas o quienes simplemente no podían
              permitirse el lujo de desplazarse— obtenían resultados mucho mejores cuando recibían el
              tratamiento en la comodidad de su hogar. El entorno familiar reduce la ansiedad, mejora
              la adherencia al tratamiento y permite realizar una valoración más realista de las
              condiciones y necesidades reales del paciente. Así nació mi apuesta por la fisioterapia
              domiciliaria como modelo de atención principal.
            </p>

            <p className="text-lg leading-relaxed">
              Mi enfoque terapéutico se basa en tres pilares fundamentales: la escucha activa, la
              evidencia científica y el trato humano. Cada sesión comienza con una valoración exhaustiva
              y termina con una conversación honesta sobre el estado del paciente y los siguientes
              pasos. No creo en los tratamientos indefinidos sin objetivos claros; me gusta establecer
              hitos concretos y celebrar cada avance junto con mis pacientes. Mi objetivo es que cada
              persona que trabaja conmigo comprenda qué le pasa, por qué ocurre y qué podemos hacer
              para mejorar.
            </p>

            <p className="text-lg leading-relaxed">
              Fuera de la consulta, me mantengo permanentemente actualizado a través de formación
              continua en terapia manual, punción seca, osteopatía y rehabilitación neurológica.
              Considero que la formación no termina nunca y que cada paciente es una oportunidad de
              aprendizaje. Si buscas un fisioterapeuta cercano, honesto y comprometido con tu
              recuperación, estaré encantado de acompañarte en este camino. Tu bienestar es mi
              prioridad.
            </p>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Áreas de especialización
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: '🦴', label: 'Fisioterapia traumatológica' },
              { icon: '🏃', label: 'Rehabilitación deportiva' },
              { icon: '👴', label: 'Fisioterapia geriátrica' },
              { icon: '🧠', label: 'Neurorehab. básica' },
              { icon: '💆', label: 'Terapia manual' },
              { icon: '📍', label: 'Punción seca' },
              { icon: '🔄', label: 'Postoperatorio' },
              { icon: '⚡', label: 'Dolor crónico' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2 text-center card-hover"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Mis valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🤝',
                title: 'Trato cercano',
                description:
                  'Cada paciente es único. Escucho con atención, explico con claridad y acompaño con empatía en todo el proceso.',
              },
              {
                icon: '🔬',
                title: 'Evidencia científica',
                description:
                  'Aplico técnicas con respaldo científico demostrado. Me formo continuamente para ofrecer lo mejor en cada momento.',
              },
              {
                icon: '🎯',
                title: 'Resultados reales',
                description:
                  'Trabajo con objetivos claros y medibles. Mi éxito se mide en la mejoría real de mis pacientes.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-2xl bg-stone-50 border border-gray-100"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-teal-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Hablamos?</h2>
          <p className="text-green-100 mb-6">
            Cuéntame tu caso sin compromiso. Estaré encantado de orientarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/reservar"
              className="px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors"
            >
              Reservar Primera Visita
            </Link>
            <a
              href={PHYSIO_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
