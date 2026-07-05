import api from './api'

export const projectService = {
  async list({ page = 1, search = '', status = '', ordering = '-created_at' } = {}) {
    const { data } = await api.get('/projects/', { params: { page, search, status, ordering } })
    return data
  },

  async get(id) {
    const { data } = await api.get(`/projects/${id}/`)
    return data
  },

  async create(payload) {
    const { data } = await api.post('/projects/', payload)
    return data
  },

  async update(id, payload) {
    const { data } = await api.put(`/projects/${id}/`, payload)
    return data
  },

  async remove(id) {
    await api.delete(`/projects/${id}/`)
  },

  async archive(id) {
    const { data } = await api.post(`/projects/${id}/archive/`)
    return data
  },

  async inviteMember(id, { email, role }) {
    const { data } = await api.post(`/projects/${id}/invite/`, { email, role })
    return data
  },

  async activityLog(id) {
    const { data } = await api.get(`/projects/${id}/activity/`)
    return data
  },
}

export default projectService
