import sys, os, json, ast
from pynag import Model
from json import *
from django.shortcuts import render,HttpResponse
from jinja2 import Environment, FileSystemLoader,meta
from lib.Jinja.CreateCfg import CreateCFG
from lib.LinkedEyeEntity.Node import Node
from lib.LinkedEyeStruct.LinkedEyeStruct import K8S
from django.shortcuts import render, redirect
from django.template import loader
from autodiscover.models import AutoDiscoveryModel
from .models import newOnbModel
from dashboard.models import SnmpModel
from .models import managementModel
from django.contrib.auth.models import User, auth, Group
from useronboard.models import Usersite
from auditlogs.models import AuditlogsModel
from addservice.models import ServerstypesModel,ServersosModel,ServerssoftwareModel, SwitcheslayersModel,SwitchesmodelModel, FirewalltypeModel, FirewallmodelModel, ServersnicModel
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from login.decorators import role_required
import subprocess
import requests
from requests.auth import HTTPBasicAuth
import os
import os.path
from os import path
from django.conf import settings
from django.db import connection, transaction
from django.forms.models import model_to_dict
import datetime
import time
import yaml
from lib.LinkedEyeValidation import *

template_path = "template/"
cfg_path = "monitor/"

@login_required(login_url="/")
# @role_required(allowed_roles = ["Admin"])
def index(request):
    return render(request, 'app/onb-onboard.html')
def getfilenames(request):
    """try:
        response = {}
        all_filenames = []
        path = request.GET['fileName']
        local_template_path = template_path + str(path)
        tecnologyNames = os.listdir(local_template_path)
        for tech in tecnologyNames:
            techSubNames = os.listdir(local_template_path+"/"+tech)
            for techSub in techSubNames:
                technologyFileNames = os.listdir(local_template_path+"/"+tech+"/"+techSub)
                for filename in technologyFileNames:
                    if get_file_extension(filename) == '.j2':
                        all_filenames.append(tech+"_"+techSub+"_"+filename)
        json_data = all_filenames
        response['status'] = 200
        response['data'] = json_data
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400"""

    try:
        response = {}
        all_filenames = []
        path = request.GET['fileName']
        local_template_path = template_path + str(path)
        tecnologyNames = os.listdir(local_template_path)
        for tech in tecnologyNames:
            technologyFileNames = local_template_path+"/"+tech
            if get_file_extension(tech) == '.j2':
                all_filenames.append(tech)
            #technologyFileNames = os.listdir(local_template_path+"/"+tech)
            #techSubNames = os.listdir(local_template_path+"/"+tech)
            #for techSub in techSubNames:
                #technologyFileNames = os.listdir(local_template_path+"/"+tech+"/"+techSub)
            #for filename in technologyFileNames:
                #if get_file_extension(filename) == '.j2':
                    #all_filenames.append(tech+"_"+filename)
        json_data = all_filenames
        response['status'] = 200
        response['data'] = json_data
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400

def get_file_extension(file_name):
    return os.path.splitext(file_name)[1]

def Saveonboard(request):
    if request.method == 'POST':
        response = {}
        clientData = json.loads(request.POST["clientData"])
        parsed_json = clientData["data"]
        #print("ipaddress-ipaddress----->"+str(parsed_json))
        try:
            if parsed_json["operation"] == 'add':
                ipaddresses = parsed_json["ipaddress"]
                ipaddress = ipaddresses[0]
                #print("ipaddress------>"+str(ipaddress))
                if newOnbModel.objects.filter(ipaddress = ipaddress).exists():
                    response['msg'] = 'ipaddress already exist.'
                    response['status'] = 500
                    log = AuditlogsModel(username = request.user,  action = 'Site Onboarding', status = 'Failure', message= 'Site name ' +ipaddress+ 'already exist.')
                else:
                    #print('Saveonboard---->'+str(parsed_json["json"]))
                    obj = newOnbModel(ipaddress = ipaddress, selecthost=parsed_json["selecthost"], servertype=parsed_json["servertype"], emailid=parsed_json["emailid"], hostname=ipaddress, json=parsed_json["json"], textname=parsed_json["textname"], pathhost=parsed_json["pathhost"], phyipaddr=parsed_json["phyipaddress"])
                    #print("newOnbModel views --->"+ str(obj))
                    obj.save()
                    site_id = newOnbModel.objects.get(ipaddress = ipaddress).id
                    for obj in parsed_json['users']:
                        obj = Usersite(user_id = obj['user_id'],  site_id = site_id, is_enable = obj['isEnabled'])
                        obj.save()
                    response['msg'] = 'Successfully added site'
                    response['status'] = 200
                    response['rowid'] = site_id
                    log = AuditlogsModel(username = request.user,  action = 'Site Onboarding', status = 'Success', message= 'Site '+ipaddress +' onboarded successfully')
            elif parsed_json["operation"] == 'delete':
                deleteobj = newOnbModel.objects.get(id=parsed_json["rowid"])
                log = AuditlogsModel(username = request.user,  action = 'Site Delete', status = 'Success', message= 'Site '+deleteobj.ipaddress +' deleted successfully')
                deleteobj.delete()
                response['status'] = 200
                response['msg'] = 'Successfully deleted site'
                response['rowid'] = parsed_json["rowid"]
            elif parsed_json["operation"] == 'update':
                obj = newOnbModel.objects.get(id = parsed_json["rowid"], ipaddress = parsed_json["ipaddress"])
                obj.selecthost = parsed_json["selecthost"]
                obj.servertype = parsed_json["servertype"]
                obj.emailid = parsed_json["emailid"]
                obj.hostname = ipaddress
                obj.textname = parsed_json["textname"]
                obj.pathhost = parsed_json["pathhost"]
                obj.phyipaddr = parsed_json["phyipaddress"]
                obj.save()
                if Usersite.objects.filter(site_id=parsed_json["rowid"]).exists():
                    Usersite.objects.filter(site_id=parsed_json["rowid"]).delete()
                for obj in parsed_json['users']:
                    obj = Usersite(user_id = obj['user_id'],  site_id = parsed_json["rowid"], is_enable = True)
                    obj.save()
                response['status'] = 200
                response['msg'] = 'Successfully updated site'
                response['rowid'] =  parsed_json["rowid"]
                log = AuditlogsModel(username = request.user,  action = 'Site Update', status = 'Success', message= 'Site '+parsed_json["ipaddress"] +' updated successfully')
            elif parsed_json["operation"] == 'changestatus':
                obj = newOnbModel.objects.get(id=parsed_json["rowid"])
                if parsed_json["status"] == 'Enable':
                    obj.is_enable = False
                    obj.save() 
                    response['msg'] = 'Disable'
                    response['status'] = 200
                    log = AuditlogsModel(username = request.user,  action = 'Change Site Staus', status = 'Success', message= 'Site '+obj.ipaddress +' disabled successfully')
                else:
                    obj.is_enable = True
                    obj.save() 
                    response['msg'] = 'Enable'
                    response['status'] = 200
                    log = AuditlogsModel(username = request.user,  action = 'Change Site Staus', status = 'Success', message= 'Site '+obj.ipaddress +' enabled successfully')
        except Exception as e:
            #print("===Exception==newOnbModel=====")
            #print(str(e))
            response['status'] = 400
            log = AuditlogsModel(username = request.user,  action = 'Change Site Staus', status = 'Failure', message=str(e))
        log.save()
        return HttpResponse(json.dumps(response), content_type="json")

