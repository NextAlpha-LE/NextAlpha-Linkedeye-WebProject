#!/usr/local/bin/python
import os
import sys
import pathlib
import pandas as pd
sys.path.insert(1, '/root/.local/lib/python3.9/site-packages/LinkedEyeVault')

import mysql.connector
from LinkedEyeVault import Vault

ConfigFile = '/stackstorm/configs/linkedeye_vault.yaml'

db_host = os.getenv('MYSQL_DB_HOST', 'db')
db_port = os.getenv('MYSQL_DB_PORT', '3306')
db_user = os.getenv('MYSQL_DB_USER', 'root')
db_pass = os.getenv('MYSQL_DB_PASS', 'rootpassword')

def setConfig(roleID):
    try:
        cmd='sed -i "/token/d" '+str(ConfigFile)
        os.system(cmd)
        cmd='echo "token: \''+str(roleID)+'\'" >> '+str(ConfigFile)
        os.system(cmd)
    except Exception as ex:
        raise Exception(ex)

def isAlreadyset():
    try:
        with open(ConfigFile) as f:
            if "token: ''" in f.read():
                return False
            return True
    except Exception as ex:
        print(ex)

def createDatabase(dbname):
    try:
        print("createDatabase Initated.database Name : "+str(dbname))
        print("DB:{} , PORT:{}".format(db_host,db_port))
        mydb = mysql.connector.connect(host=db_host,port=db_port,user=db_user,passwd=db_pass)
        mycursor = mydb.cursor()
        mycursor.execute("CREATE DATABASE IF NOT EXISTS "+str(dbname))
    except Exception as ex:
        print(ex)

def createTables():
    try:
        #CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
        print("createDatabase - Done")
        createCountryStateTable()
        print("createCountryStateTable - Done")
    except Exception as ex:
        print(ex)


def StateDataInsert(data,conn,countryid):
    try:
        cursor = conn.cursor()
        for i,row in data.iterrows():
            sql = "INSERT INTO linkedeye.state (countryid, stateshortname, statename, lat, lng) VALUES ('{}', '{}', '{}', '{}', '{}')".format(countryid,row.stateshortname,row.statename,row.lat, row.lng)
            print(sql)
            cursor.execute(sql)
            conn.commit()
    except Exception as e:
        print("Error while connecting to StateDataInsert", e)
        
def CountryDataInsert(data,conn):
    try:
        cursor = conn.cursor()
        for i,row in data.iterrows():
            if pd.isna(row.countryshortname):
                row.countryshortname = 'NA'
            sql = "INSERT INTO linkedeye.country (countryshortname, countryname) VALUES ('{}','{}')".format(row.countryshortname,row.countryname)
            print(sql)
            cursor.execute(sql)
            conn.commit()
            filename = os.path.join("jvectormap",row.countryshortname+".csv")
            print(filename)
            if os.path.isfile(filename):
                print("----"+str(row.countryshortname)+"-----")
                statedata = pd.read_csv(filename, index_col=False, delimiter = ',')
                StateDataInsert(statedata,conn,cursor.lastrowid)
                print("-----------")
    except Exception as e:
            print("Error while connecting to CountryDataInsert", e)

def createCountryStateTable():
    try:
        mydb = mysql.connector.connect(host=db_host,port=db_port,user=db_user,passwd=db_pass, database="linkedeye")
        mycursor = mydb.cursor()
        mycursor.execute("DROP TABLE IF EXISTS country")
        mycursor.execute("DROP TABLE IF EXISTS state")
        mycursor.execute("CREATE TABLE country (countryid int PRIMARY KEY AUTO_INCREMENT, countryshortname VARCHAR(20), countryname VARCHAR(100))")
        mycursor.execute("CREATE TABLE state (stateid int PRIMARY KEY AUTO_INCREMENT, countryid int, stateshortname VARCHAR(20), statename VARCHAR(100), lat float,lng float)")
        countrydata = pd.read_csv('jvectormap/country.csv', index_col=False, delimiter = ',')
        CountryDataInsert(countrydata,mydb)
    except Exception as ex:
        print(ex)

def makeMigrations():
    try:
        for _path in sorted(pathlib.Path('.').glob('**/models.py')):
            print("DOINGTHIS ===> python manage.py makemigrations "+str(_path.parent)+" --noinput")
            os.system("python manage.py makemigrations "+str(_path.parent)+" --noinput")
        print("DOINGTHIS ===> python manage.py makemigrations")
        os.system("python manage.py makemigrations")
        print("DOINGTHIS ===>  python manage.py migrate;")
        os.system("python manage.py migrate;")
        print("DOINGTHIS ===>  echo yes | python manage.py collectstatic --noinput")
        os.system(" echo yes | python manage.py collectstatic --noinput")
        print("DOINGTHIS ===>  python manage.py LEDefaultAddservices")
        os.system("python manage.py LEDefaultAddservices")
        print("DOINGTHIS ===>  python manage.py LEDefaultSites")
        os.system("python manage.py LEDefaultSites")
        print("DOINGTHIS ===>  python manage.py collectstatic --noinput")
        os.system("python manage.py collectstatic --noinput")
        #os.system("python manage.py migrate; python manage.py clear_cache; echo yes | python manage.py collectstatic --noinput")
    except Exception as ex:
        print(ex)



try:
    url = "http://"+str(os.getenv('VAULT_HOST', 'vault'))+':'+str(os.getenv('VAULT_PORT', '8200'))
    Obj = Vault(url=url)
    if isAlreadyset():
        print("Already token has been set")
        print(Obj.Unseal())
    else:
        print(Obj.VaultInit())
        print(Obj.Unseal())
        roleID=Obj.GetRoleID("linkedeye_secret_acl","linkedeye_role")
        print(Obj.Status())
        #setConfig(roleID)
        rootToken = Obj.GetRootToken()
        setConfig(rootToken)
   
    #Django
    createDatabase(os.getenv("DATABASE_NAME"))
    makeMigrations()
    #os.execvp(sys.argv[1], sys.argv[1:])#newly added
    #createTables()
except Exception as ex:
    print("Init Method Error :"+str(ex))
