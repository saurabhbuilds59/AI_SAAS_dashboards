# AI SaaS Dashboard (React + Django)

Production-ready **AI SaaS dashboard** consisting of:
- **Frontend**: React 18 + Vite + Tailwind (JWT auth, route guards, AI workspace UI)
- **Backend**: Django 5 + DRF + SimpleJWT (REST API, token/credit accounting layer, role/team management)

---

## Live demo
> Add your deployed URL here (optional)

---

## Features

### Frontend (AI SaaS Dashboard)
- React app with **dark mode** + persistent theme
- **JWT authentication scaffolding** (access/refresh tokens stored in `localStorage`)
- Protected routes (optionally role-gated)
- AI Workspace UI with tool-specific pages/actions
- Consistent reusable UI components (buttons, cards, modals, tables, toasts)

### Backend (Nexus AI SaaS API)
- **JWT auth** using `djangorestframework-simplejwt`
- **OpenAPI** docs via `drf-spectacular`
- Modular API apps:
  - `users` (register/profile/change-password)
  - `projects` (project/workspace resources)
  - `ai_module` (AI prompt execution + credit deduction)
  - `dashboard` (aggregated metrics)
  - `notifications` (notification feed)
  - `teams` (team administration)
- Production hardening basics: CORS support, rate throttling, WhiteNoise static handling

---

## Tech stack

- **Frontend**: React 18, Vite, Tailwind CSS, axios, React Router, recharts
- **Backend**: Django 5, Django REST Framework, SimpleJWT, PostgreSQL, Redis, drf-spectacular, Gunicorn, Whitenoise
- **Deployment**: Docker + optional Render IaC (`render.yaml` included in backend folder)

---

## Repository structure

```text
.
├── ai-saas-dashboard-frontend/
│   └── ai-saas-dashboard-frontend/
│       └── src/                # React app
│
└── nexus-ai-django-backend-production/
    └── backend/
        ├── apps/               # users/projects/ai_module/dashboard/notifications/teams
        ├── core/               # settings, urls
        ├── docker-compose.yml # PostgreSQL + Redis stack
        ├── Dockerfile
        ├── render.yaml
        ├── requirements.txt
        └── nexus_ai_postman_collection.json
```

---

## Prerequisites

- Node.js (for frontend)
- Docker (recommended for backend)
- (Optional) Python tooling if running backend outside Docker

---

## Quick start (local development)

### 1) Start the backend with Docker

```bash
cd nexus-ai-django-backend-production/backend

# Start Postgres + Redis + Django container
docker-compose up --build -d

# Run migrations
docker-compose exec web python manage.py migrate

# Create an admin user
docker-compose exec web python manage.py createsuperuser
```

Backend will run on: **http://localhost:8000**

**API docs**:
- Swagger UI: `http://localhost:8000/api/docs/`
- ReDoc: `http://localhost:8000/api/redoc/`

---

### 2) Start the frontend

```bash
cd ai-saas-dashboard-frontend/ai-saas-dashboard-frontend

npm install
npm run dev
```

Frontend will run on: **http://localhost:5173**

#### API proxy note
In development, the frontend proxies calls to `/api/*` to the Django backend (`vite.config.js`). Ensure your backend is running on **port 8000**.

---

## Authentication (JWT)

The frontend stores:
- **Access token** in `localStorage` key: `cortex-access-token`
- **Refresh token** in `localStorage` key: `cortex-refresh-token`

On `401`, the app attempts **refresh-once** flow using:
- `POST /api/v1/users/token/refresh/`

If refresh fails, the user is redirected to `/login`.

---

## Postman collection

A Postman collection is included:
- `nexus-ai-django-backend-production/backend/nexus_ai_postman_collection.json`

Import it into Postman to explore endpoints quickly.

---

## Deployment

### Docker
Backend is containerized using:
- `Dockerfile`
- `docker-compose.yml` (for local stack)

### Render (IaC)
A `render.yaml` blueprint is included in the backend folder, enabling Render to deploy the Docker service.

---

## Troubleshooting

- **CORS errors**: ensure backend CORS settings allow your frontend origin (CORS is configured in Django settings).
- **401 loops**: confirm refresh token endpoint is reachable and the backend JWT lifetimes match expectations.
- **Frontend can’t reach backend**: ensure backend is running on `localhost:8000` (or update Vite proxy / API base URL).

---

## License
> Add license information here (MIT/Apache/etc.)

