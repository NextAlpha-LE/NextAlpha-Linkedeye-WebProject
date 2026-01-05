from django.shortcuts import render,HttpResponse
import json
import requests
from django.conf import settings
from .models import ServiceModel, UserNotificationSetingsModel
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
import datetime
from django.template.loader import render_to_string
import html2markdown
import html2text
from auditlogs.models import AuditlogsModel
from userprofile.models import policynotifiModel
from django.http import JsonResponse
import os
from lib.LinkedEyeNotification import Notification

# Create your views here.
def index(request):
    return render(request, 'app/notificationsettings.html')

def serviceoperation(request):
    if request.method == 'POST':
        response = { }
        clientData = json.loads(request.POST['alldata'])
        parsed_json = clientData['data']
        try:
            if parsed_json["operation"] == 'add':
                if ServiceModel.objects.filter(name=parsed_json["name"]).exists():
                    response['msg'] = 'Service name already exist.'
                    response['status'] = 500
                    return HttpResponse(json.dumps(response), content_type="json")
                else:
                    obj = ServiceModel(name=parsed_json["name"],syntax = parsed_json["syntax"],delimiter=parsed_json["delimiter"],is_inputRequired=parsed_json["is_inputRequired"], is_defaultservice=parsed_json["is_defaultservice"], messageformat=parsed_json["messageformat"])
                    obj.save()
                    response['status'] = 200   
                    response['msg'] = 'Successfully saved service.'
                    response['servicename'] = parsed_json["name"] 
                    objid = ServiceModel.objects.get(name=parsed_json["name"]).id
                    response['id'] = objid
                    user_ids = list(User.objects.values_list('id', flat=True))
                    if parsed_json["is_inputRequired"]:
                        is_saved = False
                    else:
                        is_saved = True
                    for id in user_ids:
                        obj = UserNotificationSetingsModel(user_id=id, service_id = objid, inputs={}, url = parsed_json["syntax"], is_saved = is_saved)
                        obj.save()
            elif parsed_json["operation"] == 'delete':
                deleteobj = ServiceModel.objects.get(id=parsed_json["id"])
                deleteobj.delete()
                response['status'] = 200
                response['msg'] = 'Successfully deleted service.'
                response['id'] = parsed_json["id"]
            elif parsed_json["operation"] == 'update':
                obj = ServiceModel.objects.get(id=parsed_json["id"])
                obj.syntax = parsed_json["syntax"]
                obj.delimiter = parsed_json["delimiter"]
                obj.save()
                response['id'] = parsed_json["id"]
                response['status'] = 200
                response['msg'] = 'Successfully updated service.'
            return HttpResponse(json.dumps(response), content_type="json")
        except Exception as e:
            print('===Exception=====serviceoperation===')
            print(str(e))
            response['status'] = 400
            response['msg'] = 'Something went wrong'
    return HttpResponse(json.dumps(response), content_type="json")

def sendnotification(request):
    if request.method == 'POST':
        response = { }
        clientData = json.loads(request.POST['alldata'])
        parsed_json = clientData['data']
        email = request.user
        user_id = User.objects.get(username=email).id
        service = ServiceModel.objects.get(name = parsed_json["servicename"])
        if service.is_inputRequired:
            i = UserNotificationSetingsModel.objects.get(service_id = service.id, user_id = user_id).inputs
            inputs = json.loads(i)
            url = service.syntax
            for i in inputs:
                tmp = '{'+i+'}'
                url = url.replace(tmp,inputs[i])
        else:
            url = service.syntax
        payload = {
                    "urls": url,
                    "title": parsed_json["title"],
                    "body": parsed_json["body"]
                }
        r = requests.post('http://'+settings.APPRISE_HOST+"/notify/", json=payload)
    return HttpResponse(json.dumps(response), content_type="json")
