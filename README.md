# LinkedEye Web Project

LinkedEye is a network infrastructure monitoring and management platform built with Django. It provides end-to-end visibility across sites — from onboarding and device discovery to real-time health monitoring, analytics, ticketing, and alerting.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Docker (Recommended)](#docker-recommended)
  - [Manual Setup](#manual-setup)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Development](#development)
- [Security Notes](#security-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Features

| Module | Description |
|---|---|
| **Site Management** | Manage and monitor network sites and infrastructure |
| **Onboarding** | User, device, and site onboarding workflows |
| **Dashboard & Analytics** | Real-time monitoring dashboards powered by Apache Superset |
| **Entity Management** | Graph-based relationship management via Neo4j |
| **Notification System** | Configurable alerts via Apprise and Office365 email |
| **Ticket Management** | Integrated ticketing with Redmine |
| **Authentication** | Google SSO, Azure Active Directory, and TOTP (2FA) |
| **Audit Logs** | Comprehensive audit trail for all system activities |
| **Vault Integration** | Secure secret management via HashiCorp Vault |
| **Site Health Monitoring** | Continuous site health and status tracking |
| **BOD/EOD Status** | Beginning-of-Day / End-of-Day status management |
| **Comparison Tools** | Diff and analyze configurations across devices |
| **Auto-Discovery** | Automatic discovery of network devices and services |
| **Incident Management** | Track and manage network incidents |
| **SNMP Monitoring** | SNMP-based device polling and monitoring |

---

## Technology Stack

**Backend**
- Python 3.9 / Django 4.1.7
- Gunicorn (production WSGI server)
- Celery + RabbitMQ (async task queue)

**Databases**
- MySQL — primary application database
- Neo4j — graph database for entity relationships
- PostgreSQL — analytics backend (Apache Superset)
- Elasticsearch — search and log analytics

**Cache & Sessions**
- Redis (django-redis, session storage)

**Authentication**
- Django Allauth + Google SSO
- Microsoft Identity Web (Azure Active Directory)
- PyOTP (TOTP / Google Authenticator)

**Integrations**
- HashiCorp Vault — secret management
- Redmine — ticket management
- Apprise — multi-channel notifications
- Redfish — server hardware management
- SNMP — network device monitoring
- Apache Superset — analytics dashboards

**Observability**
- Prometheus client
- Python JSON Logger

---

## Prerequisites

- Python 3.9+
- MySQL
- Neo4j
- Redis
- Elasticsearch
- RabbitMQ
- PostgreSQL (optional, for analytics)
- Docker (optional, for containerized deployment)

---

## Installation

### Docker (Recommended)

```bash
git clone <repository-url>
cd LinkedEyeWebProject

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your values

docker build -t linkedeye-web .
docker run --env-file .env -p 8000:8000 linkedeye-web
```

The container automatically runs migrations, seeds default data, and starts Gunicorn on port `8000`.

### Manual Setup

```bash
git clone <repository-url>
cd LinkedEyeWebProject

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your values

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Create an administrative user (Superuser)
python manage.py createsuperuser

# Seed default data
python manage.py LEDefaultAddservices
python manage.py LEDefaultSites

# Collect static files
python manage.py collectstatic --noinput

# Start the development server
python manage.py runserver
```

---

## Configuration

Copy `.env.example` to `.env` and fill in the values. Never commit `.env` with real credentials.

### Database

```env
MYSQL_DB_NAME=linkedeye
MYSQL_DB_USER=root
MYSQL_DB_PASS=your_password
MYSQL_DB_HOST=localhost
MYSQL_DB_PORT=3306
DJANGO_DB_CONN_MAX_AGE=100

POSTGRES_USER=linkedeyedashboard
POSTGRES_PASS=your_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_SUPERSET_DB=superset
```

### Neo4j

```env
NEO4J_HOST=localhost
NEO4J_PORT=7687
NEO4J_USER=neo4j
NEO4J_PASS=your_password
```

### Elasticsearch

```env
ELASTIC_HOST=localhost
ELASTIC_PORT=9200
ELASTIC_USER=elastic
ELASTIC_PASS=your_password
```

### Redis

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password
REDIS_CACHE_URL=redis://:your_password@localhost:6379/1
```

### RabbitMQ

```env
MQ_HOST=localhost
MQ_PORT=5672
MQ_USER=linkedeye
MQ_PASS=your_password
```

### HashiCorp Vault

```env
VAULT_HOST=localhost
VAULT_PORT=8200
```

### Authentication

```env
# Django
SECRET_KEY=your_secret_key_min_50_chars
SESSION_COOKIE_AGE=3600  # Session timeout in seconds (e.g., 3600 = 1 hour)

# Google SSO
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
GOOGLE_ALLOW_DOMAINS=["yourdomain.com"]
GOOGLE_SITE_ID=1

# TOTP
TOTP_MASTER_KEY=your_totp_master_key

# Azure AD — configure in login/aad.config.json
```

### Integrations

```env
REDMINE_HOST=localhost
REDMINE_PORT=80
REDMINE_AUTOMATION_PROJECT=linkedeye
REDMINE_AUTOMATION_USER=automation@yourdomain.com
REDMINE_AUTOMATION_PASS=your_password

APPRISE_HOST=localhost
APPRISE_PORT=8000

LINKEDEYE_EMAIL=alerts@yourdomain.com
LINKEDEYE_EMAIL_APPKEY=your_office365_app_password
```

### Application URLs

```env
PORTAL_URL=https://linkedeye.yourdomain.com
ANALYTICS_DASHBOARD_PREFIX_URL=http://superset.yourdomain.com:8088/
WEBSOCKET_PREFIX_URL=wss://linkedeye.yourdomain.com/
LE_CSRF_TRUSTED_ORIGINS=["https://*.yourdomain.com"]
```

---

## Project Structure

```
LinkedEyeWebProject/
├── app/                    # Core application (auth adapter, base models)
├── addservice/             # Service management
├── allonboard/             # Device onboarding
├── analytics/              # Analytics / Superset integration
├── applications/           # Application registry
├── auditlogs/              # Audit logging
├── autodiscover/           # Auto-discovery of network devices
├── bodeodstatus/           # BOD/EOD status tracking
├── comparision/            # Configuration comparison tools
├── dashboard/              # Dashboard views
├── entity/                 # Neo4j entity management
├── hsonboarding/           # HS onboarding workflow
├── iframeGraphs/           # Embedded device graphs
├── incidents/              # Incident management
├── jvectormap/             # Geographic map data (country/state CSVs)
├── lesites/                # Site management
├── lib/                    # Shared internal libraries
├── login/                  # Authentication (Google SSO, Azure AD, TOTP)
├── nagios/                 # Nagios integration scripts
├── notification/           # Notification preferences and dispatch
├── onboarding/             # General onboarding workflows
├── onboardOptions/         # Onboarding configuration options
├── sitehealth/             # Site health monitoring
├── snmp/                   # SNMP monitoring
├── template/               # Device configuration templates
├── ticket/                 # Redmine ticket integration
├── useronboard/            # User onboarding
├── userprofile/            # User profile management
├── vault/                  # HashiCorp Vault integration
├── LinkedEyeWebProject/    # Django project settings and URLs
├── static/                 # Collected static files
├── manage.py               # Django management script
├── entrypoint.py           # Container entrypoint (DB init, migrations)
├── requirements.txt        # Python dependencies
└── Dockerfile              # Docker build configuration
```

---

## Usage

1. Access the application at `http://localhost:8000` (or your configured URL).
2. Log in using one of:
   - **Google SSO** — restricted to configured allowed domains
   - **Azure Active Directory** — configured via `login/aad.config.json`
   - **Username + Password + TOTP** — standard Django auth with 2FA
3. Navigate the dashboard to access monitoring, onboarding, analytics, and management features.

---

## Development

### Create a superuser

```bash
python manage.py createsuperuser
```

### Run tests

```bash
python manage.py test
```

### Create migrations for a specific app

```bash
python manage.py makemigrations <app_name>
python manage.py migrate
```

### Gunicorn tuning (Docker)

The `GUNICORN_WORKERS` environment variable controls the worker count (default: `4`).

```env
GUNICORN_WORKERS=8
```

---

## Security Notes

- **Change `SECRET_KEY`** in `settings.py` or via the `SECRET_KEY` environment variable before deploying to production.
- Set `DEBUG = False` in production.
- Configure `ALLOWED_HOSTS` and `LE_CSRF_TRUSTED_ORIGINS` for your domain.
- Never commit `.env` files or credentials to version control.
- Vault integration handles runtime secret injection — ensure Vault is sealed/unsealed correctly on startup.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request.

---

## License

Specify your license here.

---

## Support

For support, open an issue in the repository or contact the maintainers.
