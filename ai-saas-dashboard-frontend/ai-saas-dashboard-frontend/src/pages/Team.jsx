import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Table from '../components/ui/Table'
import { notify } from '../components/ui/toast'

const SEED_MEMBERS = [
  { id: 1, name: 'You', email: 'you@company.com', role: 'admin', joined: '2026-01-12' },
  { id: 2, name: 'Priya Nair', email: 'priya@company.com', role: 'premium', joined: '2026-02-03' },
  { id: 3, name: 'Ben Ortiz', email: 'ben@company.com', role: 'premium', joined: '2026-03-19' },
  { id: 4, name: 'Sam Lee', email: 'sam@company.com', role: 'free', joined: '2026-05-27' },
]

const ACTIVITY = [
  { who: 'Priya Nair', action: 'shared "Landing v2" with the team', time: '1 hr ago' },
  { who: 'Ben Ortiz', action: 'changed Sam Lee\'s role to Free', time: 'Yesterday' },
  { who: 'You', action: 'invited sam@company.com', time: '3 days ago' },
]

export default function Team() {
  const [members, setMembers] = useState(SEED_MEMBERS)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [invite, setInvite] = useState({ email: '', role: 'free' })

  const sendInvite = () => {
    if (!/^\S+@\S+\.\S+$/.test(invite.email)) return notify.error('Enter a valid email')
    setMembers((m) => [...m, { id: Date.now(), name: invite.email.split('@')[0], email: invite.email, role: invite.role, joined: 'Pending' }])
    notify.success(`Invite sent to ${invite.email}`)
    setInvite({ email: '', role: 'free' })
    setInviteOpen(false)
  }

  const updateRole = (id, role) => {
    setMembers((m) => m.map((mem) => (mem.id === id ? { ...mem, role } : mem)))
    notify.success('Role updated')
  }

  const columns = [
    {
      key: 'name', header: 'Member', sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-signal/10 text-xs font-semibold text-signal dark:text-signal-soft">
            {row.name.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-foam-muted">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role', header: 'Role', sortable: true,
      render: (row) => (
        <select
          value={row.role}
          onChange={(e) => updateRole(row.id, e.target.value)}
          className="input w-auto !py-1.5 !text-xs"
        >
          <option value="admin">Admin</option>
          <option value="premium">Premium</option>
          <option value="free">Free</option>
        </select>
      ),
    },
    { key: 'joined', header: 'Joined', sortable: true },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Team</h1>
          <p className="text-sm text-foam-muted">{members.length} members across your workspace</p>
        </div>
        <Button onClick={() => setInviteOpen(true)}><UserPlus className="h-4 w-4" /> Invite member</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Table columns={columns} data={members} />
        </div>
        <Card>
          <h2 className="mb-4 font-display text-base font-semibold">Activity log</h2>
          <div className="space-y-4">
            {ACTIVITY.map((item, i) => (
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

      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite a team member"
        footer={
          <>
            <Button variant="secondary" onClick={() => setInviteOpen(false)}>Cancel</Button>
            <Button onClick={sendInvite}>Send invite</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Email" type="email" value={invite.email} onChange={(e) => setInvite((i) => ({ ...i, email: e.target.value }))} placeholder="teammate@company.com" />
          <div>
            <label className="label">Role</label>
            <select value={invite.role} onChange={(e) => setInvite((i) => ({ ...i, role: e.target.value }))} className="input">
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
