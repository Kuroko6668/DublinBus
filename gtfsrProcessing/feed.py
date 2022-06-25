import imp
from google.transit import gtfs_realtime_pb2
import urllib.request

#code snippets taken from https://developer.nationaltransport.ie/api-details#api=gtfsr&operation=gtfsr
#and https://developers.google.com/transit/gtfs-realtime/examples/python-sample

#gtfsr url
url = "https://api.nationaltransport.ie/gtfsr/v1"

#if json required
#url = "https://api.nationaltransport.ie/gtfsr/v1?format=json"

# Request headers
hdr ={
'Cache-Control': 'no-cache',
'x-api-key': '2371ee3b52e54fa08a721e83197148e4',
}

#Get and parse API data
req = urllib.request.Request(url, headers=hdr)
req.get_method = lambda: 'GET'
feed = gtfs_realtime_pb2.FeedMessage()
response = urllib.request.urlopen(req)
feed.ParseFromString(response.read())
print(feed)

# for entity in feed.entity:
#     print(entity.trip_update)
#     for j in entity.trip_update:
#         print(j)


    # if entity.HasField('vehicle'):
    #     print(entity.vehicle)

print(type(feed.entity))

print(type(response.read()))



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