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
        'NAME': os.getenv('DATABASE_NAME', 'linkedeye'),
        'USER': os.getenv('MYSQL_DB_USER', 'root'),
        'PASSWORD': os.getenv('MYSQL_ROOT_PASSWORD', 'rootpassword'),
        'HOST': os.getenv('MYSQL_DB_HOST', '172.16.0.56'),
        'PORT': os.getenv('MYSQL_DB_PORT', '32406'),
        
    },
    'analytics': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('ANALYTICS_DATABASE_NAME', 'analytics'),
        'USER': os.getenv('MYSQL_DB_USER', 'root'),
        'PASSWORD': os.getenv('MYSQL_ROOT_PASSWORD', 'rootpassword'),
        'HOST': os.getenv('MYSQL_DB_HOST', '172.16.0.56'),
        'PORT': os.getenv('MYSQL_DB_PORT', '32406'),
    }
}


ELASTIC_URL= os.getenv('ELASTIC_HOST', '172.16.0.56')+':'+os.getenv('ELASTIC_PORT', '31545')
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

# constants
DEV_SERVER_IP = '172.16.0.56'
REDMINE_HOST = str(os.getenv('REDMINE_HOST', DEV_SERVER_IP))+':'+str(os.getenv('REDMINE_PORT', '31352'))
REDMINE_AUTOMATION_PROJECT = os.getenv('REDMINE_AUTOMATION_PROJECT', 'linkedeye')
REDMINE_AUTOMATION_USER = os.getenv('REDMINE_AUTOMATION_USER', 'mailto:automation@linkedeye.in')
REDMINE_AUTOMATION_PASS = os.getenv('REDMINE_AUTOMATION_PASS', 'automation')

POSTGRES_USER = os.getenv('POSTGRES_USER', 'linkedeye')
POSTGRES_PASS = os.getenv('POSTGRES_PASS', 'linkedeye')
POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'postgres') 
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '30468')
POSTGRES_DB_NAME = os.getenv('POSTGRES_DB', 'linkedeye') 
POSTGRES_SUPERSET_DB = os.getenv('POSTGRES_SUPERSET_DB', 'superset') 

ANALYTICS_DASHBOARD_USER = 'linkedeyedashboard'
APPRISE_HOST = str(os.getenv('APPRISE_HOST', DEV_SERVER_IP))+':'+str(os.getenv('APPRISE_PORT', '8000'))

NEO4J_HOST = os.getenv('NEO4J_HOST', DEV_SERVER_IP)
NEO4J_PORT = os.getenv('NEO4J_PORT', '31105')
NEO4J_USER = os.getenv('NEO4J_USER', 'neo4j')
NEO4J_PASS = os.getenv('NEO4J_PASS', 'Neo@fin2025')

VAULT_URL = "http://"+str(os.getenv('VAULT_HOST', DEV_SERVER_IP))+':'+str(os.getenv('VAULT_PORT', '31382'))

WEBSOCKET_URL = os.getenv('WEBSOCKET_PREFIX_URL','')+"ws"

ANALYTICS_DASHBOARD_PREFIXURL = os.getenv('ANALYTICS_DASHBOARD_PREFIX_URL', 'http://172.16.0.22:30060/')
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