def sendnotifications(request):
    try:
        response = { }
        clientData = json.loads(request.POST['alldata'])
        parsed_json = clientData['data']
        user_id = User.objects.get(username=parsed_json["user"]).id
        services = UserNotificationSetingsModel.objects.filter(user_id = user_id)
        notification_obj = Notification()
        for service in services:
            apobj = notification_obj.instantiate()
            url = service.url
            apobj.add_url(url)
            message_format = ServiceModel.objects.get(id = service.service_id).messageformat
            result = apobj.sendnotifications(title=parsed_json["title"], message_format=message_format, template_type=parsed_json["template_type"], variables=parsed_json["dataObj"])
            if result['data'] == False:
                log = AuditlogsModel(username = parsed_json["user"],  action = 'Send Notification', status = 'Failure', message=result['error_msg'])
                log.save()
        response['status'] = 200
        response['msg'] = ' '
    except Exception as e:
        response['status'] = 200
        response['msg'] = str(e)
        print('=Exception==sendnotifications==')
        print(str(e))
    return HttpResponse(json.dumps(response), content_type="json")
    
def get_all_services(request):
    response = {}
    userobj = User.objects.get(username=request.user)
    obj = model_to_dict(userobj, fields=[field.name for field in userobj._meta.fields])
    try:
        # Get the previous successful login from audit logs (second latest entry)
        last_logins = AuditlogsModel.objects.filter(username=str(request.user), action='User login', status='Success').order_by('-created')
        if last_logins.count() > 1:
            obj['last_login'] = last_logins[1].created
        else:
            obj['last_login'] = userobj.last_login
            
        temp_list = []
        service_object = ServiceModel.objects.filter(name='mail')
        """if not service_object:
            linkedeye_email = (settings.LINKEDEYE_EMAIL).split("@")
            syntax = 'mailto://'+linkedeye_email[0]+':'+settings.LINKEDEYE_EMAIL_APPKEY+"@"+linkedeye_email[1]+'/{email}'
            delimiter = '/'
            obj = ServiceModel(name='mail',syntax = syntax, delimiter=',',is_inputRequired=True, is_defaultservice=True, messageformat='Html')
            obj.save()"""
        if not service_object:
            linkedeye_email = (settings.LINKEDEYE_EMAIL).split("@")
            username = linkedeye_email[0]
            domain = linkedeye_email[1]
            
            # Check if Gmail or custom domain
            if 'gmail.com' in domain.lower():
                # Gmail: use simple mailto:// format
                syntax = 'mailto://' + username + ':' + settings.LINKEDEYE_EMAIL_APPKEY + '@' + domain + '/{email}'
            else:
                # Custom domain: use mailtos:// with SMTP server
                if 'outlook.com' in domain or 'hotmail.com' in domain:
                    smtp_server = 'smtp.office365.com'
                elif 'yahoo.com' in domain:
                    smtp_server = 'smtp.mail.yahoo.com'
                else:
                    smtp_server = 'smtp.office365.com'
                
                syntax = 'mailtos://' + domain + '?smtp=' + smtp_server + '&user=' + settings.LINKEDEYE_EMAIL + '&pass=' + settings.LINKEDEYE_EMAIL_APPKEY + '&to={email}'
            
            delimiter = '/'
            obj = ServiceModel(name='mail', syntax=syntax, delimiter=',', is_inputRequired=True, is_defaultservice=True, messageformat='Html')
            obj.save()
        app_obj = ServiceModel.objects.all()
        for temp in app_obj:
            json_obj = {}
            json_obj["id"] = temp.id
            json_obj["name"] = temp.name
            json_obj["syntax"] = temp.syntax
            json_obj["delimiter"] = temp.delimiter
            json_obj["is_defaultservice"] = temp.is_defaultservice
            json_obj["messageformat"] = temp.messageformat
            temp_list.append(json_obj)
        response['status'] = 200
        response['data'] = temp_list
        response['userobj'] = obj
        return HttpResponse(json.dumps(response, default=convert_timestamp))
    except Exception as e:
        print('=======Exception======')
        print(str(e))
        response['status'] = 400
        response['msg'] = 'Something went wrong'
        return HttpResponse(json.dumps(response))
# helper function to convert the datetime object into seconds 
def convert_timestamp(item_date_object):
    if isinstance(item_date_object, (datetime.date, datetime.datetime)):
        return item_date_object.timestamp()
