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
from django.forms.models import model_to_dict
from lib.LinkedEyeRedis import Redis
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.models import User

#@login_required(login_url="/")

def sitehealth(request):
    try:
        response = {}
        sitename = request.GET.get('sitename')
        print("sitehealth sitename = "+sitename)
        response["data"]=Redis().getSiteHealthNew(site=sitename)
        response["code"] = 200        
        
    except Exception as ex:
        response["code"] = 500
        response["message"] = str(ex)
    return HttpResponse(json.dumps(response, default=str), content_type="json")