def getserverstype(request):
    response = {}
    #print("inside getserverstype==========>")
    try:
        temp_list = []
        app_obj = ServerstypesModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["types"] = temp.types
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        #print("===Exception====getserverstype===")
        #print("getserverstype Exception --->"+str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))

def Serversos(request):
    response = {}
    #print("inside ServersosModel==========>")
    try:
        temp_list = []
        app_obj = ServersosModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["os"] = temp.os
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        #print("===Exception====ServersosModel===")
        #print("getserverstype Exception --->"+str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))

def Serverssoftware(request):
    response = {}
    #print("inside Serverssoftware==========>")
    try:
        temp_list = []
        app_obj = ServerssoftwareModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["software"] = temp.software
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        #print("===Exception====Serverssoftware===")
        #print("getserverstype Exception --->"+str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))

def Switcheslayer(request):
    response = {}
    #print("inside Switcheslayer==========>")
    try:
        temp_list = []
        app_obj = SwitcheslayersModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["layers"] = temp.layers
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        #print("===Exception====Switcheslayer===")
        #print("getserverstype Exception --->"+str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))

def Switchesmodel(request):
    response = {}
    #print("inside Switchesmodel==========>")
    try:
        temp_list = []
        app_obj = SwitchesmodelModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["model"] = temp.model
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        #print("===Exception====Switchesmodel===")
        #print("getserverstype Exception --->"+str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))

def Serversnic(request):
    response = {}
    #print("inside Switchesmodel==========>")
    try:
        temp_list = []
        app_obj = ServersnicModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["nic"] = temp.nic
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        #print("===Exception====Switchesmodel===")
        #print("getserverstype Exception --->"+str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))

def Firewalltype(request):
    response = {}
    #print("inside Firewalltype==========>")
    try:
        temp_list = []
        app_obj = FirewalltypeModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["types"] = temp.types
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        #print("===Exception====Firewalltype===")
        #print("getserverstype Exception --->"+str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))

def Firewallmodel(request):
    response = {}
    #print("inside Firewalltype==========>")
    try:
        temp_list = []
        app_obj = FirewallmodelModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["model"] = temp.model
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        #print("===Exception====Firewalltype===")
        #print("getserverstype Exception --->"+str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))

