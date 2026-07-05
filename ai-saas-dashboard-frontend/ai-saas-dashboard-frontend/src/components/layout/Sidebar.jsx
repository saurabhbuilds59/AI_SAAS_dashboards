import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import {
  LayoutDashboard, FolderKanban, Sparkles, Users, CreditCard, Settings, Bell, X,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/ai-workspace', label: 'AI Workspace', icon: Sparkles },
  { to: '/team', label: 'Team', icon: Users },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/billing', label: 'Billing', icon: CreditCard },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth()

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onClose} />}
      <aside
        className={clsx(
          'fixed z-40 flex h-full w-64 flex-col border-r border-black/5 dark:border-ink-line bg-white dark:bg-ink-soft transition-transform lg:sticky lg:top-0 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-white font-display font-bold">C</div>
            <span className="font-display text-lg font-semibold">Cortex</span>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-foam-muted hover:bg-black/5 dark:hover:bg-white/5 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-signal/10 text-signal dark:text-signal-soft'
                    : 'text-foam-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-ink dark:hover:text-foam',
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-black/5 dark:border-ink-line p-4">
          <div className="flex items-center gap-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-signal/20 text-sm font-semibold text-signal dark:text-signal-soft">
              {(user?.name || 'U').slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.name || 'Loading…'}</p>
              <p className="truncate text-xs text-foam-muted capitalize">{user?.role || 'free'} plan</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
