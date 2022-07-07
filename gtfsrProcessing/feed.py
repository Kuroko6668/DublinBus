import urllib.request, json

try:
    url = "https://api.nationaltransport.ie/gtfsr/v1?format=json"

    hdr ={
    # Request headers
    'Cache-Control': 'no-cache',
    'x-api-key': '2371ee3b52e54fa08a721e83197148e4',
    }

    req = urllib.request.Request(url, headers=hdr)

    req.get_method = lambda: 'GET'
    response = urllib.request.urlopen(req)
    print(response.getcode())
    #print(response.read())
    response = response.read()
  
except Exception as e:
    print(e)


data = json.loads(response)
print(type(data))
# s = json.dumps(data, indent=4, sort_keys=True)
# print(type(s))

with open('personal.json', 'w') as json_file:
    json.dump(data, json_file)