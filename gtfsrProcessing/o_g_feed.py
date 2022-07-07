import imp
#from django.conf import settings
from google.transit import gtfs_realtime_pb2
import urllib.request
# from django.http import HttpResponse, JsonResponse
# from urllib import request
# from django.core import serializers
import json


#code snippets taken from https://developer.nationaltransport.ie/api-details#api=gtfsr&operation=gtfsr
#and https://developers.google.com/transit/gtfs-realtime/examples/python-sample

#gtfsr url
#url = "https://api.nationaltransport.ie/gtfsr/v1"

#if json required
url = "https://api.nationaltransport.ie/gtfsr/v1?format=json"

# Request headers
hdr ={
'Cache-Control': 'no-cache',
'x-api-key': '2371ee3b52e54fa08a721e83197148e4',
}




#Get and parse API data
req = urllib.request.Request(url, headers=hdr)

req.get_method = lambda: 'GET'
#feed = gtfs_realtime_pb2.FeedMessage()
response = urllib.request.urlopen(req)
print(type(response))

print(type(response.read()))
response = response.read()
print(response)


#response = response.read()
#res_dict = json.loads(response.decode('utf-8'))
#print(type(res_dict))
# settings.configure()
# data = serializers.serialize('json', response)
# print(HttpResponse(data, content_type="application/json"))



#response = JsonResponse(response, safe=False)
#print(type(response))

#response = response.read()
#type(response)

#print(json)

#print(res_dict['Entity'][1]['TripUpdate'])

#res = json.dumps(response, sort_keys=True, indent=4)
#print(type(res))
#with open('personal.json', 'w') as json_file:
    #json.dump(response, json_file)




#feed.ParseFromString(response.read())

#print(feed)

trip_id = "3967405.23.10-64-e19-1.152.O"
stopSequence = 1
count = 0

# for entity in feed.entity:
#     while count < 1:
        #print(entity)
        #count += 1
        #print(entity.trip_update.stop_time_update.arrival)


    

    # if entity.trip_update.trip.trip_id == trip_id:
    #     #print(entity.trip_update.stop_time_update)

    #     for stop in entity.trip_update:
    #         print("XXXXXXXXXXX" + str(stop))


            #if entity.trip_update.stop_time_update.stop_sequence == stopSequence:
             #   print("The delay on the trip is " + str(entity.trip_update.stop_time_update.arrival.delay))
      
            
        


    # if entity.HasField('vehicle'):
    #     print(entity.vehicle)

#print(type(feed.entity))

#print(type(response.read()))



# import urllib.request, json

# try:
#     url = "https://api.nationaltransport.ie/gtfsr/v1?format=json"

#     hdr ={
#     # Request headers
#     'Cache-Control': 'no-cache',
#     'x-api-key': '2371ee3b52e54fa08a721e83197148e4',
#     }

#     req = urllib.request.Request(url, headers=hdr)

#     req.get_method = lambda: 'GET'
#     response = urllib.request.urlopen(req)
#     print(response.getcode())
#     print(response.read())
# except Exception as e:
#     print(e)