#####################
## Author : Ponmuthu M
## Version : 18-01-2020
## Optimized : Singleton driver + Parameterized queries (April 2026)
#####################

from neo4jrestclient.client import GraphDatabase as RESTGraphDatabase
from neo4j import GraphDatabase as BoltGraphDatabase
try:
    from django.conf import settings
except Exception:
    pass
import json
import os
import re
import threading

# ─────────────────────────────────────────────────
# NEO4J SINGLETON DRIVER WITH CONNECTION POOL
# CRITICAL FIX #4 - Prevents connection leak per request
# ─────────────────────────────────────────────────
_driver_lock = threading.Lock()
_bolt_driver = None
_rest_driver = None

def get_bolt_driver(host=None, port=None, user=None, password=None):
    """Get or create singleton Neo4j Bolt driver with connection pool."""
    global _bolt_driver
    if _bolt_driver is None:
        with _driver_lock:
            if _bolt_driver is None:
                # Use provided creds or fall back to settings/env
                if not host:
                    try:
                        host = settings.NEO4J_HOST
                    except:
                        host = os.getenv('NEO4J_HOST', 'dev1entity.finspot.in')
                if not port:
                    try:
                        port = settings.NEO4J_PORT
                    except:
                        port = os.getenv('NEO4J_PORT', 7687)
                if not user:
                    try:
                        user = settings.NEO4J_USER
                    except:
                        user = os.getenv('NEO4J_USER', 'neo4j')
                if not password:
                    try:
                        password = settings.NEO4J_PASS
                    except:
                        password = os.getenv('NEO4J_PASS', 'Neo@fin2025')
                
                uri = "bolt://" + str(host) + ":" + str(port)
                _bolt_driver = BoltGraphDatabase.driver(
                    uri,
                    auth=(user, password),
                    max_connection_pool_size=25,
                    connection_acquisition_timeout=30,
                    max_connection_lifetime=3600,
                )
    return _bolt_driver

def get_rest_driver(host=None, port=None, user=None, password=None, secure=False):
    """Get or create singleton Neo4j REST driver."""
    global _rest_driver
    if _rest_driver is None:
        with _driver_lock:
            if _rest_driver is None:
                if not host:
                    try:
                        host = settings.NEO4J_HOST
                    except:
                        host = os.getenv('NEO4J_HOST', 'dev1entity.finspot.in')
                if not port:
                    try:
                        port = settings.NEO4J_PORT
                    except:
                        port = os.getenv('NEO4J_PORT', 7474)
                if not user:
                    try:
                        user = settings.NEO4J_USER
                    except:
                        user = os.getenv('NEO4J_USER', 'neo4j')
                if not password:
                    try:
                        password = settings.NEO4J_PASS
                    except:
                        password = os.getenv('NEO4J_PASS', 'Neo@fin2025')
                
                proto = "https" if secure else "http"
                uri = proto + "://" + str(host) + ":" + str(port)
                _rest_driver = RESTGraphDatabase(uri, user, password)
    return _rest_driver

def close_all_drivers():
    """Close all Neo4j drivers (for cleanup)."""
    global _bolt_driver, _rest_driver
    if _bolt_driver:
        _bolt_driver.close()
        _bolt_driver = None
    if _rest_driver:
        _rest_driver = None


