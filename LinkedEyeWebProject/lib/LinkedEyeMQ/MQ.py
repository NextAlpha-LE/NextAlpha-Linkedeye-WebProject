#####################
##Author : Ponmuthu M
##Version : 18-01-2020
## FIXED: Connection leak (Node never closed), error handling, context manager
#####################

import pika
import os
import json
import logging

logger = logging.getLogger('linkedeye')


class MQ(object):
    def __init__(self, host="", port="", virtual_host="/", user="", password=""):
        self.host = host or os.getenv('MQ_HOST', "mq")
        self.port = port or os.getenv('MQ_PORT', 5672)
        self.virtual_host = virtual_host
        self.user = user
        self.password = password
        self._node = None
        self._connect()

    def _connect(self):
        credentials = pika.PlainCredentials(self.user, self.password)
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                host=self.host, port=self.port,
                virtual_host=self.virtual_host, credentials=credentials,
                heartbeat=600,
                blocked_connection_timeout=300,
            ))
        self.channel = self.connection.channel()
        return self

    @property
    def node(self):
        """Lazy-load Node to avoid unnecessary Neo4j connections."""
        if self._node is None:
            from LinkedEyeEntity import Node
            self._node = Node()
        return self._node

    def create_exchange(self, name, exchange_type="fanout", durable=False):
        try:
            self.channel.exchange_declare(exchange=name, exchange_type=exchange_type, durable=durable)
        except Exception as ex:
            logger.error("MQ create_exchange failed: %s", ex)
            raise Exception("MQ create_exchange : Ex = " + str(ex))

    def publishWithStats(self, exchange='delta_update', routing_key='', message={}):
        try:
            overviewstats = self.node.websocketStats(message.get('ip'))
            message['overviewstats'] = overviewstats
            message = json.dumps(message)
            if message:
                self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
        except Exception as ex:
            logger.warning("MQ publishWithStats failed, reconnecting: %s", ex)
            try:
                self._connect()
                self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
            except Exception as retry_ex:
                logger.error("MQ publishWithStats retry failed: %s", retry_ex)
                raise Exception("MQ publish : Ex = " + str(ex))

    def publish(self, exchange='delta_update', routing_key='', message=""):
        try:
            message = json.dumps(message)
            if message:
                self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
        except Exception as ex:
            logger.warning("MQ publish failed, reconnecting: %s", ex)
            try:
                self._connect()
                self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
            except Exception as retry_ex:
                logger.error("MQ publish retry failed: %s", retry_ex)
                raise Exception("MQ publish : Ex = " + str(ex))

    def publish_close(self, exchange='delta_update', routing_key='', message=""):
        try:
            if message:
                self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
        except Exception as ex:
            logger.error("MQ publish_close failed: %s", ex)
            raise Exception("MQ publish_close : Ex = " + str(ex))
        finally:
            self.close()

    def close(self):
        try:
            if self.connection and not self.connection.is_closed:
                self.connection.close()
        except Exception as ex:
            logger.error("MQ close failed: %s", ex)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()
        return False

    def __del__(self):
        self.close()
