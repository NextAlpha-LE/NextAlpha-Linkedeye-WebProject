from django.shortcuts import render, redirect
from lib.LinkedEyeVault import Vault
from django.http import HttpResponse
from json import dumps as jdumps
import json, os
from vault.models import VaultModel
from django.template import loader
from login.decorators import role_required
from django.contrib.auth.decorators import login_required

Obj = {}

@login_required(login_url="/")
@role_required(allowed_roles = ["Admin"])
def vault(request):
    global Obj
    Obj = Vault()
    template = loader.get_template('vault.html')
    response = Obj.Status()
    if response['status'] == 200:
        data = response['data']
        if data['status'] == 200:
            msg = json.loads(data['msg'])
            if msg['sealed'] == True:
                status = "Sealed"
            else:
                status = "Unsealed"
    else:
        status = "Unsealed"
    context = {
        'secrets': VaultModel.objects.all(),
        'status': status,
        'role': request.user.groups.all()[0].name
    }
    return HttpResponse(template.render(context, request))

def vaultOperation(request):
    response = []
    if request.method == 'POST':
        clientData = request.POST['clientData']
        parsed_json = json.loads(clientData)
        try:
            try:
                if Obj == {}:
                    tempObj = Vault()
                else:
                    tempObj = Obj
            except Exception as e:
                print('=======Exception=====')
                print(str(e))
                response = { }
                response['status'] = 400
                response['msg'] = 'Linkedeye Vault system not reachable. Please contact administrator'
                return HttpResponse(json.dumps(response), content_type="json")
            for data_obj in parsed_json['data']:
                secretData = {}
                url = '/secret/'+data_obj["service"]+'/'+data_obj["ip"]+'/'+data_obj["username"]
                if data_obj["operation"] == 'add':
                    res = tempObj.addSecret(data_obj["service"], data_obj["ip"], data_obj["username"], data_obj["password"])
                    if res['status'] == 200:
                        data = res['data']
                        if data['status'] == 204:
                            if not VaultModel.objects.filter(url=url):
                                ob_secret = VaultModel(service=data_obj["service"], server=data_obj["ip"], user=data_obj["username"], url=url)
                                ob_secret.save()
                                obj = VaultModel.objects.get(url=url)
                                secretData['rowid'] = obj.id
                                secretData['url'] = url
                                secretData['status'] = data['status']
                                response.append(secretData)
                elif data_obj["operation"] == 'delete':
                    response = { }
                    res = tempObj.delSecret(data_obj["service"], data_obj["ip"], data_obj["username"])
                    if res['status'] == 200:
                        data = res['data']
                        if data['status'] == 204:
                            deleteobj = VaultModel.objects.get(url=url)
                            response['status'] = data['status']
                            response['rowid'] = deleteobj.id 
                            deleteobj.delete()
                elif data_obj["operation"] == 'update':
                    response = { }
                    res = tempObj.updateSecret(data_obj["service"], data_obj["ip"], data_obj["username"], data_obj["password"])
                    if res['status'] == 200:
                        data = res['data']
                        if data['status'] == 204:
                            obj = VaultModel.objects.get(id=data_obj["rowid"])
                            obj.server = data_obj["ip"]
                            obj.url = url
                            obj.save()
                            response['url'] = url
                            response['rowid'] = data_obj["rowid"]
                            response['status'] = data['status']
            return HttpResponse(json.dumps(response), content_type="json")
        except Exception as e:
            print('=======Exception=====')
            print(str(e))
            response = { }
            response['status'] = 400
            response['msg'] = 'Something went wrong'
            return HttpResponse(json.dumps(response), content_type="json")

def getfilenames(request):
    response = {}
    try:
        all_services = ['Gateway']
        #HostsList = os.listdir('template/DIRECT/HOSTS')
        HostsList = os.listdir('template/DIRECT')
        #ServicesList = [ techSub  for tech in os.listdir('template/DIRECT/SERVICES') for techSub in os.listdir('template/DIRECT/SERVICES/'+tech)]
        #ServicesList = [ techSub  for tech in os.listdir('template/DIRECT/') for techSub in os.listdir('template/DIRECT/'+tech)]
        #all_services = HostsList + ServicesList
        all_services = HostsList
        #print("all_services--->"+str(all_services))
        response['status'] = 200
        response['data'] = all_services
        return HttpResponse(json.dumps(response))
    except Exception as e:
        print('=======Exception=====')
        print(str(e))
        response['status'] = 400
        return HttpResponse(json.dumps(response))

def changeStatus(request):
    try:
        response = { }
        status = request.GET['status']
        if  status == 'Sealed':
            res = Obj.Unseal()
            if res['status'] == 200:
                response['status'] = res['data']
            else:
                response['status'] = status
                response['code'] = res['status']
                response['msg'] = 'Not able to Unseal'
        else:
            res = Obj.Seal()
            if res['status'] == 200:
                response['status'] = res['data']
            else:
                response['status'] = status
                response['code'] = res['status']
                response['msg'] = 'Not able to Seal' 
        return HttpResponse(json.dumps(response), content_type="json")
    except Exception as e:
        print('===changeStatus======Exception==')
        print(str(e))
        response['status'] = status
        response['code'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response), content_type="json")
def getallsecrets(request):
    response = {}
    try:
        global Obj
        try:
            Obj = Vault()
        except Exception as e:
            print('=====Exception====')
            print(str(e))
            response['status'] = 400
            response['msg'] = 'Linkedeye Vault system not reachable. Please contact administrator'
            return HttpResponse(json.dumps(response))
        res = Obj.Status()
        if res['status'] == 200:
            data = res['data']
            if data['status'] == 200:
                msg = json.loads(data['msg'])
                if msg['sealed'] == True:
                    status = "Sealed"
                else:
                    status = "Unsealed"
        else:
            status = "Unsealed"
        temp_list = []
        secret_objs = VaultModel.objects.all()
        print(secret_objs)
        for secret in secret_objs:
            json_obj = {}
            json_obj["id"] = secret.id
            json_obj["username"] = secret.user
            json_obj["service"] = secret.service
            json_obj["ip"] = secret.server
            json_obj["url"] = secret.url
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        response['role'] = request.user.groups.all()[0].name
        response['secretstatus'] = status
        return HttpResponse(json.dumps(response))
    except Exception as e:
        print('=======Exception===getallsecrets=====')
        print(str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))