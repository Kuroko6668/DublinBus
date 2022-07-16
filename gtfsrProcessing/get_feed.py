

from html import entities
import urllib.request, json
import logging
import time
from dotenv import load_dotenv
load_dotenv()
import os

logging.basicConfig(filename = "gtfsrProcessing/gtfsrUpdates.log", level=logging.DEBUG)

#predefine timestamp variable in case response fails
response_timestamp = "Fail"

# while True:


try:
    url = "https://api.nationaltransport.ie/gtfsr/v1?format=json"

    hdr ={
    # Request headers
    'Cache-Control': 'no-cache',
    'x-api-key': os.environ['GTFSRKEY'],
    }

    req = urllib.request.Request(url, headers=hdr)

    req.get_method = lambda: 'GET'
    response = urllib.request.urlopen(req)
    print(response.getcode())

    response = response.read()
    response = json.loads(response)
    
    #get timestamp of response from response object
    response_timestamp = response['Header']['Timestamp']

    logging.info("API get request @" + str(time.strftime('%Y-%m-%d %H:%M:%S')) + " successful. Timestamp of API response object = " + str(response_timestamp) )


except Exception as e:
    logging.warning("API get request error @ time: " + str(time.strftime('%Y-%m-%d %H:%M:%S')) + ". Error = " + str(e) )



try:
    with open('gtfsrProcessing/gtfsrFeed.json', 'w') as json_file:
        #delete contents of existing json and dump updated object to file
        json_file.seek(0)
        json_file.truncate()
        json.dump(response, json_file)
        json_file.close()
        logging.info("Json file updated correctly. " + str(response_timestamp) + "  response written to json correctly" )
except Exception as  e:
        logging.warning("Error updating existing json." + str(response_timestamp) + " response error: " + str(e))


with open('gtfsrProcessing/gtfsrFeed.json', 'r') as json_file:
    
        restructured_dict = {}

        obj = json.load(json_file)
        for object in obj['Entity']:

            #Add trip id as key
            restructured_dict[object['Id']] = object
            

            for key,update in restructured_dict[object['Id']]['TripUpdate'].items():
            
                if key == 'StopTimeUpdate':

                    #for readability
                    StopTimeUpdate_list = restructured_dict[object['Id']]['TripUpdate']['StopTimeUpdate']
                    
                    #Convert StopTimeUpdate object to dict and add StopId as key for each value(object)
                    
                    restructured_dict[object['Id']]['TripUpdate']['StopTimeUpdate'] = {x['StopId']: x for x in StopTimeUpdate_list}
                    



with open('gtfsrProcessing/gtfsrDict_test.json','w') as updateDict:
    updateDict.seek(0)
    updateDict.truncate()
    json.dump(restructured_dict,updateDict, indent=4)

            
            

    # time.sleep(60)

        
        
       





    
        

