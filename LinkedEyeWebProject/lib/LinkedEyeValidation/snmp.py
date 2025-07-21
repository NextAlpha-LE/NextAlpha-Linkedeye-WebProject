import os

class snmp():
    def __init__(self, version=None, community_string=None, securitylevel=None, username=None, authenticationmethod=None, authenticationpassword=None, privacymethod=None, privacypassword=None , ip=None):
        self.version = version #v2c / v3
        self.community_string = community_string
        self.securitylevel = securitylevel
        self.username  = username
        self.authenticationmethod = authenticationmethod
        self.authenticationpassword= authenticationpassword
        self.privacymethod = privacymethod
        self.privacypassword = privacypassword
        self.ip = ip

    def check(self):
        if self.version == 'v2c':
            cmd="snmpwalk -{} -c {} {} 1.3.6.1.2.1.2.2.1.8".format(self.version,self.community_string,self.ip)
        if self.version == 'v3' and self.securitylevel == 'authPriv':
            cmd="snmpwalk -{} -l {} -u {} -a {} -A {} -x {} -X {} {} 1.3.6.1.2.1.2.2.1.8 ".format(self.version,self.securitylevel,self.username,self.authenticationmethod,self.authenticationpassword,self.privacymethod,self.privacypassword,self.ip)
        if self.version == 'v3' and self.securitylevel == 'authNoPriv':
            cmd="snmpwalk -{} -l {} -u {} -a {} -A {} {} 1.3.6.1.2.1.2.2.1.8 ".format(self.version,self.securitylevel,self.username,self.authenticationmethod,self.authenticationpassword,self.ip)
        if self.version == 'v3' and self.securitylevel == 'noAuthNoPriv':
            cmd="snmpwalk -{} -l {} -u {} {} 1.3.6.1.2.1.2.2.1.8 ".format(self.version,self.securitylevel,self.username,self.ip)
        return bool(not os.system(cmd))
