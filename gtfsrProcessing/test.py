from feed import feed, trip_id

count = 0

for entity in feed.entity:
    while count < 1:
        #print(entity)
        count += 1
        print(entity.trip_update.stop_time_update)



    

    # if entity.trip_update.trip.trip_id == trip_id:
    #     print("match")

    #     for stop in entity.trip_update.stop_time_update:
    #         print("XXXXXXXXXXX" + str(stop))

