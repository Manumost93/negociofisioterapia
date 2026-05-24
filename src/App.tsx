import { useEffect } from 'react'
import { AppRoutes } from './routes'
import { ToastProvider } from './components/ui/Toast'
import { appointmentService } from './services/appointmentService'
import { availabilityService } from './services/availabilityService'
import { promotionService } from './services/promotionService'

function App() {
  useEffect(() => {
    // Initialize services with seed data on first run
    availabilityService.initialize()
    promotionService.initialize()
    appointmentService.initialize()
  }, [])

  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  )
}

export default App
