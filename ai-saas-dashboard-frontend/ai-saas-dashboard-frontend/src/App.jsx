import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import MarketingLayout from './components/layout/MarketingLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './routes/ProtectedRoute'

import Landing from './pages/Landing'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import AIWorkspace from './pages/AIWorkspace'
import Team from './pages/Team'
import Billing from './pages/Billing'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Marketing */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Authenticated dashboard app */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/ai-workspace" element={<AIWorkspace />} />
            <Route path="/team" element={<Team />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Route>

        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  )
}
