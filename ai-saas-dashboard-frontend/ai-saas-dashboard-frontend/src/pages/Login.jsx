import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { notify } from '../components/ui/toast'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await login(form)
      notify.success('Welcome back')
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
    } catch (err) {
      notify.error(err.response?.data?.detail || 'Invalid email or password')
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

        <h1 className="font-display text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-foam-muted">Log in to your workspace.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input label="Email" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={onChange} error={errors.email} />
          <div>
            <div className="flex items-center justify-between">
              <label className="label" htmlFor="password">Password</label>
              <Link to="/forgot-password" className="text-xs font-medium text-signal">Forgot password?</Link>
            </div>
            <Input id="password" type="password" name="password" placeholder="••••••••" value={form.password} onChange={onChange} error={errors.password} />
          </div>
          <Button type="submit" loading={loading} className="w-full">Log in</Button>
        </form>

        <p className="mt-6 text-center text-sm text-foam-muted">
          Don't have an account? <Link to="/register" className="font-medium text-signal">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
