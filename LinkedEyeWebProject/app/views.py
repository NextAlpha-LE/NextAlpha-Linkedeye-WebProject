"""
Definition of views.
"""

from pickle import TRUE
from django.shortcuts import render, redirect
from datetime import datetime
from django.http import HttpResponse , HttpRequest , JsonResponse
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth.models import User, auth
from django.db import models
from django.contrib.auth.models import Group
import json
from notification.models import ServiceModel, UserNotificationSetingsModel
from useronboard.models import Usersite
from django.db import connection
from random import randint
from notification.models import ServiceModel
from lib.LinkedEyeNotification import Notification
from django.template.loader import render_to_string
from useronboard.models import Userotp
from auditlogs.models import AuditlogsModel
from django.contrib.auth.decorators import login_required
from json import dumps as jdumps
import ast
from lib.LinkedEyeRedis import Redis
from login.decorators import role_required
from urllib.parse import urljoin
from django.conf import settings
from requests.auth import HTTPBasicAuth
import requests
import psycopg2
import os


json_path = "iframeGraphs/"
json_paths = "snmp/"
# IMPORTANT: Change this to your new secure password
ADMIN_DEFAULT_PASSWORD = 'L1nKed3yE@2025'

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    is_google=os.getenv('GOOGLE_ALLOW_DOMAINS')
    return render(
        request,
        'app/login.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
            'is_google' : is_google,
        }
    )

@login_required(login_url='/') #this makes the user to login first to enter other pages 

def getfilecontent(request):
    filename = request.GET["filename"]
    filedata = open(json_path+filename)
    filecontent = filedata.read()
    filedata.close()
    return HttpResponse(filecontent, content_type="string")


def getfilecontents(request):
    filenames = json.loads(request.GET.get("filenames", "{}")) 

    file_contents = []

    for filename in filenames.keys():
        try:
            with open(json_path + filename, 'r') as file:
                file_content = file.read()
                file_contents.append({filename: file_content})
        except Exception as e:
            file_contents.append({filename: str(e)})

    return JsonResponse(file_contents, safe=False)

def getsnmpfilecontent(request):
    filename = request.GET["filename"]
    filedata = open(json_paths+filename)
    filecontent = filedata.read()
    filedata.close()
    return HttpResponse(filecontent, content_type="string")

def siteErr(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/login-error.html',
        {       }
    )

def invalidDomain(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/invalid-domain.html',
        {       }
    )

@login_required(login_url='/')
def dashboard(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/dashboard.html',
        {       }
    )
@login_required(login_url='/')
def analytics(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/analytics.html',
        {       }
    )

"""def getprefixurlData(request):
    userData = {
        'user': settings.ANALYTICS_DASHBOARD_USER,
        "analysticsDashboardurl": settings.ANALYTICS_DASHBOARD_PREFIXURL
        }
    json_data = json.dumps(userData)
    return HttpResponse(json_data)"""
	
@login_required(login_url='/')    
def bodeod(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/bodeod.html',
        {       }
    )

@login_required(login_url='/')
def calendar(request):
     """Renders the about page."""
     assert isinstance(request, HttpRequest)
     return render(
        request,
        'app/calendar.html',
        {       }
     )

@login_required(login_url='/')
def userprofile(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/profile.html',
        {       }
    )

@login_required(login_url='/')
def sites(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/sites.html',
        {       }
    )

