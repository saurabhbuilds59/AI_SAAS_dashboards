import axios from 'axios'

// All requests go through /api, which vite.config.js proxies to the Django
// backend in dev, and which Nginx proxies to Gunicorn in production.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''


const ACCESS_TOKEN_KEY = 'cortex-access-token'
const REFRESH_TOKEN_KEY = 'cortex-refresh-token'

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: ({ access, refresh }) => {
    if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access)
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  },
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach the access token to every outgoing request.
api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On a 401, try exactly once to refresh the access token using the refresh
// token (rotation-aware: the backend is expected to return a new refresh
// token as well, per SIMPLE_JWT ROTATE_REFRESH_TOKENS = True).
let refreshPromise = null


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    if (status === 401 && !originalRequest._retry && tokenStorage.getRefresh()) {
      originalRequest._retry = true
      try {
        if (!refreshPromise) {
          refreshPromise = axios
            .post(`${BASE_URL}/api/v1/users/token/refresh/`, {
              refresh: tokenStorage.getRefresh(),
            })
            .finally(() => {
              refreshPromise = null
            })

        }
        const { data } = await refreshPromise
        tokenStorage.setTokens({ access: data.access, refresh: data.refresh })
        originalRequest.headers.Authorization = `Bearer ${data.access}`
        return api(originalRequest)
      } catch (refreshError) {
        tokenStorage.clear()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
