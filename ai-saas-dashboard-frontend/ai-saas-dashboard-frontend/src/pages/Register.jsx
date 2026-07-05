import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { notify } from '../components/ui/toast'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', password_confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const next = {}
    if (form.first_name.trim().length < 2) next.first_name = 'Enter your first name'
    if (form.last_name.trim().length < 2) next.last_name = 'Enter your last name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    if (form.password !== form.password_confirm) next.password_confirm = 'Passwords do not match'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await register(form)
      setSubmitted(true)
    } catch (err) {
      const apiErrors = err.response?.data
      if (apiErrors?.email) setErrors((prev) => ({ ...prev, email: apiErrors.email[0] }))
      notify.error(apiErrors?.detail || 'Could not create your account')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-ink px-4">
        <div className="card w-full max-w-sm p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pulse/10 text-pulse">
            <MailCheck className="h-6 w-6" />
          </div>
          <h1 className="font-display text-xl font-semibold">Check your inbox</h1>
          <p className="mt-2 text-sm text-foam-muted">We sent a verification link to <span className="text-ink dark:text-foam font-medium">{form.email}</span>. Confirm your email to activate your account.</p>
          <Link to="/login" className="btn-secondary mt-6 w-full">Back to log in</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-ink px-4">
      <div className="card w-full max-w-sm p-8">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal text-white font-display font-bold">C</div>
          <span className="font-display text-lg font-semibold">Cortex</span>
        </Link>

        <h1 className="font-display text-2xl font-semibold">Create your workspace</h1>
        <p className="mt-1 text-sm text-foam-muted">50 free AI credits, no card required.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input label="First name" name="first_name" placeholder="Ada" value={form.first_name} onChange={onChange} error={errors.first_name} />
          <Input label="Last name" name="last_name" placeholder="Lovelace" value={form.last_name} onChange={onChange} error={errors.last_name} />
          <Input label="Email" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={onChange} error={errors.email} />
          <Input label="Password" type="password" name="password" placeholder="At least 8 characters" value={form.password} onChange={onChange} error={errors.password} />
          <Input label="Confirm password" type="password" name="password_confirm" placeholder="Re-enter password" value={form.password_confirm} onChange={onChange} error={errors.password_confirm} />

          <Button type="submit" loading={loading} className="w-full">Create account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-foam-muted">
          Already have an account? <Link to="/login" className="font-medium text-signal">Log in</Link>
        </p>
      </div>
    </div>
  )
}
