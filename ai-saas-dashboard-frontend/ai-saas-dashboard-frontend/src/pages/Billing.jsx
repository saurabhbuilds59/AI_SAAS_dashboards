import { Download } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Table from '../components/ui/Table'
import { useAuth } from '../hooks/useAuth'
import { notify } from '../components/ui/toast'

const INVOICES = [
  { id: 'INV-1042', date: '2026-06-01', amount: '$29.00', status: 'paid' },
  { id: 'INV-1011', date: '2026-05-01', amount: '$29.00', status: 'paid' },
  { id: 'INV-0987', date: '2026-04-01', amount: '$29.00', status: 'paid' },
  { id: 'INV-0954', date: '2026-03-01', amount: '$29.00', status: 'failed' },
]

const STATUS_TONE = { paid: 'pulse', failed: 'danger', pending: 'amber' }

export default function Billing() {
  const { user } = useAuth()
  const creditsUsed = 1240
  const creditsTotal = 2000

  const columns = [
    { key: 'id', header: 'Invoice', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'amount', header: 'Amount', sortable: true },
    { key: 'status', header: 'Status', sortable: true, render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge> },
    {
      key: 'actions', header: '',
      render: (row) => (
        <button onClick={() => notify.info(`Downloading ${row.id}.pdf`)} className="inline-flex items-center gap-1.5 text-xs font-medium text-signal">
          <Download className="h-3.5 w-3.5" /> PDF
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Billing</h1>
        <p className="text-sm text-foam-muted">Manage your plan, usage, and payment history.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-foam-muted">Current plan</p>
              <p className="font-display text-xl font-semibold capitalize">{user?.role || 'Premium'}</p>
            </div>
            <Button variant="secondary">Change plan</Button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-foam-muted">Credits used this month</span>
              <span className="font-mono">{creditsUsed} / {creditsTotal}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
              <div className="h-full rounded-full bg-signal" style={{ width: `${(creditsUsed / creditsTotal) * 100}%` }} />
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-xs text-foam-muted">Payment method</p>
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-black/10 dark:border-ink-line p-3">
            <div className="flex h-8 w-11 items-center justify-center rounded bg-black/5 dark:bg-white/10 font-mono text-[10px] font-semibold">VISA</div>
            <div>
              <p className="text-sm font-medium">•••• 4242</p>
              <p className="text-xs text-foam-muted">Expires 08/28</p>
            </div>
          </div>
          <Button variant="secondary" className="mt-4 w-full">Update payment method</Button>
        </Card>
      </div>

      <Card padded={false} className="p-5">
        <h2 className="mb-4 font-display text-base font-semibold">Invoice history</h2>
        <Table columns={columns} data={INVOICES} pageSize={10} />
      </Card>
    </div>
  )
}
