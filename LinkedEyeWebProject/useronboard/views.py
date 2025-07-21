import json
from django.shortcuts import render,HttpResponse
from django.contrib.auth.models import User, auth, Group
from django.contrib.auth.decorators import login_required
from login.decorators import role_required
import requests
from requests.auth import HTTPBasicAuth
from django.conf import settings
from django.db import connection
from django.forms.models import model_to_dict
import datetime
from django.template import loader
from applications.models import ApplicationModel
from .models import Userapplication, Usersite, PermissionsModel
from bulk_sync import bulk_sync
from django.db.models import Q
from urllib.parse import urljoin
from requests.exceptions import ConnectionError
from django.template.loader import render_to_string
from lib.LinkedEyeNotification import Notification
from notification.models import ServiceModel, UserNotificationSetingsModel
from auditlogs.models import AuditlogsModel

@login_required(login_url="/")
@role_required(allowed_roles = ["Admin"])
def useronboard(request):
    template = loader.get_template('useronboard.html')
    context = {
        'roles': Group.objects.all(),
        'data': User.objects.all()
    }
    return HttpResponse(template.render(context, request))  

def useroperations(request):
    response = { }
    if request.method == "POST":
        try:
            clientData = json.loads(request.POST['alldata'])
            parsed_json = clientData['data']
            baseurl = 'http://'+settings.REDMINE_HOST
            if parsed_json["operation"] == 'register':
                firstname=parsed_json['firstname']
                lastname='-'
                email=parsed_json['email']
                password=parsed_json['password']
                if User.objects.filter(email=email).exists():
                    response['msg'] = 'Email already exist.'
                    response['status'] = 500
                else:
                    rolesresponse = (requests.get(urljoin(baseurl,'/roles.json'))).json()
                    roles = rolesresponse['roles']
                    for role in roles:
                        if role['name'] == 'Developer':
                            roleid = role['id'] #4
                    projectResponse = (requests.get(urljoin(baseurl,'/projects.json?name='+settings.REDMINE_AUTOMATION_PROJECT), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))).json()
                    projectId = projectResponse['projects'][0]['id'] #1
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
                        if membershipResponse.status_code == 201:
                            group = Group.objects.get(name = parsed_json['role']).id
                            user = User.objects.create_user(id=user['id'],username=email,password=password,email=email,first_name=firstname,last_name=lastname,is_active=True)
                            user.save()
                            user.groups.add(group)
                            user_id = User.objects.get(username=email).id
                            if parsed_json['isStoreApplication'] == True:
                                for obj in parsed_json['applications']:
                                    obj = Userapplication(user_id = user_id,  application_id = obj['id'], weightage = obj['weightage'])
                                    obj.save()
                            response['status'] = 200
                            response['msg'] = 'User added sucessfully'
                            response['rowid'] = user_id
                        else:
                            response['status'] = 500    
                            response['msg'] = 'Membership was not created'
                    else:
                        if userResponse['errors'][0] == "Email has already been taken":
                            cursor = connection.cursor()
                            cursor.execute("select users.id from redmine.users where (users.login='%s')" %(email))
                            user_id = cursor.fetchone()
                            group = Group.objects.get(name = parsed_json['role']).id
                            user = User.objects.create_user(id = user_id[0], username=email,password=password,email=email,first_name=firstname,last_name=lastname,is_active=True)
                            user.save()
                            user_id = User.objects.get(username=email).id
                            if parsed_json['isStoreApplication'] == True:
                                for obj in parsed_json['applications']:
                                    obj = Userapplication(user_id = user_id,  application_id = obj['id'], weightage = obj['weightage'])
                                    obj.save()
                            user.groups.add(group)
                            response['status'] = 200
                            response['msg'] = 'User added sucessfully'
                            response['rowid'] = user_id
                        else:
                            response['status'] = 500
                            response['msg'] = 'Not able to create user'
                    if response['status'] == 200:
                        result = send_Welcome_Message(parsed_json)
                        print('--result--updareResponse---')
                        print(result)
                        if result['data']:
                            response['msg1'] = 'Notification send to user email'
                        else:
                            response['msg1'] = 'For user Not able to send notification.'
                        for obj in parsed_json['sites']:
                            obj = Usersite(user_id = response['rowid'],  site_id = obj['id'], is_enable = obj['isEnabled'])
                            obj.save()
                        log = AuditlogsModel(username = request.user,  action = 'User onboarding', status = 'Success', message='User '+email+' added sucessfully.')
                        log.save()
            elif parsed_json["operation"] == 'update':
                userobj =  User.objects.get(id=parsed_json["rowid"])
                payload = {
                    "user": {
                            "firstname": parsed_json['firstname'],
                        }
                }
                #print('settings.REDMINE_AUTOMATION_USER--->' + settings.REDMINE_AUTOMATION_USER)
                #print('settings.REDMINE_AUTOMATION_PASS--->' + settings.REDMINE_AUTOMATION_PASS)
                userupadteResponse = requests.put(urljoin(baseurl,'/users/'+str(parsed_json["rowid"])+'.json'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS), json=payload)
                if userupadteResponse.status_code == 200 or userupadteResponse.status_code == 204:
                    userobj.first_name  = parsed_json['firstname']
                    userobj.save()
                    oldgroupname = str(userobj.groups.all()[0])
                    if oldgroupname != parsed_json['role']:
                        oldgroupid = Group.objects.get(name = oldgroupname).id
                        userobj.groups.remove(oldgroupid)
                        newgroupid = Group.objects.get(name = parsed_json['role']).id
                        userobj.groups.add(newgroupid)
                    if Userapplication.objects.filter(user_id=userobj.id).exists():
                        objs = Userapplication.objects.get(user_id = userobj.id)
                        objs.delete()
                    if parsed_json['isStoreApplication'] == True:
                        for obj in parsed_json['applications']:
                            obj = Userapplication(user_id = userobj.id ,  application_id = obj['id'], weightage = obj['weightage'])
                            obj.save()
                    if Usersite.objects.filter(user_id=userobj.id).exists():
                        Usersite.objects.filter(user_id = userobj.id).delete()
                    for obj in parsed_json['sites']:
                        obj = Usersite(user_id = userobj.id,  site_id = obj['id'], is_enable = True)
                        obj.save()
                    response['status'] = 200      
                    response['msg'] = 'User updated sucessfully'
                    response['rowid'] = parsed_json["rowid"]
                    log = AuditlogsModel(username = request.user,  action = 'Update User', status = 'Success', message='User '+userobj.email+' updated sucessfully')
                    log.save()
                else:
                    print('--redmine--updareResponse---')
                    print(userupadteResponse.status_code)
                    response['status'] = 500
                    response['msg'] = 'Not able to update user' 
                    log = AuditlogsModel(username = request.user,  action = 'Update User', status = 'Failure', message='Not able to update user '+userobj.email)
                    log.save()
                return HttpResponse(json.dumps(response), content_type="json")
            elif parsed_json["operation"] == 'delete':
                userDeleteResponse = requests.delete(urljoin(baseurl,'/users/'+str(parsed_json["rowid"])+'.json'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))
                deleteobj = User.objects.get(id=parsed_json["rowid"])
                if userDeleteResponse.status_code == 200 or userDeleteResponse.status_code == 204 or userDeleteResponse.status_code == 404:
                    log = AuditlogsModel(username = request.user,  action = 'Delete User', status = 'Success', message='User '+deleteobj.email+' deleted sucessfully')
                    log.save()
                    deleteobj.delete()
                    response['status'] = 200
                    response['msg'] = 'User deleted successfully'
                    response['rowid'] = parsed_json["rowid"]
                else:
                    log = AuditlogsModel(username = request.user,  action = 'Delete User', status = 'Failure', message='Not able to delete user '+deleteobj.email)
                    log.save()
                    response['status'] = 500
                    response['msg'] = 'Not able to delete user'
                return HttpResponse(json.dumps(response), content_type="json")
            elif parsed_json["operation"] == 'changestatus':
                obj = User.objects.get(id=parsed_json["rowid"])
                if int(parsed_json['rowid']) == 1:
                    print('===Admin cannot be Disabled===')
                    response['msg'] = 'Enable'
                    response['status'] = 200
                    log = AuditlogsModel(username = request.user,  action = 'Change User Staus', status = 'Success', message='User '+obj.username +' enable successfully')
                    response['errorMsg'] = 'Admin cannot be disabled'
                    return HttpResponse(json.dumps(response), content_type="json")
                else:
                    if parsed_json["status"] == 'Enable':
                            payload = {
                                "user": {
                                        "status": 3
                                    }
                            }
                            userLockResponse = requests.put(urljoin(baseurl,'/users/'+str(parsed_json["rowid"])+'.json'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS), json=payload)
                            if userLockResponse.status_code == 200 or userLockResponse.status_code == 204:
                                obj.is_active = False
                                obj.save() 
                                response['msg'] = 'Disable'
                                response['status'] = 200
                                log = AuditlogsModel(username = request.user,  action = 'Change User Staus', status = 'Success', message='User '+obj.username +' disable successfully')
                            else:
                                response['msg'] = 'Enable'
                                response['status'] = 500
                                response['errorMsg'] = 'Not able to change status'
                                log = AuditlogsModel(username = request.user,  action = 'Change User Staus', status = 'Failure', message='Not able to disable the user '+obj.username)
                    else:
                            payload = {
                                "user": {
                                        "status": 1
                                    }
                            }
                            userLockResponse = requests.put(urljoin(baseurl,'/users/'+str(parsed_json["rowid"])+'.json'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS), json=payload)
                            if userLockResponse.status_code == 200 or userLockResponse.status_code == 204:
                                obj.is_active = True
                                obj.save() 
                                response['msg'] = 'Enable'
                                log = AuditlogsModel(username = request.user,  action = 'Change User Staus', status = 'Success', message='User '+obj.username +' enable successfully')
                            else:
                                response['msg'] = 'Disable'
                                response['status'] = 500
                                response['errorMsg'] = 'Not able to change status'
                                log = AuditlogsModel(username = request.user,  action = 'Change User Staus', status = 'Failure', message='Not able to enable the user '+obj.username)
                    log.save()
               
        except ConnectionError as e: 
            print('===ConnectionError===useroperations===')
            print(str(e))
            response['status'] = 400
            response['msg'] = 'Linkedeye Ticket system not reachable. Please contact administrator'
            response['errorMsg'] = 'Linkedeye Ticket system not reachable. Please contact administrator'
            obj = AuditlogsModel(username = request.user,  action = parsed_json["operation"]+' User', status = 'Failure', message=str(e))
            obj.save()
        except Exception as e:
                print('===Exception===useroperations===')
                print(str(e))
                obj = AuditlogsModel(username = request.user,  action = parsed_json["operation"]+' User', status = 'Failure', message=str(e))
                obj.save()
                response['status'] = 400
                response['msg'] = 'Something went wrong'
                response['msg1'] = str(e)
                response['errorMsg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response), content_type="json")

def get_tickets(request):
    response = {}
    try:
        userId = request.GET['assigned_to_id']
        cursor = connection.cursor()
        cursor.execute("select issue_statuses.id,issue_statuses.name,count(*) as issuecount from redmine.issues INNER JOIN redmine.issue_statuses on(issues.status_id = issue_statuses.id) where (issues.assigned_to_id=%s) group by issue_statuses.id" %(userId))
        response['ticketStatusList'] = fetchall(cursor)
        cursor.execute("select SUM(issuecount) as Total from (select count(*) as issuecount from redmine.issues INNER JOIN redmine.issue_statuses on(issues.status_id = issue_statuses.id) where (issues.assigned_to_id=%s) group by issue_statuses.id ) as t" %(userId))
        result = cursor.fetchone()
        response['totalTickets'] = str(result[0])
        response['status'] = 200
        return HttpResponse(json.dumps(response), content_type="json")
    except Exception as e:
        print('========Exception======')
        print(str(e))
        response['status'] = 400
        response['error_msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response), content_type="json")
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
def getallPermissions(request):
    response = {}
    try:
        permisions_obj = []
        app_obj = PermissionsModel.objects.all()
        if not app_obj:
            permisions_obj = [{'name':'View All','codename':'VA'},{'name':'View Selected Application', 'codename':'VSA'},{'name':'Edit All','codename':'EA'},{'name':'Edit Selected Application','codename':'ESA'}]
            permissions_models = []
            for jsonObj in permisions_obj:
                modelObj = PermissionsModel()
                modelObj.name = jsonObj["name"]
                modelObj.codename = jsonObj["codename"]
                permissions_models.append(modelObj)
            filters = Q()
            key_fields = ("name",)
            result = bulk_sync(new_models=permissions_models, filters=filters, key_fields=key_fields)
            if result:
                response['status'] = 200
                response['data'] = permisions_obj
            else:
                response['status'] = 500
                response['data'] = []
            return HttpResponse(json.dumps(response))
        else:
            permisions_obj = []
            for temp in app_obj:
                json_obj = {}
                json_obj["name"] = temp.name
                json_obj["codename"] = temp.codename
                permisions_obj.append(json_obj)
            response['status'] = 200
            response['data'] = permisions_obj
            return HttpResponse(json.dumps(response))
    except Exception as e:
        print('========Exception======')
        print(str(e))
        response['status'] = 400
        response['error_msg'] = 'Not able to get Permissions'
        return HttpResponse(json.dumps(response))
def addRoles(request):
    response = { }
    try:
        if request.method == "POST":
            clientData = json.loads(request.POST['alldata'])
            parsed_json = clientData['data']
            if Group.objects.filter(name=parsed_json['rolename']).exists():
                response['status'] = 400
                response['error_msg'] = 'Role name already exist'
            else:
                Group(name=parsed_json['rolename'], weightage=parsed_json['weightage']).save()
                response['status'] = 200
                data = {}
                data['rolename'] = parsed_json['rolename']
                data['weightage'] = parsed_json['weightage'] 
                response['data'] = data
            return HttpResponse(json.dumps(response))
    except Exception as e:
        print('========Exception======')
        print(str(e))
        response['status'] = 400
        response['error_msg'] = 'Not able to add Role'
        return HttpResponse(json.dumps(response))
def get_all_groups(request):
    response = {}
    try:
        temp_list = []
        app_obj = Group.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["name"] = temp.name
            json_obj["weightage"] = temp.weightage
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        print('========Exception======')
        print(str(e))
        response['status'] = 400
        response['error_msg'] = 'Not able to get Roles'
        return HttpResponse(json.dumps(response), content_type="json")
def get_userlist(request):
    response = {}
    try:
        if request.method == 'POST':
            site_id = json.loads(request.POST['siteId'])
            userid_list = Usersite.objects.filter(site_id=site_id).values_list('user_id', flat=True)
            response['data'] = [x for x in userid_list]
        else:
            temp_list = []
            user_list_obj = User.objects.all()
            for user in user_list_obj:
                json_obj = {}
                json_obj["id"] = user.id
                json_obj["firstname"] = user.first_name
                json_obj["last_name"] = user.last_name
                json_obj["email"] = user.email
                json_obj["is_active"] = user.is_active
                print(str(user.groups.all()))
                print(len(user.groups.all()))
                json_obj["role"] = str(user.groups.all()[0]) if len(user.groups.all())==1 else "ViewOnly"
                json_obj["date_joined"] = user.date_joined
                temp_list.append(json_obj)
            response['data'] = temp_list
        response['status'] = 200
        return HttpResponse(json.dumps(response, default=convert_timestamp))
    except Exception as e:
        print('========Exception==get_userlist====')
        print(str(e))
        response['status'] = 400
        response['error_msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))
def convert_timestamp(item_date_object):
    if isinstance(item_date_object, (datetime.date, datetime.datetime)):
        return item_date_object.timestamp()
def send_Welcome_Message(user_obj):
    try:
        service = ServiceModel.objects.get(name = 'mail')
        if service:
            url = service.syntax
            url = url.replace('{email}', user_obj['email'])
            content = {'name': user_obj['firstname'],
                        'url': settings.PORTAL_URL,
                        'username':user_obj['email'],
                        'password':user_obj['password']}
            html_content = render_to_string('welcome-message.html', content)
            notification_obj = Notification()
            notification_obj.add_url(url)
            response = notification_obj.sendnotifications(title="Welcome to Linkedeye", message_format="Html", template_type="onboarding", variables=content)
            return response
    except Exception as e:
        print('========Exception===Welcome_Message===')
        print(str(e))
        return False
def change_password(request):
    response = {}
    try:
        clientData = json.loads(request.POST['clientData'])
        parsed_json = clientData['data']
        user = auth.authenticate(username=parsed_json["username"], password=parsed_json["currentpsw"])
        if user is not None:
            userobj =  User.objects.get(username=parsed_json["username"])
            userobj.set_password(parsed_json['newpsw'])
            userobj.save()
            response['status'] = 200
            response['msg'] = 'Password changed successfully'
            log = AuditlogsModel(username = request.user,  action = 'Change Password', status = 'Success', message='For user '+parsed_json["username"]+'password changed successfully')
        else:
            response['status'] = 500
            response['msg'] = 'Username or Password is wrong'
            log = AuditlogsModel(username = request.user,  action = 'Change Password', status = 'Failure', message='Not able to change password for user '+parsed_json["username"])
    except Exception as e:
        print('========Exception===change_password===')
        print(str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        response['msg1'] = str(e)
        log = AuditlogsModel(username = request.user,  action = 'Change Password', status = 'Failure', message=str(e))
    log.save()
    return HttpResponse(json.dumps(response), content_type="json")