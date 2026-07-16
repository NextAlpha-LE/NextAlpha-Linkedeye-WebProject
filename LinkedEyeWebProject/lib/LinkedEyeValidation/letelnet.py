import os
import socket


class letelnet:
    """TCP reachability check for mgmt-addon ports.

    Used for node_exporter / windows_exporter / nginx_exporter (and idrac). The
    only meaningful signal is "is the port open" — the previous implementation
    opened a telnet session and wrote "Telnet Server\\n" to the port, which is
    junk for an HTTP exporter and added no value. A plain socket connect is the
    reliable, protocol-agnostic check.

    Timeout is configurable via LE_MGMT_TCP_TIMEOUT (seconds, default 5) so a
    slightly slow but reachable exporter is not marked unreachable.
    """

    def __init__(self, ip=None, port=None):
        self.ip = ip
        self.port = port

    def check(self):
        try:
            port = int(self.port)
        except (TypeError, ValueError):
            return False
        if not self.ip:
            return False
        try:
            timeout = float(os.getenv('LE_MGMT_TCP_TIMEOUT', '5'))
        except (TypeError, ValueError):
            timeout = 5.0
        try:
            with socket.create_connection((self.ip, port), timeout=timeout):
                return True
        except (socket.timeout, OSError):
            return False
        except Exception:
            return False