"""def gettablenames(request):
    print("newonb gettablenames --->")
    if request.method == 'POST':
        response = {}
        print("newonb views gettablenames --->")
        clientData = json.loads(request.POST['clientData'])
        parsed_json = clientData['data']
        try:
            if parsed_json["operation"] == 'add':
                ipaddress = parsed_json['ipaddress']
                if newOnbModel.objects.filter(ipaddress = ipaddress).exists():
                    response['msg'] = 'Ipaddress already exist.'
                    response['status'] = 500
                    log = AuditlogsModel(username = request.user,  action = 'Site Onboarding', status = 'Failure', message= 'Site name ' +sitename+ 'already exist.')
                else:
                    obj = addservice(servertype_data=parsed_json['servertype'], serveros_data=parsed_json['serveros'], serversoftware_data=parsed_json['serversoftware'], switchlayer_data=parsed_json['switchlayer'], switchmodel_data=parsed_json['switchmodel'], firewalltype_data=parsed_json['firewalltype'], firewallmodel_data=parsed_json['firewallmodel'])
                    print("newonb views --->"+ str(obj))
                    obj.save()
                    ipadd_id = newOnbModel.objects.get(ipaddress = ipaddress).id
                    for obj in parsed_json['users']:
                        obj = Usersite(user_id = obj['user_id'],  ipadd_id = ipadd_id, is_enable = obj['isEnabled'])
                        obj.save()
                    response['msg'] = 'Successfully Onboard'
                    response['status'] = 200
                    response['rowid'] = ipadd_id
            elif parsed_json["operation"] == 'update':
                obj = newOnbModel.objects.get(id = parsed_json["rowid"], sitename = parsed_json["sitename"])
                obj.servertype_data = parsed_json["servertype"]
                obj.serveros_data = parsed_json["serveros"]
                obj.serversoftware_data = parsed_json["serversoftware"]
                obj.switchlayer_data = parsed_json["switchlayer"]
                obj.switchmodel_data = parsed_json["switchmodel"]
                obj.firewalltype_data = parsed_json["firewalltype"]
                obj.firewallmodel_data = parsed_json["firewallmodel"]
                obj.save()
                 if Usersite.objects.filter(site_id=parsed_json["rowid"]).exists():
                       Usersite.objects.filter(site_id=parsed_json["rowid"]).delete()
                    for obj in parsed_json['users']:
                        obj = Usersite(user_id = obj['user_id'],  site_id = parsed_json["rowid"], is_enable = True)
                        obj.save()
                    response['status'] = 200
                    response['msg'] = 'Successfully updated site'
                    response['rowid'] =  parsed_json["rowid"]
                    log = AuditlogsModel(username = request.user,  action = 'Site Update', status = 'Success', message= 'Site '+parsed_json["sitename"] +' updated successfully')
            elif parsed_json["operation"] == 'changestatus':
                obj = SiteModel.objects.get(id=parsed_json["rowid"])
                if parsed_json["status"] == 'Enable':
                    obj.is_enable = False
                    obj.save() 
                    response['msg'] = 'Disable'
                    response['status'] = 200
                    log = AuditlogsModel(username = request.user,  action = 'Change Site Staus', status = 'Success', message= 'Site '+obj.sitename +' disabled successfully')
                else:
                    obj.is_enable = True
                    obj.save() 
                    response['msg'] = 'Enable'
                    response['status'] = 200
                    log = AuditlogsModel(username = request.user,  action = 'Change Site Staus', status = 'Success', message= 'Site '+obj.sitename +' enabled successfully')
        except Exception as e:
            print("===Exception==siteactions=====")
            print(str(e))
            response['status'] = 400
        response['data'] = "Failure in creating CFG!! "
        return HttpResponse(json.dumps(response))"""


def getiplist(request):
    response = {}
    try:
        temp_list = []
        ip_list_obj = AutoDiscoveryModel.objects.all()
        for p in ip_list_obj:
            json_obj = {}
            json_obj["ip"] = p.ipaddress
            json_obj["os"] = p.ostype
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400
        return HttpResponse(json.dumps(response))


def getfilecontentdata(request):
    response = {}
    try:
        file_name = request.POST['filename']
        file_path = file_name.replace("_", "/")
        fine_name_array = file_name.split("_")
        jfile_name = fine_name_array[len(fine_name_array) - 1]
        path = os.path.dirname(os.path.abspath(template_path+file_path+""))
        template_env = Environment(autoescape=False,loader=FileSystemLoader(os.path.join(path)),trim_blocks=False)
        template_source = template_env.loader.get_source(template_env, jfile_name) #replace template_filename with your template file relative to current file
        parsed_content = template_env.parse(template_source)
        variables= meta.find_undeclared_variables(parsed_content)
        content = []
        for data in variables:
            content.append(data)
        sorted_content = sorted(content)
        str_data = json.dumps(sorted_content)
        parsed_json = json.loads(str_data)
        response['status'] = 200
        response['data'] = parsed_json
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400

def deletehost(request):
    response = {}
    try:
        ipaddress = request.POST["ipaddress"]
        hostname = request.POST["hostname"]
        newOnbModel.objects.filter(ipaddress=ipaddress).delete()
        SnmpModel.objects.filter(ipaddress=ipaddress).delete()
        cursor = connection.cursor()
        addiloList = iloFileCreate(cursor)
        addidracList = idracFileCreate(cursor)
        addnexpoList = nexpoFileCreate(cursor)
        Model.cfg_file = template_path+"../nagios/nagios.cfg" # commit server uncomment this line(all place)
        #Model.cfg_file = "c:/nagios/nagios.cfg" # commit server comment this line(all place)
        cfgHost = Model.Host.objects.filter(address=ipaddress)
        for service in Model.Service.objects.filter(_NEO4j_address=ipaddress):
            if (path.exists("monitor/"+os.path.basename(service["meta"]["filename"])) == True):
                os.remove("monitor/"+os.path.basename(service["meta"]["filename"]))
        for temphostObj in cfgHost:
            if (path.exists("monitor/"+os.path.basename(temphostObj["meta"]["filename"])) == True):
                os.remove("monitor/"+os.path.basename(temphostObj["meta"]["filename"]))
       
        client = Node()
        # FIXED: Sanitize to prevent Cypher injection
        safe_ip = str(ipaddress).replace("'", "\\'").replace('"', '\\"')
        client.execute("MATCH (a {  hostIp:'" + safe_ip + "' } ) DETACH DELETE a")
        #subprocess.run(['sh', '../script/restartdocker.sh', ''], shell=False, timeout=1800) 
        response['status'] = 200 
        response['data'] = "Host deleted successfully"
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400 
        response['data'] = "Not able to delete host"
        return HttpResponse(json.dumps(response))

