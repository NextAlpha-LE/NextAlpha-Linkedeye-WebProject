from django.urls import path
from . import views

#print('newonb----->')
urlpatterns = [
    path('', views.index, name='newonb'),
    path('getfilenames', views.getfilenames, name='getfilenames'),
    path('getfilecontentdata', views.getfilecontentdata, name='getfilecontentdata'),
    path('createcfg', views.createcfg, name='createcfg'),
    path('getiplist/', views.getiplist, name='getiplist'),
    path('gethostservicedata/', views.gethostservicedata, name='gethostservicedata'),
    path('getmgmntdata/', views.getmgmntdata, name='getmgmntdata'),
    path('edithostdetails/', views.edithostdetails, name='edithostdetails'),
    path('deletehost', views.deletehost),
    path('mgmtdeletehost', views.mgmtdeletehost),
    path('getserverstype', views.getserverstype, name='getserverstype'),
    path('Serversos', views.Serversos, name='Serversos'),
    path('Serverssoftware', views.Serverssoftware, name='Serverssoftware'),
    path('Switcheslayer', views.Switcheslayer, name='Switcheslayer'),
    path('Switchesmodel', views.Switchesmodel, name='Switchesmodel'),
    path('Serversnic', views.Serversnic, name='Serversnic'),
    path('Firewalltype', views.Firewalltype, name='Firewalltype'),
    path('Firewallmodel', views.Firewallmodel, name='Firewallmodel'),
    path('newonbtable', views.newonbtable, name='newonbtable'),
    path('idracvalidation', views.idracvalidation, name='idracvalidation'),
    path('ilovalidation', views.ilovalidation, name='ilovalidation'),
    path('nodeexpvalidation', views.nodeexpvalidation, name='nodeexpvalidation'),
    path('Saveonboard', views.Saveonboard, name='Saveonboard'),
]