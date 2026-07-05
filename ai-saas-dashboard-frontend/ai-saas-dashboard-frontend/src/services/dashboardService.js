import api from './api'

export const dashboardService = {
  async summary() {
    const { data } = await api.get('/dashboard/')
    return data
  },

  async usage({ range = '30d' } = {}) {
    const { data } = await api.get('/usage/', { params: { range } })
    return data
  },

  async analytics() {
    const { data } = await api.get('/analytics/')
    return data
  },

  async notifications({ page = 1 } = {}) {
    const { data } = await api.get('/notifications/', { params: { page } })
    return data
  },

  async markNotificationRead(id) {
    const { data } = await api.post(`/notifications/${id}/read/`)
    return data
  },
}

export default dashboardService
