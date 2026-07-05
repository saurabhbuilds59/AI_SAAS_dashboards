import { useEffect, useState } from 'react'
import { FolderKanban, Sparkles, Gauge, Zap } from 'lucide-react'
import Card from '../components/ui/Card'
import { SkeletonCard } from '../components/ui/Skeleton'
import PulseStrip from '../components/PulseStrip'
import UsageChart from '../components/charts/UsageChart'
import Badge from '../components/ui/Badge'
import { useAuth } from '../hooks/useAuth'
// import dashboardService from '../services/dashboardService' // wire up once the Django backend is live

const MOCK_STATS = {
  totalProjects: 14,
  aiRequests: 3482,
  apiUsagePct: 62,
  creditsRemaining: 760,
  creditsTotal: 2000,
}

const MOCK_CHART = [
  { month: 'Jan', requests: 210 }, { month: 'Feb', requests: 340 }, { month: 'Mar', requests: 280 },
  { month: 'Apr', requests: 460 }, { month: 'May', requests: 520 }, { month: 'Jun', requests: 610 },
  { month: 'Jul', requests: 700 },
]

const MOCK_ACTIVITY = [
  { who: 'You', action: 'generated code for "auth-service"', time: '5 min ago' },
  { who: 'Priya Nair', action: 'summarized Q2-roadmap.pdf', time: '1 hr ago' },
  { who: 'Ben Ortiz', action: 'invited to project "Landing v2"', time: '3 hr ago' },
  { who: 'Cortex', action: 'flagged high grammar-tool usage', time: 'Yesterday' },
]

const TONE_CLASSES = {
  signal: 'bg-signal/10 text-signal dark:text-signal-soft',
  pulse: 'bg-pulse/10 text-pulse',
}

function StatCard({ icon: Icon, label, value, sub, tone = 'signal' }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${TONE_CLASSES[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <PulseStrip className="h-3 w-8" color={tone === 'pulse' ? 'bg-pulse' : 'bg-signal'} />
      </div>
      <p className="mt-4 font-mono text-2xl font-semibold">{value}</p>
      <p className="text-sm text-foam-muted">{label}</p>
      {sub && <p className="mt-1 text-xs text-foam-muted">{sub}</p>}
    </Card>
  )
}

export default function Dashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Swap for: dashboardService.summary() + dashboardService.usage()
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</h1>
        <p className="text-sm text-foam-muted">Here's what's happening across your workspace.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatCard icon={FolderKanban} label="Total projects" value={MOCK_STATS.totalProjects} sub="3 archived" />
            <StatCard icon={Sparkles} label="AI requests" value={MOCK_STATS.aiRequests.toLocaleString()} sub="This month" tone="pulse" />
            <StatCard icon={Gauge} label="API usage" value={`${MOCK_STATS.apiUsagePct}%`} sub="Of monthly quota" />
            <StatCard icon={Zap} label="Credits remaining" value={MOCK_STATS.creditsRemaining} sub={`of ${MOCK_STATS.creditsTotal}`} tone="pulse" />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-semibold">Monthly AI requests</h2>
              <p className="text-xs text-foam-muted">Across all projects and members</p>
            </div>
            <Badge tone="pulse">+34% vs last month</Badge>
          </div>
          <UsageChart data={MOCK_CHART} />
        </Card>

        <Card>
          <h2 className="mb-4 font-display text-base font-semibold">Recent activity</h2>
          <div className="space-y-4">
            {MOCK_ACTIVITY.map((item, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                <div>
                  <p><span className="font-medium">{item.who}</span> <span className="text-foam-muted">{item.action}</span></p>
                  <p className="text-xs text-foam-muted">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
