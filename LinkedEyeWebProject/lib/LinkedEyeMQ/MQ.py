#####################
##Author : Ponmuthu M
##Version : 18-01-2020
#####################

import pika
import os, json
from LinkedEyeEntity import Node

class MQ(object):
    def __init__(self, host="", port="", virtual_host="/", user="", password=""):
        if host:
            self.host = host
        else:
            self.host = os.getenv('MQ_HOST', "mq")
        if port:
            self.port = port
        else:
            self.port = os.getenv('MQ_PORT', 5672)
        self.virtual_host = virtual_host
        self.user = user
        self.password = password
        self._connect()
        self.node = Node()

    def _connect(self):
        credentials = pika.PlainCredentials(self.user, self.password)
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host=self.host, port=self.port,
                                      virtual_host=self.virtual_host, credentials=credentials))
        self.channel = self.connection.channel()
        return self

    def create_exchange(self, name, exchange_type="fanout", durable=False):
        try:
            self.channel.exchange_declare(exchange=name, exchange_type=exchange_type, durable=durable)
        except Exception as ex:
            raise Exception("MQ create_exchange : Ex = " + str(ex))

    def publishWithStats(self, exchange='delta_update', routing_key='', message={}):
        try:
            overviewstats = self.node.websocketStats(message.get('ip'))
            #overviewstats = self.node.overviewStats()
            message['overviewstats'] = overviewstats
            message = json.dumps(message)
            if message:
                self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
        except Exception as ex:
            self._connect()
            self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
            raise Exception("MQ publish : Ex = " + str(ex))

    def publish(self, exchange='delta_update', routing_key='', message=""):
        try:
            message = json.dumps(message)
            if message:
                self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
        except Exception as ex:
            self._connect()
            self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
            raise Exception("MQ publish : Ex = " + str(ex))

    def publish_close(self, exchange='delta_update', routing_key='', message=""):
        try:
            if message:
                self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=message)
            self.close()
        except Exception as ex:
            raise Exception("MQ publish_close : Ex = " + str(ex))

    def close(self):
        try:
            self.connection.close()
        except Exception as ex:
            raise Exception("MQ close : Ex = " + str(ex))
