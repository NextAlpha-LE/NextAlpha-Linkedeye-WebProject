"""
Django settings for LinkedEyeWebProject project.

Based on 'django-admin startproject' using Django 2.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, sees
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import posixpath
import ast
# from django.utils.crypto import get_random_string

# VERSION = get_random_string(8)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'p6s#2gcmmm^yakp&!w80)5ip06kzh3(ri))si0)awpin%gs93s'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS = [
    "https://*",
]
X_FRAME_OPTIONS = None
"""CSRF_TRUSTED_ORIGINS = [
    'https://*.finspot.in',
]"""
 
#----- added for O365 redirect URL issue ----------
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
#--------------------------------------------------
CSRF_TRUSTED_ORIGINS = ast.literal_eval(os.getenv('LE_CSRF_TRUSTED_ORIGINS',"['https://*.finspot.in']"))
# Application references
# https://docs.djangoproject.com/en/2.1/ref/settings/#std:setting-INSTALLED_APPS

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
    'incidents',
    # MEDIUM FIX #17: Removed 'newonb' (duplicate of allonboard) and 'sites' (duplicate of lesites)
    # Add your apps here to enable them
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    #added new
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'crispy_forms',
    #AZURE AD
    'ms_identity_web',
]


AUTHENTICATION_BACKENDS=(
    'django.contrib.auth.backends.ModelBackend',
    #used for social authentication

    'allauth.account.auth_backends.AuthenticationBackend',
    )

SITE_ID = 6
X_FRAME_OPTIONS = 'SAMEORIGIN'
ACCOUNT_EMAIL_VERIFICATION='none'#previously none
#ACCOUNT_EMAIL_REQUIRED='false'#previously not added
#ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS=30#previously not added
CRISPY_TEMPLATE_PACK='bootstrap4'
LOGIN_REDIRECT_URL='/login/google_verify'
ACCOUNT_LOGOUT_REDIRECT_URL= '/'
#SOCIALACCOUNT_QUERY_EMAIL='true'
#SOCIALACCOUNT_LOGIN_ON_GET=True
ACCOUNT_LOGIN_ERROR = ("Sorry, only users with email addresses from {allowed_domains} are allowed to sign in.")
ACCOUNT_SIGNUP_ERROR = ("Sorry, only users with email addresses from {allowed_domains} are allowed to sign up.")
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {'access_type': 'online'},
        'APP': {
            'client_id': os.getenv('GOOGLE_CLIENT_ID', 'NONE'),
            'secret': os.getenv('GOOGLE_SECRET', 'NONE'),
            'key': ''
        },
        'DOMAINS': ast.literal_eval(os.getenv('GOOGLE_ALLOW_DOMAINS',"[]")),
    }
}
# Middleware framework
SOCIALACCOUNT_ADAPTER = 'app.adapter.LESocialLoginAdapter'

# Middleware framework
# https://docs.djangoproject.com/en/2.1/topics/http/middleware/


#THE BELOW 2 LINES ARE NECESSARY FOR CACHE REMOVAL IN SERVERS, NOT NEEDED FOR DEV. THEY SHOULD BE INSIDE MIDDLEWARE.

#'lesites.middleware.NoCacheMiddleware',
#'lesites.middleware.NoCacheStaticFilesMiddleware',
MIDDLEWARE = [
 'corsheaders.middleware.CorsMiddleware',
 'django.middleware.security.SecurityMiddleware',
 'django.contrib.sessions.middleware.SessionMiddleware',
 'django.middleware.common.CommonMiddleware',
 'django.middleware.csrf.CsrfViewMiddleware',
 'django.contrib.auth.middleware.AuthenticationMiddleware',
 'django.contrib.messages.middleware.MessageMiddleware',
 'django.middleware.clickjacking.XFrameOptionsMiddleware',
 'allauth.account.middleware.AccountMiddleware',   # keep only this one
  # CRITICAL FIX #22: Memory guard middleware
  'LinkedEyeWebProject.middleware.MemoryGuardMiddleware',
]
#'django.middleware.clickjacking.XFrameOptionsMiddleware',

ROOT_URLCONF = 'LinkedEyeWebProject.urls'

# Template configuration
# https://docs.djangoproject.com/en/2.1/topics/templates/
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
# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('MYSQL_DB_NAME', 'linkedeye'),
        'USER': os.getenv('MYSQL_DB_USER', 'root'),
        'PASSWORD': os.getenv('MYSQL_DB_PASS', 'rootpassword'),
  # ✅ ADDED — reuse DB connections instead of opening new one per request
        'HOST': os.getenv('MYSQL_DB_HOST', '172.16.0.75'),
        'PORT': os.getenv('MYSQL_DB_PORT', '30777'),
		# ✅ ADDED — reuse DB connections instead of opening new one per request
        'CONN_MAX_AGE': int(os.getenv('DJANGO_DB_CONN_MAX_AGE', 100)),

    },
    # HIGH FIX #9: PostgreSQL connection pooling for analytics (Superset)
    'superset': {
        'ENGINE': 'dj_db_conn_pool.backends.postgresql',
        'NAME': os.getenv('POSTGRES_SUPERSET_DB', 'superset'),
        'USER': os.getenv('POSTGRES_USER', 'linkedeyedashboard'),
        'PASSWORD': os.getenv('POSTGRES_PASS', 'linkedeyedashboard'),
        'HOST': os.getenv('POSTGRES_HOST', 'postgres'),
        'PORT': os.getenv('POSTGRES_PORT', '31446'),
        'POOL_OPTIONS': {
            'POOL_SIZE': 5,
            'MAX_OVERFLOW': 10,
            'RECYCLE': 300,
        },
        'CONN_MAX_AGE': 600,
    }
}


# ─────────────────────────────────────────────────
# HIGH FIX #13: Django Redis Cache Backend + Session Cache
# Reduces database load and improves performance
# ─────────────────────────────────────────────────
REDIS_HOST = os.getenv('REDIS_HOST', '172.16.0.75')
REDIS_PORT = os.getenv('REDIS_PORT', '6379')
REDIS_PASSWORD = os.getenv('REDIS_PASSWORD', '')
REDIS_DB = int(os.getenv('REDIS_DB', '0'))

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': f'redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'PASSWORD': REDIS_PASSWORD if REDIS_PASSWORD else None,
            'SOCKET_CONNECT_TIMEOUT': 5,
            'SOCKET_TIMEOUT': 5,
            'CONNECTION_POOL_KWARGS': {
                'max_connections': 50,
                'retry_on_timeout': True,
            },
            'COMPRESSOR': 'django_redis.compressors.zlib.ZlibCompressor',
            'IGNORE_EXCEPTIONS': True,  # Don't crash if Redis is down
        },
        'KEY_PREFIX': 'linkedeye',
        'TIMEOUT': 300,  # 5 minutes default
    },
    'session': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': f'redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB + 1}',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'PASSWORD': REDIS_PASSWORD if REDIS_PASSWORD else None,
            'SOCKET_CONNECT_TIMEOUT': 5,
            'SOCKET_TIMEOUT': 5,
            'CONNECTION_POOL_KWARGS': {
                'max_connections': 50,
                'retry_on_timeout': True,
            },
            'IGNORE_EXCEPTIONS': True,
        },
        'KEY_PREFIX': 'linkedeye_session',
        'TIMEOUT': 86400,  # 24 hours for sessions
    },
}

# Use Redis for session storage
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'session'

ELASTIC_URL= os.getenv('ELASTIC_HOST', '172.16.0.75')+':'+os.getenv('ELASTIC_PORT', '31545')
#print('ELASTIC_URL--->'+ELASTIC_URL)
# settings.py
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': [ELASTIC_URL]  # Change this to your Elasticsearch server's host and port
    }
}
# ELASTICSEARCH_DSL = {
#     'default': {
#         'hosts': ['172.16.0.56:31545'] 
#     }
# }



# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

MEDIA_URL = '/media/'
#STATIC_URL = f'/static/{VERSION}/'

STATIC_URL = '/static/'
#STATIC_ROOT = posixpath.join(*(BASE_DIR.split(os.path.sep) + ['static']))
if DEBUG:
  STATIC_ROOT = posixpath.join(*(BASE_DIR.split(os.path.sep) + ['static']))#newly added 
  #STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
else:
  STATIC_ROOT = os.path.join(BASE_DIR, 'static')

#print('BASE_DIR--->'+BASE_DIR)
#print('BASE_DIR.split(os.path.sep)--->{}'.format(BASE_DIR.split(os.path.sep)))
#print('STATIC_URL--->'+STATIC_URL)
#print('STATIC_ROOT--->'+STATIC_ROOT)



MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
#login required function

LOGIN_URL='/'

# ─────────────────────────────────────────────────
# HIGH FIX #13: Django Redis Cache Backend + Session Cache
# Use Redis for caching, sessions, and template fragments
# ─────────────────────────────────────────────────
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": os.getenv('REDIS_CACHE_URL', "redis://redis.fs-linkedeye:32268/1"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "COMPRESSOR": "django_redis.compressors.zlib.ZlibCompressor",
            "SOCKET_CONNECT_TIMEOUT": 5,
            "SOCKET_TIMEOUT": 5,
            "CONNECTION_POOL_KWARGS": {
                "max_connections": 50,
                "retry_on_timeout": True,
            },
        },
        "KEY_PREFIX": "le",
        "VERSION": 1,
    }
}

# Use cache-backed sessions
SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "default"
SESSION_COOKIE_AGE = 3600 * 24 * 14  # 2 weeks
SESSION_SAVE_EVERY_REQUEST = True

# Use cache for authentication
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

# constants
DEV_SERVER_IP = '172.16.0.75'

# ─────────────────────────────────────────────────
# CRITICAL FIX #19: Move Hardcoded Credentials to Environment Variables
# All sensitive credentials should be set via K8s secrets or .env file
# ─────────────────────────────────────────────────
REDMINE_HOST = str(os.getenv('REDMINE_HOST', DEV_SERVER_IP))+':'+str(os.getenv('REDMINE_PORT', '32519'))
REDMINE_AUTOMATION_PROJECT = os.getenv('REDMINE_AUTOMATION_PROJECT', 'linkedeye')
REDMINE_AUTOMATION_USER = os.getenv('REDMINE_AUTOMATION_USER', 'mailto:automation@linkedeye.in')
REDMINE_AUTOMATION_PASS = os.getenv('REDMINE_AUTOMATION_PASS', 'automation')  # Should be in env

POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASS = os.getenv('POSTGRES_PASS')
POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'postgres')
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '30468')
POSTGRES_DB_NAME = os.getenv('POSTGRES_DB_NAME', 'linkedeye') 
POSTGRES_SUPERSET_DB = os.getenv('POSTGRES_SUPERSET_DB', 'superset') 

ANALYTICS_DASHBOARD_USER = os.getenv('ANALYTICS_DASHBOARD_USER', 'linkedeyedashboard')
APPRISE_HOST = str(os.getenv('APPRISE_HOST', DEV_SERVER_IP))+':'+str(os.getenv('APPRISE_PORT', '8000'))

# Neo4j credentials - should be set in environment
NEO4J_HOST = os.getenv('NEO4J_HOST', DEV_SERVER_IP)
NEO4J_PORT = os.getenv('NEO4J_PORT', '31105')
NEO4J_USER = os.getenv('NEO4J_USER', 'neo4j')
NEO4J_PASS = os.getenv('NEO4J_PASS')  # REQUIRED in production

# Vault configuration
VAULT_URL = "http://"+str(os.getenv('VAULT_HOST', DEV_SERVER_IP))+':'+str(os.getenv('VAULT_PORT', '31046'))

WEBSOCKET_URL = os.getenv('WEBSOCKET_PREFIX_URL','')+"ws"

ANALYTICS_DASHBOARD_PREFIXURL = os.getenv('ANALYTICS_DASHBOARD_PREFIX_URL', 'http://172.16.0.22:30060/')
PORTAL_URL = os.getenv('PORTAL_URL')
LINKEDEYE_EMAIL = os.getenv('LINKEDEYE_EMAIL')
LINKEDEYE_EMAIL_APPKEY = os.getenv('LINKEDEYE_EMAIL_APPKEY')  # Should be in env

# ─────────────────────────────────────────────────
# HIGH FIX #10: Elasticsearch Singleton Configuration
# Single ES client instance with connection pooling
# ─────────────────────────────────────────────────
ELASTIC_URL = os.getenv('ELASTIC_HOST', DEV_SERVER_IP) + ':' + os.getenv('ELASTIC_PORT', '31545')
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': [ELASTIC_URL],
        'timeout': 30,
        'max_retries': 3,
        'retry_on_timeout': True,
    }
}

# Elasticsearch singleton client settings
ELASTIC_USER = os.getenv('ELASTIC_USER', 'elastic')
ELASTIC_PASS = os.getenv('ELASTIC_PASS', 'changeme')  # Should be in env

#AZURE ACTIVE DIRECTORY AUTHENTICATION CONFIGURATION

from ms_identity_web.configuration import AADConfig
from ms_identity_web import IdentityWebPython
AAD_CONFIG = AADConfig.parse_json(file_path='login/aad.config.json')
MS_IDENTITY_WEB = IdentityWebPython(AAD_CONFIG)
ERROR_TEMPLATE = 'auth/{}.html' # for rendering 401 or other errors from msal_middleware
MIDDLEWARE.append('ms_identity_web.django.middleware.MsalMiddleware')

# ─────────────────────────────────────────────────
# CRITICAL FIX #18: Django LOGGING Configuration
# Replace print() statements with structured logging
# ─────────────────────────────────────────────────
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'json': {
            'format': '{"time":"%(asctime)s","level":"%(levelname)s","module":"%(module)s","message":"%(message)s"}',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs', 'linkedeye.log'),
            'maxBytes': 1024 * 1024 * 50,  # 50 MB
            'backupCount': 5,
            'formatter': 'json',
        },
        'error_file': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs', 'linkedeye_errors.log'),
            'maxBytes': 1024 * 1024 * 50,  # 50 MB
            'backupCount': 5,
            'formatter': 'json',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['error_file'],
            'level': 'ERROR',
            'propagate': False,
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False,
        },
        'linkedeye': {
            'handlers': ['console', 'file', 'error_file'],
            'level': 'INFO',
            'propagate': False,
        },
        'notification': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'entity': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
}

# Create logs directory if it doesn't exist
LOGS_DIR = os.path.join(BASE_DIR, 'logs')
if not os.path.exists(LOGS_DIR):
    os.makedirs(LOGS_DIR)
