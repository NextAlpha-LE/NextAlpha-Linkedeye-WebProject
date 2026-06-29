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

from LinkedEyeWebProject.env_config import load_env_file, env, env_int, service_url

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load optional `.env` from project root (directory containing manage.py)
load_env_file(BASE_DIR)

from lib.LinkedEyeVault.AppSecrets import get_app_secret


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_app_secret('SECRET_KEY', env_var='SECRET_KEY', default='dev-insecure-change-me')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']
CORS_ORIGIN_ALLOW_ALL = True
X_FRAME_OPTIONS = None

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
    'userprofile',
    'bodeodstatus',
    'hsonboarding',
    'addservice',
    'allonboard',
    'entity',
    'dashboard',
    'sitehealth',
    'incidents',
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

SITE_ID = int(os.getenv('GOOGLE_SITE_ID', 0))
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
ACCOUNT_DEFAULT_HTTP_PROTOCOL = 'http'  # Force allauth to use HTTP locally
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {'access_type': 'online'},
        'APP': {
            'client_id': os.getenv('GOOGLE_CLIENT_ID', 'NONE'),
            'secret': get_app_secret('GOOGLE_SECRET', env_var='GOOGLE_SECRET', default=''),
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
 'allauth.account.middleware.AccountMiddleware',
    

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
        'NAME': env('MYSQL_DB_NAME', 'linkedeye'),
        'USER': env('MYSQL_DB_USER', 'root'),
        'PASSWORD': get_app_secret('MYSQL_DB_PASS', env_var='MYSQL_DB_PASS', default=''),
        'HOST': env('MYSQL_DB_HOST', 'mysql.fs-linkedeye'),
        'PORT': env('MYSQL_DB_PORT', '3306'),
    }
}

ELASTIC_HOST = env('ELASTIC_HOST', 'elasticsearch.fs-linkedeye')
ELASTIC_PORT = env('ELASTIC_PORT', '9200')
ELASTIC_URL = f'{ELASTIC_HOST}:{ELASTIC_PORT}'
#print('ELASTIC_URL--->'+ELASTIC_URL)
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': [ELASTIC_URL],
    }
}


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

# Service endpoints — set via environment or `.env` (see `.env.example`)
POSTGRES_USER = env('POSTGRES_USER', 'linkedeye')
POSTGRES_PASS = get_app_secret('POSTGRES_PASS', env_var='POSTGRES_PASS', default='')
POSTGRES_HOST = env('POSTGRES_HOST', 'postgres.fs-linkedeye')
POSTGRES_PORT = env('POSTGRES_PORT', '5432')
POSTGRES_DB_NAME = env('POSTGRES_DB_NAME', 'linkedeye')
POSTGRES_SUPERSET_DB = env('POSTGRES_SUPERSET_DB', 'superset')

ANALYTICS_DASHBOARD_USER = env('ANALYTICS_DASHBOARD_USER', 'linkedeyedashboard')
APPRISE_HOST = f"{env('APPRISE_HOST', 'apprise.fs-linkedeye')}:{env('APPRISE_PORT', '8000')}"

NEO4J_HOST = env('NEO4J_HOST', 'neo4j.fs-linkedeye')
NEO4J_PORT = env('NEO4J_PORT', '7687')
NEO4J_USER = env('NEO4J_USER', 'neo4j')
NEO4J_PASS = get_app_secret('NEO4J_PASS', env_var='NEO4J_PASS', default='')

VAULT_SCHEME = env('VAULT_SCHEME', 'http')
VAULT_HOST = env('VAULT_HOST', 'vault.fs-linkedeye')
VAULT_PORT = env('VAULT_PORT', '8200')
VAULT_URL = service_url(VAULT_SCHEME, VAULT_HOST, VAULT_PORT)

WEBSOCKET_URL = env('WEBSOCKET_PREFIX_URL', '') + 'ws'
WEBSOCKET_STATS_IP = env('WEBSOCKET_STATS_IP', '')

ANALYTICS_DASHBOARD_PREFIXURL = env('ANALYTICS_DASHBOARD_PREFIX_URL', '')
PORTAL_URL = env('PORTAL_URL', '')
LINKEDEYE_EMAIL = env('LINKEDEYE_EMAIL', '')
LINKEDEYE_EMAIL_APPKEY = get_app_secret('LINKEDEYE_EMAIL_APPKEY', env_var='LINKEDEYE_EMAIL_APPKEY', default='')
ELASTIC_USER = env('ELASTIC_USER', 'elastic')
ELASTIC_PASS = get_app_secret('ELASTIC_PASS', env_var='ELASTIC_PASS', default='')
TOTP_MASTER_KEY = get_app_secret('TOTP_MASTER_KEY', env_var='TOTP_MASTER_KEY', default='')
ADMIN_DEFAULT_PASSWORD = get_app_secret('ADMIN_DEFAULT_PASSWORD', env_var='ADMIN_DEFAULT_PASSWORD', default='')

#AZURE ACTIVE DIRECTORY AUTHENTICATION CONFIGURATION

from login.aad_loader import load_aad_config
from ms_identity_web import IdentityWebPython

AAD_CONFIG = load_aad_config(BASE_DIR, get_app_secret)
MS_IDENTITY_WEB = IdentityWebPython(AAD_CONFIG)
ERROR_TEMPLATE = 'auth/{}.html' # for rendering 401 or other errors from msal_middleware
MIDDLEWARE.append('ms_identity_web.django.middleware.MsalMiddleware')

REDIS_HOST = env('REDIS_HOST', 'redis.fs-linkedeye')
REDIS_PORT = env('REDIS_PORT', '6379')
REDIS_PASSWORD = get_app_secret('REDIS_PASSWORD', env_var='REDIS_PASSWORD', default='')

_redis_auth = f":{REDIS_PASSWORD}@" if REDIS_PASSWORD else ""
_default_redis_cache_url = f"redis://{_redis_auth}{REDIS_HOST}:{REDIS_PORT}/1"

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env('REDIS_CACHE_URL', _default_redis_cache_url),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "PASSWORD": REDIS_PASSWORD if REDIS_PASSWORD else None,
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

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "default"
SESSION_COOKIE_AGE = 86400  # 24 hours from last activity
SESSION_SAVE_EVERY_REQUEST = True  # Extend session on each request (24 hours from last activity)
SESSION_EXPIRE_AT_BROWSER_CLOSE = True  # Logout when browser is closed
 