@login_required(login_url="/")
@role_required(allowed_roles = ["Admin"])
def leadmin(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    context={'domain_name':os.getenv('DOMAIN_NAME')}
    return render(
        request,
        'app/admin.html',
        context
    )
def india(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/india.html',
        {       }
    )

def switch(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/24-port-switch.html',
        {       }
    )

@login_required(login_url='/')
def tickets(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/tickets.html',
        {       }
    )

@login_required(login_url='/')
def comparision(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/comparision.html',
        {       }
    )

#===================

def create_redmine_user(email,firstname,lastname):
    baseurl = 'http://'+settings.REDMINE_HOST
    rolesresponse = (requests.get(urljoin(baseurl,'/roles.json'))).json()
    roles = rolesresponse['roles']
    for role in roles:
        if role['name'] == 'Developer':
            roleid = role['id']
    projectResponse = (requests.get(urljoin(baseurl,'/projects.json?name='+settings.REDMINE_AUTOMATION_PROJECT), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
    projectId = projectResponse['projects'][0]['id']
    payload = {
        "user": {
            "login": email,
            "firstname": firstname,
            "lastname": lastname,
            "mail": email,
            "password": 'p@ssw0rd' 
        }
    }
    r = requests.post(urljoin(baseurl,'/users.json'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS), json=payload)
    userResponse = json.loads(r.text)
    if r.status_code == 201:
        user = userResponse['user']
        payload = {
            "membership":
            {
                "user_id": user['id'],
                "role_ids": [ roleid ]
            }
        }
        url = urljoin(baseurl,'/projects/'+str(projectId)+'/memberships.json')
        membershipResponse = requests.post(url, auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS), json=payload)
        return HttpResponse(membershipResponse)

#===================
"""ms_identity_web = settings.MS_IDENTITY_WEB

@ms_identity_web.login_required"""

def ms_verify(request):    
    isauthenticated='Authentication status is - ' + str(request.identity_context_data.authenticated)
    print('Redirected to Ms verify function',request.identity_context_data)
    return HttpResponse(isauthenticated)

"""def ms_verify(request):
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/mstest.html',
        {       }
    )"""

#===================
def google_verify(request):
    email=request.user.email
    nextUrl = request.GET.get('next')
    if request.method == 'GET' and  request.user.is_authenticated:
        response = { }

        obj = User.objects.get(email=email)
        #sites = SiteModel.objects.filter(id = obj.id)
        sites = Usersite.objects.filter(user_id = obj.id)
        if len(sites)>0:
            if nextUrl is None:
                response["status"] = 200
                services = ServiceModel.objects.filter()
                if services:
                    service_ids = []
                    for service in services:
                        service_ids.append(service.id)
                        if UserNotificationSetingsModel.objects.filter(service_id = service.id,user_id=obj.id, is_saved = True).exists():
                            response["redirectUrl"] = '/dashboard'
                        else:
                            response["redirectUrl"] = '/profile?next=/dashboard' 
                else:
                    response["redirectUrl"] = '/dashboard'
                    
            else:
                response["status"] = 200
                response["redirectUrl"] = nextUrl          
        else:
            response["status"] = 200
            response["redirectUrl"] = '/siteError'
            print('REDMINE_HOST--->'+settings.REDMINE_HOST)
            r = requests.get(urljoin('http://'+settings.REDMINE_HOST,'/users.json?limit=100000'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))
            userResponse = json.loads(r.text)
            print(userResponse['users'])
            result=True
            for dictionary in userResponse['users']:
                if email in dictionary.values():
                    print(f"{email} exists in the list of dictionaries.")
                    result=False
                    break
                else:
                    print(f"{email} does not exist in the list of dictionaries.")
            #result= any(email in dictionary.values() for dictionary in (userResponse['users'][0]))
            #print('RESULT--->' + result)
            if result:
                response["status"] = create_redmine_user(email,obj.first_name,obj.last_name)
        if response["status"] == 200 or response["status"] == 201:
            request.session['user_permissions'] = get_user_permissions("Google")
            log = AuditlogsModel(username = request.user,  action = 'Google User login', status = 'Success', message='User '+email+' login  successfully.')
        else:
            log = AuditlogsModel(username = request.user,  action = 'Google User login', status = 'Failure', message='User '+email+' not able to login')
        log.save()

    return redirect(response["redirectUrl"])

def verify(request):
    print(request)
    print(request.GET.get('userinfo'))
    nextUrl = request.GET.get('next')
    if request.method == 'POST':
        response = { }
        parsed_json = json.loads(request.POST['alldata'])
        email=parsed_json['username']
        password=parsed_json['password']
        if not User.objects.filter(username=email).exists():
            if email != "admin" and email != "djangoadmin" :
                response['msg'] = "The username does not exist. Try again"
                response["status"] = 500
            else:
                if Group.objects.filter(name='Admin').exists():
                    pass
                else:
                    ob_role = Group(name='Admin', weightage = 21) # 21=010101 ['VSA','VA','ESA','EA','DSA','DA']
                    ob_role.save()
                    ob_role = Group(name='ViewOnly', weightage = 20) # 21=010101 ['VSA','VA','ESA','EA','DSA','DA']
                    ob_role.save()
                    ob_role = Group(name='Google', weightage = 20) # 21=010101 ['VSA','VA','ESA','EA','DSA','DA']
                    ob_role.save()
                    ob_role = Group(name='O365', weightage = 20) # 21=010101 ['VSA','VA','ESA','EA','DSA','DA']
                    ob_role.save()
                if Group.objects.filter(name='DjangoAdmin').exists():
                    pass
                else:
                    ob_role = Group(name='DjangoAdmin', weightage = 20) # 21=010101 ['VSA','VA','ESA','EA','DSA','DA']
                    ob_role.save()
                cursor = connection.cursor()
                if email == "admin":
                    group = Group.objects.get(name = 'Admin').id
                    cursor.execute("select id from redmine.users where (login='admin')")
                    user_id = cursor.fetchone()
                    user = User.objects.create_user(id=user_id[0], username=email,password=ADMIN_DEFAULT_PASSWORD,email=email,first_name=email,last_name=email,is_active=True)
                    user.save()
                    user.groups.add(group)
                    auth.login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                    response["redirectUrl"] = '/dashboard'
                if email == "djangoadmin":
                    DjangoAdmingroup = Group.objects.get(name = 'DjangoAdmin').id
                    superuser = User.objects.create_superuser(username='djangoadmin',password='D|@Ng0L1N3K3D3Y3@UI',email=email,first_name='django',last_name='admin',is_active=True)
                    superuser.save()
                    superuser.groups.add(DjangoAdmingroup)
                    auth.login(request, superuser, backend='django.contrib.auth.backends.ModelBackend')
                    response["redirectUrl"] = '/admin'
                response["status"] = 200     
        else:
            obj = User.objects.get(username=email)
            if obj.is_active == True:
                user = auth.authenticate(username=email,password=password)
                if user is not None:
                    auth.login(request, user)
                    if nextUrl is None:
                        response["status"] = 200
                        services = ServiceModel.objects.filter()
                        if services:
                            service_ids = []
                            for service in services:
                                service_ids.append(service.id)
                                if UserNotificationSetingsModel.objects.filter(service_id = service.id,user_id=obj.id, is_saved = True).exists():
                                    response["redirectUrl"] = '/dashboard'
                                else:
                                    if(email=='djangoadmin'):
                                        response["redirectUrl"] = '/admin'
                                    else:
                                        response["redirectUrl"] = '/profile?next=/dashboard' 
                        else:
                            if(email=='djangoadmin'):
                                response["redirectUrl"] = '/admin'
                            else:
                                response["redirectUrl"] = '/dashboard'
                    
                    else:
                        response["status"] = 200
                        response["redirectUrl"] = nextUrl          
                else:
                    response["status"] = 500
                    response["msg"] = "The username or password you entered is incorrect. Try again"
            else:
                response["status"] = 500
                response["msg"] = "The account has been disabled. Contact the Admin!"
    if request.user.is_authenticated:
        request.session['user_permissions'] = get_user_permissions(request.user.groups.all()[0].name)
    if response["status"] == 200:
        log = AuditlogsModel(username = request.user,  action = 'User login', status = 'Success', message='User '+email+' login  successfully.')
    else:
        log = AuditlogsModel(username = request.user,  action = 'User login', status = 'Failure', message='User '+email+' not able to login')
    log.save()
    print(response)
    return HttpResponse(json.dumps(response), content_type="json")
def logout(request):
    response = { }
    if request.session.has_key('user_permissions'):
        request.session.flush()
    try:
        auth.logout(request)
        response["status"] = 200
        response["redirectUrl"] = '/'
    except Exception as e:
        response['status'] = 400
        response['msg'] = 'Not able to logout'
    return HttpResponse(json.dumps(response), content_type="json")

def get_user_permissions(userGroup):
    userPermissions = []
    weightage = Group.objects.get(name = userGroup).weightage
    binaryValue = decimalToBinary(weightage) 
    permisionOrder = ['VSA','VA','ESA','EA','DSA','DA']
    for bValue, permision in zip(reversed(binaryValue), reversed(permisionOrder)):
        if bValue == '1':
            userPermissions.append(permision)
    
    return userPermissions
def decimalToBinary(number):
    result = ''
    while number != 0:
        remainder = number % 2  # gives the exact remainder
        number = number // 2
        result = str(remainder) + result
    return result
def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)
def generate_otp(request):
    response = { }
    try:
        parsed_json = json.loads(request.POST['allData'])
        if User.objects.filter(username = parsed_json['username']).exists():
            otp = random_with_N_digits(6)
            service = ServiceModel.objects.get(name = 'mail')
            if service:
                url = service.syntax
                firstname = User.objects.get(username = parsed_json['username']).first_name
                url = url.replace('{email}', parsed_json['username'])
                content = {'name': firstname,
                            'otp':otp}
                html_content = render_to_string('app/forgotpassword-otp.html', content)
                notification_obj = Notification()
                #apobj = notification_obj.instantiate()  #Rajkumar command for forget password notification
                #url = url  #Rajkumar command for forget password notification
                ## to_be_removed 
               ## url='mailto://testuserlinkedeye:aczvhgdbkiqafghx@gmail.com/rohinth.kumaresan@finspot.in'
                ##
               # apobj.add_url(url)  #Rajkumar command for forget password notification
               # result = apobj.sendnotifications(title='Linkedeye Forgot Password request OTP', message_body=html_content)  #Rajkumar command for forget password notification
                notification_obj.add_url(url)  #Rajkumar added for forget password notification
                result = notification_obj.sendnotifications(title='Linkedeye Forgot Password request OTP', message_body=html_content)   #Rajkumar added for forget password notification
                if result['data']:
                    user_id = User.objects.get(username = parsed_json['username']).id
                    if not Userotp.objects.filter(user_id = user_id).exists():
                        obj = Userotp(user_id = user_id, otp = otp)
                        obj.save()
                    else:
                        obj = Userotp.objects.get(user_id = user_id)
                        obj.otp = otp
                        obj.save()
                    response['status'] = 200
                    response['msg'] = 'Please enter OTP sent on you registered email id'
                else:
                    response['status'] = 500
                    response['msg'] = 'Not able to sent OTP to your registered email id'
        else:
            response['status'] = 500
            response['msg'] = 'User Name not found' 
    except Exception as e:
        print('========Exception===generate_otp===')
        print(str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
    return HttpResponse(json.dumps(response), content_type="json" )

def verify_OTP(request):
    response = { }
    try:
        parsed_json = json.loads(request.POST['allData'])
        username = parsed_json["username"]
        otp = int(parsed_json["otp"])
        user_id = User.objects.get(username=username).id
        user_obj = Userotp.objects.get(user_id=user_id)
        if int(user_obj.otp) == otp:
            response['status'] = 200
        else:
            response['status'] = 500
            response['msg'] = 'Please enter a valid OTP'
    except Exception as e:
        print('========Exception===verify_OTP===')
        print(str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
    return HttpResponse(json.dumps(response), content_type="json")
def forgot_password(request):
    response = {}
    try:
        parsed_json = json.loads(request.POST['clientData'])
        userobj =  User.objects.get(username=parsed_json["username"])
        userobj.set_password(parsed_json['newpsw'])
        userobj.save()
        response['status'] = 200
        response['msg'] = 'Password changed successfully. Now login with new password'
    except Exception as e:
        print('========Exception===change_password===')
        print(str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
    return HttpResponse(json.dumps(response), content_type="json")

#======== calendar =========#
def get_calendar_data(request):
    response = {}
    responseObj = []
    try:
        redisObj = Redis()
        keys = ['Holiday','Mock']
        for key in keys:
            tempObj = {}
            tempObj["key"] = key
            tempObj["key_data"] = ast.literal_eval(redisObj.get(key))
            responseObj.append(tempObj)
            print(responseObj)
        response["status"] = 200
        response["responseData"] = responseObj
    except Exception as e:
        print('===Exception===get_calendar_data==')
        print(str(e)) 
        response["status"] = 400
        response["msg"] = 'Something went wrong'
    return HttpResponse(jdumps(response), content_type="json")

def getuserinfo(request):
 if request.method == 'POST':
        response = { }
        parsed_json = json.loads(request.POST['alldata'])
        email=parsed_json['username']
        if email == "admin":
                response['msg'] = "Admin menu is not added"
                response["status"] = 204
                return HttpResponse(json.dumps(response), content_type="json")
