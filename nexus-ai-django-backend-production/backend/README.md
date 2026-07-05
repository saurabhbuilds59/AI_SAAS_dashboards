# Nexus AI SaaS Dashboard — Production Django 5 Backend

[![Django 5.0](https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django)](https://www.djangoproject.com/)
[![PostgreSQL 16](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Dockerized](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Render Deploy](https://img.shields.io/badge/Render-Deployable-46E3B7?style=for-the-badge&logo=render)](https://render.com/)

Production-grade, scalable Django 5 REST API powering multi-tenant AI Project management suites, prompt token accounting, and secure role-based team administration. Designed with strict security standards, JWT authentication, and out-of-the-box 1-Click cloud deployment on **Render**.

---

## 🏗️ Architectural Overview

```
backend/
├── core/                  # Central configurations, WSGI/ASGI, DRF settings
├── apps/
│   ├── users/             # Custom UUID User Model, Tier Roles, SimpleJWT Auth
│   ├── projects/          # Multi-tenant API Key suites, filtering, pagination
│   ├── ai_module/         # Prompt API, OpenAI layer, credit deduction, history
│   ├── dashboard/         # Aggregated metrics, 24h token rates, system health
│   ├── notifications/     # Real-time alert feed CRUD
│   └── teams/             # Role invitations and capacity management
├── media/                 # Dynamic user uploads (avatars)
├── staticfiles/           # Compressed WhiteNoise production static assets
├── requirements.txt       # Pin-locked production packages
├── Dockerfile             # Multi-stage slim Docker image with non-root security
├── docker-compose.yml     # Complete local stack with PostgreSQL 16 & Redis
└── render.yaml            # Render Infrastructure-as-Code deployment blueprint
```

---

## ✨ Core Features

1. **Enterprise Security**: Custom User Model with UUID primary keys, Argon2/PBKDF2 password hashing, CORS whitelist, and rate throttling.
2. **AI Credit Ledger**: Atomic database transactions deducting token costs per prompt execution with automated mock fallback mode.
3. **OpenAPI Documentation**: Integrated `drf-spectacular` generating Swagger UI (`/api/docs/`) and ReDoc (`/api/redoc/`).

---

## 🚀 Quick Start (Docker Stack)

```bash
# 1. Clone repository
git clone https://github.com/your-username/nexus-ai-backend.git
cd nexus-ai-backend/backend

# 2. Copy environment file
cp .env.example .env

# 3. Launch database & API stack
docker-compose up --build -d

# 4. Run initial database migrations
docker-compose exec web python manage.py migrate

# 5. Create admin superuser
docker-compose exec web python manage.py createsuperuser
```

Access API Swagger documentation at: `http://localhost:8000/api/docs/`

---

## ☁️ 1-Click Render Cloud Deployment

1. Connect your GitHub repository to your Render dashboard.
2. Render will automatically detect the included `render.yaml` blueprint.
3. Provisioning creates a managed PostgreSQL 16 database and autoscaling Docker web container automatically.