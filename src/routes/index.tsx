import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'

import { Home } from '../pages/Home'
import { Services } from '../pages/Services'
import { Book } from '../pages/Book'
import { Promotions } from '../pages/Promotions'
import { About } from '../pages/About'
import { Contact } from '../pages/Contact'
import { NotFound } from '../pages/NotFound'

import { Login } from '../pages/admin/Login'
import { Dashboard } from '../pages/admin/Dashboard'
import { AppointmentsAdmin } from '../pages/admin/Appointments'
import { Schedules } from '../pages/admin/Schedules'
import { PromotionsAdmin } from '../pages/admin/PromotionsAdmin'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/reservar" element={<Book />} />
          <Route path="/promociones" element={<Promotions />} />
          <Route path="/sobre-ivan" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Login (no layout) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="citas" element={<AppointmentsAdmin />} />
          <Route path="horarios" element={<Schedules />} />
          <Route path="promociones" element={<PromotionsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
