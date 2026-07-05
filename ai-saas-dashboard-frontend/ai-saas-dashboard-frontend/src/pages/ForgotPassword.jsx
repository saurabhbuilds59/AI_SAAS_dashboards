import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import authService from '../services/authService'
import { notify } from '../components/ui/toast'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.forgotPassword(email)
    } catch {
      // Intentionally silent: don't reveal whether an email exists.
    } finally {
      setLoading(false)
      setSent(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-ink px-4">
      <div className="card w-full max-w-sm p-8">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-white font-display font-bold">C</div>
          <span className="font-display text-lg font-semibold">Cortex</span>
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pulse/10 text-pulse">
              <MailCheck className="h-6 w-6" />
            </div>
            <h1 className="font-display text-xl font-semibold">Check your email</h1>
            <p className="mt-2 text-sm text-foam-muted">If an account exists for <span className="text-ink dark:text-foam font-medium">{email}</span>, we've sent a reset link.</p>
          </div>
        ) : (
          <>
            <h1 className="font-display text-2xl font-semibold">Reset your password</h1>
            <p className="mt-1 text-sm text-foam-muted">We'll email you a link to set a new one.</p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <Input label="Email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button type="submit" loading={loading} className="w-full">Send reset link</Button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-foam-muted">
          <Link to="/login" className="font-medium text-signal">Back to log in</Link>
        </p>
      </div>
    </div>
  )
}
