import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/useAuth'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
]

export default function MarketingLayout() {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-ink text-ink dark:text-foam">
      <header className="sticky top-0 z-30 border-b border-black/5 dark:border-ink-line bg-white/80 dark:bg-ink/80 backdrop-blur">
        <div className="container-page flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-white font-display font-bold">C</div>
            <span className="font-display text-lg font-semibold">Cortex</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-signal' : 'text-foam-muted hover:text-ink dark:hover:text-foam'}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button onClick={toggleTheme} className="rounded-lg p-2 text-foam-muted hover:bg-black/5 dark:hover:bg-white/5" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {user ? (
              <Link to="/dashboard" className="btn-primary">Go to dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn-ghost">Log in</Link>
                <Link to="/register" className="btn-primary">Start free</Link>
              </>
            )}
          </div>

          <button onClick={() => setOpen((o) => !o)} className="rounded-md p-2 md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-black/5 dark:border-ink-line px-4 py-4 md:hidden space-y-3">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium">{l.label}</Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link to="/login" className="btn-ghost flex-1" onClick={() => setOpen(false)}>Log in</Link>
              <Link to="/register" className="btn-primary flex-1" onClick={() => setOpen(false)}>Start free</Link>
            </div>
          </div>
        )}
      </header>

      <Outlet />

      <footer className="border-t border-black/5 dark:border-ink-line mt-24">
        <div className="container-page py-10 flex flex-col items-center justify-between gap-4 text-sm text-foam-muted md:flex-row">
          <p>© {new Date().getFullYear()} Cortex. Built for teams shipping with AI.</p>
          <div className="flex gap-6">
            <Link to="/pricing" className="hover:text-ink dark:hover:text-foam">Pricing</Link>
            <a href="#" className="hover:text-ink dark:hover:text-foam">Docs</a>
            <a href="#" className="hover:text-ink dark:hover:text-foam">Status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
