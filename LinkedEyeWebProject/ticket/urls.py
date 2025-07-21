from django.urls import path
from . import views

#print("ticket----->")
urlpatterns = [
    path('getTicket', views.getTicket),
    path('', views.ticket),
    path('getStatuses', views.getStatuses),
    path('getUsers', views.getUsers),
    path('getactions', views.getactions),
    path('updateticket', views.updateticket),
    path('create_new_issue', views.create_new_issue),
    path('getTicketInfo', views.getTicketInfo),
    path('getAllTickets', views.get_all_site_Tickets),
    path('getChartData', views.getTicketBubbleChartData),
    path('GetStatusCount', views.GetStatusCount),
    path('GetIssues', views.GetIssues),
    path('overviewData', views.overviewData),
    path('sitebasedData', views.sitebasedData),
    path('getdbdata', views.db_to_map),
]