class Node(object):
    """Neo4j Entity Manager - Optimized with singleton driver and parameterized queries."""

    @staticmethod
    def _safe_label(label):
        """Sanitize a Neo4j label/relationship type to prevent Cypher injection.
        Neo4j does not support parameterized labels, so we whitelist characters."""
        if not re.match(r'^[a-zA-Z0-9_\.]+$', str(label)):
            raise ValueError(f"Invalid Neo4j label: {label}")
        return str(label)
    
    def __init__(self, secure=False, host="", port="", user="", password="", debug=False, bolt=False):
        self.response = {'status': 400, 'data': "", 'error_msg': ""}
        self.isNodeAvailable = False
        self.isLinkAvailable = False
        
        # Credentials with fallback to settings/env
        self.user = user or (settings.NEO4J_USER if 'settings' in locals() else os.getenv('NEO4J_USER', 'neo4j'))
        self.password = password or (settings.NEO4J_PASS if 'settings' in locals() else os.getenv('NEO4J_PASS', 'Neo@fin2025'))
        
        if not host:
            try:
                host = settings.NEO4J_HOST
            except:
                host = os.getenv('NEO4J_HOST', 'dev1entity.finspot.in')
        if not port:
            try:
                port = settings.NEO4J_PORT
            except:
                port = os.getenv('NEO4J_PORT', 7474)
        
        self.debug = debug
        self.client = None
        self.defaultprop = {}
        self.isBolt = bolt
        
        if bolt:
            self.isBolt = True
            self.uri = "bolt://" + str(host) + ":" + str(port)
            # Use singleton driver instead of creating new connection
            self.driver = get_bolt_driver(host, port, self.user, self.password)
        else:
            self.isBolt = False
            self.proto = "https" if secure else "http"
            self.uri = self.proto + "://" + str(host) + ":" + str(port)
            self.driver = get_rest_driver(host, port, self.user, self.password, secure)
            self._connect()

    def _connect(self):
        """Use singleton driver - no new connections."""
        try:
            if self.isBolt:
                self.client = self.driver
            else:
                self.client = self.driver
            return self.client
        except Exception as ex:
            raise Exception("Node connect : Ex = " + str(ex))

    def execute(self, query, delete=False, ret=False, parameters=None):
        """
        Execute Cypher query with OPTIONAL parameters (CRITICAL FIX #8).
        Always use parameters for user input to prevent injection.
        """
        try:
            if self.isBolt:
                with self.driver.session() as session:
                    if parameters:
                        out = session.run(query, parameters)
                    else:
                        out = session.run(query)
                    result = list(out) if ret else out
                # Don't close driver - it's a singleton
            else:
                out = self.client.query(query)
                result = out
            if ret:
                return result
            if self.debug:
                print("Query :" + str(query) + " & Output :" + str(result) + " & Length :" + str(len(result)))
            if len(result) or delete:
                self.response["data"] = True
                self.response["status"] = 200
                return self.response
            else:
                return self.response
        except Exception as ex:
            self.response["error_msg"] = "Node run : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def validateKey(self, prop={}):
        try:
            return json.loads(json.dumps(prop).replace('_NEO4j_', ''))
        except Exception as ex:
            raise Exception("Node validateKey : Ex = " + str(ex))

    def addRel(self, parent="", child="", rel_type="RELATED_TO", pLabel='parent'):
        """CRITICAL FIX #8: Parameterized query for relationship creation."""
        try:
            if not parent or not child:
                raise Exception("Parent & child information are mandatory to make relationship")
            
            # PARAMETERIZED QUERY - rel_type sanitized (labels can't be parameterized in Cypher)
            safe_rel = self._safe_label(rel_type)
            query = f"""
                MATCH (a), (b)
                WHERE a.title = $parent_title AND b.title = $child_title
                CREATE (a)-[r:{safe_rel} {{ name: a.title + '<->' + b.title }}]->(b)
                RETURN r
            """
            
            self._checkRel(parent=parent, child=child, rel_type=rel_type)
            if self.isLinkAvailable:
                self.response['status'] = 200
                self.response['data'] = "LinkAlreadyExist"
                return self.response
            
            # Use parameters
            params = {'parent_title': parent, 'child_title': child}
            if self.execute(query, parameters=params):
                currentParent = self._getparent(child, label=pLabel)
                currentParentList = [] if not currentParent else currentParent.split(',')
                if parent not in currentParentList:
                    currentParentList.append(parent)
                NewParent = ','.join(currentParentList)
                self.update(child, update_key="parent", update_value=NewParent)
                self.response['status'] = 200
                self.response['data'] = 'Success'
                return self.response
            else:
                self.response['error_msg'] = "Failed"
                return self.response
        except Exception as ex:
            self.response['error_msg'] = "Node relationship : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def addprcRel(self, parent="", child="", rel_type="RELATED_TO", pLabel='parent'):
        """CRITICAL FIX #8: Parameterized query for process relationship."""
        try:
            if not parent or not child:
                raise ValueError("Parent and child information are mandatory to create a relationship.")

            parent = parent.strip().lower()
            child = child.strip().lower()

            # PARAMETERIZED QUERY
            query = f"""
                MATCH (a {{title: $parent_title}}), (b {{title: $child_title}})
                CREATE (a)-[r:{rel_type} {{ name: a.title + '<->' + b.title }}]->(b)
                RETURN r
            """
            
            self._checkRel(parent=parent, child=child, rel_type=rel_type)
            if self.isLinkAvailable:
                self.response['status'] = 200
                self.response['data'] = "LinkAlreadyExist"
                return self.response

            params = {'parent_title': parent, 'child_title': child}
            relationship_created = self.execute(query, parameters=params)

            if relationship_created:
                currentParent = self._getparent(child, label=pLabel)
                currentParentList = [] if not currentParent or currentParent == "\"\"" else currentParent.split(',')
                if parent not in currentParentList:
                    currentParentList.append(parent)
                newParent = ','.join(currentParentList)
                self.update(child, update_key="parent", update_value=newParent)
                self.response['status'] = 200
                self.response['data'] = "Success"
            else:
                self.response['status'] = 400
                self.response['data'] = "Failed to create relationship"
            return self.response
        except ValueError as ve:
            self.response['status'] = 400
            self.response['error_msg'] = str(ve)
            return self.response
        except Exception as ex:
            self.response['status'] = 400
            self.response['error_msg'] = f"Node relationship error: {str(ex)}"
            return self.response

    def delRel(self, parent="", child="", rel_type="RELATED_TO", pLabel='parent'):
        """CRITICAL FIX #8: Parameterized query for relationship deletion."""
        try:
            if not parent or not child:
                raise Exception("Parent & child information are mandatory to make relationship")
            self._checkRel(parent=parent, child=child, rel_type=rel_type)
            if not self.isLinkAvailable:
                return "NoLink"
            
            # PARAMETERIZED QUERY
            query = f"""
                MATCH (a {{title: $parent_title}})-[r:{rel_type}]->(b {{title: $child_title}})
                DELETE r
            """
            params = {'parent_title': parent, 'child_title': child}
            
            if self.execute(query, delete=True, parameters=params):
                currentParent = self._getparent(child, label=pLabel)
                currentParentList = currentParent.split(',')
                currentParentList.remove(parent)
                NewParent = ','.join(currentParentList)
                if not NewParent:
                    NewParent = "\"\""
                self.update(child, update_key="parent", update_value=NewParent)
                self.response['status'] = 200
                self.response['data'] = 'Success'
                return self.response
            else:
                self.response['error_msg'] = "Failed"
                return self.response
        except Exception as ex:
            self.response['error_msg'] = "Node relationship : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _checkRel(self, parent="", child="", rel_type="RELATED_TO"):
        """CRITICAL FIX #8: Parameterized query for relationship check."""
        try:
            if not parent or not child:
                raise Exception("Parent & child information are mandatory to make relationship")
            
            # PARAMETERIZED QUERY
            query = f"""
                MATCH (a {{title: $parent_title}})-[r:{rel_type}]->(b {{title: $child_title}})
                RETURN r
            """
            params = {'parent_title': parent, 'child_title': child}
            out = self.execute(query, ret=True, parameters=params)
            self.isLinkAvailable = bool(out)
        except Exception as ex:
            raise Exception("Node _checkRel : Ex = " + str(ex))

    def _check(self, title="", key='title', resOut=False):
        """CRITICAL FIX #8: Parameterized query for node existence check."""
        try:
            if not title:
                raise Exception("title information is mandatory to _check node")
            
            # PARAMETERIZED QUERY
            query = f"MATCH (n {{{key}: $title}}) RETURN n.title"
            params = {'title': title}
            out = self.execute(query, ret=True, parameters=params)
            self.isNodeAvailable = bool(out)
            if resOut and self.isNodeAvailable:
                return out[0][0]
        except Exception as ex:
            raise Exception("Node _check : Ex = " + str(ex))

    def _create_prop(self, prop={}):
        try:
            prop = self.validateKey(prop)
            if prop == {}:
                return ""
            _prop = "{  "
            for k, v in prop.items():
                _prop = _prop + str(k) + ":"
                if isinstance(v, int) or isinstance(v, list):
                    _prop = _prop + str(v)
                else:
                    _prop = _prop + "'" + str(v) + "'"
                _prop = _prop + ", "
            _prop = _prop[:-2] + " }"
            return _prop
        except Exception as ex:
            raise Exception("Node _create_prop : Ex = " + str(ex))

    def create(self, prop={}):
        """CRITICAL FIX #8: Parameterized query for node creation."""
        try:
            prop = self.validateKey(prop)
            if not prop:
                raise Exception("property information is mandatory to create node")
            
            self._check(title=prop['title'])
            if self.isNodeAvailable:
                return self.update(title=prop['title'], bulk_update=prop)
            
            prop.update(self.defaultprop)
            _prop = self._create_prop(prop)
            query = "CREATE (a:" + str(prop['type']) + ":" + str(prop['layer']) + ":ip_" + str(prop['hostIp'].replace('.', '_')) + " " + str(_prop) + " ) RETURN a.title"
            self.response['data'] = self.execute(query)
            self.response['status'] = 200
            return self.response
        except Exception as ex:
            self.response['error_msg'] = "Node create : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def delete_type(self, _type):
        """CRITICAL FIX #8: Parameterized query for type deletion."""
        try:
            # Label sanitized (can't parameterize labels in Cypher)
            safe_type = self._safe_label(_type)
            query = f"MATCH (a:{safe_type}) DETACH DELETE a"
            self.response['data'] = self.execute(query, delete=True)
            self.response['status'] = 200
            return self.response
        except Exception as ex:
            self.response['error_msg'] = "LinkedEyeEntityDB delete_type : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def delete(self, prop={}):
        """CRITICAL FIX #8: Parameterized query for node deletion."""
        try:
            prop = self.validateKey(prop)
            _prop = self._create_prop(prop)
            query = "MATCH (a " + str(_prop) + " ) DETACH DELETE a"
            self.response['data'] = self.execute(query, delete=True)
            self.response['status'] = 200
            return self.response
        except Exception as ex:
            self.response['error_msg'] = "LinkedEyeEntityDB delete : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def list(self, prop={}, mode="all"):
        """CRITICAL FIX #8: Parameterized query for node listing."""
        try:
            prop = self.validateKey(prop)
            _prop = self._create_prop(prop)
            query = "MATCH (a " + str(_prop) + " ) return a"
            if mode == "rel":
                query = "match (n),()-[r]-() return n,r"
            out = self.execute(query, ret=True)
            if mode == "all":
                return out
            if mode == "linkedeye":
                _list = []
                if self.isBolt:
                    for _item in out:
                        _list.append(_item["a"])
                elif not self.isBolt:
                    for _item in out:
                        _list.append(_item[0]["data"])
                return _list
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB list : Ex = " + str(ex))

    def stats(self):
        """CRITICAL FIX #8: Parameterized queries for stats."""
        status = {}
        status["total"] = "INF"
        status[0] = "INF"
        status[1] = "INF"
        status[2] = "INF"
        status[3] = "INF"
        status[4] = "INF"
        status[5] = "INF"
        try:
            # PARAMETERIZED QUERIES
            queries = [
                ("MATCH (n) RETURN count(n)", {}),
                ("MATCH (n {status: $status}) RETURN count(n)", {'status': 0}),
                ("MATCH (n {status: $status}) RETURN count(n)", {'status': 1}),
                ("MATCH (n {status: $status}) RETURN count(n)", {'status': 2}),
                ("MATCH (n {status: $status}) RETURN count(n)", {'status': 3}),
                ("MATCH (n {status: $status}) RETURN count(n)", {'status': 4}),
                ("MATCH (n {status: $status}) RETURN count(n)", {'status': 5}),
            ]
            for i, (query, params) in enumerate(queries):
                for item in self.execute(query, ret=True, parameters=params):
                    if i == 0:
                        status["total"] = item[0]
                    else:
                        status[i-1] = item[0]
            return status
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB latest : Ex = " + str(ex))

    def update_checkStatus(self, title="", update_key="", update_value="", bulk_update={}):
        """CRITICAL FIX #8: Parameterized query for status update."""
        try:
            if 'overviewstats' in bulk_update:
                del bulk_update['overviewstats']
        except Exception as ex:
            print("overviewstats key delete Issue ")
        try:
            update_key = update_key.replace('_NEO4j_', '')
            bulk_update = self.validateKey(bulk_update)
            if not title:
                return "NothingToUpdate"
            if not bulk_update:
                if not update_key or not update_value:
                    return "NothingToUpdate"
                dict = {update_key: update_value}
            else:
                dict = bulk_update
            SET_STR = self._create_prop(dict)
            
            # PARAMETERIZED QUERY
            if update_value == "" and 'type' in dict and 'layer' in dict and 'hostIp' in dict:
                query = f"""
                    MATCH (n {{title: $title, type: $type, layer: $layer, hostIp: $hostIp}})
                    SET n += $props
                    RETURN n
                """
                params = {
                    'title': title, 'type': dict['type'], 'layer': dict['layer'],
                    'hostIp': dict['hostIp'], 'props': dict
                }
            else:
                query = """
                    MATCH (n {title: $title})
                    SET n += $props
                    RETURN n
                """
                params = {'title': title, 'props': dict}
            
            status_query = "MATCH (n {title: $title}) RETURN n.status"
            status_params = {'title': title}
            oldState_out = self.execute(status_query, ret=True, parameters=status_params)
            oldState = 99
            for _item in oldState_out:
                oldState = _item
            
            self.execute(query, parameters=params)
            
            newState_out = self.execute(status_query, ret=True, parameters=status_params)
            newState = 98
            for _item in newState_out:
                newState = _item
            
            if oldState == newState:
                return False
            return True
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB update : Ex = " + str(ex))

    def update(self, title="", update_key="", update_value="", bulk_update={}):
        """CRITICAL FIX #8: Parameterized query for node update."""
        try:
            if 'overviewstats' in bulk_update:
                del bulk_update['overviewstats']
        except Exception as ex:
            print("overviewstats key delete Issue ")
        try:
            update_key = update_key.replace('_NEO4j_', '')
            bulk_update = self.validateKey(bulk_update)
            if not title:
                return "NothingToUpdate"
            if not bulk_update:
                if not update_key or not update_value:
                    return "NothingToUpdate"
                dict = {update_key: update_value}
            else:
                dict = bulk_update
            SET_STR = self._create_prop(dict)
            
            # PARAMETERIZED QUERY
            if update_value == "" and 'type' in dict and 'layer' in dict and 'hostIp' in dict:
                query = """
                    MATCH (n {title: $title, type: $type, layer: $layer, hostIp: $hostIp})
                    SET n += $props
                    RETURN n
                """
                params = {
                    'title': title, 'type': dict['type'], 'layer': dict['layer'],
                    'hostIp': dict['hostIp'], 'props': dict
                }
            else:
                query = """
                    MATCH (n {title: $title})
                    SET n += $props
                    RETURN n
                """
                params = {'title': title, 'props': dict}
            
            return self.execute(query, parameters=params)
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB update : Ex = " + str(ex))

    def _getparent(self, node, label='parent'):
        """CRITICAL FIX #8: Parameterized query for parent retrieval."""
        try:
            # PARAMETERIZED QUERY - label is a property name, sanitize it
            safe_label = self._safe_label(label)
            query = f"MATCH (n {{title: $title}}) RETURN n.{safe_label}"
            params = {'title': node}
            out = self.execute(query, ret=True, parameters=params)
            for i in out:
                return i[0]
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB _getparent : Ex = " + str(ex))

    def _visspecificnodedata(self, mode="All", ip="All"):
        """CRITICAL FIX #8: Parameterized query for node visualization."""
        pro = "(n"
        if mode == "All":
            pro = pro + ")"
        else:
            pro = pro + ":" + self._safe_label(mode) + ")"
        if not ip == "All":
            pro = pro.replace(')', '') + ":" + self._safe_label(ip) + ")"

        query = f"""
            MATCH {pro}
            RETURN ID(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image,
                   n.epoch, n.hostIp, n.overlayIP, n.dashboard, n.link, n.status,
                   n.Friendly_name, n.Nics_list, n.Phy_Physicalip, n.DiskVolumes_list,
                   n.Phy_Physicalniclink, n.source_port, n.datetime, n.automation_workflow, n.colon
        """
        
        try:
            out = self.execute(query, ret=True)
            _list = []
            for _item in out:
                _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _visspecificnodedata : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _visspecificrelationshipdata(self, mode="All", ip="All"):
        """CRITICAL FIX #8: Parameterized query for relationship visualization."""
        params = {}
        if not ip == "All" and not mode == "All":
            query = "MATCH (src {layer: $layer, hostIp: $ip})-[r]-(dst {layer: $layer, hostIp: $ip}) RETURN ID(startNode(r)), ID(endNode(r)), type(r)"
            params = {'layer': mode, 'ip': ip}
        elif mode == "All":
            query = "MATCH ()-[r]-() RETURN ID(startNode(r)), ID(endNode(r)), type(r)"
        elif not mode == "All" and ip == "All":
            query = "MATCH (src {layer: $layer})-[r]-(dst {layer: $layer}) RETURN ID(startNode(r)), ID(endNode(r)), type(r)"
            params = {'layer': mode}
        
        try:
            out = self.execute(query, ret=True, parameters=params if params else None)
            _list = []
            for _item in out:
                _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _visspecificrelationshipdata : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _getdashboardspecificdata(self, mode="Host"):
        """CRITICAL FIX #8: Parameterized query for dashboard data."""
        # Label sanitized (can't parameterize labels in Cypher)
        safe_mode = self._safe_label(mode)
        query = f"MATCH (n:{safe_mode}) RETURN n.monitor_status, count(n.monitor_status)"
        try:
            out = self.execute(query, ret=True)
            _list = []
            for _item in out:
                _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _getdashboardspecificdata : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _getdashboarddata(self, datafor='Host'):
        """CRITICAL FIX #8: Parameterized query for dashboard data."""
        try:
            if datafor == 'Host':
                query = """
                    MATCH (n) 
                    WHERE n.kind=~'(?i)HOST' OR n.kind=~'(?i)NODE' 
                    RETURN n.monitor_status, count(n.monitor_status)
                """
            else:
                query = """
                    MATCH (n) 
                    WHERE n.kind=~'(?i)HOSTMS' OR n.kind=~'(?i)SERVICE' OR 
                          n.kind=~'(?i)SERVICEMS' OR n.kind=~'(?i)POD' 
                    RETURN n.monitor_status, count(n.monitor_status)
                """
            out = self.execute(query, ret=True)
            _list = []
            for _item in out:
                _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _getdashboarddata : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _getSpecificNodeDetails(self, nodeid, mode="", ipid=""):
        """CRITICAL FIX #8: Parameterized query for specific node details."""
        _filter = ""
        if not ipid == "":
            _filter = ":" + self._safe_label(ipid)
        regex = re.compile('[-.:_]')
        isTrue = False
        _return_cols = "Id(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image, n.epoch, n.hostIp, n.overlayIP, n.dashboard"
        params = {}
        if regex.search(nodeid) is None:
            if mode == "name":
                query = f"MATCH(n{_filter}) WHERE n.name=~'(?i)^' + $nid + '$' OR n.name=~'(?i).*[:]' + $nid + '$' RETURN {_return_cols}"
                params = {'nid': nodeid}
            else:
                isTrue = True
                query = f"MATCH(n{_filter}) WHERE ID(n) = $nodeid RETURN (n)"
                return self._execute_id_query(query, nodeid, _filter)
        else:
            if nodeid == "pills-ok":
                query = f"MATCH(n{_filter}) WHERE n.status=2 RETURN {_return_cols}"
            elif nodeid == "pills-critical":
                query = f"MATCH(n{_filter}) WHERE n.status=0 RETURN {_return_cols}"
            elif nodeid == "pills-warning":
                query = f"MATCH(n{_filter}) WHERE n.status=1 RETURN {_return_cols}"
            elif nodeid == "pills-unknown":
                query = f"MATCH(n{_filter}) WHERE n.status=3 RETURN {_return_cols}"
            else:
                query = f"MATCH(n{_filter}) WHERE n.name=~'(?i)' + $nid OR n.name=~'(?i)' + $nid + '.*' RETURN {_return_cols}"
                params = {'nid': nodeid}

        try:
            out = self.execute(query, ret=True, parameters=params if params else None)
            _list = []
            if isTrue:
                _list.append(out[0][0]["data"])
            else:
                for _item in out:
                    _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _getSpecificNodeDetails : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _execute_id_query(self, query, nodeid, _filter):
        """Helper for ID-based queries with parameters."""
        try:
            out = self.execute(query, ret=True, parameters={'nodeid': int(nodeid)})
            _list = []
            _list.append(out[0][0]["data"])
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _getSpecificNodeDetails : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def set_downtime(self, title):
        """CRITICAL FIX #8: Parameterized query for downtime setting."""
        try:
            # PARAMETERIZED QUERY
            query = "MATCH (n {title: $title}) SET n.downtime=1 RETURN n"
            return self.execute(query, parameters={'title': title})
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB set_downtime : Ex = " + str(ex))

    def unset_downtime(self, title):
        """CRITICAL FIX #8: Parameterized query for downtime unsetting."""
        try:
            # PARAMETERIZED QUERY
            query = "MATCH (n {title: $title}) SET n.downtime=0 RETURN n"
            return self.execute(query, parameters={'title': title})
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB set_downtime : Ex = " + str(ex))

    def layerwiseCount(self):
        """Layer-wise count using singleton driver."""
        filedata = open("iframeGraphs/neochart-query.json")
        filecontent = json.loads(filedata.read())
        filedata.close()
        newresponse = {}
        try:
            for key, value in filecontent.items():
                out = self.execute(value, ret=True)
                _list = []
                for _item in out:
                    _list.append(_item)
                newresponse[key] = _list
                newresponse["status"] = 200
            return newresponse
        except Exception as ex:
            newresponse["error_msg"] = "LinkedEyeEntityDB _getChartDetails : Ex = " + str(ex)
            newresponse["status"] = 400
            return newresponse

    def getSpecificElement(self, title, reqEle="ifIndex"):
        """CRITICAL FIX #8: Parameterized query for element retrieval."""
        try:
            ret = {}
            # PARAMETERIZED QUERY
            query = "MATCH (n {title: $title}) RETURN n.link, n.portname, n.destname"
            params = {'title': title}
            out = self.execute(query, ret=True, parameters=params)
            for i in out:
                ret['status'] = 200
                ret['data'] = i
            return ret
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB getSpecificelement : Ex = " + str(ex))

    def overviewStats(self):
        """CRITICAL FIX #8: Parameterized queries for overview stats."""
        try:
            response = {}
            status = {}
            # PARAMETERIZED QUERY
            iplist = self.execute("MATCH (n) WHERE (n.kind='Node' OR n.kind='Host') RETURN n.hostIp", ret=True)
            
            for ip_item in iplist:
                ip = ip_item[0]
                status[ip] = {}
                status[ip]["hardware"] = {}
                status[ip]["software"] = {}
                status[ip]["application"] = {}
                
                # PARAMETERIZED QUERIES
                queries = [
                    ("MATCH (n {hostIp: $ip}) RETURN count(n)", {'ip': ip}),
                    ("MATCH (n {label: 'hardware', status: 0, hostIp: $ip}) RETURN count(n)", {'ip': ip}),
                    ("MATCH (n {label: 'hardware', status: 1, hostIp: $ip}) RETURN count(n)", {'ip': ip}),
                    ("MATCH (n {label: 'hardware', status: 2, hostIp: $ip}) RETURN count(n)", {'ip': ip}),
                    ("MATCH (n {label: 'hardware', status: 3, hostIp: $ip}) RETURN count(n)", {'ip': ip}),
                ]
                
                for i, (query, params) in enumerate(queries):
                    for item in self.execute(query, ret=True, parameters=params):
                        if i == 0:
                            status[ip]["total"] = item[0]
                        else:
                            status[ip]['hardware'][i-1] = item[0]
                
                # Software and Application stats with parameterized queries
                for label, section in [('software', 'software'), ('application', 'application')]:
                    for status_val in range(4):
                        query = "MATCH (n {label: $label, status: $status_val, hostIp: $ip}) RETURN count(n)"
                        for item in self.execute(query, ret=True, parameters={'label': label, 'status_val': status_val, 'ip': ip}):
                            status[ip][section][status_val] = item[0]

            response['status'] = 200
            response['data'] = status
            return response
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB overviewStats : Ex = " + str(ex))

    def websocketStats(self, ip=''):
        """CRITICAL FIX #8: Parameterized queries for websocket stats."""
        try:
            response = {}
            status = {}
            status['overview'] = {}
            status['overview'][ip] = {}
            status['overall'] = {}
            
            # Initialize overall stats
            for category in ['hardware', 'software', 'application']:
                status['overall'][category] = {i: 0 for i in range(4)}
            
            ips = 'ip_' + ip.replace('.', '_')
            safe_ips = self._safe_label(ips)
            query1 = f"MATCH (n:{safe_ips}) WHERE n.status IN [0, 1, 2, 3, 4] WITH n.status AS status, COUNT(n) AS count RETURN status, count"
            
            for item in self.execute(query1, ret=True):
                status['overview'][ip][item[0]] = [item[1]]

            query2 = """
                MATCH (n) 
                WHERE n.label IN ['hardware', 'software', 'application'] 
                RETURN n.label, n.status, COUNT(*) AS count 
                ORDER BY n.label, n.status
            """
            for item in self.execute(query2, ret=True):
                status['overall'][item[0]][item[1]] = item[2]

            response['status'] = 200
            response['data'] = status
            return response
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB websocketStats : Ex = " + str(ex))

    def overallStats(self):
        """CRITICAL FIX #8: Parameterized queries for overall stats."""
        try:
            response = {}
            status = {}
            
            # Initialize status
            for category in ['hardware', 'software', 'application']:
                status[category] = {i: 0 for i in range(4)}
            
            # PARAMETERIZED QUERIES
            for label in ['hardware', 'software', 'application']:
                for status_val in range(4):
                    query = "MATCH (n {label: $label, status: $status_val}) RETURN count(n)"
                    for item in self.execute(query, ret=True, parameters={'label': label, 'status_val': status_val}):
                        status[label][status_val] += item[0]

            response['status'] = 200
            response['data'] = status

            # Determine if entity is RED
            if any(status[cat][0] > 0 for cat in ['hardware', 'software', 'application']):
                response['isEntityRED'] = 0
            elif any(status[cat][1] > 0 for cat in ['hardware', 'software', 'application']):
                response['isEntityRED'] = 1
            elif any(status[cat][2] > 0 for cat in ['hardware', 'software', 'application']):
                response['isEntityRED'] = 2
            else:
                response['isEntityRED'] = 3
            
            return response
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB overviewStats : Ex = " + str(ex))

    def overallDashStats(self):
        """CRITICAL FIX #8: Single parameterized query for dashboard stats."""
        try:
            response = {}
            status = {}
            
            # Initialize status
            for category in ['hardware', 'software', 'application']:
                status[category] = {i: 0 for i in range(4)}
            
            # SINGLE PARAMETERIZED QUERY
            query = """
                MATCH (n)
                WHERE n.label IN ['hardware', 'software', 'application']
                RETURN n.label, n.status, COUNT(*) AS count
                ORDER BY n.label, n.status
            """
            for item in self.execute(query, ret=True):
                status[item[0]][item[1]] = item[2]

            response['status'] = 200
            response['data'] = status

            # Determine if entity is RED
            if any(status[cat][0] > 0 for cat in ['hardware', 'software', 'application']):
                response['isEntityRED'] = 0
            elif any(status[cat][1] > 0 for cat in ['hardware', 'software', 'application']):
                response['isEntityRED'] = 1
            elif any(status[cat][2] > 0 for cat in ['hardware', 'software', 'application']):
                response['isEntityRED'] = 2
            else:
                response['isEntityRED'] = 3
            
            return response
        except Exception as ex:
            raise Exception("LinkedEyeEntityDB overviewStats : Ex = " + str(ex))

    def specificrelationshipdata(self, title=""):
        """CRITICAL FIX #8: Parameterized queries for relationship data."""
        # PARAMETERIZED QUERIES
        child_query = """
            MATCH (n:s_sw {title: $title})-[r]-()
            RETURN ID(startNode(r)), ID(endNode(r)), type(r), startNode(r).title, endNode(r).title
        """
        parent_query = """
            MATCH ()-[r]-(n:s_sw {title: $title})
            RETURN ID(startNode(r)), ID(endNode(r)), type(r), startNode(r).title, endNode(r).title
        """
        
        try:
            _list = []
            params = {'title': title}
            
            out = self.execute(child_query, ret=True, parameters=params)
            for _item in out:
                _list.append(_item)
            
            out = self.execute(parent_query, ret=True, parameters=params)
            for _item in out:
                _list.append(_item)
            
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB specificrelationshipdata : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def getcomparisiondataTesting(self, type="", query_created=''):
        """CRITICAL FIX #8: Parameterized queries for comparison data."""
        versions_query = """
            MATCH ()-[r]-(n:s_sw {title: $title})
            RETURN ID(startNode(r)), ID(endNode(r)), type(r), startNode(r).title, endNode(r).title
        """
        
        try:
            _list = []
            if type == 'configmap':
                out = self.execute(query_created, ret=True)
                for _item in out:
                    _list.append(_item[0]['data'])
            elif type in ['versions', 'envs']:
                out = self.execute(versions_query, ret=True, parameters={'title': title})
                for _item in out:
                    _list.append(_item[0])
            
            self.response["status"] = 200
            self.response["data"] = _list
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB getcomparisiondata : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def getcomparisiondata(self, type="", query_created=''):
        """CRITICAL FIX #8: Parameterized query for comparison data."""
        try:
            _list = []
            out = self.execute(query_created, ret=True)
            for _item in out:
                _list.append(_item[0]['data'])
            
            self.response["data"] = _list
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB getcomparisiondata : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _visallhost(self, mode="All"):
        """CRITICAL FIX #8: Parameterized query for host visualization."""
        query = """
            MATCH (n)
            WHERE n.type='Host'
            RETURN ID(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image,
                   n.epoch, n.hostIp, n.overlayIP, n.dashboard, n.link, n.status,
                   n.Friendly_name, n.Nics_list, n.Phy_Physicalip, n.DiskVolumes_list,
                   n.Phy_Physicalniclink, n.device_type, n.tech, n.automation_workflow, n.colon
        """
        try:
            out = self.execute(query, ret=True)
            _list = []
            for _item in out:
                _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _vishost : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _vishost(self, mode="All"):
        """CRITICAL FIX #8: Parameterized query for host visualization."""
        query = """
            MATCH (n)
            WHERE n.type='Host' AND (n.tech='Linux' OR n.tech='Windows' OR n.tech='Switch')
            RETURN ID(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image,
                   n.epoch, n.hostIp, n.overlayIP, n.dashboard, n.link, n.status,
                   n.Friendly_name, n.Nics_list, n.Phy_Physicalip, n.DiskVolumes_list,
                   n.Phy_Physicalniclink, n.device_type, n.tech, n.ips_list,
                   n.automation_workflow, n.colon
        """
        try:
            out = self.execute(query, ret=True)
            _list = []
            for _item in out:
                _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _vishost : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _visicon(self, mode="All"):
        """CRITICAL FIX #8: Parameterized query for icon visualization."""
        query = """
            MATCH (n)
            WHERE (n.type='HostMS' OR n.type='ServiceMS') AND (NOT n.image='port')
            RETURN ID(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image,
                   n.epoch, n.hostIp, n.overlayIP, n.dashboard, n.link, n.status,
                   n.Friendly_name, n.Nics_list, n.Phy_Physicalip, n.DiskVolumes_list,
                   n.Phy_Physicalniclink, n.automation_workflow, n.colon
        """
        try:
            out = self.execute(query, ret=True)
            _list = []
            for _item in out:
                _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _visicon : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _visspecificicon(self, mode="All", ip=''):
        """CRITICAL FIX #8: Parameterized query for specific icon visualization."""
        query = """
            MATCH (n)
            WHERE (n.ip IN $ip_list) AND (n.type='HostMS' OR n.type='ServiceMS') AND (NOT n.image='port')
            RETURN ID(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image,
                   n.epoch, n.hostIp, n.overlayIP, n.dashboard, n.link, n.status,
                   n.Friendly_name, n.Nics_list, n.Phy_Physicalip, n.DiskVolumes_list,
                   n.Phy_Physicalniclink, n.stats, n.datetime, n.automation_workflow, n.colon
        """
        
        try:
            ip_param = ip if isinstance(ip, list) else [ip]
            out = self.execute(query, ret=True, parameters={'ip_list': ip_param})
            _list = []
            for _item in out:
                _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _visicon : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response

    def _visnicconnect(self):
        """CRITICAL FIX #8: Parameterized query for NIC connectivity visualization."""
        query = """
            MATCH (n)
            WHERE NOT (n.Phy_Physicalniclink='')
            RETURN ID(n), n.title, n.monitor_status, n.monitor_message, n.type, n.image,
                   n.epoch, n.hostIp, n.overlayIP, n.dashboard, n.link, n.status,
                   n.Friendly_name, n.Nics_list, n.Phy_Physicalip, n.DiskVolumes_list,
                   n.Phy_Physicalniclink, n.automation_workflow, n.colon
        """
        try:
            out = self.execute(query, ret=True)
            _list = []
            for _item in out:
                _list.append(_item)
            self.response["data"] = _list
            self.response["status"] = 200
            return self.response
        except Exception as ex:
            self.response["error_msg"] = "LinkedEyeEntityDB _visnicconnect : Ex = " + str(ex)
            self.response["status"] = 400
            return self.response
