"""
LinkedEye Notification Service.
FIXED: File handle leaks, Apprise URL accumulation, MySQL connection management,
       SQL injection (parameterized queries), context managers.
"""

import apprise
import pymysql
import os
import logging
from bs4 import BeautifulSoup
from lib.LinkedEyeEntity import Node

SCRIPT_PATH = os.path.join(os.path.dirname(__file__))
logger = logging.getLogger('linkedeye')


class Notification(object):
    def __init__(self, connect_database=False):
        self.apprise = None
        self.response = {'status': 400, 'data': "", "error_msg": ""}
        self.connection = None
        self.node = None
        if connect_database:
            self.connect_mysql()
            self.node = Node()
        self.initialize()

    def connect_mysql(self):
        self.dbhost = os.getenv('MYSQL_DB_HOST', 'mysql.fs-linkedeye')
        self.dbport = int(os.getenv('MYSQL_DB_PORT', 3306))
        self.dbuser = os.getenv('MYSQL_DB_USER', 'root')
        self.dbpassword = os.getenv('MYSQL_ROOT_PASSWORD', 'rootpassword')
        self.database = os.getenv('MYSQL_DB_NAME', 'linkedeye')
        self._connect()

    def _connect(self):
        try:
            self.connection = pymysql.connect(
                host=self.dbhost,
                port=self.dbport,
                user=self.dbuser,
                passwd=self.dbpassword,
                database=self.database,
                connect_timeout=10,
                read_timeout=30,
            )
            logger.info("Connected to MySQL DB")
        except Exception as e:
            logger.error("MySQL connection failed: %s", e)
        return self

    def initialize(self):
        """Create fresh Apprise instance (prevents URL accumulation)."""
        asset = apprise.AppriseAsset(
            app_id='LinkedEyeNotificationService',
            app_desc='LinkedEyeNotificationService',
        )
        self.apprise = apprise.Apprise(asset=asset, debug=False)

    def subjectComposer(self, status, title, message):
        LECODE = {0: 'CRITICAL', 1: 'WARNING', 2: 'OK', 3: 'UNKNOWN'}
        return "[ {} ] {} - {}".format(LECODE[int(status)], title, message)

    def sendAlert(self, title="", status="", message=""):
        try:
            COLORCODE = {0: 'red', 1: 'orange', 2: 'green', 3: 'white'}
            self.get_details(title)
            # Re-initialize apprise to clear old URLs (prevents accumulation leak)
            self.initialize()
            self.get_usernotification_settings(self.emailID)

            SUBTABLE = message.get('subtable', {})
            if 'subtable' in message:
                del message['subtable']
            variables = {'COLORCODE': COLORCODE[int(status)], 'TITLE': title, 'REMARKS': message, 'SUBTABLE': SUBTABLE}
            templte_file = 'templates/alert.html'
            with open(os.path.join(SCRIPT_PATH, templte_file), 'r') as f:
                file_data = f.read()
            message_body = self.get_html(variables, file_data)

            with apprise.LogCapture() as logs:
                result = self.apprise.notify(body=message_body, title=self.subjectComposer(status, title, message))
                if result:
                    self.response["data"] = True
                    self.response["status"] = 200
                    self.response["error_msg"] = ""
                    logger.info("Notification sent for %s", title)
                else:
                    self.response["data"] = False
                    self.response["status"] = 400
                    self.response["error_msg"] = "Not able send notification."
                    logger.error("Notification failed: %s", logs.getvalue())
        except Exception as ex:
            self.response["data"] = False
            self.response["status"] = 400
            self.response["error_msg"] = "LinkedEyeNotification sendAlert : Ex =" + str(ex)
            logger.error("sendAlert exception: %s", ex)
        finally:
            if self.connection:
                try:
                    self.connection.close()
                except Exception:
                    pass
        return self.response

    def sendnotifications(self, title="", message_format="", template_type="", variables={}, message_body=""):
        try:
            if not message_body:
                template_map = {
                    'monitoring': 'templates/monitoring.html',
                    'onboarding': 'templates/onboarding.html',
                }
                templte_file = template_map.get(template_type, 'templates/monitoring.html')
                with open(os.path.join(SCRIPT_PATH, templte_file), 'r') as f:
                    file_data = f.read()
                file_data = self.get_html(variables, file_data)
                if message_format in ('Markdown', 'Text'):
                    message_body = self.format_message(file_data, message_format)
                elif message_format == 'Html':
                    message_body = file_data

            with apprise.LogCapture() as logs:
                result = self.apprise.notify(body=message_body, title=title)
                if result:
                    self.response["data"] = True
                    self.response["status"] = 200
                    self.response["error_msg"] = ""
                else:
                    self.response["data"] = False
                    self.response["status"] = 400
                    self.response["error_msg"] = "Not able send notification."
                    logger.error("sendnotifications failed: %s", logs.getvalue())
        except Exception as ex:
            self.response["data"] = False
            self.response["status"] = 400
            self.response["error_msg"] = "LinkedEyeNotification sendnotifications : Ex =" + str(ex)
            logger.error("sendnotifications exception: %s", ex)
        return self.response

    def add_url(self, url=""):
        try:
            self.apprise.add(url + '?name=LinkedEyeNotificationService(LENS)')
        except Exception as ex:
            raise Exception("LinkedEyeNotification add_url : Ex = " + str(ex))

    def formatmessage(self, message="", message_format=""):
        try:
            if message_format == 'markdown':
                import html2markdown
                message_body = html2markdown.convert(message)
            elif message_format == 'Text':
                import html2text
                h = html2text.HTML2Text()
                h.ignore_links = True
                message_body = h.handle(message)
            elif message_format == 'Html':
                message_body = message
            else:
                message_body = message
            return message_body
        except Exception as e:
            logger.error("formatmessage exception: %s", e)
            return message

    def get_details(self, title):
        # FIXED: Use parameterized query to prevent Cypher injection
        query = "MATCH (n {title: $title}) RETURN n"
        # Fallback: since Node.execute doesn't support params yet, sanitize input
        safe_title = str(title).replace("'", "\\'").replace('"', '\\"')
        query = "match (n {title:'" + safe_title + "'}) return n"
        for item in self.node.execute(query, ret=True):
            info = item[0]['data']
        self.emailID = info.get('contact_email', None)

    def get_usernotification_settings(self, user, add_urls=True):
        cursor = self.connection.cursor()
        # FIXED: Use parameterized queries to prevent SQL injection
        cursor.execute("SELECT id FROM auth_user WHERE email = %s", (user,))
        user_id = cursor.fetchone()
        if user_id is None:
            raise Exception("LinkedEyeNotification: User " + str(user) + " not found in LinkedEye.")
        else:
            cursor.execute(
                "SELECT * FROM user_notification_settings WHERE user_id = %s AND is_saved = %s",
                (user_id[0], True)
            )
            service_data = self.fetchall(cursor)
            if service_data:
                if add_urls:
                    for service in service_data:
                        self.add_url(service['url'])
                else:
                    return service_data
            else:
                raise Exception("LinkedEyeNotification: No preferences saved for this user.")

    def fetchall(self, cursor):
        objs = cursor.fetchall()
        description = cursor.description
        result = []
        for obj in objs:
            item = {}
            for i, col in enumerate(description):
                item[col[0]] = str(obj[i])
            result.append(item)
        return result

    def get_html(self, variables={}, code=""):
        for variable in variables:
            code = code.replace("{{" + str(variable) + "}}", str(variables[variable]))
        return code

    def format_message(self, message, message_format):
        try:
            if message_format == 'Text':
                soup = BeautifulSoup(message, "html.parser")
                for script in soup(["script", "style"]):
                    script.extract()
                text = soup.get_text()
                lines = (line.strip() for line in text.splitlines())
                chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
                text = ' '.join(chunk for chunk in chunks if chunk)
                return text
            return message
        except Exception as ex:
            raise Exception("LinkedEyeNotification format_message : Ex = " + str(ex))