def createcfg(request):
    response = {}
    try:
        data = json.loads(request.POST.get('data'))
        hostData = data["host"]
        serviceData = data["service"]
        mgmntData = data["mgmnt"]
        nodemgmtData = data["nodemgmt"]
        #print("nodemgmtData---->"+str(nodemgmtData))
        ipList = data["iplist"]
        #print("ipList---->"+str(ipList))
        selecthost = data["selecthost"]
        servertype = data["servertype"]
        emailid = data["emailid"]
        textname = data["textname"]
        pathhost = data["pathhost"]
        phyipaddr = data["phyipaddress"]

        ipKey = "COMMON_IPADDRESS"
        #monitoringPath = hostData["PATH_TEMPLATE"]
        monitoringPath = 'DIRECT/' # change in future in case gateway logic added
        isEdit = data["isedit"]
        failureList = []
        modelList = []
        index = 0
        #print(type(ipList))
        #for ip in ipList:
        ip = ipList
        #print("ip---->"+str(ip))
        tempHostName = ip
        if(isEdit == True):
            newOnbModel.objects.filter(ipaddress=ip).delete()
            Model.cfg_file = template_path+"../nagios/nagios.cfg"
            #Model.cfg_file = "c:/nagios/nagios.cfg"
            cfgHost = Model.Host.objects.filter(address=ip)
            for temphostObj in cfgHost:
                if (path.exists("monitor/"+os.path.basename(temphostObj["meta"]["filename"])) == True):
                    os.remove("monitor/"+os.path.basename(temphostObj["meta"]["filename"]))
            for service in Model.Service.objects.filter(_NEO4j_address=ip):
                if (path.exists("monitor/"+os.path.basename(service["meta"]["filename"])) == True):
                    os.remove("monitor/"+os.path.basename(service["meta"]["filename"]))
            
        index = index + 1
        tempStr = "\'"+ipKey+"\':\'"+ip+"\'"
        for key, val in hostData.items():
            tempStr = tempStr+','
            if key == "COMMON_HOSTNAME":
                tempStr = tempStr+"\'"+key+"\':\'"+tempHostName+"\'"
            else:
                tempStr = tempStr+"\'"+key+"\':\'"+val+"\'"
            
        hostData["COMMON_HOSTNAME"] = tempHostName
        onboardHostModel = newOnbModel()
        onboardHostModel.hostname = tempHostName
        onboardHostModel.ipaddress = ip
        onboardHostModel.servicename = ""
        onboardHostModel.selecthost = selecthost
        onboardHostModel.servertype = servertype
        onboardHostModel.emailid = emailid
        onboardHostModel.textname = textname
        onboardHostModel.pathhost = pathhost
        onboardHostModel.phyipaddr = phyipaddr
        onboardHostModel.json = json.dumps(hostData)
        modelList.append(onboardHostModel)

        cfg_file_name = ip+"_linkedeye_"+hostData["HOST_TEMPLATE"].replace(".j2", ".cfg")
        #template_location = template_path+monitoringPath+"/HOSTS/"+hostData["HOST_TEMPLATE"].replace("_", "/")
        template_location = template_path+monitoringPath+hostData["HOST_TEMPLATE"].replace("_", "/")
        # print("template_location --->"+ str(template_location))
        obj_createcfg = CreateCFG("", tempStr, cfg_file_name, template_location, cfg_path)
        #print('create cfg host -tempStr------->'+str(tempStr))
        #print('create cfg host -cfg_file_name------->'+str(cfg_file_name))
        #print('create cfg host -template_location------->'+str(template_location))
        #print('create cfg host -cfg_path------->'+str(cfg_path))
        output = obj_createcfg.createCFGFile()
        if(output != "Success"):
            failureList.append(hostData["HOST_TEMPLATE"])

        serviceIndex = 0
        for service in serviceData:
            tempStr = "\'"+ipKey+"\':\'"+ip+"\'"
            for skey, sval in service.items():
                tempStr = tempStr+','
                if skey == "COMMON_HOSTNAME":
                    tempStr = tempStr+"\'"+skey+"\':\'"+tempHostName+"\'"
                else:
                    tempStr = tempStr+"\'"+skey+"\':\'"+str(sval)+"\'"
                        
            onboardServiceModel = newOnbModel()
            onboardServiceModel.hostname = tempHostName
            onboardServiceModel.ipaddress = ip
            onboardServiceModel.servicename = service["SERVICE_TEMPLATE"].replace(".j2", "")
            onboardServiceModel.selecthost = selecthost
            onboardServiceModel.servertype = servertype
            onboardServiceModel.emailid = emailid
            onboardServiceModel.textname = textname
            onboardServiceModel.pathhost = pathhost
            onboardServiceModel.phyipaddr = phyipaddr
            onboardServiceModel.json = json.dumps(service)
            modelList.append(onboardServiceModel)

            cfg_file_name = ip+"_service_"+str(serviceIndex)+"__linkedeye_"+service["SERVICE_TEMPLATE"].replace(".j2", ".cfg")
            #template_location = template_path+monitoringPath+"/SERVICES/"+service["SERVICE_TEMPLATE"].replace("_", "/")
            template_location = template_path+monitoringPath+service["SERVICE_TEMPLATE"].replace("_", "/")
            obj_createcfg = CreateCFG("", tempStr, cfg_file_name, template_location, cfg_path)
            #print('create cfg service -------->'+str(obj_createcfg))
            #print('create cfg service -cfg_file_name------->'+str(cfg_file_name))
            #print('create cfg service -template_location------->'+str(template_location))
            #print('create cfg service -cfg_path------->'+str(cfg_path))
            output = obj_createcfg.createCFGFile()
            serviceIndex = serviceIndex + 1
            if output.strip() != 'Success':
                failureList.append(service["SERVICE_TEMPLATE"])

            
        if len(failureList) == 0:
            newOnbModel.objects.bulk_create(modelList)

        #######
            #for _modelList in modelList:
                #print(_modelList)
            for mgmt in mgmntData:
                ip_id = newOnbModel.objects.get(ipaddress = ip).id
                obj = managementModel(ip_id = ip_id, ipaddress = ip, prototype = mgmt["prototype"], username = mgmt["username"], password=mgmt["password"], iloip=mgmt["iloip"], port=mgmt["port"], threshold=mgmt["threshold"])
                obj.save()
                #cursor = connection.cursor()
                #addiloList = iloFileCreate(cursor)
                if mgmt["prototype"] == 'ilo':
                    cursor = connection.cursor()
                    addiloList = iloFileCreate(cursor)
                if mgmt["prototype"] == 'idrac':
                    cursor = connection.cursor()
                    addidracList = idracFileCreate(cursor)
                """if mgmt["prototype"] == 'Node Expo':
                    cursor = connection.cursor()
                    addnexpoList = nexpoFileCreate(cursor)"""
            for nodesmgmt in nodemgmtData:
                ip_id = newOnbModel.objects.get(ipaddress = ip).id
                #print("threshold---->"+str(nodesmgmt["threshold"]))
                obj = managementModel(ip_id = ip_id, ipaddress = ip, prototype = nodesmgmt["prototype"], username = nodesmgmt["username"], password=nodesmgmt["password"], iloip=nodesmgmt["iloip"], port=nodesmgmt["port"], threshold=nodesmgmt["threshold"])
                obj.save()
                if nodesmgmt["prototype"] == 'Node Expo':
                    cursor = connection.cursor()
                    addnexpoList = nexpoFileCreate(cursor)

        #######
            out = createnodes(ipList)
            if out['status'] == 200:
                #subprocess.run(['sh', '../script/restartdocker.sh', ''], shell=False, timeout=1800) 
                response['status'] = out['status']
                response['data'] = "Successfully nodes were created!!"
            else:
                response['status'] = out['status']
                response['data'] = out['data']
            return HttpResponse(json.dumps(response))
        else:
            response['status'] = 400
            response['data'] = "Failure in creating CFG!! "
            return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400
        response['data'] = "Failure in creating CFG!! "+str(e)
        return HttpResponse(json.dumps(response))


