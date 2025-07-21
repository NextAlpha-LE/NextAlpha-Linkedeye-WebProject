from django.core.exceptions import PermissionDenied
from django.http import HttpResponse

def role_required(allowed_roles=[]):
    def decorator(view_func):
        def wrap(request, *args, **kwargs):
            user_group = request.user.groups.first().name if request.user.groups.exists() else None
            if user_group in allowed_roles:
                return view_func(request, *args, **kwargs)
            return HttpResponse("You are not authorized to view this page", status=403)
        return wrap
    return decorator