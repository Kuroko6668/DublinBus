import urllib.request, json
import logging
import time
from dotenv import load_dotenv
load_dotenv()
import os

logging.basicConfig(filename = "gtfsrUpdates.log", level=logging.DEBUG)

#predefine timestamp variable in case response fails
response_timestamp = "X"

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
    with open('gtfsrFeed.json', 'w') as json_file:
        #delete contents of existing json and dump updated object to file
        json_file.seek(0)
        json_file.truncate()
        json.dump(response, json_file)
        json_file.close()
        logging.info("Json file updated correctly. " + str(response_timestamp) + "  response written to json correctly" )
except e:
        logging.warning("Error updating existing json." + str(response_timestamp) + " response error: " + str(e))


with open('gtfsrFeed.json', 'r') as json_file:
        obj = json.load(json_file)
        print(obj['Header'])

        
        
       





    
        

