import { useState } from 'react'
import { Sparkles, Users, CreditCard, AlertTriangle, CheckCheck } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const ICONS = { ai: Sparkles, team: Users, billing: CreditCard, alert: AlertTriangle }
const TONES = { ai: 'text-signal', team: 'text-pulse', billing: 'text-amber', alert: 'text-danger' }

const SEED = [
  { id: 1, type: 'ai', title: 'Summary ready', desc: '"Q2-roadmap.pdf" has been summarized.', time: '5 min ago', read: false },
  { id: 2, type: 'team', title: 'New teammate', desc: 'Sam Lee accepted your invite.', time: '2 hr ago', read: false },
  { id: 3, type: 'billing', title: 'Payment received', desc: 'Invoice INV-1042 for $29.00 was paid.', time: '1 day ago', read: true },
  { id: 4, type: 'alert', title: 'Usage nearing limit', desc: "You've used 85% of this month's credits.", time: '2 days ago', read: true },
  { id: 5, type: 'ai', title: 'Code review complete', desc: 'Explained 3 functions in "auth-service".', time: '3 days ago', read: true },
]

export default function Notifications() {
  const [items, setItems] = useState(SEED)
  const unread = items.filter((i) => !i.read).length

  const markAllRead = () => setItems((its) => its.map((i) => ({ ...i, read: true })))
  const markRead = (id) => setItems((its) => its.map((i) => (i.id === id ? { ...i, read: true } : i)))

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Notifications</h1>
          <p className="text-sm text-foam-muted">{unread > 0 ? `${unread} unread` : "You're all caught up"}</p>
        </div>
        {unread > 0 && (
          <Button variant="secondary" onClick={markAllRead}><CheckCheck className="h-4 w-4" /> Mark all as read</Button>
        )}
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = ICONS[item.type]
          return (
            <Card
              key={item.id}
              onClick={() => markRead(item.id)}
              className={`flex cursor-pointer items-start gap-4 transition-colors ${!item.read ? 'bg-signal/[0.03] dark:bg-signal/[0.06]' : ''}`}
            >
              <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5 ${TONES[item.type]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{item.title}</p>
                  {!item.read && <span className="h-1.5 w-1.5 rounded-full bg-signal" />}
                </div>
                <p className="text-sm text-foam-muted">{item.desc}</p>
                <p className="mt-1 text-xs text-foam-muted">{item.time}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
