import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import authService from '../services/authService'
import { notify } from '../components/ui/toast'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 8) return setError('Password must be at least 8 characters')
    if (password !== confirm) return setError('Passwords do not match')
    setError('')
    setLoading(true)
    try {
      await authService.resetPassword({ token, password })
      notify.success('Password updated — log in with your new password')
      navigate('/login')
    } catch {
      notify.error('That reset link is invalid or has expired')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-ink px-4">
      <div className="card w-full max-w-sm p-8">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-white font-display font-bold">C</div>
          <span className="font-display text-lg font-semibold">Cortex</span>
        </Link>

        <h1 className="font-display text-2xl font-semibold">Set a new password</h1>
        <p className="mt-1 text-sm text-foam-muted">Make it something you haven't used before.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
          <Input label="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={error} />
          <Button type="submit" loading={loading} className="w-full">Update password</Button>
        </form>
      </div>
    </div>
  )
}
