import telnetlib
import socket

class letelnet:
    def __init__(self, ip=None, port=None ):
        #print("letel-ip->"+str(ip))
        self.ip = ip
        self.port= port
    def check(self):
        try:
            #print("letel-check-->")
            #tn = telnetlib.Telnet(self.ip, self.port, timeout=2)
            tn = telnetlib.Telnet()
            tn.open(self.ip, self.port, timeout=2)
            tn.write(b"Telnet Server\n")
            response = tn.read_until(b"\n")
            #print("letel-check-1--->")
            tn.close()
            return True
        except socket.timeout:
            print("Connection timeout. IP or PORT is not reachable")
            return False
        except Exception as e:
            #print("letel-error--->")
            return False
