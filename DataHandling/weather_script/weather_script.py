import sqlalchemy as sqla
from sqlalchemy import create_engine
import traceback
import simplejson as json
from IPython.display import display
import requests
import traceback
import datetime
import time
from config import *


engine = create_engine("mysql+pymysql://{}:{}@{}:{}".format(USER,PASSWORD,URL,PORT),echo=True)

# create dublin_bus table if not exist
sql = """
    CREATE DATABASE IF NOT EXISTS dublin_bus;
"""
engine.execute(sql)
# choose dublin bus database
sql1 = """
use dublin_bus;
"""
engine.execute(sql1)
sql2 = """
    DROP TABLE IF EXISTS cur_weather,hourly_weather,daily_weather;
"""
engine.execute(sql2)
# sql script to create current weather table
sql_create_cur_weather_table = """
    CREATE TABLE IF NOT EXISTS cur_weather(
        time VARCHAR(256),
        sunrise_time VARCHAR(256),
        sunset_time VARCHAR(256),
        weather_id VARCHAR(256),
        weather_description VARCHAR(256),
        temperture VARCHAR(256),
        humidity VARCHAR(256),
        uvi VARCHAR(256),
        clouds VARCHAR(256),
        wind_speed VARCHAR(256),
        visibility VARCHAR(256),
        pressure VARCHAR(256)
	);
"""
# sql script to create hourly table
sql_create_hourly_predict_weather_table = """
    CREATE TABLE IF NOT EXISTS hourly_weather(
        time VARCHAR(256),
        weather_id VARCHAR(256),
        weather_description VARCHAR(256),
        temperture VARCHAR(256),
        humidity VARCHAR(256),
        uvi VARCHAR(256),
        clouds VARCHAR(256),
        wind_speed VARCHAR(256),
        visibility VARCHAR(256),
        pressure VARCHAR(256)
	);
"""
# sql script to create daily table
sql_create_daily_predict_weather_table = """
    CREATE TABLE IF NOT EXISTS daily_weather(
        time VARCHAR(256),
        sunrise_time VARCHAR(256),
        sunset_time VARCHAR(256),
        weather_id VARCHAR(256),
        weather_description VARCHAR(256),
        temperture_max VARCHAR(256),
        temperture_min VARCHAR(256),
        humidity VARCHAR(256),
        uvi VARCHAR(256),
        clouds VARCHAR(256),
        wind_speed VARCHAR(256),
        pressure VARCHAR(256)
	);
"""

# save data into raw txt
def write_to_file(text):
    # create new txt file in this path
    f = open("data/weather/weather__{}".format(now).replace(" ", "_"), "w")
    f.write(text)
    f.close()
# transfer timestamp to time string
def timestamp_to_timestring(ts):
    ts = int(ts)
    time_local = time.localtime(ts)
    res = time.strftime("%Y-%m-%d %H:%M:%S",time_local)
    return str(res)

# save data into database
def cur_weather_to_db(text):
    # json analysis the text
    d_weather = json.loads(text)
    d_cur = d_weather['current']
    # get weather feature
    
    val_current = (
        timestamp_to_timestring(d_cur['dt']),
        timestamp_to_timestring(d_cur['sunrise']),
        timestamp_to_timestring(d_cur['sunset']),
        str(d_cur['weather'][0]['id']),
        d_cur['weather'][0]['description'],
        str(int(d_cur['temp'])-273),str(d_cur['humidity']),
        str(d_cur['uvi']),str(d_cur['clouds']),str(d_cur['wind_speed']),
        str(d_cur['visibility']), str(d_cur['pressure'])
    )
    print(val_current)
    # insert into cur_weather table
    engine.execute(sql_create_cur_weather_table)
    engine.execute("insert into cur_weather values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",val_current)
    return

def hourly_weather_to_db(text):
    d_weather = json.loads(text)
    engine.execute(sql_create_hourly_predict_weather_table)
    for i in range(len(d_weather['hourly'])):
        d_hourly = d_weather['hourly'][i]
        # get weather feature
        val_hourly = (
            timestamp_to_timestring(d_hourly['dt']),
            str(d_hourly['weather'][0]['id']),
            d_hourly['weather'][0]['description'],
            str(int(d_hourly['temp'])-273),str(d_hourly['humidity']),
            str(d_hourly['uvi']),str(d_hourly['clouds']),str(d_hourly['wind_speed']),
            str(d_hourly['visibility']), str(d_hourly['pressure'])
        )
        print(val_hourly)
        # insert into cur_weather table
        engine.execute("insert into hourly_weather values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",val_hourly)
    return

def daily_weather_to_db(text):
    d_weather = json.loads(text)
    engine.execute(sql_create_daily_predict_weather_table)
    for i in range(len(d_weather['daily'])):
        d_daily = d_weather['daily'][i]
        val_daily = (
            timestamp_to_timestring(d_daily['dt']),
            timestamp_to_timestring(d_daily['sunrise']),
            timestamp_to_timestring(d_daily['sunset']),
            str(d_daily['weather'][0]['id']),
            d_daily['weather'][0]['description'],
            str(int(d_daily['temp']['max'])-273),
            str(int(d_daily['temp']['min'])-273),
            str(d_daily['humidity']),
            str(d_daily['uvi']),str(d_daily['clouds']),str(d_daily['wind_speed']),
            str(d_daily['pressure'])
        )
        print(val_daily)
        engine.execute("insert into daily_weather values(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",val_daily)
    # insert into cur_weather table
    
    
    return


while True:
    try:
        # get request time
        now = datetime.datetime.now()
        # weather location
        lat = 53.343897
        lon = -6.29706
        # send request to the api
        r = requests.get(WEATHER, params={"lat": lat, "lon": lon,"appid": KEY})
        # save response to raw txt
        # write_to_file(r.text)

        # save response to database
        cur_weather_to_db(r.text)
        hourly_weather_to_db(r.text)
        daily_weather_to_db(r.text)
        # # 1 hour loop once
        time.sleep(60*60)
        
    except:
        print(traceback.format_exc())