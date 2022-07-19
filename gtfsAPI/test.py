
from datetime import datetime, timedelta, timezone
from dateutil import tz
import requests
import math,time


# Create your views here. 
dt_obj = datetime.fromtimestamp(int(1658302825000)/1000).replace(tzinfo=tz.gettz('Europe/London'))
dt_str = dt_obj.strftime('%Y-%m-%d %H:%M:%S')

print(dt_obj)
print(parsed_datetime)