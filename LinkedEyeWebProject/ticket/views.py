from django import template
from django.shortcuts import render
from django.db import connection, transaction
from django.template import loader
from django.http import HttpResponse
from datetime import datetime, timedelta, date
from json import dumps as jdumps
import sys, os, json
import ast
import requests
from requests.auth import HTTPBasicAuth
from django.contrib.auth.decorators import login_required
from django.conf import settings
from redminelib import Redmine
from django.forms.models import model_to_dict
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.models import User
from useronboard.models import Usersite
from urllib.parse import urljoin
from lesites.models import SiteModel
import pandas as pd
from ticket.models import TicketOverviewModel,TicketSiteviewModel
from requests.exceptions import ConnectTimeout, ReadTimeout, RequestException, SSLError



@login_required(login_url="/")

def getTicket(request):
    try:
        redmine_url = ' '
        if request.method == 'POST':       #Assign ticket
            clientData = json.loads(request.POST['clientData'])
            site = request.POST["sitename"]
            site_objs = SiteModel.objects.filter(sitename = site)
            for site_obj in site_objs:
                redmine_url = site_obj.redmine_url 
            parsed_json = clientData['data']
            startdate = parsed_json['startdate']
            enddate = parsed_json['enddate']
            isTotalOverview = parsed_json['isTotalOverview']
            user = str(request.user)
            #result = get_superadmin_ticket(parsed_json, redmine_url)
            #print('Result from get_superadmin_ticket -----> ' +str(result))
            
            #if parsed_json['user'] == 'Automation':
            #    user = settings.REDMINE_AUTOMATION_USER
            #elif parsed_json["user"] == 'team':
            #    if parsed_json["userid"] and parsed_json["userid"] != 'admin':
            #        user = parsed_json["userid"]
            #    else:
            #        if str(request.user) == 'admin':
            #            response = get_superadmin_ticket({'startdate': ' '}, redmine_url)
            #            return HttpResponse(jdumps(response), content_type="json")
            #        else:
            #            user = request.user
            #else:
            #    if str(request.user) == 'admin':
            #        response = get_superadmin_ticket(parsed_json, redmine_url)
            #        return HttpResponse(jdumps(response), content_type="json")
            #    else:
            #        user = request.user
        else:
            site = request.GET["sitename"]
            site_objs = SiteModel.objects.filter(sitename = site)
            for site_obj in site_objs:
                redmine_url = site_obj.redmine_url
            user = str(request.user)
            #if user == "admin":
            #    response = get_superadmin_ticket({'startdate': ' '}, redmine_url)
            #    return HttpResponse(json.dumps(response), content_type="json")      
            #else:
            startdate = date.today()
            enddate = startdate + timedelta(days=1)
            isTotalOverview = True
        response = {}
        rm = Redmine(redmine_url, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS)
        url = urljoin(str(redmine_url),'/users.json?name='+str(user))
        userResponse = (requests.get(url, auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
        userId = userResponse['users'][0]['id']
        if isTotalOverview == True:
            created_between = '><'+str(startdate)+'|'+str(enddate)
            issue_list = rm.issue.filter(assigned_to_id=userId,created_on=created_between)
            response['total_overviewList'] = GetStatusCount(site, userId, startdate, enddate)
            #response['total_overviewList'] = get_status_count(issue_list, redmine_url)
        #created_between = '><'+str(startdate)+'|'+str(enddate)
        #issue_list = rm.issue.filter(assigned_to_id=userId, created_on=created_between)
        #result = get_issues(issue_list, redmine_url)
        response['code'] = 200
        response['user'] = str(request.user)
        if str(request.user) == 'admin':
            response['resultsList'] =  GetIssues(site,"", startdate, enddate)
            response['overviewList'] = GetStatusCount(site, userId, startdate, enddate)
            #print("IF RESULTLIST--->" + str(response['resultsList']))
            #print("IF OVERVIEWLIST--->" + str(response['overviewList']))
        else:
            response['resultsList'] =  GetIssues(site,userId, startdate, enddate)
            response['overviewList'] = GetStatusCount(site, userId, startdate, enddate)
            #print("ELSE RESULTLIST--->" + str(response['resultsList']))
            #print("ELSE OVERVIEWLIST--->" + str(response['overviewList']))
        response['selecteduser'] = str(user)
       # response["assigned_to_id"] = int(response['resultsList']['assigned_to'])#added
       # response["assigned_to"] = ('str(issue.assigned_to)', '-')
        #return HttpResponse(jdumps(response), content_type="json")
    except Exception as e:
        #raise Exception("Issue in GetTicket" + str(e))
        print("===Exception====gettickets===")
        response['code'] = 500
        response['msg'] = str(e)
    return HttpResponse(json.dumps(response, default=str), content_type="json")

def db_to_map(request):
    try:
        response = {}
        start_date = date.today()
    #    end_date = start_date-29
        days=int(5)#number of days
        days = timedelta(days=days)
        begin = start_date - days
        view = request.GET.get('view', 'siteview')
        #sites=json.loads(request.GET.get('sites'))
        sitename=request.GET.get('sites')
        #sitename=sites[0]["sitename"]
        if view=='overview':
            db =TicketOverviewModel.objects.filter(date__range=(begin,start_date))
        else:
            db =TicketSiteviewModel.objects.filter(date__range=(begin,start_date),sitename=sitename)

        mapArray=[]
        for record in db:
            mapArray.append(ast.literal_eval(record.data))
        response['code']=200
        response['data']=mapArray
    except Exception as e:
        print("===Exception====gettickets===")
        response['code'] = 500
        response['msg'] = str(e)
    #print('THIS IS RESULT--->' + str(response))
    return HttpResponse(json.dumps(response, default=str), content_type="json")

def getTicketBubbleChartData(request):
    response = {}
    chartArray = [] 
    try:
        empty_list  = []
        #print("REQUEST DATA---->" + str(request))
        view        = request.GET.get('view', 'siteview') #overview , siteview
        periods     = int(request.GET.get('periods' , 30))
        siteinfo    = json.loads(request.GET['sites'])

        days = pd.date_range(end = datetime.today().strftime("%Y/%m/%d"), periods = periods).to_pydatetime().tolist()
        for site in siteinfo:
            try:
                siteurl     = site["redmine_url"] 
                rm = Redmine(siteurl, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS)   
                allstatus = rm.issue_status.all()
                for _day in days: 
                    _d_format = _day
                    r_d_format = str(_day).split(' ')[0]
                   # print("DAY--->" + str(r_d_format))
                    if view == 'siteview':
                        for _all_status in allstatus:
                            tmp_data = empty_list.copy()
                            tmp_data.append('')  #id 
                            tmp_data.append(_d_format) # date string will be converted to Date object later    
                            _report = (requests.get(urljoin(siteurl,'/issues.json?created_on=><'+str(r_d_format)+'|'+str(r_d_format)+'&limit=1&status_id='+str(_all_status['id'])), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
                            _count  = _report['total_count']
                            tmp_data.append(int(_report['total_count']))
                            tmp_data.append(_all_status['name'])
                            tmp_data.append(int(_report['total_count']))
                            chartArray.append(tmp_data.copy())
                    else:
                        tmp_data = empty_list.copy()
                        tmp_data.append('')  #id 
                        tmp_data.append(_d_format) # date string will be converted to Date object later            
                        uri = urljoin(siteurl,"/issues.json?created_on=><"+str(r_d_format)+"|"+str(r_d_format)+"&limit=1")
                        total_report  = (requests.get(uri, auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
                        total_count = total_report['total_count']
                        tmp_data.append(int(total_report['total_count']))
                        tmp_data.append(site['sitename'])
                        tmp_data.append(int(total_report['total_count']))
                        chartArray.append(tmp_data.copy())   
                response["code"] = 200        
                response['chartData'] = chartArray
               # print("CHARTDATA--->" + str(chartArray))
            except Exception as ex:
                raise Exception("SITENAME = {} & EX = {}".format(site['sitename'],ex))
    except Exception as ex:
        response["code"] = 500
        response["message"] = str(ex) #"Chart Load Error .Due to data fetch issue."
    print('THIS IS RESULT--->' + str(response))
    return HttpResponse(json.dumps(response, default=str), content_type="json")


def GetIssues(site, user_id="", startDate="", endDate=""):
    try:
        #site        = request.GET['site']
        #startDate   = request.GET.get('startDate', '')
        #endDate     = request.GET.get('endDate', '')
        site_objs = SiteModel.objects.filter(sitename = site)
        _user_id_str=""
        if user_id:
            _user_id_str="assigned_to_id="+str(user_id)+"&"
        for site_obj in site_objs:
            redmine_url = site_obj.redmine_url 
        rm = Redmine(redmine_url, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS) 
        if startDate and endDate:
            created_between = '><'+str(startDate)+'|'+str(endDate)
            #issues_list = (requests.get(urljoin(redmine_url,'/issues.json?'+str(_user_id_str)+'created_on=><'+str(startDate)+'|'+str(endDate)+'&limit=1000'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
            issues_list = (requests.get(urljoin(redmine_url,'/issues.json?'+str(_user_id_str)+'created_on=><'+str(startDate)+'|'+str(endDate)), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
        else:
            #issues_list = (requests.get(urljoin(redmine_url,'/issues.json?'+str(_user_id_str)+'&limit=1000'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
            issues_list = (requests.get(urljoin(redmine_url,'/issues.json?'+str(_user_id_str)), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
            #issues_list = rm.issue.all()
        #return HttpResponse(json.dumps(issues_list['issues']), content_type="json")
        return issues_list['issues']
    except Exception as ex:
        raise Exception("GetIssues ex {}".format(ex))

def GetStatusCount(site, user_id="", startDate="", endDate=""):
    try:
        #site        = request.GET['site']
        #startDate   = request.GET.get('startDate', '')
        #endDate     = request.GET.get('endDate', '')
        status_count = {}
        site_objs = SiteModel.objects.filter(sitename = site)
        _user_id_str=""
        if user_id:
            _user_id_str="assigned_to_id="+str(user_id)+"&"
        for site_obj in site_objs:
            redmine_url = site_obj.redmine_url 
        __created_on = ""
        if startDate and endDate:
            created_between = '><'+str(startDate)+'|'+str(endDate)
            __created_on = "created_on="+str(created_between)+"&"
        rm = Redmine(redmine_url, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS)   
        allstatus = rm.issue_status.all()
        for _all_status in allstatus:
            url = urljoin(redmine_url,'/issues.json?'+str(_user_id_str)+str(__created_on)+'limit=1&status_id='+str(_all_status['id']))
            _tmp_obj = (requests.get(url, auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
            status_count[_all_status['name']] = _tmp_obj['total_count']
        #return HttpResponse(jdumps(status_count), content_type="json")
        #print('STATUS COUNT--> {}'.format(status_count))
        return jdumps(status_count)
    except Exception as ex:
        raise Exception("GetStatusCount ex {}".format(ex))


def get_all_site_Tickets(request):
   # site = request.GET["sitename"]
  #  site_objs = SiteModel.objects.filter(sitename = site)
  #  user = str(request.user)
  #  redmine_url = ' '
  #  for site_obj in site_objs:
  #     redmine_url = site_obj.redmine_url
  #  rm = Redmine(redmine_url, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS)
  #  url = str(redmine_url)+'/users.json?name='+str(user)
  #  userResponse = (requests.get(url, auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
  #  userId = userResponse['users'][0]['id']
  #  _user_id_str="assigned_to_id="+str(userId)+"&"
    try:
        response = {}
        siteinfo = json.loads(request.GET['site'])
        siteurl  = siteinfo["redmine_url"]
        selected_site = siteinfo.get("sitename", "")
        user_id = GetUserId(siteurl,str(request.user)) 
        #User.objects.get(username=request.user).id
        startdate = date.today()
        enddate = startdate + timedelta(days=1)
        created_between = '><'+str(startdate)+'|'+str(enddate)
        rm = Redmine(siteurl, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS)   
    ####
        allstatus = rm.issue_status.all()
        overviewList = []
        overview = {}
        _only_status = []
        if str(request.user) == 'admin':
            issue_list = rm.issue.all(created_on=created_between)
            for _all_status in allstatus:
                overview.update(_all_status)
                #_tmp_obj = rm.issue.filter(status_id=_all_status['id'])
                _tmp_obj = (requests.get(urljoin(siteurl,'/issues.json?limit=1&status_id='+str(_all_status['id'])), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
                overview['issuecount'] = _tmp_obj['total_count']
                overviewList.append(overview.copy())

        else:
            issue_list = rm.issue.filter(assigned_to_id=user_id, created_on=created_between)
            for _all_status in allstatus:
                overview.update(_all_status)

                url = urljoin(siteurl,'/issues.json?limit=1&status_id='+str(_all_status['id'])+"&assigned_to_id="+str(user_id))
                _tmp_obj = (requests.get(url, auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
                overview['issuecount'] = _tmp_obj['total_count']
                overviewList.append(overview.copy())

    
        response["code"] = 200
        #response["responseData"] = {}
        response['siteData']  = {}
        response['siteData']['overviewList'] = overviewList
        response["selectedSite"] = siteinfo["sitename"]
        #return HttpResponse(json.dumps(response), content_type="json")
    except Exception as e:
        print("===Exception====get_all_site_tickets===")
        print(str(e))
        response['code'] = 500
        response['msg'] = str(e)
        #raise Exception("get_all_site_tickets e {}".format(e))
    return HttpResponse(json.dumps(response, default=str), content_type="json")


#def get_only_issues(issues):#Not needed(verify once)
#    issue_list = []
#    for issue in issues:
#        json_obj = {}
#        json_obj["id"] = issue.id
#        try:
#            json_obj["assigned_to_id"] = int(issue.assigned_to)
#            json_obj["assigned_to"] = str(issue.assigned_to)
#        except Exception as e:
#            json_obj["assigned_to"] = '-'
#        json_obj["description"] = issue.description
#        json_obj["created_on"] = issue.created_on.isoformat()
#        json_obj["status"] = str(issue.status)
#        json_obj["subject"] = issue.subject
#        issue_list.append(json_obj)
#    print('Issue list from get_only_issues' + str(issue_list))
#    return issue_list

#def set_default(obj):#Not needed(verify once)
#    if isinstance(obj, set):
#        return list(obj)
#    raise TypeError
    
#def convert_timestamp(item_date_object):
#    if isinstance(item_date_object, datetime.datetime):
#        return item_date_object.isoformat()

#def get_superadmin_ticket(parsed_json, redmine_url, only_overview = False, current_site = ' '):
    #projectResponse = (requests.get(redmine_url+'/projects.json?name='+settings.REDMINE_AUTOMATION_PROJECT, auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
    #projectId = projectResponse['projects'][0]['id']
#    response = {}
#    try:
#        rm = Redmine(redmine_url, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS)
#        #if parsed_json['startdate'] != ' ':
#        created_between = '><'+str(parsed_json['startdate'])+'|'+str(parsed_json['enddate'])
#        issue_list = rm.issue.filter(created_on=created_between)

#        result = get_issues(issue_list, redmine_url)

#        response['resultsList'] = result['issue_list']
#        response['overviewList'] = result['status_count']
        #else:
        #    issue_list = rm.issue.filter(project_id=projectId)
        #    if only_overview == True:
        #        response['resultsList'] = []
        #        response['overviewList'] = get_status_count(issue_list, redmine_url, current_site)
        #    else:
        #        result = get_issues(issue_list, redmine_url)
        #        response['resultsList'] = result['issue_list']
        #        response['overviewList'] = result['status_count']
#        response['user'] = 'admin'
#        response['selecteduser'] = 'admin'
#        print('Superadmin Respose----> ' + str(response))
#        return response
#    except Exception as e:
#        raise Exception("Issue in GetTicket" + str(e))

#def get_issues(issues, redmine_url):
#    status_count = {'New_count': 0, 'Closed_count' :0, 'Resolved_count':0, 'Rejected_count' :0, 'Progress_count' :0, 'Feedback_count' :0 }
#    response = {}
#    issue_list = []
#    for issue in issues:
#        json_obj = {}
#        json_obj["id"] = issue.id
#        try:
#            json_obj["assigned_to_id"] = int(issue.assigned_to)
#            json_obj["assigned_to"] = str(issue.assigned_to)
#        except Exception as e:
    #        json_obj["assigned_to"] = '-'
        
    #    json_obj["description"] = issue.description
    #    json_obj["created_on"] = issue.created_on.isoformat()
    #    json_obj["status"] = str(issue.status)
    #    json_obj["subject"] = issue.subject
    #    issue_list.append(json_obj)
    #    status = str(issue.status)
    #    if status == 'new':
    #        status_count['new_count'] += 1
    #    elif status == "closed":
    #        status_count['closed_count'] += 1
    #    elif status == "resolved":
    #        status_count['resolved_count'] += 1
    #    elif status == "rejected":
    #        status_count['rejected_count'] += 1
    #    elif status == "progress" or status == "in progress":
    #        status_count['progress_count'] += 1
    #    elif status == "feedback":
    #        status_count['feedback_count'] += 1
    #response['issue_list'] = issue_list
    #resultslist = (requests.get(redmine_url+'/issue_statuses.json', auth=httpbasicauth(settings.redmine_automation_user, settings.redmine_automation_pass))).json()
    #statuslist = resultslist['issue_statuses']
    #if response['issue_list']:
    #    for status in statuslist:
    #        if status['name'] == 'in progress':
    #            temp =  'progress_count'
    #            status['issuecount'] = status_count[temp]
    #        else:
    #            temp = status['name'] + '_count'
    #            try:
    #                status['issuecount'] = status_count[temp]
    #            except exception as e:
    #                print('===exception====statuslist==')
    #                print(str(e))
    #else:
    #    for status in statuslist:
    #        status['issuecount'] = 0
    #response['status_count'] = statuslist
    #print(' get-issue response ---------> ' + str(response))
    #return response

#def convert_timestamp(item_date_object):
#    if isinstance(item_date_object, (datetime.date)):
#        return item_date_object.isoformat()

#def get_status_count(issues, redmine_url, current_site = ' '):
#    resultslist = (requests.get(redmine_url+'/issue_statuses.json', auth=httpbasicauth(settings.redmine_automation_user, settings.redmine_automation_pass))).json()
#    statuslist = resultslist['issue_statuses'] 
#    response = {'new_count': 0, 'closed_count' :0, 'resolved_count':0, 'rejected_count' :0, 'progress_count' :0, 'feedback_count' :0 }
#    for issue in issues:
#        ticket_status = str(issue.status)
#        if ticket_status == 'new':
#            response['new_count'] += 1
#        elif ticket_status == "closed":
#            response['closed_count'] += 1
#        elif ticket_status == "resolved":
#            response['resolved_count'] += 1
#        elif ticket_status == "rejected":
#            response['rejected_count'] += 1
#        elif ticket_status == "progress" or ticket_status == "in progress":
#            response['progress_count'] += 1
#        elif ticket_status == "feedback":
#            response['feedback_count'] += 1
#    for status in statuslist:
#        if status['name'] == 'in progress':
#            temp =  'progress_count'
#            status['issuecount'] = response[temp]
#        else:
#            temp = status['name'] + '_count'
#            try:
#                status['issuecount'] = response[temp]
#            except exception as e:
#                print('===exception===get_status_count===')
#                print(str(e))
#    print('statuslist data----->'+str(statuslist))
#    return statuslist    

def getTicketInfo(request):
    try:
        if request.method == 'POST':
            ticketId = json.loads(request.POST['ticketId'])
            site = request.POST['sitename']
            site_objs = SiteModel.objects.filter(sitename = site)
            response = {} 
            for site_obj in site_objs:
                ticket_info = (requests.get(urljoin(site_obj.redmine_url,'/issues/'+str(ticketId)+'.json?include=attachments,journals'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
                resultsList = ticket_info['issue']
            return HttpResponse(jdumps(resultsList), content_type="json")
    except Exception as e:
        raise Exception("Issue in getTicketInfo" + str(e))

def fetchall(cursor): 
    objs = cursor.fetchall()
    description = cursor.description
    result = []   
    for obj in objs:
        i = 0
        item = {}
        while i < len(description):
            item[description[i][0]] = str(obj[i])
            i = i+1
        result.append(item)
    return result
def ticket(request):
    temp_json = {
                    "websocketurl": settings.WEBSOCKET_URL
                }
    return render(request, 'app/tickets.html', temp_json)

def getStatuses(request):
    try:
        site_objs = SiteModel.objects.filter(sitename = request.GET["sitename"])         
        for site_obj in site_objs:
            resultsList = (requests.get(urljoin(site_obj.redmine_url,'/issue_statuses.json'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()['issue_statuses']
        return HttpResponse(jdumps(resultsList), content_type="json")
    except Exception as e:
        raise Exception("Issue in GetStatuses" + str(e)) 

def GetUserId(redmine_url, email):
    try:
        users = (requests.get(urljoin(redmine_url,'/users.json'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()['users']
        for user in users:
            if user['login'] == email:
                return int(user['id'])
    except Exception as ex:
        raise Exception("Issue in GetUserId" + str(ex)) 

def getUsers(request):
    try:
        site_objs = SiteModel.objects.filter(sitename = request.GET["sitename"])
        response = {}
        for site_obj in site_objs:
            usersresponse = requests.get(urljoin(site_obj.redmine_url,'/users.json'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS)).json()
            response['userList'] = usersresponse['users']
            response['user'] = str(request.user)
        return HttpResponse(jdumps(response), content_type="json")
    except Exception as e:
        raise Exception("Issue in GetUsers" + str(e)) 
def getactions(request):
    try:
        if request.method == 'POST':
            ticketId = json.loads(request.POST['ticketId'])
            site = request.POST["sitename"]
            site_objs = SiteModel.objects.filter(sitename = site)
            resultsList = []
            for site_obj in site_objs:
                response = (requests.get(urljoin(site_obj.redmine_url,'/issues/'+str(ticketId)+'.json?include=journals'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
                issue_data = response['issue']
                resultsList = issue_data['journals']
            return HttpResponse(jdumps(resultsList), content_type="json")
    except Exception as e:
        raise Exception("Issue in Getactions" + str(e)) 
    

def updateticket(request):
    try:
        response = {}
        updateData = json.loads(request.POST['updateData'])
        site = request.POST["sitename"]
        site_objs = SiteModel.objects.filter(sitename = site)
        parsed_json = updateData['data']
        for site_obj in site_objs:
            redmine_url = site_obj.redmine_url
        if str(request.user) == 'admin':
            user_username = settings.REDMINE_AUTOMATION_USER
            user_password = settings.REDMINE_AUTOMATION_PASS
        else:
            user_username = request.user
            user_password = 'p@ssw0rd'
        payload = {
                    "issue": {
                        "notes": parsed_json['comment'],
                        "status_id": parsed_json['status_id'],
                        "assigned_to_id": parsed_json['assigned_to_id']
                    }
                }
        if parsed_json['filename']:
            headers = {
                'content-type': 'application/octet-stream'
            }
            uploadResponse = requests.post(urljoin(redmine_url,'/uploads.json?filename='+parsed_json['filename']),auth=HTTPBasicAuth(user_username, user_password), json=payload, headers=headers)
            if uploadResponse.status_code == 201:
                res = json.loads(uploadResponse.text)
                uploaddata = {}
                uploaddata["token"] = res["upload"]["token"]
                uploaddata["filename"] = parsed_json['filename']
                payload["issue"]["uploads"] = []
                payload["issue"]["uploads"].append(uploaddata)
            else:
                response['uploadecode'] = 500
                response['uploadmsg'] = 'Not able to attach file'
        updateResponse = requests.put(urljoin(redmine_url,'/issues/'+str(parsed_json["ticketId"])+'.json'),auth=HTTPBasicAuth(user_username, user_password), json=payload)
        if updateResponse.status_code == 200 or updateResponse.status_code == 204:
            response['code'] = 200
            response['msg'] = 'Ticket updated sucessfully'
        else:
            if updateResponse.text:
                errorResponse = json.loads(updateResponse.text)
                errorResponse = updateResponse.text
                response['msg'] = ' '.join(json.loads(errorResponse)['errors'])
            else:
                response['msg'] = 'Not able to upadate ticket'
            response['code'] = 500
        return HttpResponse(jdumps(response), content_type="json")
    except Exception as e:
        #raise Exception("Issue in Updateticket" + str(e))
        return HttpResponse(jdumps(response), content_type="json")



def overviewData(request):
    print("overviewData called")
    response = {}
    chartArray = []
    timeout_limit = 1  # Stop the loop immediately after the first timeout
    timeout_sites = {}  # Dictionary to track the number of timeouts per site

    try:
        periods = int(request.GET.get('periods', 7))
        site_obj = SiteModel.objects.all()
        end_date = datetime.today().strftime("%Y-%m-%d")
        start_date = (datetime.today() - pd.Timedelta(days=periods-1)).strftime("%Y-%m-%d")

        for site in site_obj:
            site_timeout_count = timeout_sites.get(site.sitename, 0)
            print(f'site["redmine_url"] in FOR----> {site.redmine_url}')
            # Skip the site if it has already timed out
            if site_timeout_count >= timeout_limit:
                print(f"Skipping site {site.sitename} after {site_timeout_count} timeouts")
                continue

            try:
                print(f'site["redmine_url"] in TRY----> {site.redmine_url}')
                siteurl = site.redmine_url
                rm = Redmine(siteurl, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS)
                allstatus = rm.issue_status.all()

                # Build the URI for a range query
                uri = urljoin(siteurl, f"/issues.json?created_on=><{start_date}|{end_date}&limit=1000")

                try:
                    # Set a timeout of 5 seconds for the request
                    total_report = requests.get(uri, auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS), timeout=5, verify=False)

                    if "20" not in str(total_report.status_code):
                        print(f"Skipping site {site.sitename} due to status code not containing '20': {total_report.status_code}")
                        continue

                    total_report = total_report.json()

                    # Process the returned data
                    for _day in pd.date_range(start=start_date, end=end_date):
                        r_d_format = str(_day).split(' ')[0]
                        count_for_day = sum(1 for issue in total_report['issues'] if issue['created_on'].startswith(r_d_format))

                        tmp_data = ['', r_d_format, count_for_day, site.sitename, count_for_day]
                        chartArray.append(tmp_data)
                        print(f"--Overview data = {str(tmp_data)}")

                except (ConnectTimeout, ReadTimeout, SSLError) as e:
                    # Increment the timeout counter for the site
                    timeout_sites[site.sitename] = site_timeout_count + 1
                    print(f"Timeout or SSL error for site {site.sitename}: {e}")
                    continue  # Skip to the next site

                except RequestException as e:
                    print(f"Skipping site {site.sitename} due to request error: {e}")
                    continue  # Skip to the next site

            except Exception as ex:
                print(f"OVERVIEW SITENAME = {site.sitename} & EX = {ex}")
                continue  # Skip to the next site

        response["code"] = 200
        response['chartData'] = chartArray

    except Exception as ex:
        response["code"] = 500
        print(f"code = {response['code']} & EX = {ex}")

    return HttpResponse(json.dumps(response, default=str), content_type="application/json")

# def overviewData(request):
# #def overviewData():
#     print("overviewData called")
#     response = {}
#     chartArray = [] 
#     try:
#         empty_list  = []
#         #view        = request.GET.get('view', 'siteview') #overview , siteview
#         #periods     = int(1)
#         periods     = int(request.GET.get('periods' , 7))
#         site_obj = SiteModel.objects.all()
#         days = pd.date_range(end = datetime.today().strftime("%Y/%m/%d"), periods = periods).to_pydatetime().tolist()
#         for site in site_obj:
#             try:
#                 print('site["redmine_url"]---->' + str(site.redmine_url))
#                 siteurl     = site.redmine_url
#                 rm = Redmine(siteurl, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS)   
#                 allstatus = rm.issue_status.all()
#                 for _day in days: 
#                     _d_format = _day
#                     r_d_format = str(_day).split(' ')[0]
#                     tmp_data = empty_list.copy()
#                     tmp_data.append('')  #id 
#                     tmp_data.append(r_d_format) # date string will be converted to Date object later            
#                     uri = urljoin(siteurl,"/issues.json?created_on=><"+str(r_d_format)+"|"+str(r_d_format)+"&limit=1")
#                     total_report  = requests.get(uri, auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))
#                     if not total_report.status_code == 200:
#                         continue
#                     total_report = total_report.json()
#                     total_count = total_report['total_count']
#                     tmp_data.append(int(total_report['total_count']))
#                     tmp_data.append(site.sitename)
#                     tmp_data.append(int(total_report['total_count']))
#                     chartArray.append(tmp_data.copy()) 
#                     print("--Overview data = {}".format(str(tmp_data.copy())))
#                     #obj = TicketOverviewModel(date=r_d_format,sitename=site.sitename,data=str(tmp_data.copy()))
#                     #obj.save()
#                 response["code"] = 200        
#                 response['chartData'] = chartArray
#             except Exception as ex:
#                 print("OVERVIEW  SITENAME = {} & EX = {}".format(site.sitename,ex))
#     except Exception as ex:
#         response["code"] = 500
#         #response["message"] = str(ex) #"Chart Load Error .Due to data fetch issue."
#         print("code = {} & EX = {}",response["code"],ex)
#     return HttpResponse(json.dumps(response, default=str), content_type="json")




def sitebasedData(request):
#def sitebasedData():
    print("sitebasedData called")
    response = {}
    chartArray = [] 
    try:
        empty_list  = []
       # view        = request.GET.get('view', 'siteview') #overview , siteview
        #periods     = int(1)
        periods     = int(request.GET.get('periods' , 7))
        days = pd.date_range(end = datetime.today().strftime("%Y/%m/%d"), periods = periods).to_pydatetime().tolist()
        siteinfo= json.loads(request.GET['sites'])
        sitename= siteinfo["sitename"]
        site_objs = SiteModel.objects.filter(sitename = sitename)
        for site in site_objs:
            redmine_url = site.redmine_url
        #site_obj = SiteModel.objects.all()
        
        #for site in site_objs:
            try:
                siteurl     = site.redmine_url 
                rm = Redmine(siteurl, username=settings.REDMINE_AUTOMATION_USER, password=settings.REDMINE_AUTOMATION_PASS)   
                allstatus = rm.issue_status.all()
                for _day in days: 
                    #print('_day--->' + str(_day))
                    _d_format = _day
                    
                    r_d_format = str(_day).split(' ')[0]
                    for _all_status in allstatus:
                        tmp_data = empty_list.copy()
                        tmp_data.append('')  #id 
                        tmp_data.append(r_d_format) # date string will be converted to Date object later    
                        _report = (requests.get(urljoin(siteurl,'/issues.json?created_on=><'+str(r_d_format)+'|'+str(r_d_format)+'&limit=1&status_id='+str(_all_status['id'])), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
                        _count  = _report['total_count']
                        tmp_data.append(int(_report['total_count']))
                        tmp_data.append(_all_status['name'])
                        tmp_data.append(int(_report['total_count']))
                        chartArray.append(tmp_data.copy())
                        #print("--Siteview data = {}".format(str(tmp_data.copy())))
                        # obj = TicketSiteviewModel(date=r_d_format,sitename=site.sitename,data=tmp_data.copy())
                        # obj.save()
                response["code"] = 200        
                response['chartData'] = chartArray
            except Exception as ex:
                print("SITEVIEW  SITENAME = {} & EX = {}".format(site.sitename,ex))
               # raise Exception("SITENAME = {} & EX = {}".format(site['sitename'],ex))
        
    except Exception as ex:
        response["code"] = 500
        #response["message"] = str(ex) #"Chart Load Error .Due to data fetch issue."
        print("code = {} & EX = {}",response["code"],ex)
    return HttpResponse(json.dumps(response, default=str), content_type="json")


def create_new_issue(request):
    try:
        response = {}
        issueData = (json.loads(request.POST['issueData']))['data']
        siteinfo = (request.POST['sitename'])
        site = request.POST["sitename"]
        site_objs = SiteModel.objects.filter(sitename = site)
        for site_obj in site_objs:
            redmine_url = site_obj.redmine_url
        project_id = issueData['project_id']
        subject = issueData['subject']
        description = issueData['description']
        tracker_id = issueData['tracker_id']
        priority_id = issueData['priority_id']

        # Determine user credentials
        if str(request.user) == 'admin':
            user_username = settings.REDMINE_AUTOMATION_USER
            user_password = settings.REDMINE_AUTOMATION_PASS
        else:
            user_username = str(request.user)
            user_password = 'p@ssw0rd'  # Note: This is insecure for a real application.

        # Prepare the payload
        payload = {
            "issue": {
                "project_id": project_id,
                "subject": subject,
                "description": description,
                "tracker_id": tracker_id,
                "priority_id": priority_id,
                "assigned_to_id": issueData.get('assigned_to_id', None),
                "status_id": issueData.get('status_id', None)
            }
        }

        # Send the POST request to create a new issue
        createResponse = requests.post(
            urljoin(redmine_url, '/issues.json'),
            auth=HTTPBasicAuth(user_username, user_password),
            json=payload
        )

        # Handle the response
        if createResponse.status_code == 201:
            response['code'] = 201
            response['msg'] = 'Issue created successfully'
            response['issue_id'] = json.loads(createResponse.text)['issue']['id']
        else:
            response['code'] = createResponse.status_code
            if createResponse.text:
                errorResponse = json.loads(createResponse.text)
                response['msg'] = ' '.join(errorResponse['errors'])
            else:
                response['msg'] = 'Failed to create issue'

        return HttpResponse(json.dumps(response), content_type="application/json")

    except Exception as e:
        print("===Exception====create_new_issue===")
        print(str(e))
        response['code'] = 500
        response['msg'] = str(e)
        return HttpResponse(json.dumps(response), content_type="application/json")