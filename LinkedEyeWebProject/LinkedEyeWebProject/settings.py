"""
Django settings for LinkedEyeWebProject project.
Production-hardened configuration.
"""

import os
import posixpath
import json

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY: Secret key from environment variable (required in production)
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'p6s#2gcmmm^yakp&!w80)5ip06kzh3(ri))si0)awpin%gs93s')

#DEBUG = os.getenv('DJANGO_DEBUG', 'False').lower() == 'true'
DEBUG = False
# SECURITY: Restrict allowed hosts via environment variable
ALLOWED_HOSTS = json.loads(os.getenv('DJANGO_ALLOWED_HOSTS', '["*"]'))

# CORS configuration
CORS_ORIGIN_ALLOW_ALL = os.getenv('CORS_ALLOW_ALL', 'False').lower() == 'true'
CORS_ALLOWED_ORIGINS = json.loads(os.getenv('CORS_ALLOWED_ORIGINS', '["https://*.finspot.in"]'))

X_FRAME_OPTIONS = 'SAMEORIGIN'

# SSL / Proxy settings
SECURE_SSL_REDIRECT = os.getenv('SECURE_SSL_REDIRECT', 'True').lower() == 'true'
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Security headers
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SESSION_COOKIE_HTTPONLY = True

try:
    CSRF_TRUSTED_ORIGINS = json.loads(os.getenv('LE_CSRF_TRUSTED_ORIGINS', '["https://*.finspot.in"]'))
except Exception:
    CSRF_TRUSTED_ORIGINS = ["https://*.finspot.in"]

# Application references
INSTALLED_APPS = [
    'app',
    'notification',
    'useronboard',
    'auditlogs',
    'applications',
    'comparision',
    'lesites',
    'analytics',
    'onboarding',
    'autodiscover',
    'vault',
    'login',
    'ticket',
    'userprofile',
    'bodeodstatus',
    'hsonboarding',
    'addservice',
    'allonboard',
    'entity',
    'dashboard',
    'sitehealth',
    'newonb',
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'crispy_forms',
    'ms_identity_web',
]


AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

SITE_ID = int(os.getenv('GOOGLE_SITE_ID', 0))
ACCOUNT_EMAIL_VERIFICATION = 'none'
CRISPY_TEMPLATE_PACK = 'bootstrap4'
LOGIN_REDIRECT_URL = '/login/google_verify'
ACCOUNT_LOGOUT_REDIRECT_URL = '/'
ACCOUNT_LOGIN_ERROR = "Sorry, only users with email addresses from {allowed_domains} are allowed to sign in."
ACCOUNT_SIGNUP_ERROR = "Sorry, only users with email addresses from {allowed_domains} are allowed to sign up."

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {'access_type': 'online'},
        'APP': {
            'client_id': os.getenv('GOOGLE_CLIENT_ID', 'NONE'),
            'secret': os.getenv('GOOGLE_SECRET', 'NONE'),
            'key': ''
        },
        'DOMAINS': json.loads(os.getenv('GOOGLE_ALLOW_DOMAINS', '[]')),
    }
}
SOCIALACCOUNT_ADAPTER = 'app.adapter.LESocialLoginAdapter'

# Middleware
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'LinkedEyeWebProject.middleware.MemoryGuardMiddleware',
]

ROOT_URLCONF = 'LinkedEyeWebProject.urls'

# Template configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'LinkedEyeWebProject.wsgi.application'

# Database with connection pooling
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('MYSQL_DB_NAME', 'linkedeye'),
        'USER': os.getenv('MYSQL_DB_USER', 'root'),
        'PASSWORD': os.getenv('MYSQL_DB_PASS', 'rootpassword'),
        'HOST': os.getenv('MYSQL_DB_HOST', '172.16.0.75'),
        'PORT': os.getenv('MYSQL_DB_PORT', '30777'),
        'CONN_MAX_AGE': 600,  # Keep connections alive for 10 minutes
        'CONN_HEALTH_CHECKS': True,
        'OPTIONS': {
            'connect_timeout': 10,
            'read_timeout': 30,
            'write_timeout': 30,
        },
    }
}

# Elasticsearch
ELASTIC_URL = os.getenv('ELASTIC_HOST', '172.16.0.75') + ':' + os.getenv('ELASTIC_PORT', '31545')
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': [ELASTIC_URL]
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files
MEDIA_URL = '/media/'
STATIC_URL = '/static/'