def createnodes(ipList):
    client = Node()
    response = {}
    try:
        if not len(ipList) == 0:
            #for ip in ipList:
            print("ipList-1--->"+str(ipList))
            ip = ipList
            print("ip-1--->"+str(ip))
            Model.cfg_file = template_path+"../nagios/nagios.cfg"   # create nodes in onboarding page in server
            #Model.cfg_file = "c:/nagios/nagios.cfg"   # create nodes in onboarding page in local host
            all_hosts = Model.Host.objects.filter(host_name=ip)
            all_services = Model.Service.objects.filter(host_name=ip)
            #print(all_hosts)
            #print(all_services)
        
            for hostObj in all_hosts:
                hostDic = {}
                for key in hostObj.keys():
                    if key.startswith("_NEO4j_"):
                        hostDic[key] = hostObj[key]
                if not hostDic == {}:
                    # FIXED: Sanitize to prevent Cypher injection
                    safe_ip = str(ip).replace("'", "\\'").replace('"', '\\"')
                    client.execute("MATCH (a {  hostIp:'" + safe_ip + "' } ) DETACH DELETE a")
                    #client.execute("MATCH (a:Host {  hostname:'"+hostDic["_NEO4j_hostname"]+"' } ) DETACH DELETE a")
                    #client.execute("MATCH (a:HostMS {  parent:'"+hostDic["_NEO4j_hostname"]+"' } ) DETACH DELETE a")
                    #client.execute("MATCH (a:Service {  parent:'"+hostDic["_NEO4j_hostname"]+"' } ) DETACH DELETE a")
                    #client.execute("MATCH (a:ServiceMS) WHERE a.parent CONTAINS '"+hostDic["_NEO4j_hostname"]+":' DETACH DELETE a")
                    _struct = K8S("").convertor('nagios',hostDic)
                    # FIXED: json.loads instead of ast.literal_eval
                    createResponse = client.create(json.loads(_struct))

                    if createResponse['status'] == 200:
                        createResponse = {}
                        for serviceObj in all_services:
                            serviceDic = {}
                            for key in serviceObj.keys():
                                if key.startswith("_NEO4j_"):
                                    serviceDic[key] = serviceObj[key]
                            if not serviceDic == {}:
                                _struct = K8S("").convertor('nagios',serviceDic)
                                # FIXED: json.loads instead of ast.literal_eval
                    createResponse = client.create(json.loads(_struct))
                                #time.sleep(5)
                                if createResponse['status'] == 200:
                                    createResponse = {}
                                    for serviceObj in all_services:
                                        serviceDic = {}
                                        for key in serviceObj.keys():
                                            if key.startswith("_NEO4j_"):
                                                serviceDic[key] = serviceObj[key]
                                        if not serviceDic == {} and (not serviceDic["_NEO4j_parent"] == "\"\""or not serviceDic["_NEO4j_title"]):
                                            if serviceObj.get("_NEO4J_RELATIONSHIP_RQD", "Yes") == 'No':
                                                response['status'] = 200
                                                response['data'] = "No relationship !!"
                                            else:
                                                createResponse = client.addRel(serviceDic["_NEO4j_parent"],serviceDic["_NEO4j_title"])
                                                
                                                if createResponse['status'] == 200:
                                                    response['status'] = createResponse['status']
                                                    response['data'] = "Successfully nodes were created!!"
                                                else:
                                                    response['status'] = createResponse['status']
                                                    response['data'] = "Failure in relationship creation {} - {}".format(serviceDic["_NEO4j_parent"],serviceDic["_NEO4j_title"])

                                                
                                else:
                                    response['status'] = createResponse['status'] 
                                    response['data'] = "Failure in service creation"
                    else:
                        response['status'] = createResponse['status'] 
                        response['data'] = "Failure in host creation"
        return response
    except Exception as e:
        # print(str(e))
        response['status'] = 400
        response['data'] = "Failure in node creation!! "+str(e)
        return response


