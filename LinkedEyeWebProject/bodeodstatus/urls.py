from django.urls import path

from . import views

app_name = "bod-eodstatus"
#print('bod-eodstatus----------->')
urlpatterns = [
    path('', views.bodeodstatus, name='BOD-EOD Status'),
    path('adp', views.adpstatus, name='ADP Status'),
    path('eod', views.eodstatus, name='EOD Status'),
    path('getbodeodkeys', views.getbodeodkeys, name='getbodeodkeys'),
    path('updatekeys', views.updatekeys, name='updatekeys'),
    path('readfile', views.read_file, name='readfile')
]