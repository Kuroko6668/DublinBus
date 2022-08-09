
# Python program to read JSON
# from a file
  
  
# from html import entities
from distutils.command import check
import json
import os.path
import time
from tracemalloc import stop

def check_trip_for_update(realtime_updates,trip_id,stop_id):
    start = time.time()
    
    if trip_id in realtime_updates:
        trip_obj = realtime_updates.get(trip_id)
        print("time taken for search: " + str(time.time()- start))

        if trip_obj['TripUpdate'] == 'Canceled':
            print(str(trip_id) + "canceled")
            
        
        stop_time_update_obj = trip_obj['TripUpdate']['StopTimeUpdate']

        if stop_id in stop_time_update_obj:

            if stop_time_update_obj[stop_id]['StopSequence'] == 1:
                return(stop_time_update_obj[stop_id]['Departure']['Delay'])
            else:
                return(stop_time_update_obj[stop_id]['Arrival']['Delay'])
    return 0

   
   



    


    
    



