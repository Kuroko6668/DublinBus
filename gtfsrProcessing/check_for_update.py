
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

# if os.path.exists("gtfsrProcessing/gtfsrDict_test.json"):

#         with open('gtfsrProcessing/gtfsrDict_test.json', 'r') as openFeed:
  
    
#          gtfsrDict = json.load(openFeed)

# check_trip_for_update(gtfsrDict, '17935.11355.2-238-ga2-1.205.I','8240DB001545' )     
   

def get_bus_delay(realtime_updates, trip_id, stop_sequence):
    print("GET BUS DELAY")

    # Get stop time updates for this trip or else return None
    trip_updates = next(filter(lambda trip: trip['Id'] == trip_id, realtime_updates), None)

    if trip_updates:

        stop_time_updates = trip_updates['TripUpdate'].get('StopTimeUpdate')

        if stop_time_updates:


            stop_time_updates = sorted(
                stop_time_updates,
                key=lambda update: update['StopSequence'],
                reverse=True
            )


            if stop_time_updates[0]['StopSequence'] < stop_sequence:
                return stop_time_updates[0]['Departure']['Delay']

    return 0

    


    
    