def gethostservicedata(request):
    response = {}
    try:
        Model.cfg_file = template_path+"../nagios/nagios.cfg"
        #Model.cfg_file = "c:/nagios/nagios.cfg" # command on upload by server
        all_hosts = Model.Host.objects.all
        tempList = []
        for hostObj in all_hosts:
           # print("gethostservicedata ----->" +str(hostObj))
            hostDic = {}
            hostDic["host_name"] = hostObj["host_name"]
            hostDic["address"] = hostObj["address"]
            hostDic["contact_email"] = hostObj["_NEO4j_contactEmail"]
            hostDic["application"] = hostObj["_NEO4j_application"]
            hostDic["automation"] = "No" if hostObj["_NEO4j_Automation"] == ''else hostObj["_NEO4j_Automation"] 
            hostDic["layer"] = hostObj["_NEO4j_layer"]
            hostDic["friend"] = hostObj["_NEO4j_FrdlyName"]
            hostDic["server_type"] = hostObj["_NEO4j_sertype"]
            ###
            # onboard card more details can be added here
            ###
            tempList.append(hostDic)
        response['status'] = 200
        response['data'] = tempList
        #print("gethostservicedata ----->" +str(tempList))
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400
        return HttpResponse(json.dumps(response))

def edithostdetails(request):
    #print('edithostdetails-->'+str(request))
    response = {}
    try:
        temp_list = []
        ipaddress = request.GET['ipaddress']
        #print('edithostd-->'+str(ipaddress))
        editData = newOnbModel.objects.filter(ipaddress=ipaddress)
        memntData = managementModel.objects.filter(ipaddress=ipaddress)
        memntnode = managementModel.objects.filter(ipaddress=ipaddress)
        for mgmts in memntData:
            ip_id = newOnbModel.objects.get(ipaddress=ipaddress).id
            obj = managementModel(ip_id=ip_id, ipaddress=ipaddress, prototype=mgmts.prototype, username=mgmts.username, password=mgmts.password, iloip=mgmts.iloip, port=mgmts.port)
            #print("===================="+str(obj))
            #obj.save()
            if mgmts.prototype == 'ilo':
                cursor = connection.cursor()
                addiloList = iloFileCreate(cursor)
            if mgmts.prototype == 'idrac':
                cursor = connection.cursor()
                addidracList = idracFileCreate(cursor)
            """if mgmts.prototype == 'Node Expo':
                cursor = connection.cursor()
                addnexpoList = nexpoFileCreate(cursor)"""
        for mgmtexpo in memntnode:
            ip_id = newOnbModel.objects.get(ipaddress=ipaddress).id
            obj = managementModel(ip_id=ip_id, ipaddress=ipaddress, prototype=mgmtexpo.prototype, username=mgmtexpo.username, password=mgmtexpo.password, iloip=mgmtexpo.iloip, port=mgmtexpo.port)
            if mgmtexpo.prototype == 'Node Expo':
                cursor = connection.cursor()
                addnexpoList = nexpoFileCreate(cursor)
        #print('edithost-->'+str(editData))
        for p in editData:
            json_obj = {}
            json_obj["json"] = p.json
            json_obj["selecthost"] = p.selecthost
            json_obj["hostname"] = p.hostname
            json_obj["ipaddress"] = p.ipaddress
            json_obj["servertype"] = p.servertype
            json_obj["emailid"] = p.emailid
            json_obj["servicename"] = p.servicename
            json_obj["pathhost"] = p.pathhost
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        #print('edithostdetails---->'+str(temp_list))
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400
        response['msg'] = 'Something went wrong in Edit'+str(e)
        return HttpResponse(json.dumps(response))

