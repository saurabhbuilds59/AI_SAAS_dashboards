# Cortex — AI SaaS Dashboard (Frontend)

This is the frontend foundation for the AI SaaS Dashboard: React 18 + Vite + Tailwind CSS, built to talk to a Django REST Framework backend (JWT auth, PostgreSQL, Anthropic-backed AI module) that gets built next.

## What's included

- **12 pages**: Landing, Pricing, Login, Register, Forgot/Reset Password, Dashboard, Projects, AI Workspace, Team, Billing, Profile, Settings, Notifications
- **Dark mode** (class-based, persisted to `localStorage`, respects system preference on first load)
- **Auth scaffolding**: `AuthContext` + `authService` wired for JWT access/refresh tokens, with automatic refresh-on-401 and redirect-to-login on refresh failure
- **AI module UI**: all 7 tools (generate, summarize, translate, grammar, code generate, code explain, chat assistant) with a credits meter and markdown-rendered output
- **Reusable UI kit**: Button, Card, Input, Modal, Badge, Skeleton, Table (client-side sort/paginate), Toasts
- **Role-aware routing**: `ProtectedRoute` supports an optional `roles` prop for admin-only pages
- **Service layer** (`src/services/`) already shaped to match the REST API in the full spec (`/api/auth/*`, `/api/projects/*`, `/api/ai/*`, `/api/dashboard/`, `/api/usage/`, `/api/notifications/*`) — swap the mock data in each page for these calls as the backend comes online

## Design system

A dark-first "control room" palette (`ink`/`foam` base, `signal` violet + `pulse` teal + `amber` accents), Space Grotesk for display type, Inter for body, JetBrains Mono for data/code. The signature element is the **pulse strip** (`src/components/PulseStrip.jsx`) — a small animated waveform used anywhere the product wants to signal "AI activity happening now."

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`. In dev, `/api/*` requests are proxied to `http://localhost:8000` (see `vite.config.js`) — update the proxy target or `VITE_API_BASE_URL` once the Django backend is running.

## Note on auth in this preview

Every auth and data call is wired to real endpoints (`src/services/`), but **no backend exists yet in this pass** — you can browse Landing/Pricing/Login/Register, but logging in for real requires the Django API described in the full project spec. The AI Workspace page falls back to representative mock responses if `/api/ai/*` isn't reachable, so it's fully clickable without a backend.

## Folder structure

```
src/
  components/
    ui/            Button, Card, Input, Modal, Badge, Skeleton, Table, toast helper
    layout/         Sidebar, Topbar, DashboardLayout, MarketingLayout
    charts/         UsageChart (recharts)
    PulseStrip.jsx  Signature animated element
  context/          AuthContext, ThemeContext
  hooks/            useAuth, useTheme, useDebounce
  services/         api.js (axios + JWT interceptors), authService, aiService,
                     projectService, dashboardService
  routes/           ProtectedRoute (with role guard)
  pages/            One file per route
  App.jsx           Route table
  main.jsx          Providers + router entry
```

## Next steps

1. **Backend**: Django + DRF + PostgreSQL, implementing the endpoints already called in `src/services/`, with the Anthropic Messages API called server-side from `/api/ai/*` (API key never touches the frontend)
2. **Admin panel**: a separate role-gated section for managing users, payments, and reports
3. **Docker/Nginx/Gunicorn** deployment config once the backend exists
4. **Tests**: component tests (Vitest + React Testing Library) and API integration tests once endpoints are live
