import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute({ roles }) {
  const { user, isLoading, hasRole } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-ink">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-signal border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (roles && !hasRole(...roles)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
