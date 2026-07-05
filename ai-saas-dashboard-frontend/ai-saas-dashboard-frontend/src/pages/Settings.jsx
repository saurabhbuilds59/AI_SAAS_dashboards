import { useState } from 'react'
import { Sun, Moon, Laptop, Smartphone, LogOut } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useTheme } from '../hooks/useTheme'
import { notify } from '../components/ui/toast'

const SESSIONS = [
  { id: 1, device: 'MacBook Pro — Chrome', location: 'Bhopal, IN', current: true, icon: Laptop },
  { id: 2, device: 'iPhone 15 — Cortex app', location: 'Bhopal, IN', current: false, icon: Smartphone },
  { id: 3, device: 'Windows PC — Edge', location: 'Pune, IN', current: false, icon: Laptop },
]

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-signal' : 'bg-black/10 dark:bg-white/10'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const [sessions, setSessions] = useState(SESSIONS)
  const [prefs, setPrefs] = useState({ emailNotifs: true, inAppNotifs: true, weeklyDigest: false, productUpdates: true })

  const revokeSession = (id) => {
    setSessions((s) => s.filter((sess) => sess.id !== id))
    notify.success('Session revoked')
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-foam-muted">Appearance, notifications, and account sessions.</p>
      </div>

      <Card>
        <h2 className="mb-4 font-display text-base font-semibold">Appearance</h2>
        <div className="flex gap-3">
          {[['light', Sun, 'Light'], ['dark', Moon, 'Dark']].map(([value, Icon, label]) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`flex flex-1 flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-colors ${
                theme === value ? 'border-signal bg-signal/5 text-signal dark:text-signal-soft' : 'border-black/10 dark:border-ink-line text-foam-muted'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-display text-base font-semibold">Notifications</h2>
        <div className="space-y-4">
          {[
            ['emailNotifs', 'Email notifications', 'Get emailed about important account activity'],
            ['inAppNotifs', 'In-app notifications', 'Show notifications inside the dashboard'],
            ['weeklyDigest', 'Weekly usage digest', 'A summary of your team\'s AI usage every Monday'],
            ['productUpdates', 'Product updates', 'New features and changes to Cortex'],
          ].map(([key, label, desc]) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-foam-muted">{desc}</p>
              </div>
              <Toggle checked={prefs[key]} onChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="mb-1 font-display text-base font-semibold">Active sessions</h2>
        <p className="mb-4 text-xs text-foam-muted">Devices currently logged into your account.</p>
        <div className="space-y-3">
          {sessions.map(({ id, device, location, current, icon: Icon }) => (
            <div key={id} className="flex items-center justify-between rounded-lg border border-black/10 dark:border-ink-line p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{device} {current && <span className="text-xs text-pulse">· This device</span>}</p>
                  <p className="text-xs text-foam-muted">{location}</p>
                </div>
              </div>
              {!current && (
                <Button variant="ghost" onClick={() => revokeSession(id)}><LogOut className="h-3.5 w-3.5" /> Revoke</Button>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
