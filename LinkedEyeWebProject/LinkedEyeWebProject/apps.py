# myproject/apps.py

from django.apps import AppConfig
from django.db.models.signals import post_migrate

class LinkedEyeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'LinkedEye'

    def ready(self):
        # Register a signal handler to call getdbdata() after all models are migrated
        post_migrate.connect(self.call_getdbdata_once)

    def call_getdbdata_once(self, sender, **kwargs):
        # Check if getdbdata() has already been called
        if not getattr(self, 'getdbdata_called', False):
            # Set the getdbdata_called flag to True to indicate that the function has been called
            self.getdbdata_called = True

            # Call the getdbdata() function
            from ticket.views import overviewData,sitebasedData
            overviewData()
            sitebasedData()

