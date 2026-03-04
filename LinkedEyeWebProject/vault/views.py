"""
Vault views.
FIXED: Removed global mutable Obj dict (shared state across requests/threads).
FIXED: Replaced print() with logger.
"""

from django.shortcuts import render, redirect
from lib.LinkedEyeVault import Vault
from django.http import HttpResponse
from json import dumps as jdumps
import json, os
from vault.models import VaultModel
from django.template import loader
from login.decorators import role_required
from django.contrib.auth.decorators import login_required
import logging

logger = logging.getLogger('linkedeye')


def _get_vault():
    """Create a fresh Vault instance per request (no global state)."""
    return Vault()


@login_required(login_url="/")
@role_required(allowed_roles=["Admin"])
def vault(request):
    vault_obj = _get_vault()
    template = loader.get_template('vault.html')
    response = vault_obj.Status()
    status = "Unsealed"
    if response['status'] == 200:
        data = response['data']
        if data['status'] == 200:
            msg = json.loads(data['msg'])
            if msg['sealed'] == True:
                status = "Sealed"
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
            vault_obj = _get_vault()
            for data_obj in parsed_json['data']:
                secretData = {}
                url = '/secret/'+data_obj["service"]+'/'+data_obj["ip"]+'/'+data_obj["username"]
                if data_obj["operation"] == 'add':
                    res = vault_obj.addSecret(data_obj["service"], data_obj["ip"], data_obj["username"], data_obj["password"])
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
                    res = vault_obj.delSecret(data_obj["service"], data_obj["ip"], data_obj["username"])
                    if res['status'] == 200:
                        data = res['data']
                        if data['status'] == 204:
                            deleteobj = VaultModel.objects.get(url=url)
                            response['status'] = data['status']
                            response['rowid'] = deleteobj.id
                            deleteobj.delete()
                elif data_obj["operation"] == 'update':
                    response = { }
                    res = vault_obj.updateSecret(data_obj["service"], data_obj["ip"], data_obj["username"], data_obj["password"])
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
            logger.error("vaultOperation exception: %s", e)
            response = { }
            response['status'] = 400
            response['msg'] = 'Something went wrong'
            return HttpResponse(json.dumps(response), content_type="json")

def getfilenames(request):
    response = {}
    try:
        all_services = ['Gateway']
        HostsList = os.listdir('template/DIRECT')
        all_services = HostsList
        response['status'] = 200
        response['data'] = all_services
        return HttpResponse(json.dumps(response))
    except Exception as e:
        logger.error("getfilenames exception: %s", e)
        response['status'] = 400
        return HttpResponse(json.dumps(response))

def changeStatus(request):
    try:
        response = { }
        vault_obj = _get_vault()
        status = request.GET['status']
        if status == 'Sealed':
            res = vault_obj.Unseal()
            if res['status'] == 200:
                response['status'] = res['data']
            else:
                response['status'] = status
                response['code'] = res['status']
                response['msg'] = 'Not able to Unseal'
        else:
            res = vault_obj.Seal()
            if res['status'] == 200:
                response['status'] = res['data']
            else:
                response['status'] = status
                response['code'] = res['status']
                response['msg'] = 'Not able to Seal'
        return HttpResponse(json.dumps(response), content_type="json")
    except Exception as e:
        logger.error("changeStatus exception: %s", e)
        response['status'] = status
        response['code'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response), content_type="json")

def getallsecrets(request):
    response = {}
    try:
        vault_obj = _get_vault()
        res = vault_obj.Status()
        status = "Unsealed"
        if res['status'] == 200:
            data = res['data']
            if data['status'] == 200:
                msg = json.loads(data['msg'])
                if msg['sealed'] == True:
                    status = "Sealed"
                else:
                    status = "Unsealed"
        temp_list = []
        secret_objs = VaultModel.objects.all()
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
        logger.error("getallsecrets exception: %s", e)
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))
