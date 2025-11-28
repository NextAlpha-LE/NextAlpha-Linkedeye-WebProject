import os
import redfish
import urllib3

# Disable SSL warnings for self-signed certificates
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

class ilo():
    def __init__(self, ip=None, username=None, password=None):
        self.ip = ip
        self.url = "https://{}".format(self.ip)
        self.username = username
        self.password = password

    def check(self):
        try:
            # Increased timeout and retries
            REST_OBJ = redfish.redfish_client(
                base_url=self.url, 
                username=self.username, 
                password=self.password, 
                timeout=10,      # Increased from 2
                max_retry=3      # Increased from 1
            )
            
            REST_OBJ.login(auth="session")
            response = REST_OBJ.get('/redfish/v1/systems/1')
            
            if '20' in str(response.status):
                return True
            else:
                return False
                
        except Exception as ex:
            return False
        finally:
            try:
                REST_OBJ.logout()
            except:
                pass