def save_settings(request):
    if request.method == 'POST':
        response = { }
        try:
            data = request.POST['alldata']
            parsed_json = json.loads(data)
            email = request.user
            user_id = User.objects.get(username=email).id
            UserNotificationSetingsModel.objects.filter(user_id=user_id).delete()
            userselected_serviceids = []
            for data_obj in parsed_json['data']:
                userselected_serviceids.append(data_obj["serviceid"])
                service = ServiceModel.objects.get(id = data_obj["serviceid"])
                if service.is_inputRequired:
                    inputs = data_obj["inputs"]
                    url = service.syntax
                    for i in inputs:
                        tmp = '{'+i+'}'
                        url = url.replace(tmp,inputs[i])
                else:
                    url = service.syntax
                if UserNotificationSetingsModel.objects.filter(user_id=user_id,service_id = data_obj["serviceid"]).exists():
                    obj = UserNotificationSetingsModel.objects.get(user_id=user_id,service_id = data_obj["serviceid"], is_saved=True)
                    obj.inputs = str(json.dumps(data_obj["inputs"]))
                    obj.url = url
                    obj.save()
                else:  
                    obj = UserNotificationSetingsModel(user_id=user_id,service_id = data_obj["serviceid"],inputs=str(json.dumps(data_obj["inputs"])),url = url, is_saved=True)
                    obj.save()
            UserNotificationSetingsModel.objects.filter(user_id=user_id).exclude(service_id__in=userselected_serviceids).delete()
            response['status'] = 200
            response['msg'] = 'Successfully saved notification settings'
            log = AuditlogsModel(username = request.user,  action = 'Save Notification Preferences', status = 'Success', message='Successfully saved notification settings')
            log.save()
        except Exception as e:
            print('====Exception===')
            print(str(e))
            log = AuditlogsModel(username = request.user,  action = 'Save Notification Preferences', status = 'Failure', message='Not able to save notification settings')
            log.save()
            response['status'] = 400
            response['msg'] = 'Something went wrong'
    return HttpResponse(json.dumps(response))
def formatmessage(message, message_format):
    try:
        if message_format == 'markdown':
            message_body = html2markdown.convert(message)
        if message_format == 'Text':
            h = html2text.HTML2Text()
            h.ignore_links = True
            message_body =  h.handle(message)
        if message_format == 'Html': 
            message_body = message
        return message_body
    except Exception as e:
        print('========Exception===formatmessage====')
        print(str(e))
        return message

def save_image(request):
    if request.method == "POST":
        image = request.FILES.get("image")
        filename = request.POST.get("filename") or image.name
        filepath = os.path.join("static", "app", "usericons", filename)

        if os.path.exists(filepath):
            os.remove(filepath)

        with open(filepath, "wb+") as destination:
            for chunk in image.chunks():
                destination.write(chunk)
        image_url = request.build_absolute_uri(settings.STATIC_URL + "usericons/" + filename)
        return JsonResponse({"message": "Image saved successfully!", "image_url": image_url})
    else:
        return JsonResponse({"message": "Invalid request method."})

def profile_image(request, username):
    # Assuming that the profile images are stored in the media directory
    image_formats = ["jpg", "jpeg", "png", "gif"]
    for ext in image_formats:
        image_path = os.path.join(settings.STATIC_ROOT, "usericons", f"{username}.{ext}")
        if os.path.exists(image_path):
            with open(image_path, "rb") as f:
                image_data = f.read()
            content_type = f"image/{ext}"
            return HttpResponse(image_data, content_type=content_type)
    return HttpResponse(status=404)

def delete_profile_image(request):
    if request.method == 'DELETE':
        data = json.loads(request.body)
        username = data['username']
        extensions = ['jpg', 'jpeg', 'png', 'gif']
        for extension in extensions:
            file_path = os.path.join(settings.STATIC_ROOT, 'usericons/', f'{username}.{extension}')
            if os.path.exists(file_path):
                os.remove(file_path)
                break
        return JsonResponse({'message': 'Profile image deleted successfully'})
    return JsonResponse({'error': 'Invalid request method'})

