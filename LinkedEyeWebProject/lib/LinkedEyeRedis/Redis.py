#####################
##Author : Ponmuthu M
##Version : 21-01-2021
#####################

import redis
import socket
import os 
import ast
import json
from lib.LinkedEyeEntity import Node

from django.http import HttpResponse
from json import dumps as jdumps

class Redis(object):
    def __init__(self, host="", port="", db=0, password=""):
        self.db = db
        if host:
            self.host = host
        else:
            self.host = os.getenv('REDIS_HOST', "redis")
        if port:
            self.port = port 
        else:
            self.port = os.getenv('REDIS_PORT', 6379)
        if password:
            self.password = password
        else:
            self.password = os.getenv('REDIS_PASSWORD', '')
        self._connect()

    def _connect(self):	
        self.channel = redis.StrictRedis(host=self.host, port=self.port, db=self.db, password=self.password)
        return self

    def set(self, key, value):
        try:
            self.channel.set(key, value)
        except Exception as ex:
            raise Exception("REDIS SET : Ex = " + str(ex))
        
    def update(self, existing_key, add_key, add_value):
        response={}
        try:
            a = self.channel.get(existing_key).decode('ascii')
            existing_key_value = ast.literal_eval(a)
            #existing_key_value = json.loads(self.channel.get(existing_key).decode('ascii'))
            if add_key not in existing_key_value:
                existing_key_value[add_key] = []
            existing_key_value[add_key].append(json.loads(add_value))
            existing_key_value['overallStatus'] = True
            existing_key_value['status'] = 5
            #self.set(existing_key,json.dumps(existing_key_value))
            self.set(existing_key,str(existing_key_value))
            response["status"] = 200
            return response
        except Exception as ex:
            response["status"] =500
            return HttpResponse(jdumps(response), content_type="json")
            #raise Exception("REDIS GET : Ex = " + str(ex))

    def get(self, key):
        try:
            return self.channel.get(key).decode('ascii')
        except Exception as ex:
            raise Exception("REDIS GET : Ex = " + str(ex))

    def getSiteHealth(self, site=""):
        ret = {}
        # temp hardcoded
        #ret['entity'] = 1
        #
        try:
            #node_out = Node().stats()
            ret['chart'] = Node().overallStats()
            ret['entity'] = ret['chart']['isEntityRED']
            #isEntityRED = node_out.get(0,"INF")
            #if isEntityRED == "INF" or isEntityRED > 0:
            #    ret['entity'] = 0
            #elif isEntityRED == 0:
            #    ret['entity'] = 1

            for mode in ['bod' , 'adp' , 'eod']:
                list_of_key = self.getBodEodkeys(site=site, mode=mode)
                if list_of_key == []: # No keys
                    ret[mode] = 0
                else:
                    value=1 #AND operation initial 1
                    for key in list_of_key:
                        get_value = ast.literal_eval(self.channel.get(key).decode('ascii')).get('overallStatus',0)
                        #print(" {} === get_value {}  ".format(key, str(get_value)))
                        value       = value * int(get_value)
                    ret[mode]    = value
            return ret
        except Exception as ex:
            raise Exception("REDIS getSiteHealth : Ex = " + str(ex))

    def getSiteHealthNew(self, site=""):
        
        ret = {}
        try:
            ret['chart'] = Node().overallStats()
            ret['entity'] = ret['chart']['isEntityRED']

            for mode in ['bod' , 'adp' , 'eod']:
                isRed = 0
                isAmber = 0
                isGreen = 0
                isUnknown = 0
                list_of_key = self.getBodEodkeys(site=site, mode=mode)
                if list_of_key == []: # No keys
                    ret[mode] = 0
                else:
                    for key in list_of_key:
                        get_value = ast.literal_eval(self.channel.get(key).decode('ascii')).get('status',3)
                        # in case status not founc in each redis key . should show unknown instead of RED.
                        if get_value == 0:
                            isRed +=1
                        elif get_value == 1:
                            isAmber +=1
                        elif get_value == 2:
                            isGreen +=1
                        else:
                            isUnknown +=1
                    if isRed > 0:
                        value = 0
                    elif isAmber > 0:
                        value = 1
                    elif isGreen > 0:
                        value = 2
                    elif isUnknown > 0:
                        value = 3
                    ret[mode]    = value
            return ret
        except Exception as ex:
            raise Exception("REDIS getSiteHealth : Ex = " + str(ex))

    def getBodEodkeys(self,site="", mode="ALL",ip=""): #BOD/EOD/ADP
        try:
            if site == "":
                site = socket.gethostname().split('.')[0]
            _str_list = [i.decode('ascii') for i in self.channel.keys()]
            if mode == "ALL":
                return [i for i in _str_list if (str(site)+":ADP" in i or str(site)+":BOD" in i or str(site)+":EOD" in i) ]
            elif mode == "VER":
                return [i for i in _str_list if (str(site)+":VER_versions_"+ip in i ) ]
            return [i for i in _str_list if (str(site)+":"+str(mode.upper()) in i ) ]
        except Exception as ex:
            raise Exception("REDIS GET-BOD-EOD : Ex = " + str(ex))

    def getBodEodkeysAllSite(self):
        try:
            _str_list = [i.decode('ascii') for i in self.channel.keys()]
            return [i for i in _str_list if (":BOD" in i or ":EOD" in i)]
        except Exception as ex:
            raise Exception("REDIS GET-BOD-EOD : Ex = " + str(ex))

    def getAllSites(self):
        try:
            _str_list = [i.decode('ascii') for i in self.channel.keys()]
            return list(set([i.split(':')[0] for i in _str_list if (":BOD" in i or ":EOD" in i)]))
        except Exception as ex:
            raise Exception("REDIS GET-BOD-EOD : Ex = " + str(ex))

