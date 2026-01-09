# linkedeye-new-ui

# LinkedEye Web Project

LinkedEye is a comprehensive network infrastructure monitoring and management platform built with Django. It provides features for site management, onboarding, monitoring, analytics, and more.

## Features

- **Site Management**: Manage and monitor network sites and infrastructure
- **Onboarding**: User and site onboarding workflows
- **Dashboard & Analytics**: Real-time monitoring dashboards and analytics
- **Entity Management**: Manage entities and their relationships using Neo4j graph database
- **Notification System**: Configurable notification preferences and alerts
- **Ticket Management**: Integrated ticketing system with Redmine
- **Authentication**: 
  - Google SSO (Single Sign-On)
  - Azure Active Directory (Azure AD) integration
  - TOTP (Time-based One-Time Password) support
- **Audit Logs**: Comprehensive audit logging for system activities
- **Vault Integration**: Secure secret management
- **Site Health Monitoring**: Monitor site health and status
- **BOD/EOD Status Tracking**: Beginning of Day/End of Day status management
- **Comparison Tools**: Compare and analyze different configurations
- **Auto-discovery**: Automatic discovery of network devices and services

## Technology Stack

- **Backend Framework**: Django 4.1.7
- **Database**: 
  - MySQL (Primary database)
  - Neo4j (Graph database for relationships)
  - PostgreSQL (For analytics/Superset)
  - Elasticsearch (Search and analytics)
- **Cache & Message Queue**: 
  - Redis
  - Celery
- **Authentication**: 
  - Django Allauth (Google SSO)
  - MS Identity Web (Azure AD)
- **Other Technologies**:
  - SNMP (Network monitoring)
  - Redfish (Server management)
  - Jinja2 (Templating)
  - Pandas & NumPy (Data processing)

## Prerequisites

- Python 3.9+
- MySQL Server
- Neo4j
- Redis
- Elasticsearch
- PostgreSQL (optional, for analytics)
- Docker (optional, for containerized deployment)

## Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd LinkedEyeWebProject
```

2. Build and run using Docker:
```bash
docker build -t linkedeye-web .
docker run -p 80:80 linkedeye-web
```

### Manual Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd LinkedEyeWebProject
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables (see Configuration section)

5. Run database migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Collect static files:
```bash
python manage.py collectstatic
```

7. Run the development server:
```bash
python manage.py runserver
```

## Configuration

The application uses environment variables for configuration. Create a `.env` file or set the following environment variables:

### Database Configuration
```bash
MYSQL_DB_NAME=linkedeye
MYSQL_DB_USER=root
MYSQL_DB_PASS=your_password
MYSQL_DB_HOST=localhost
MYSQL_DB_PORT=3306
```

### Neo4j Configuration
```bash
NEO4J_HOST=localhost
NEO4J_PORT=7687
NEO4J_USER=neo4j
NEO4J_PASS=your_password
```

### Elasticsearch Configuration
```bash
ELASTIC_HOST=localhost
ELASTIC_PORT=9200
```

### Redis Configuration
```bash
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Authentication Configuration
```bash
# Google SSO
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_SECRET=your_google_secret
GOOGLE_ALLOW_DOMAINS=["yourdomain.com"]

# Azure AD
# Configure in login/aad.config.json
```

### Vault Configuration
```bash
VAULT_HOST=localhost
VAULT_PORT=8200
```

### Other Services
```bash
REDMINE_HOST=localhost
REDMINE_PORT=32565
REDMINE_AUTOMATION_PROJECT=linkedeye
REDMINE_AUTOMATION_USER=automation@linkedeye.in
REDMINE_AUTOMATION_PASS=your_password

APPRISE_HOST=localhost
APPRISE_PORT=8000

PORTAL_URL=http://localhost:80
LINKEDEYE_EMAIL=your_email@domain.com
LINKEDEYE_EMAIL_APPKEY=your_app_key
```

## Project Structure

```
LinkedEyeWebProject/
├── app/                    # Main application
├── addservice/            # Service management
├── allonboard/            # Onboarding [device] module
├── analytics/             # Analytics [Management console] module
├── auditlogs/             # Audit [logs] logging
├── autodiscover/          # Auto [ip] -discovery
├── bodeodstatus/          # BOD/EOD status
├── comparision/           # Comparison tools
├── dashboard/             # Dashboard views
├── entity/                # Entity [neo4j] management
├── hsonboarding/          # HS onboarding
├── lesites/               # Site management
├── login/                 # Authentication
├── notification/          # Notifications
├── iframegraph/           # devices module
├── sitehealth/            # Site health monitoring
├── ticket/                # Ticket management
├── useronboard/           # User onboarding
├── userprofile/           # User profiles
├── vault/                 # Vault integration
├── lib/                   # Custom libraries
├── template/              # Configuration [device] templates
├── static/                # Static files
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── Dockerfile             # Docker configuration
└── entrypoint.py          # Entry point script
```

## Usage

1. Access the application at `http://localhost:80` (or your configured port)
2. Login using:
   - Google SSO
   - Azure AD
   - Username/Password with TOTP
3. Navigate through the dashboard to access various features

## Development

### Running Tests
```bash
python manage.py test
```

### Creating Migrations
```bash
python manage.py makemigrations <app_name>
python manage.py migrate
```

### Creating Superuser
```bash
python manage.py createsuperuser
```

## Security Notes

- **IMPORTANT**: Change the `SECRET_KEY` in `settings.py` before deploying to production
- Set `DEBUG = False` in production
- Configure proper `ALLOWED_HOSTS` for production
- Use environment variables for sensitive configuration
- Ensure proper database credentials and access controls

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[Specify your license here]

## Support

For support, please contact [your support email or link to issue tracker]

## Acknowledgments

- Django community
- All contributors to the open-source libraries used in this project
