import { useMemo, useState } from 'react'
import { Plus, Search, Archive, Pencil, Trash2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Badge from '../components/ui/Badge'
import Table from '../components/ui/Table'
import { useDebounce } from '../hooks/useDebounce'
import { notify } from '../components/ui/toast'
// import projectService from '../services/projectService' // wire up once the Django backend is live

const STATUS_TONE = { active: 'pulse', archived: 'neutral', draft: 'amber' }

const SEED_PROJECTS = [
  { id: 1, name: 'Landing v2', status: 'active', members: 4, requests: 812, updated: '2026-06-28' },
  { id: 2, name: 'Support bot rewrite', status: 'active', members: 3, requests: 340, updated: '2026-06-30' },
  { id: 3, name: 'Q2 roadmap summarizer', status: 'draft', members: 1, requests: 12, updated: '2026-06-15' },
  { id: 4, name: 'Onboarding translations', status: 'archived', members: 2, requests: 190, updated: '2026-05-02' },
  { id: 5, name: 'Internal API docs', status: 'active', members: 5, requests: 501, updated: '2026-07-01' },
]

export default function Projects() {
  const [projects, setProjects] = useState(SEED_PROJECTS)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const debouncedSearch = useDebounce(search)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', description: '' })

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesStatus = status === 'all' || p.status === status
      return matchesSearch && matchesStatus
    })
  }, [projects, debouncedSearch, status])

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', description: '' })
    setModalOpen(true)
  }

  const openEdit = (project) => {
    setEditing(project)
    setForm({ name: project.name, description: project.description || '' })
    setModalOpen(true)
  }

  const saveProject = () => {
    if (!form.name.trim()) return
    if (editing) {
      setProjects((ps) => ps.map((p) => (p.id === editing.id ? { ...p, name: form.name } : p)))
      notify.success('Project updated')
    } else {
      setProjects((ps) => [
        { id: Date.now(), name: form.name, status: 'active', members: 1, requests: 0, updated: new Date().toISOString().slice(0, 10) },
        ...ps,
      ])
      notify.success('Project created')
    }
    setModalOpen(false)
  }

  const removeProject = (id) => {
    setProjects((ps) => ps.filter((p) => p.id !== id))
    notify.success('Project deleted')
  }

  const archiveProject = (id) => {
    setProjects((ps) => ps.map((p) => (p.id === id ? { ...p, status: 'archived' } : p)))
    notify.success('Project archived')
  }

  const columns = [
    { key: 'name', header: 'Project', sortable: true, render: (row) => <span className="font-medium">{row.name}</span> },
    { key: 'status', header: 'Status', sortable: true, render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge> },
    { key: 'members', header: 'Members', sortable: true },
    { key: 'requests', header: 'AI requests', sortable: true },
    { key: 'updated', header: 'Updated', sortable: true },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <div className="flex items-center gap-1">
          <button onClick={() => openEdit(row)} className="rounded-md p-1.5 text-foam-muted hover:bg-black/5 dark:hover:bg-white/5" aria-label="Edit">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => archiveProject(row.id)} className="rounded-md p-1.5 text-foam-muted hover:bg-black/5 dark:hover:bg-white/5" aria-label="Archive">
            <Archive className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => removeProject(row.id)} className="rounded-md p-1.5 text-danger hover:bg-danger/10" aria-label="Delete">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-foam-muted">{filtered.length} of {projects.length} projects</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> New project</Button>
      </div>

      <Card padded={false} className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foam-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects…" className="input !pl-9" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="input w-auto">
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </Card>

      <Table columns={columns} data={filtered} emptyMessage="No projects match your filters." />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit project' : 'New project'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={saveProject}>{editing ? 'Save changes' : 'Create project'}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Project name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Marketing site redesign" />
          <div>
            <label className="label">Description</label>
            <textarea
              className="input min-h-[90px] resize-none"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="What's this project for?"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