def newonbtable(request):
    response = {}
    #print("inside Switcheslayer==========>")
    try:
        temp_list = []
        app_obj = newOnbModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["selecthost"] = temp.selecthost
            json_obj["ipaddress"] = temp.ipaddress
            json_obj["servertype"] = temp.servertype
            json_obj["emailid"] = temp.emailid
            json_obj["servicename"] = temp.servicename
            json_obj["textname"] = temp.textname
            json_obj["pathhost"] = temp.pathhost
            json_obj["hostname"] = temp.hostname
            json_obj["physical_ip"] = temp.phyipaddr
            temp_list.append(json_obj)
            ##      fetch all    ###
        cursor = connection.cursor()
        #cursor.execute("SELECT * FROM snmp")
        addList = pingFileCreate(cursor)
        #response['data'] = addList
        ##      fetch all    ###
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        #print("===Exception====Switcheslayer===")
        #print("getserverstype Exception --->"+str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'+str(e)
        return HttpResponse(json.dumps(response))

def mgmtdeletehost(request):
    response = {}
    try:
        ipaddress = request.POST["ipaddress"]
        prototypes = request.POST["prototype"]
        managementModel.objects.filter(ipaddress=ipaddress, prototype=prototypes).delete()
        cursor = connection.cursor()
        addiloList = iloFileCreate(cursor)
        addidracList = idracFileCreate(cursor)
        addnexpoList = nexpoFileCreate(cursor)
        response['status'] = 200 
        response['data'] = str(prototypes)+" deleted successfully"
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400 
        response['data'] = "Not able to delete management"+str(e)
        return HttpResponse(json.dumps(response))

"""def getmgmntdata(request):
    response = {}
    #print("inside Switcheslayer==========>")
    try:
        temp_list = []
        app_obj = managementModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["prototype"] = temp.prototype
            json_obj["iloip"] = temp.iloip
            json_obj["username"] = temp.username
            json_obj["password"] = temp.password
            json_obj["port"] = temp.port
            json_obj["ip_id"] = temp.ip_id
            json_obj["ipaddress"] = temp.ipaddress
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400
        response['msg'] = 'Something went wrong'+str(e)
        return HttpResponse(json.dumps(response))"""

"""def getmgmntdata(request):
    response = {}
    #print("inside Switcheslayer==========>")
    try:
        temp_list = []
        req_ip=request.GET['ipaddress']
        #temp = managementModel.objects.filter(ipaddress=req_ip)
        temp = managementModel.objects.get(ipaddress=req_ip)
        json_obj = {}
        json_obj["id"] = temp.id
        json_obj["prototype"] = temp.prototype
        json_obj["iloip"] = temp.iloip
        json_obj["username"] = temp.username
        json_obj["password"] = temp.password
        json_obj["port"] = temp.port
        json_obj["ip_id"] = temp.ip_id
        json_obj["ipaddress"] = temp.ipaddress
        temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400
        response['msg'] = 'Something went wrong'+str(e)
        return HttpResponse(json.dumps(response))"""

def getmgmntdata(request):
    response = {}
    try:
        temp_list = []
        req_ip = request.GET['ipaddress']
        temp = managementModel.objects.filter(ipaddress=req_ip)
        if temp:
            for obj in temp:
                json_obj = {}
                json_obj["id"] = obj.id
                json_obj["prototype"] = obj.prototype
                json_obj["iloip"] = obj.iloip
                json_obj["username"] = obj.username
                json_obj["password"] = obj.password
                json_obj["port"] = obj.port
                json_obj["ip_id"] = obj.ip_id
                json_obj["ipaddress"] = obj.ipaddress
                json_obj["threshold"] = obj.threshold
                temp_list.append(json_obj)
            response['status'] = 200
            response['data'] = temp_list
            return HttpResponse(json.dumps(response))
        else:
            response['status'] = 400
            response['msg'] = 'No matching records found'
            return HttpResponse(json.dumps(response))
    except Exception as e:
        response['status'] = 400
        response['msg'] = 'Something went wrong'+str(e)
        return HttpResponse(json.dumps(response))

def idracvalidation(request):
    response = {}
    try:
        data = json.loads(request.POST.get('data'))
        prototype = data["prototype"]
        ip = data["ip"]
        port = data["port"]

        result = letelnet(ip=ip , port=port).check()

        #print(result)
        #print(type(result))
        response['status'] = 200
        response['result'] = result
        response['data'] = "validation Failed!!"
        if result:
            response['data'] = "Successfully validated!!"
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['result'] = 'false'
        response['data'] = "Failure in validated!! "+str(e)
        return HttpResponse(json.dumps(response))