#mail escalation code:
def escalapolicy(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))['escalamailData']
            userobj = request.user  # Assuming the user is authenticated
            categories = data.get('categories', '')  # Define this once to use in logs

            policyid = data.get('policyid')
            if policyid:
                policy = policynotifiModel.objects.get(policy_id=policyid)
                policy.categories = data.get('categories', '')
                policy.escalation_mails = json.dumps(data.get('escalation_mails', []))
                policy.definite_mails = json.dumps(data.get('info_mails', []))
                policy.escalation_required = bool(int(data.get('escalation_required', 1)))
                policy.approval_timer = data.get('approval_time', '')
                policy.resolution_timer = data.get('resolution_time', '')
                policy.save()

                # Log after successful update
                log = AuditlogsModel(username=userobj, action='Update Escalation Mail', status='Success', message=f'Escalation Mail details updated for category: {categories}')
                log.save()

                data['policyid'] = policy.policy_id  # Include this
                return JsonResponse({'status': 200, 'msg': 'Policy updated successfully', 'data': data})
            else:
                policy = policynotifiModel.objects.create(
                    categories=data.get('categories', ''),
                    escalation_mails=json.dumps(data.get('escalation_mails', [])),
                    definite_mails=json.dumps(data.get('info_mails', [])),
                    escalation_required=bool(int(data.get('escalation_required', 1))),
                    approval_timer=data.get('approval_time', ''),
                    resolution_timer=data.get('resolution_time', '')
                )

                # Log after successful creation
                log = AuditlogsModel(username=userobj, action='Create Escalation Mail', status='Success', message=f'New Escalation Mail details created for category: {categories}')
                log.save()

                data['policyid'] = policy.policy_id  # Include this
                return JsonResponse({'status': 200, 'msg': 'Policy created successfully', 'data': data})

        except Exception as e:
            # Log after any error occured
            userobj = request.user if request.user.is_authenticated else None
            log = AuditlogsModel(username=userobj, action='Create/Update Escalation Mail', status='Failed', message=f'Error occurred: {str(e)}')
            log.save()
            return JsonResponse({'status': 500, 'msg': f'Error: {str(e)}'})
    return JsonResponse({'status': 405, 'msg': 'Invalid request method'})

def get_escalation_policies(request):
    if request.method == "GET":
        data = []
        policies = policynotifiModel.objects.all()
        for policy in policies:
            data.append({
                "policy_id": policy.policy_id,
                "escalation_mails": policy.escalation_mails,  # if stored as string
                "info_mails": policy.definite_mails,
                "categories": policy.categories,
                #"escalation_required": "Enabled" if policy.escalation_required == 1 else "Disabled",
                "escalation_required": "Disabled" if policy.escalation_required == 0 else "Enabled",
                "approval_time": policy.approval_timer,
                "resolution_time": policy.resolution_timer,
            })
        return JsonResponse({"status": 200, "data": data})
    return JsonResponse({"status": 405, "msg": "Method Not Allowed"})

def edit_escalation_policy(request):
    if request.method == "GET":
        policy_id = request.GET.get("policyid")
        if not policy_id:
            return JsonResponse({"status": 400, "msg": "Missing policy ID"})

        try:
            policy = policynotifiModel.objects.get(policy_id=policy_id)
            data = {
                "policy_id": policy.policy_id,
                "escalation_mails": policy.escalation_mails,
                "info_mails": policy.definite_mails,
                "categories": policy.categories,
                "escalation_required": policy.escalation_required,
                "approval_time": policy.approval_timer,
                "resolution_time": policy.resolution_timer,
            }
            return JsonResponse({"status": 200, "data": data})
        except policynotifiModel.DoesNotExist:
            return JsonResponse({"status": 404, "msg": "Policy not found"})

    return JsonResponse({"status": 405, "msg": "Method Not Allowed"})

def delete_escalation_policy(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            policy_id = data.get('policyid')
            userobj = request.user  # Assuming the user is authenticated

            if policy_id is not None:
                policy = policynotifiModel.objects.filter(policy_id=policy_id).first()
                if policy:
                    category = policy.categories  # ✅ Get category before delete
                    policy.delete()

                    # Log after successful delete
                    log = AuditlogsModel(username=userobj, action='Delete Escalation Mail', status='Success', message=f'Escalation Mail details deleted for category: {category}')
                    log.save()

                    return JsonResponse({'status': 200, 'msg': 'Policy deleted successfully'})
                else:
                    return JsonResponse({'status': 404, 'msg': 'Policy not found'})
            else:
                return JsonResponse({'status': 400, 'msg': 'Policy ID is required'})

        except Exception as e:
            userobj = request.user if request.user.is_authenticated else None
            log = AuditlogsModel(username=userobj, action='Delete Escalation Mail', status='Failed', message=f'Error occurred while deleting Escalation Mail details: {str(e)}')
            log.save()
            return JsonResponse({'status': 500, 'msg': str(e)})

    return JsonResponse({'status': 405, 'msg': 'Invalid request method'})
