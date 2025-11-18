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
MIDDLEWARE = [
	'corsheaders.middleware.CorsMiddleware',
    'lesites.middleware.NoCacheMiddleware',
    'lesites.middleware.NoCacheStaticFilesMiddleware',
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
        'NAME': os.getenv('MYSQL_DB_NAME', 'linkedeye'),
        'USER': os.getenv('MYSQL_DB_USER', 'root'),
        'PASSWORD': os.getenv('MYSQL_DB_PASS', 'rootpassword'),
        'HOST': os.getenv('MYSQL_DB_HOST', '172.20.1.10'),
        'PORT': os.getenv('MYSQL_DB_PORT', '31728')
    }
}


ELASTIC_URL= os.getenv('ELASTIC_HOST', '172.20.1.80')+':'+os.getenv('ELASTIC_PORT', '31545')
#print('ELASTIC_URL--->'+ELASTIC_URL)
# settings.py
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': [ELASTIC_URL]  # Change this to your Elasticsearch server's host and port
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
STATIC_URL = '/static/'
MEDIA_URL = '/media/'

  

if DEBUG:
  STATIC_ROOT = posixpath.join(*(BASE_DIR.split(os.path.sep) + ['static']))#newly added 
  #STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
else:
  STATIC_ROOT = os.path.join(BASE_DIR, 'static')

  

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
#login required function

LOGIN_URL='/'

# constants
UAT_SERVER_IP = '172.20.1.10'
REDMINE_HOST = str(os.getenv('REDMINE_HOST', UAT_SERVER_IP))+':'+str(os.getenv('REDMINE_PORT', '31231'))
REDMINE_AUTOMATION_PROJECT = os.getenv('REDMINE_AUTOMATION_PROJECT', 'linkedeye')
REDMINE_AUTOMATION_USER = os.getenv('REDMINE_AUTOMATION_USER', 'automation@linkedeye.in')
REDMINE_AUTOMATION_PASS = os.getenv('REDMINE_AUTOMATION_PASS', 'automation')

POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASS = os.getenv('POSTGRES_PASS')
POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'postgres') 
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '30587') 
POSTGRES_SUPERSET_DB = os.getenv('POSTGRES_SUPERSET_DB', 'superset') 

ANALYTICS_DASHBOARD_USER = 'linkedeyedashboard'
APPRISE_HOST = str(os.getenv('APPRISE_HOST', UAT_SERVER_IP))+':'+str(os.getenv('APPRISE_PORT', '8000'))

NEO4J_HOST = os.getenv('NEO4J_HOST', UAT_SERVER_IP)
NEO4J_PORT = os.getenv('NEO4J_PORT', '31440')
NEO4J_USER = os.getenv('NEO4J_USER', 'neo4j')
NEO4J_PASS = os.getenv('NEO4J_PASS', '12345678')

VAULT_URL = "http://"+str(os.getenv('VAULT_HOST', UAT_SERVER_IP))+':'+str(os.getenv('VAULT_PORT', '32064'))

WEBSOCKET_URL = os.getenv('WEBSOCKET_PREFIX_URL','')+"ws"

ANALYTICS_DASHBOARD_PREFIXURL = os.getenv('ANALYTICS_DASHBOARD_PREFIX_URL', 'https://uatdashboard.finspot.in/')
PORTAL_URL = os.getenv('PORTAL_URL')
LINKEDEYE_EMAIL = os.getenv('LINKEDEYE_EMAIL')
LINKEDEYE_EMAIL_APPKEY = os.getenv('LINKEDEYE_EMAIL_APPKEY')

#AZURE ACTIVE DIRECTORY AUTHENTICATION CONFIGURATION

from ms_identity_web.configuration import AADConfig
from ms_identity_web import IdentityWebPython
AAD_CONFIG = AADConfig.parse_json(file_path='login/aad.config.json')
MS_IDENTITY_WEB = IdentityWebPython(AAD_CONFIG)
ERROR_TEMPLATE = 'auth/{}.html' # for rendering 401 or other errors from msal_middleware
MIDDLEWARE.append('ms_identity_web.django.middleware.MsalMiddleware')
