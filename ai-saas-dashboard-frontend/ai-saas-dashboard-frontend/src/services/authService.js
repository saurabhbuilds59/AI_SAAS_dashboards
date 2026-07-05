import api, { tokenStorage } from './api'

// Matches the Django REST Framework endpoints defined in the backend spec:
// POST /api/auth/register/, /api/auth/login/, /api/auth/logout/,
// /api/auth/refresh/, GET|PUT /api/auth/profile/, etc.

export const authService = {
  async register({ email, first_name, last_name, password, password_confirm }) {
    const { data } = await api.post('/api/v1/users/register/', {
      email,
      first_name,
      last_name,
      password,
      password_confirm,
    })
    return data
  },

  async login({ email, password }) {
    const { data } = await api.post('/api/v1/users/login/', { email, password })
    tokenStorage.setTokens({ access: data.access, refresh: data.refresh })
    return data.user
  },

  async logout() {
    tokenStorage.clear()
    // Backend logout endpoint not implemented in this project; clear local tokens.
  },

  async getProfile() {
    const { data } = await api.get('/api/v1/users/profile/')
    return data
  },

  async updateProfile(payload) {
    const { data } = await api.put('/api/v1/users/profile/', payload)
    return data
  },

  async uploadAvatar(file) {
    const formData = new FormData()
    formData.append('avatar', file)
    // Backend currently only exposes PUT/PATCH profile and no avatar endpoint.
    // Call the profile endpoint with avatar if your backend supports it.
    const { data } = await api.put('/api/v1/users/profile/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },

  async forgotPassword(email) {
    const { data } = await api.post('/auth/forgot-password/', { email })
    return data
  },

  async resetPassword({ token, password }) {
    const { data } = await api.post('/auth/reset-password/', { token, password })
    return data
  },

  async changePassword({ old_password, new_password }) {
    const { data } = await api.post('/auth/change-password/', { old_password, new_password })
    return data
  },

  async verifyEmail(token) {
    const { data } = await api.post('/auth/verify-email/', { token })
    return data
  },

  async listSessions() {
    const { data } = await api.get('/auth/sessions/')
    return data
  },

  async revokeSession(sessionId) {
    await api.delete(`/auth/sessions/${sessionId}/`)
  },

  isAuthenticated() {
    return Boolean(tokenStorage.getAccess())
  },
}

export default authService
