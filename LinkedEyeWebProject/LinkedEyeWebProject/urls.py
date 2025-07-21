"""
Definition of urls for LinkedEyeWebProject.
"""

from datetime import datetime
from django.urls import path, include,re_path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from app import forms, views
#from django.confs.urls.defaults import *
from django.conf import settings
from django.views.static import serve

from ms_identity_web.django.msal_views_and_urls import MsalViews

msal_urls = MsalViews(settings.MS_IDENTITY_WEB).url_patterns()
#print('common-url---------------->')
urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='overview'),
    path('useronboard/', include('useronboard.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('comparision/', views.comparision, name='comparision'),
    path('comparision/', include('comparision.urls')),
    path('bod-eodstatus/', include('bodeodstatus.urls')),
    path('lesites/', include('lesites.urls')),
    path('ticket/', include('ticket.urls')),
    path('onboard/', include('onboarding.urls')),
    path('allonboard/', include('allonboard.urls')),
    path('autodiscover/', include('autodiscover.urls')),
    path('notification/', include('notification.urls')),
    path('notificationsettings/', include('notification.urls')),
    path('entity/', include('entity.urls')),
    path('auditlogs/', include('auditlogs.urls')),
    path('vault/', include('vault.urls')),
    path('addservice/', include('addservice.urls')),
    path('applications/', include('applications.urls')),
    
    path('siteError/', views.siteErr, name='siteError'),
    path('invalidDomain/', views.invalidDomain, name='invalidDomain'),
    path('india/', views.india, name='india'),
    path('switch/', views.switch, name='switch'),
    path('calendar/', views.calendar, name='calendar'),
    path('calendar/getCalendarData', views.get_calendar_data, name='getCalendarData'),
    path('profile/', include('userprofile.urls')),
    path('lesites/', views.sites, name='lesites'),
    path('lesites/', include('lesites.urls')),
    path('sitehealth/', include('sitehealth.urls')),
    path('hsonboard/', include('hsonboarding.urls')),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('leadmin/', views.leadmin, name='leadmin'),
    path('admin/', admin.site.urls),
    path('getfilecontent/', views.getfilecontent, name='getfilecontent'),
    path('getfilecontents/', views.getfilecontents, name='getfilecontents'),
    path('getsnmpfilecontent/', views.getsnmpfilecontent, name='getsnmpfilecontent'),
    path('login/',
         LoginView.as_view
         (
             template_name='app/login.html',
             authentication_form=forms.BootstrapAuthenticationForm,
             extra_context=
             {
                 'title': 'Log in',
                 'year' : datetime.now().year,
             }
         ),
         name='login'),
    path('login/verify', views.verify, name='verify'),
    path('login/google_verify', views.google_verify, name='google_verify'),
    path('analytics/', include('analytics.urls')),
    path('login/generateOtp', views.generate_otp, name='generateotp'),
    path('login/verifyOTP', views.verify_OTP, name='verifyOTP'),
    path('login/forgotPassword', views.forgot_password, name='forgotPassword'),
    path('login/getuserinfo', views.getuserinfo, name='getuserinfo'),
    path("accounts/", include("allauth.urls")),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    
    path('auth/redirect', views.ms_verify, name='ms_verify'),
    path(f'{settings.AAD_CONFIG.django.auth_endpoints.prefix}/', include(msal_urls)),
]




