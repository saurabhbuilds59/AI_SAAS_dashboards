import { useRef, useState } from 'react'
import { Camera } from 'lucide-react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import authService from '../services/authService'
import { notify } from '../components/ui/toast'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const fileInputRef = useRef(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || null)
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [profileLoading, setProfileLoading] = useState(false)

  const [passwordForm, setPasswordForm] = useState({ old_password: '', new_password: '', confirm: '' })
  const [passwordLoading, setPasswordLoading] = useState(false)

  const onAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarPreview(URL.createObjectURL(file))
    notify.error('Avatar upload is not implemented for this backend endpoint.')
  }


  const saveProfile = async (e) => {
    e.preventDefault()
    setProfileLoading(true)
    try {
      const data = await authService.updateProfile(profileForm)
      updateUser(data)
      notify.success('Profile updated')
    } catch {
      updateUser(profileForm)
      notify.success('Profile updated locally (backend not connected)')
    } finally {
      setProfileLoading(false)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    if (passwordForm.new_password.length < 8) return notify.error('New password must be at least 8 characters')
    if (passwordForm.new_password !== passwordForm.confirm) return notify.error('Passwords do not match')
    setPasswordLoading(true)
    try {
      await authService.changePassword(passwordForm)
      notify.success('Password changed')
      setPasswordForm({ old_password: '', new_password: '', confirm: '' })
    } catch {
      notify.error('Could not change password')
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-foam-muted">Update your personal information and photo.</p>
      </div>

      <Card>
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-signal/10 text-xl font-semibold text-signal dark:text-signal-soft">
              {avatarPreview ? <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" /> : (user?.name || 'U').slice(0, 1).toUpperCase()}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-signal text-white shadow"
              aria-label="Change photo"
            >
              <Camera className="h-3 w-3" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
          </div>
          <div>
            <p className="font-medium">{user?.name || 'Your name'}</p>
            <p className="text-sm text-foam-muted">JPG or PNG, up to 5MB</p>
          </div>
        </div>

        <form onSubmit={saveProfile} className="mt-6 space-y-4">
          <Input label="Full name" value={profileForm.name} onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))} />
          <Input label="Email" type="email" value={profileForm.email} onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))} />
          <Button type="submit" loading={profileLoading}>Save changes</Button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-4 font-display text-base font-semibold">Change password</h2>
        <form onSubmit={changePassword} className="space-y-4">
          <Input label="Current password" type="password" value={passwordForm.old_password} onChange={(e) => setPasswordForm((f) => ({ ...f, old_password: e.target.value }))} />
          <Input label="New password" type="password" value={passwordForm.new_password} onChange={(e) => setPasswordForm((f) => ({ ...f, new_password: e.target.value }))} />
          <Input label="Confirm new password" type="password" value={passwordForm.confirm} onChange={(e) => setPasswordForm((f) => ({ ...f, confirm: e.target.value }))} />
          <Button type="submit" variant="secondary" loading={passwordLoading}>Update password</Button>
        </form>
      </Card>
    </div>
  )
}
