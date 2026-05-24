# Iván Prisuelos | Fisioterapia a Domicilio

Aplicación web profesional para la gestión de citas de fisioterapia a domicilio. Construida con React + Vite + TypeScript + Tailwind CSS.

## Descripción del Proyecto

Esta es una Single Page Application (SPA) completa que permite a los clientes reservar citas de fisioterapia a domicilio con Iván Prisuelos, y al administrador (Iván) gestionar su agenda, disponibilidad y promociones desde un panel privado.

### Funcionalidades principales

**Para clientes:**
- Consultar servicios disponibles
- Ver promociones activas
- Reservar citas online mediante formulario multistep (4 pasos)
- Leer información sobre Iván
- Contactar por formulario, teléfono o WhatsApp

**Para el administrador (Iván):**
- Panel de control con estadísticas
- Gestión completa de citas (ver, completar, cancelar, eliminar)
- Gestión de disponibilidad (crear, bloquear y eliminar slots)
- Gestión de promociones (crear, editar, activar/desactivar, eliminar)

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19 | Framework UI |
| Vite | 8 | Bundler y dev server |
| TypeScript | 6 | Tipado estático |
| React Router DOM | 7 | Navegación SPA |
| Tailwind CSS | 4 | Estilos utilitarios |
| LocalStorage | — | Persistencia de datos |

## Instalación y Desarrollo

### Requisitos previos
- Node.js >= 18
- npm >= 9

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en http://localhost:5173

## Construcción para Producción

```bash
npm run build
```

Los archivos de producción se generan en la carpeta `dist/`.

Para previsualizar la build localmente:

```bash
npm run preview
```

## Despliegue en Vercel

1. Conecta el repositorio en https://vercel.com
2. Vercel detectará automáticamente Vite como framework
3. El archivo `vercel.json` ya está configurado para manejar el routing de la SPA
4. Haz clic en "Deploy" — no se necesita configuración adicional

## Credenciales del Panel Admin

```
Usuario:    admin
Contraseña: admin123
```

Acceso: /admin/login

> Nota de seguridad: Estas credenciales son para uso de demostración. Para producción real, se recomienda implementar un sistema de autenticación con backend.

## Configuración del Número de WhatsApp

Para cambiar el número de WhatsApp, edita el archivo `src/data/constants.ts`:

```typescript
export const PHYSIO_PHONE = '600000000'        // Número sin prefijo
export const PHYSIO_PHONE_FULL = '34600000000' // Número con prefijo España
```

El botón flotante de WhatsApp y todos los enlaces se actualizarán automáticamente.

## Estructura del Proyecto

```
src/
  components/
    admin/           <- Componentes del panel admin
    booking/         <- Formulario de reserva multistep
    layout/          <- Navbar y Footer
    ui/              <- Button, Input, Select, Modal, Toast
  data/
    constants.ts     <- Teléfono, dolencias, tratamientos, sesiones
    initialData.ts   <- Datos semilla para localStorage
  hooks/             <- useAuth, useAppointments, useAvailability, usePromotions
  layouts/           <- MainLayout, AdminLayout
  pages/
    admin/           <- Login, Dashboard, Appointments, Schedules, PromotionsAdmin
    Home, Services, Book, Promotions, About, Contact, NotFound
  routes/            <- Configuración de rutas
  services/          <- authService, appointmentService, availabilityService, promotionService
  styles/            <- globals.css
  types/             <- index.ts con todas las interfaces TypeScript
  utils/             <- dateUtils, idGenerator
```

## Limitaciones Actuales

- Sin backend real: Todos los datos se almacenan en localStorage. Los datos NO se sincronizan entre dispositivos.
- Sin notificaciones: No hay envío real de emails ni SMS de confirmación.
- Credenciales hardcodeadas: No apto para producción sin cambios en autenticación.
- Sin pasarela de pago: No hay integración con sistemas de pago online.
- Sin gestión de usuarios: Los clientes no tienen cuentas, solo reservas anónimas.

## Próximos Pasos Recomendados

1. **Supabase** (recomendado): Base de datos PostgreSQL + auth + APIs REST. Migración directa desde localStorage.
2. **Firebase**: Firestore para datos en tiempo real + Firebase Auth.
3. Notificaciones por email/WhatsApp API (Twilio, Meta Business API)
4. Integración de pagos (Stripe, Bizum)
5. App móvil con React Native

## Integración con Portfolio

Para enlazar desde el portfolio en https://portfolio-kohl-seven-15tnfk4ujq.vercel.app/:

1. Despliega esta aplicación en Vercel y obtén la URL pública
2. En tu portfolio, agrega una tarjeta con:
   - Nombre: "Fisioterapia Iván Prisuelos"
   - Descripción: "Aplicación web para reservas de fisioterapia a domicilio"
   - Tecnologías: React, TypeScript, Vite, Tailwind CSS
   - URL: [tu-dominio.vercel.app]

---

Proyecto desarrollado para Iván Prisuelos — Fisioterapeuta a Domicilio, Madrid.
