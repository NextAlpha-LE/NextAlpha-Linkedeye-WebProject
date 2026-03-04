#####################
##Author : Ponmuthu M
##Version : 21-01-2021
## FIXED: ast.literal_eval → json.loads, str() → json.dumps(), scan instead of keys()
#####################

import redis
import socket
import os
import json
import logging
from lib.LinkedEyeEntity import Node

from django.http import HttpResponse
from json import dumps as jdumps

logger = logging.getLogger('linkedeye')


class Redis(object):
    def __init__(self, host="", port="", db=0, password=""):
        self.db = db
        self.host = host or os.getenv('REDIS_HOST', "redis")
        self.port = port or os.getenv('REDIS_PORT', 6379)
        self.password = password or os.getenv('REDIS_PASSWORD', '')
        self._connect()

    def _connect(self):
        self.channel = redis.StrictRedis(
            host=self.host, port=self.port, db=self.db,
            password=self.password,
            socket_connect_timeout=5,
            socket_timeout=10,
            decode_responses=True,
        )
        return self

    def set(self, key, value):
        try:
            self.channel.set(key, value)
        except Exception as ex:
            logger.error("REDIS SET failed: %s", ex)
            raise Exception("REDIS SET : Ex = " + str(ex))

    def update(self, existing_key, add_key, add_value):
        response = {}
        try:
            raw = self.channel.get(existing_key)
            existing_key_value = json.loads(raw)
            if add_key not in existing_key_value:
                existing_key_value[add_key] = []
            existing_key_value[add_key].append(json.loads(add_value))
            existing_key_value['overallStatus'] = True
            existing_key_value['status'] = 5
            self.set(existing_key, json.dumps(existing_key_value))
            response["status"] = 200
            return response
        except Exception as ex:
            logger.error("REDIS update failed for key %s: %s", existing_key, ex)
            response["status"] = 500
            return HttpResponse(jdumps(response), content_type="json")

    def get(self, key):
        try:
            return self.channel.get(key)
        except Exception as ex:
            logger.error("REDIS GET failed for key %s: %s", key, ex)
            raise Exception("REDIS GET : Ex = " + str(ex))

    def getSiteHealth(self, site=""):
        ret = {}
        try:
            ret['chart'] = Node().overallStats()
            ret['entity'] = ret['chart']['isEntityRED']

            for mode in ['bod', 'adp', 'eod']:
                list_of_key = self.getBodEodkeys(site=site, mode=mode)
                if not list_of_key:
                    ret[mode] = 0
                else:
                    value = 1
                    for key in list_of_key:
                        raw = self.channel.get(key)
                        get_value = json.loads(raw).get('overallStatus', 0)
                        value = value * int(get_value)
                    ret[mode] = value
            return ret
        except Exception as ex:
            logger.error("REDIS getSiteHealth failed: %s", ex)
            raise Exception("REDIS getSiteHealth : Ex = " + str(ex))

    def getSiteHealthNew(self, site=""):
        ret = {}
        try:
            ret['chart'] = Node().overallStats()
            ret['entity'] = ret['chart']['isEntityRED']

            for mode in ['bod', 'adp', 'eod']:
                isRed = 0
                isAmber = 0
                isGreen = 0
                isUnknown = 0
                list_of_key = self.getBodEodkeys(site=site, mode=mode)
                if not list_of_key:
                    ret[mode] = 0
                else:
                    for key in list_of_key:
                        raw = self.channel.get(key)
                        get_value = json.loads(raw).get('status', 3)
                        if get_value == 0:
                            isRed += 1
                        elif get_value == 1:
                            isAmber += 1
                        elif get_value == 2:
                            isGreen += 1
                        else:
                            isUnknown += 1
                    if isRed > 0:
                        value = 0
                    elif isAmber > 0:
                        value = 1
                    elif isGreen > 0:
                        value = 2
                    elif isUnknown > 0:
                        value = 3
                    ret[mode] = value
            return ret
        except Exception as ex:
            logger.error("REDIS getSiteHealthNew failed: %s", ex)
            raise Exception("REDIS getSiteHealth : Ex = " + str(ex))

    def getBodEodkeys(self, site="", mode="ALL", ip=""):
        """Use scan_iter instead of keys() to avoid loading all keys into memory."""
        try:
            if site == "":
                site = socket.gethostname().split('.')[0]

            if mode == "ALL":
                patterns = [
                    str(site) + ":ADP*",
                    str(site) + ":BOD*",
                    str(site) + ":EOD*",
                ]
                result = []
                for pattern in patterns:
                    result.extend(list(self.channel.scan_iter(match=pattern, count=1000)))
                return result
            elif mode == "VER":
                pattern = str(site) + ":VER_versions_" + str(ip) + "*"
                return list(self.channel.scan_iter(match=pattern, count=1000))
            else:
                pattern = str(site) + ":" + str(mode.upper()) + "*"
                return list(self.channel.scan_iter(match=pattern, count=1000))
        except Exception as ex:
            logger.error("REDIS getBodEodkeys failed: %s", ex)
            raise Exception("REDIS GET-BOD-EOD : Ex = " + str(ex))

    def getBodEodkeysAllSite(self):
        """Use scan_iter instead of keys() for bounded memory."""
        try:
            result = []
            for pattern in ["*:BOD*", "*:EOD*"]:
                result.extend(list(self.channel.scan_iter(match=pattern, count=1000)))
            return result
        except Exception as ex:
            logger.error("REDIS getBodEodkeysAllSite failed: %s", ex)
            raise Exception("REDIS GET-BOD-EOD : Ex = " + str(ex))

    def getAllSites(self):
        """Use scan_iter instead of keys() for bounded memory."""
        try:
            sites = set()
            for pattern in ["*:BOD*", "*:EOD*"]:
                for key in self.channel.scan_iter(match=pattern, count=1000):
                    sites.add(key.split(':')[0])
            return list(sites)
        except Exception as ex:
            logger.error("REDIS getAllSites failed: %s", ex)
            raise Exception("REDIS GET-BOD-EOD : Ex = " + str(ex))
