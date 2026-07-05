import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Search, Sun, Moon, Bell, LogOut, User as UserIcon, ChevronDown } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { notify } from '../ui/toast'

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    notify.success('Logged out')
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-black/5 dark:border-ink-line bg-white/80 dark:bg-ink/80 backdrop-blur px-4 py-3 lg:px-6">
      <button onClick={onMenuClick} className="rounded-md p-2 text-foam-muted hover:bg-black/5 dark:hover:bg-white/5 lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foam-muted" />
        <input
          type="search"
          placeholder="Search projects, prompts, teammates…"
          className="input !pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button onClick={toggleTheme} className="rounded-lg p-2 text-foam-muted hover:bg-black/5 dark:hover:bg-white/5" aria-label="Toggle theme">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <Link to="/notifications" className="relative rounded-lg p-2 text-foam-muted hover:bg-black/5 dark:hover:bg-white/5" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-pulse" />
        </Link>

        <div className="relative">
          <button onClick={() => setMenuOpen((o) => !o)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-signal/20 text-xs font-semibold text-signal dark:text-signal-soft">
              {(user?.name || 'U').slice(0, 1).toUpperCase()}
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-foam-muted" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="card absolute right-0 z-20 mt-2 w-48 p-1.5">
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5">
                  <UserIcon className="h-4 w-4" /> Profile
                </Link>
                <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-danger hover:bg-danger/10">
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
