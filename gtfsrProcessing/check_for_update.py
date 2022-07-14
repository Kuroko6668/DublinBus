
# Python program to read JSON
# from a file
  
  
# from html import entities
import json
# from turtle import up
  

# with open('gtf.json', 'r') as openfile:
  
    
#     json_object = json.load(openfile)

# entities = json_object['Entity']
# #print(entities)
# print("----------------------------------")

#testEnt = json_object["Entity"]["TripUpdate"]["Trip"]#['StopTimeUpdate']
#print(testEnt)


trip_id = '3967385.23.10-64-e19-1.167.I'
stop_id = '8470B551411'




def check_trip_for_update(trip_id,stop_id):

    with open('gtfsrFeed.json', 'r') as openfile:
  
    
        json_object = json.load(openfile)

    entities = json_object['Entity']

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
        update = {
            'trip_status':'canceled'
        }

        return json.dumps(update)


    else:
        

        for stops in entities[updateIndex]['TripUpdate']['StopTimeUpdate']:


            if stops['StopId'] == stop_id:
                if stops['Arrival']['Delay'] != 0:
                    print("The arrival delay for that trip is " + str(stops['Arrival']['Delay']))
                    
                    update = {
                        'trip_status': 'delayed',
                        'delay': stops['Arrival']['Delay']
                    }
                   
                    return json.dumps(update)

                print(stop_id)

check_trip_for_update(trip_id,stop_id)

    



