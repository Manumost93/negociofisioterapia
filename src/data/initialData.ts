import type { AvailabilitySlot, Appointment, Promotion } from '../types'
import { getDatePlusDays } from '../utils/dateUtils'

function makeSlot(
  id: string,
  daysFromNow: number,
  startTime: string,
  endTime: string,
  status: AvailabilitySlot['status'] = 'available'
): AvailabilitySlot {
  return {
    id,
    date: getDatePlusDays(daysFromNow),
    startTime,
    endTime,
    status,
  }
}

export function generateInitialSlots(): AvailabilitySlot[] {
  return [
    makeSlot('slot-1', 1, '09:00', '10:00'),
    makeSlot('slot-2', 1, '10:30', '11:30'),
    makeSlot('slot-3', 1, '12:00', '13:00'),
    makeSlot('slot-4', 2, '09:00', '10:00'),
    makeSlot('slot-5', 2, '11:00', '12:00'),
    makeSlot('slot-6', 2, '16:00', '17:00'),
    makeSlot('slot-7', 3, '09:30', '10:30'),
    makeSlot('slot-8', 3, '11:00', '12:00'),
    makeSlot('slot-9', 3, '17:00', '18:00'),
    makeSlot('slot-10', 5, '09:00', '10:00'),
    makeSlot('slot-11', 5, '10:30', '11:30'),
    makeSlot('slot-12', 5, '12:00', '13:00'),
    makeSlot('slot-13', 5, '16:30', '17:30'),
    makeSlot('slot-14', 7, '09:00', '10:00'),
    makeSlot('slot-15', 7, '11:00', '12:00'),
    makeSlot('slot-16', 8, '10:00', '11:00'),
    makeSlot('slot-17', 8, '12:30', '13:30'),
    makeSlot('slot-18', 8, '17:00', '18:00'),
    makeSlot('slot-19', 10, '09:00', '10:00'),
    makeSlot('slot-20', 10, '10:30', '11:30'),
    makeSlot('slot-21', 12, '09:30', '10:30'),
    makeSlot('slot-22', 12, '11:00', '12:00'),
    makeSlot('slot-23', 14, '09:00', '10:00'),
    makeSlot('slot-24', 14, '10:30', '11:30'),
    makeSlot('slot-25', 14, '16:00', '17:00'),
    makeSlot('slot-res-1', 1, '14:00', '15:00', 'reserved'),
    makeSlot('slot-res-2', 3, '14:00', '15:00', 'reserved'),
    makeSlot('slot-res-3', 5, '14:00', '15:00', 'reserved'),
  ]
}

export function generateInitialAppointments(slots: AvailabilitySlot[]): Appointment[] {
  const reservedSlots = slots.filter((s) => s.status === 'reserved')
  if (reservedSlots.length < 3) return []

  return [
    {
      id: 'apt-1',
      clientId: 'client-1',
      clientName: 'María',
      clientLastName: 'García López',
      clientPhone: '612345678',
      address: 'Calle Mayor 15, 3ºB, Madrid',
      date: reservedSlots[0].date,
      startTime: reservedSlots[0].startTime,
      endTime: reservedSlots[0].endTime,
      ailment: 'Dolor lumbar',
      treatmentType: 'Masaje terapéutico',
      sessionType: 'Sesión de fisioterapia individual',
      notes: 'Paciente con hernia discal L4-L5. Trato con cuidado.',
      status: 'pending',
      createdAt: new Date().toISOString(),
      slotId: reservedSlots[0].id,
    },
    {
      id: 'apt-2',
      clientId: 'client-2',
      clientName: 'Carlos',
      clientLastName: 'Martínez Ruiz',
      clientPhone: '623456789',
      address: 'Avenida de la Paz 8, 1ºA, Madrid',
      date: reservedSlots[1].date,
      startTime: reservedSlots[1].startTime,
      endTime: reservedSlots[1].endTime,
      ailment: 'Lesión deportiva',
      treatmentType: 'Rehabilitación deportiva',
      sessionType: 'Sesión de seguimiento',
      notes: 'Corredor. Tendinitis aquílea. En proceso de recuperación.',
      status: 'pending',
      createdAt: new Date().toISOString(),
      slotId: reservedSlots[1].id,
    },
    {
      id: 'apt-3',
      clientId: 'client-3',
      clientName: 'Ana',
      clientLastName: 'Fernández Sánchez',
      clientPhone: '634567890',
      address: 'Plaza del Sol 3, 2ºC, Madrid',
      date: reservedSlots[2].date,
      startTime: reservedSlots[2].startTime,
      endTime: reservedSlots[2].endTime,
      ailment: 'Contracturas musculares',
      treatmentType: 'Terapia manual',
      sessionType: 'Valoración inicial a domicilio',
      notes: '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      slotId: reservedSlots[2].id,
    },
  ]
}

export function generateInitialPromotions(): Promotion[] {
  return [
    {
      id: 'promo-1',
      title: 'Primera Sesión de Valoración',
      description:
        'Conoce a Iván y realiza tu primera valoración fisioterapéutica a domicilio. Evaluación completa de tu estado de salud y plan de tratamiento personalizado sin coste adicional.',
      discount: 'Gratis',
      badge: '¡Nuevo paciente!',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'promo-2',
      title: 'Bono 5 Sesiones',
      description:
        'Adquiere un bono de 5 sesiones de fisioterapia a domicilio y ahorra. Ideal para tratamientos continuados. Válido durante 3 meses desde la primera sesión.',
      discount: '10% descuento',
      badge: 'Ahorro garantizado',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'promo-3',
      title: 'Bono 10 Sesiones',
      description:
        'Nuestro mejor bono para tratamientos de recuperación prolongada. 10 sesiones con la máxima flexibilidad de horario y prioridad en reserva.',
      discount: '15% descuento',
      badge: 'Mejor valor',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'promo-4',
      title: 'Fisioterapia para Mayores',
      description:
        'Programa especial para personas mayores de 65 años. Sesiones adaptadas a ritmo tranquilo, enfocadas en movilidad, equilibrio y calidad de vida.',
      discount: 'Precio especial',
      badge: '+65 años',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'promo-5',
      title: 'Pack Verano Activo',
      description:
        'Prepara tu cuerpo para el verano o recuperate de las lesiones de temporada. Pack de valoración + 3 sesiones de tratamiento a precio especial.',
      discount: '20% descuento',
      badge: 'Temporada',
      active: false,
      createdAt: new Date().toISOString(),
    },
  ]
}
