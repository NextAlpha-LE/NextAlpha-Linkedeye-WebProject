import os
import redfish

class ilo():
    def __init__(self, ip=None, username=None, password=None):
        #print("ilo-ip--->"+str(ip))
        self.ip = ip
        self.url = "https://{}".format(self.ip)
        self.username = username
        self.password = password

    def check(self):
        try:
            #print("ilo--check-->")
            REST_OBJ = redfish.redfish_client(base_url=self.url, username=self.username, password=self.password, timeout=2, max_retry=1)
            REST_OBJ.login(auth="session")
            response = REST_OBJ.get('/redfish/v1/systems/1')
            if '20' in str(response.status):
                #print("ilo--check-1-->")
                return True
            else:
                return False
        except Exception as ex:
            #print("ilo-check-2---?")
            return False