if DEBUG:
    STATIC_ROOT = posixpath.join(*(BASE_DIR.split(os.path.sep) + ['static']))
else:
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
LOGIN_URL = '/'

# ─── External Service Configuration (all from environment) ────────────────────

DEV_SERVER_IP = os.getenv('DEV_SERVER_IP', '172.16.0.75')
REDMINE_HOST = os.getenv('REDMINE_HOST', DEV_SERVER_IP) + ':' + os.getenv('REDMINE_PORT', '32519')
REDMINE_AUTOMATION_PROJECT = os.getenv('REDMINE_AUTOMATION_PROJECT', 'linkedeye')
REDMINE_AUTOMATION_USER = os.getenv('REDMINE_AUTOMATION_USER', 'mailto:automation@linkedeye.in')
REDMINE_AUTOMATION_PASS = os.getenv('REDMINE_AUTOMATION_PASS', 'automation')

POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASS = os.getenv('POSTGRES_PASS')
POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'postgres')
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '31446')
POSTGRES_SUPERSET_DB = os.getenv('POSTGRES_SUPERSET_DB', 'superset')

ANALYTICS_DASHBOARD_USER = os.getenv('ANALYTICS_DASHBOARD_USER', 'linkedeyedashboard')
APPRISE_HOST = os.getenv('APPRISE_HOST', DEV_SERVER_IP) + ':' + os.getenv('APPRISE_PORT', '8000')

NEO4J_HOST = os.getenv('NEO4J_HOST', DEV_SERVER_IP)
NEO4J_PORT = os.getenv('NEO4J_PORT', '31105')
NEO4J_USER = os.getenv('NEO4J_USER', 'neo4j')
NEO4J_PASS = os.getenv('NEO4J_PASS')

VAULT_URL = "http://" + os.getenv('VAULT_HOST', DEV_SERVER_IP) + ':' + os.getenv('VAULT_PORT', '31046')

WEBSOCKET_URL = os.getenv('WEBSOCKET_PREFIX_URL', '') + "ws"
ANALYTICS_DASHBOARD_PREFIXURL = os.getenv('ANALYTICS_DASHBOARD_PREFIX_URL', 'http://172.16.0.22:30060/')
PORTAL_URL = os.getenv('PORTAL_URL')
LINKEDEYE_EMAIL = os.getenv('LINKEDEYE_EMAIL')
LINKEDEYE_EMAIL_APPKEY = os.getenv('LINKEDEYE_EMAIL_APPKEY')

# Admin default password from environment (never hardcode)
ADMIN_DEFAULT_PASSWORD = os.getenv('LE_ADMIN_DEFAULT_PASSWORD', 'CHANGE_ME_IN_ENV')

# SMTP configuration from environment
SMTP_HOST = os.getenv('LE_SMTP_HOST', 'smtp.office365.com')
SMTP_PORT = int(os.getenv('LE_SMTP_PORT', '587'))
SMTP_USER = os.getenv('LE_SMTP_USER', '')
SMTP_PASS = os.getenv('LE_SMTP_PASS', '')

# Redmine default user password (used when creating new Redmine users)
REDMINE_DEFAULT_USER_PASSWORD = os.getenv('LE_REDMINE_DEFAULT_USER_PASSWORD', 'Ch@ngeM3!')

# Analytics dashboard credentials
ANALYTICS_DASHBOARD_PASS = os.getenv('ANALYTICS_DASHBOARD_PASS', 'linkedeyedashboard')

# ─── Logging Configuration ────────────────────────────────────────────────────

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{asctime} {levelname} {name} {module}:{lineno} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{asctime} {levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'static', 'logs', 'linkedeye.log'),
            'maxBytes': 10 * 1024 * 1024,  # 10MB
            'backupCount': 5,
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'WARNING',
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'WARNING',
            'propagate': False,
        },
        'linkedeye': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'linkedeye.memory': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

# ─── Azure Active Directory Configuration ─────────────────────────────────────

from ms_identity_web.configuration import AADConfig
from ms_identity_web import IdentityWebPython
AAD_CONFIG = AADConfig.parse_json(file_path='login/aad.config.json')
MS_IDENTITY_WEB = IdentityWebPython(AAD_CONFIG)
ERROR_TEMPLATE = 'auth/{}.html'
MIDDLEWARE.append('ms_identity_web.django.middleware.MsalMiddleware')
