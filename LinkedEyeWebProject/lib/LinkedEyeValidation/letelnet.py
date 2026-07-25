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
            # Bound the read: HTTP-based targets (e.g. node_exporter on :9100)
            # accept the connection but never send a bare newline, so an
            # unbounded read_until() hangs the gunicorn worker until the ingress
            # returns 502. A successful connect already proves reachability.
            response = tn.read_until(b"\n", timeout=3)
            #print("letel-check-1--->")
            tn.close()
            return True
        except socket.timeout:
            print("Connection timeout. IP or PORT is not reachable")
            return False
        except Exception as e:
            #print("letel-error--->")
            return False
