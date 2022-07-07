
# Python program to read JSON
# from a file
  
  
from html import entities
import json
from turtle import up
  
# Opening JSON file
with open('personal.json', 'r') as openfile:
  
    # Reading from json file
    json_object = json.load(openfile)

entities = json_object['Entity']
#print(entities)
print("----------------------------------")

#testEnt = json_object["Entity"]["TripUpdate"]["Trip"]#['StopTimeUpdate']
#print(testEnt)


trip_id = '2264.2.60-46A-b12-1.264.I'
stop_id = '8250DB002041'




def check_trip_for_update(tripId,stop_id):

    updateIndex = 0

    for index, entity in enumerate(entities):
        #print(entity['TripUpdate']['Trip']['TripId'])
        if entity["TripUpdate"]["Trip"]['TripId'] == trip_id:
            print("found")
            print(index)
            #print(entity["TripUpdate"])
            updateIndex = index



    if entities[updateIndex]['TripUpdate']["Trip"]["ScheduleRelationship"] == "Canceled":
        print("Trip has been cancelled")

        print(entities[updateIndex]['TripUpdate']["Trip"])


    else:
        

        for stops in entities[updateIndex]['TripUpdate']['StopTimeUpdate']:


            if stops['StopId'] == stop_id:
                if stops['Arrival']['Delay'] != 0:
                    print("The arrival delay for that trip is " + str(stops['Arrival']['Delay']))
                print(stop_id)
    



