from django.urls import path
from . import views

app_name = 'incidents'

urlpatterns = [
    path('', views.incidents, name='incidents'),
    path('create/', views.create_incident, name='create_incident'),
    path('<str:incident_id>/', views.incident_detail, name='incident_detail'),
    path('api/incidents', views.get_incidents_api, name='incidents_api'),
]
