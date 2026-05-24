# Iván Prisuelos | Fisioterapia a Domicilio

Aplicación web profesional para la gestión de citas de fisioterapia a domicilio. Construida con React + Vite + TypeScript + Tailwind CSS.

## Descripción del Proyecto

SPA completa que permite a los clientes reservar citas de fisioterapia a domicilio con Iván Prisuelos, y al administrador gestionar su agenda, disponibilidad y promociones desde un panel privado.

### Funcionalidades principales

**Para clientes:**
- Consultar servicios disponibles
- Ver promociones activas
- Reservar citas mediante formulario multistep (4 pasos) con calendario visual
- Contactar por formulario, teléfono o WhatsApp

**Para el administrador (Iván):**
- Panel de control con estadísticas
- Gestión completa de citas (ver, completar, cancelar, eliminar)
- Gestión de disponibilidad (crear, bloquear y eliminar slots)
- Gestión de promociones (crear, editar, activar/desactivar, eliminar)

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19 | Framework UI |
| Vite | 8 | Bundler y dev server |
| TypeScript | 6 | Tipado estático |
| React Router DOM | 7 | Navegación SPA |
| Tailwind CSS | 4 | Estilos utilitarios |
| Plus Jakarta Sans | — | Tipografía principal |
| LocalStorage | — | Persistencia de datos |

---

## Instalación y Desarrollo

### Requisitos previos
- Node.js >= 18
- npm >= 9

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en **http://localhost:5173**

## Construcción para Producción

```bash
npm run build
npm run preview   # previsualizar build localmente
```

---

## Despliegue en Vercel

1. Conecta el repositorio en https://vercel.com
2. Vercel detecta Vite automáticamente
3. El archivo `vercel.json` gestiona el routing de la SPA
4. Clic en **Deploy** — sin configuración adicional

---

## Credenciales del Panel Admin

```
Usuario:    admin
Contraseña: admin123
Ruta:       /admin/login
```

> Estas credenciales son para demo. En producción se recomienda autenticación con backend real.

---

## Configuración del Número de WhatsApp

Edita `src/data/constants.ts`:

```typescript
export const PHYSIO_PHONE = '600000000'        // Número sin prefijo
export const PHYSIO_PHONE_FULL = '34600000000' // Con prefijo España (+34)
```

El botón flotante y todos los enlaces se actualizan automáticamente.

---

## Changelog — Actualizaciones Importantes

### v1.2 — Rediseño UI completo

**Fondo animado (Hero)**
- Fondo interactivo con 4 blobs orgánicos que se morphean y mueven continuamente (estilo Stripe/Linear)
- 12 partículas flotantes animadas con posiciones deterministas
- 6 estrellas de destello (`sparkle-pulse`) que aparecen y desaparecen
- Grid pattern sutil de fondo para profundidad
- Tarjeta flotante derecha con glassmorphism y efecto `float-animate`

**Navbar**
- Completamente transparente encima del hero
- Transición a cristal esmerilado (`backdrop-blur`) al hacer scroll
- Links blancos sobre el hero, oscuros en el resto de páginas
- Menú móvil con animación suave

**Calendario de reservas**
- Vista de mes real con cuadrícula L M X J V S D
- Navegación entre meses con flechas
- Punto verde bajo cada día con horarios disponibles
- Día seleccionado con gradiente verde/teal y escala aumentada
- Hoy marcado con anillo verde
- Al seleccionar un día, aparecen los slots de hora como pills interactivos
- Leyenda visual (disponible / seleccionado / hoy)
- Resumen del slot seleccionado al pie del calendario

**Página de Reservar**
- Header oscuro con patrón de puntos y degradado verde
- Preview visual de los 4 pasos en la cabecera
- Pantalla de éxito con checkmark animado y glassmorphism

**Home — secciones mejoradas**
- Espaciado `py-32` entre secciones (más aire y elegancia)
- Nueva sección de **Testimonios** con 3 tarjetas de pacientes verificados
- Estrellas de destello animadas en el banner CTA final
- Efecto `shine-on-hover` (brillo que barre) en botones principales
- Cards de "¿Por qué Iván?" con offset alternado para dinamismo visual

**Cards (servicios y promociones)**
- Fondo con gradiente suave al hacer hover
- Iconos con gradiente verde/teal
- `gradient-border`: borde degradado animado al hacer hover
- Animación de elevación con curva de rebote

**Animaciones y efectos (globals.css)**
- `particle-float` — partículas que flotan hacia arriba
- `sparkle-pulse` — estrellas que pulsan y rotan
- `sweep-shine` / `.shine-on-hover` — brillo que barre en hover
- `blob-morph`, `float-up-down` — movimiento orgánico de fondo
- `.glass`, `.glass-green` — clases de glassmorphism
- `.reveal`, `.reveal-left`, `.reveal-right` — scroll reveal con IntersectionObserver
- `.gradient-border` — borde gradiente al hover

---

## Estructura del Proyecto

```
src/
  components/
    admin/           <- Componentes del panel admin
    booking/         <- Formulario con calendario visual
    layout/          <- Navbar (glass/transparent) y Footer
    ui/              <- Button, Input, Select, Modal, Toast
  data/
    constants.ts     <- Teléfono, dolencias, tratamientos, sesiones
    initialData.ts   <- Datos semilla para localStorage
  hooks/
    useScrollReveal.ts   <- IntersectionObserver para animaciones scroll
    useAuth, useAppointments, useAvailability, usePromotions
  layouts/           <- MainLayout, AdminLayout
  pages/
    admin/           <- Login, Dashboard, Appointments, Schedules, PromotionsAdmin
    Home, Services, Book, Promotions, About, Contact, NotFound
  routes/            <- Configuración de rutas
  services/          <- authService, appointmentService, availabilityService, promotionService
  styles/
    globals.css      <- Todas las animaciones, glassmorphism, particles
  types/             <- index.ts con todas las interfaces TypeScript
  utils/             <- dateUtils, idGenerator
```

---

## Limitaciones Actuales

- **Sin backend real** — datos en localStorage, no se sincronizan entre dispositivos
- **Sin notificaciones** — no hay email ni SMS de confirmación automática
- **Credenciales hardcodeadas** — no apto para producción sin cambios
- **Sin pasarela de pago** — no hay integración con Stripe ni Bizum
- **Sin cuentas de cliente** — las reservas son anónimas

---

## Próximos Pasos Recomendados

1. **Supabase** (recomendado) — PostgreSQL + auth + APIs REST, migración directa desde localStorage
2. **Firebase** — Firestore para datos en tiempo real + Firebase Auth
3. Notificaciones por email/WhatsApp (Twilio, Resend, Meta Business API)
4. Pasarela de pagos (Stripe, Bizum)
5. PWA — para instalar la app en móvil
6. SEO con react-helmet y meta tags dinámicos

---

## Integración con Portfolio

Para enlazar desde https://portfolio-kohl-seven-15tnfk4ujq.vercel.app/:

1. Despliega en Vercel y obtén la URL pública
2. Añade una tarjeta en el portfolio:
   - **Nombre:** Fisioterapia Iván Prisuelos
   - **Descripción:** Web profesional de reservas de fisioterapia a domicilio con panel de administración
   - **Tecnologías:** React 19, TypeScript, Vite, Tailwind CSS, React Router
   - **Demo:** `[tu-dominio].vercel.app`
   - **Repo:** https://github.com/Manumost93/negociofisioterapia

---

Proyecto desarrollado para Iván Prisuelos — Fisioterapeuta a Domicilio, Madrid.
