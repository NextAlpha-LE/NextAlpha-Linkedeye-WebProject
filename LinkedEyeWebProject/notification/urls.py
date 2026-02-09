from django.conf.urls.static import static
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.urls import path
from . import views

#print('notifications----------->')
urlpatterns = [
    path('', views.index),
    path('serviceoperation', views.serviceoperation),
    path('sendnotification', views.sendnotification),
    path('getallservices',views.get_all_services),
    path('savesettings', views.save_settings),
    path('save_image/', views.save_image, name='save_image'),
    path('profile_images/<str:username>/', views.profile_image, name='profile_image'),
    path('delete-profile-image/', views.delete_profile_image, name='delete_profile_image'),
    path('sendnotifications', views.sendnotifications),
    path('escalapolicy', views.escalapolicy),
    path('get_escalation_policies', views.get_escalation_policies),
    path('edit_escalation_policy', views.edit_escalation_policy),
    path('delete_escalation_policy', views.delete_escalation_policy),
    path('toggle_email_notification', views.toggle_email_notification),
    path('snooze_email_notification', views.snooze_email_notification)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
