from urllib.parse import urljoin
from django.conf import settings
from requests.auth import HTTPBasicAuth
import requests
import json
from json import dumps as jdumps
from django.http import HttpResponse , HttpRequest
from django.contrib.auth.models import User, auth, Group
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.shortcuts import render, redirect


class LESocialLoginAdapter(DefaultSocialAccountAdapter):

        def create_redmine_user(self,email,firstname,lastname):
            baseurl = 'http://'+settings.REDMINE_HOST
            rolesresponse = (requests.get(urljoin(baseurl,'/roles.json'))).json()
            roles = rolesresponse['roles']
            resp={}
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
                resp['status_code']=membershipResponse
                resp['userid']=user['id']
                return resp
                #return HttpResponse(resp)
                
        def populate_user(self, request, sociallogin, data):
            if data['email'].split('@')[1] == "finspot.in":
                user = super().populate_user(request, sociallogin, data)
                email=user.email
                firstname=data['first_name']
                lastname=data['last_name']
                #create redmine user
                response = { }
                r = requests.get(urljoin('http://'+settings.REDMINE_HOST,'/users.json?limit=100000'), auth=HTTPBasicAuth(settings.REDMINE_AUTOMATION_USER, settings.REDMINE_AUTOMATION_PASS))
                userResponse = json.loads(r.text)
                print(userResponse['users'])
                result=True
                #user_id=0
                for dictionary in userResponse['users']:
                    if email in dictionary.values():
                        print(f"{email} exists in the list of dictionaries.")
                        user_id=dictionary['id']
                        result=False
                        break
                    else:
                        print(f"{email} does not exist in the list of dictionaries.")
                if result:
                    data_resp=self.create_redmine_user(email,firstname,lastname)
                    response["status"] = data_resp['status_code']
                    #user_id=data['userid']
                    user_id=data_resp['userid']

                ######################################

                # Customize user creation here
            
                #user.groups.add(group)
                user.id = user_id
                return user
            else:
                response = {}
                response["status"] = 500
                response["redirectUrl"] = '/invalidDomain'
                #return redirect('/invalidDomain')
                raise Exception("ERROR INVALID USER")
                

        
        def save_user(self, request, sociallogin, form=None):
            user = super().save_user(request, sociallogin, form)
            legroup = Group.objects.get(name = 'Google').id
            if not legroup == None:
                user.save()
                user.groups.add(legroup)
            else:
                raise Exception("ERROR CREATING USER")
            return user

        def is_auto_signup_allowed(self, request, sociallogin):
            return True