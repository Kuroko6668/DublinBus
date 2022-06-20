import imp
import sqlalchemy
import os
from sqlalchemy import create_engine

#read in login details from local file
with open("DBlogin.txt") as file:
    lines = file.readlines()

user = lines[0].strip()
password = lines[1].strip()
url = lines[2].strip()
port = lines[3].strip()
database = lines[4].strip()

#connect to db
try:
    engine = create_engine("mysql+pymysql://{}:{}@{}:{}".format(user,password,url,port),echo=True)
    print("connected to database")
except:
    print("connection to database failed")