def ilovalidation(request):
    response = {}
    try:
        data = json.loads(request.POST.get('data'))
        prototype = data["prototype"]
        username = data["username"]
        ips = data["ip"]
        ip = data["iloip"]
        password = data["password"]

        result = ilo(ip=ip , username=username,
                          password=password).check()

        #print(result)
        #print(type(result))
        response['status'] = 200
        response['result'] = result
        response['data'] = "validation Failed!!"
        if result:
            response['data'] = "Successfully validated!!"
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['result'] = 'false'
        response['data'] = "Failure in validated!! "+str(e)
        return HttpResponse(json.dumps(response))

def nodeexpvalidation(request):
    response = {}
    try:
        data = json.loads(request.POST.get('data'))
        prototype = data["prototype"]
        ip = data["ip"]
        port = data["port"]

        result = letelnet(ip=ip , port=port).check()

        #print(result)
        #print(type(result))
        response['status'] = 200
        response['result'] = result
        response['data'] = "validation Failed!!"
        if result:
            response['data'] = "Successfully validated!!"
        return HttpResponse(json.dumps(response))
    except Exception as e:
        response['result'] = 'false'
        response['data'] = "Failure in validated!! "+str(e)
        return HttpResponse(json.dumps(response))

def pingFileCreate(cursor): 
    ret = {"ping" : []}
    cursor.execute("SELECT ipaddress FROM newonb")
    IPs = cursor.fetchall()
    #print(IPs)
    for ip in IPs:
        i = 0
        _ip=ip[i]
        #print(_ip)
        ####
        values = newOnbModel.objects.filter(ipaddress=_ip).values()
        i = i+1
        ret["ping"].append(_ip)
    #print(ret)
    with open("./prom-conf/ping.yaml", "w+") as f:
        yaml.safe_dump(ret, f, default_flow_style=False)

def iloFileCreate(cursor): 
    ret = {"ilo" : []}
    cursor.execute("SELECT ipaddress FROM management where prototype='ilo'")
    IPs = cursor.fetchall()
    #print(IPs)
    for ip in IPs:
        sub = {}
        i = 0
        _ip=ip[i]
        sub[_ip] = []

        ####
        values = managementModel.objects.filter(ipaddress=_ip, prototype='ilo').values()
        for k,v in values[0].items():
            if v == '':
                continue
            item = {}
            item[k] = v
            sub[_ip].append(item)
        ####

        i = i+1
        ret["ilo"].append(sub)
    #print(ret)
    with open("./prom-conf/ilo.yaml", "w+") as f:
        yaml.safe_dump(ret, f, default_flow_style=False)

def idracFileCreate(cursor): 
    ret = {"idrac" : []}
    cursor.execute("SELECT ipaddress FROM management where prototype='idrac'")
    IPs = cursor.fetchall()
    #print(IPs)
    for ip in IPs:
        sub = {}
        i = 0
        _ip=ip[i]
        sub[_ip] = []

        ####
        values = managementModel.objects.filter(ipaddress=_ip, prototype='idrac').values()
        for k,v in values[0].items():
            if v == '':
                continue
            item = {}
            item[k] = v
            sub[_ip].append(item)
        ####

        i = i+1
        ret["idrac"].append(sub)
    #print(ret)
    with open("./prom-conf/idrac.yaml", "w+") as f:
        yaml.safe_dump(ret, f, default_flow_style=False)

"""def nexpoFileCreate(cursor): 
    ret = {"node_exporter" : []}
    cursor.execute("SELECT ipaddress FROM management where prototype = 'Node Expo'")
    IPs = cursor.fetchall()
    #print(IPs)
    for ip in IPs:
        sub = {}
        i = 0
        _ip=ip[i]
        sub[_ip] = []

        ####
        values = managementModel.objects.filter(ipaddress=_ip, prototype='Node Expo').values()
        for k,v in values[0].items():
            if v == '':
                continue
            item = {}
            item[k] = v
            sub[_ip].append(item)
        ####

        i = i+1
        ret["node_exporter"].append(sub)
    #print(ret)
    with open("./prom-conf/node.yaml", "w+") as f:
        yaml.safe_dump(ret, f, default_flow_style=False)"""

def nexpoFileCreate(cursor): 
    ret = {"node_exporter": []}
    cursor.execute("SELECT ipaddress FROM management where prototype = 'Node Expo'")
    IPs = cursor.fetchall()

    for ip in IPs:
        sub = {}
        _ip = ip[0]
        sub[_ip] = []

        values = managementModel.objects.filter(ipaddress=_ip, prototype='Node Expo').values()
        for k, v in values[0].items():
            if v == '':
                continue
            item = {}
            if k == 'threshold':
                item[k] = []
                thresholds = json.loads(v.replace("''", "\"").replace("'", "\""))
                for threshold_name, threshold_value in thresholds.items():
                    threshold_item = {}
                    threshold_item[threshold_name] = threshold_value
                    item[k].append(threshold_item)
            else:
                item[k] = v
            sub[_ip].append(item)

        ret["node_exporter"].append(sub)

    with open("./prom-conf/node.yaml", "w+") as f:
        yaml.safe_dump(ret, f, default_flow_style=False)