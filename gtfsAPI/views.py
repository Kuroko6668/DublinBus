from django.shortcuts import render
from rest_framework import viewsets
from datetime import datetime, timedelta, timezone
import requests
from gtfsAPI.models import  Stops,Route,StopTime,Routes,Trip
from .serialisers import  StopsSerializer,RouteSerializer
from django.http import JsonResponse, Http404, HttpResponseBadRequest, HttpResponse
# Create your views here.

class StopsView(viewsets.ModelViewSet):  
    serializer_class = StopsSerializer   
    queryset = Stops.objects.all() 

def stops_by_route_name(request, route_name):
    """Returns the stops in a route in order of stop sequence."""

    try:
        result = list(
            Route.objects.filter(route_short_name=route_name)
            .values('stop_id' ,'route_short_name', 'direction_id', 'stop_sequence','trip_headsign')
        )
    except Route.DoesNotExist as route_not_exist:
        raise Http404("Invalid Trip ID") from route_not_exist

    return JsonResponse(result,safe=False)


def stop_detail(request, stop_id):
    current_time = datetime.now(timezone(timedelta(hours=1)))
    service_id = 2
    if(current_time.weekday() == 5):
        service_id = 1
    if(current_time.weekday() == 6):
        service_id = 3

    try:
        stop_details = Stops.objects.get(stop_id=stop_id)
    except Stops.DoesNotExist as stop_not_exist:
        raise Http404("Invalid Stop ID") from stop_not_exist
    # Timezone aware current time
    
    result = {
        'stop_name': stop_details.stop_name,
        'stop_lat': stop_details.stop_lat,
        'stop_lon': stop_details.stop_long,
        'arrivals': []
    }

    stop_time_details = StopTime.objects.filter(
        stop_id=stop_id,
        # Get all arrival times in the next hour
        arrival_time__gte=current_time.time(),
        arrival_time__lte=(current_time + timedelta(hours=1)).time(),
    )
    # # result['arrivals'] = list(stop_time_details)
    realtime_updates = request_realtime_nta_data()

    for stop_time in stop_time_details:

        # Only get details for trips that operate on the current day
        if stop_time.trip.service_id  == str(service_id):

            delay = get_realtime_dublin_bus_delay(realtime_updates,
                                                    stop_time.trip.trip_id,
                                                    stop_time.stop_sequence)

            result['arrivals'].append({
                'route_id': stop_time.trip.route.route_id,
                'trip_id': stop_time.trip.trip_id,
                'direction': stop_time.trip.direction_id,
                'trip_headsign':stop_time.trip.trip_headsign,
                'line': stop_time.trip.route.route_short_name,
                'service_id': stop_time.trip.service_id,
                'scheduled_arrival_time': stop_time.arrival_time,
                'scheduled_departure_time': stop_time.departure_time,
                'stop_sequence': stop_time.stop_sequence,
                'delay_sec': delay,
                'due_in_min': get_due_in_time(current_time, stop_time.arrival_time, delay)
            })

    result['arrivals'] = sorted(result['arrivals'],
                                key=lambda arrival: arrival['scheduled_arrival_time'])
    return JsonResponse(result)






def request_realtime_nta_data():
    """
    Make a request to the NTA realtime API
    """

    headers = {
        # Request headers
        'Cache-Control': 'no-cache',
        'x-api-key': '4e437130ea34409991aa1fd704f9319a'
    }
    realtime_response = requests.get(
        'https://gtfsr.transportforireland.ie/v1/?format=json',
        headers=headers
    )

    return realtime_response.json()['Entity']


def get_due_in_time(current_time, scheduled_arrival_time, delay):

    scheduled_arrival_datetime_str = current_time.strftime(
        "%d/%m/%y ") + str(scheduled_arrival_time)

    # create datetime object for scheduled_arrival_datetime.
    scheduled_arrival_datetime_obj = datetime.strptime(scheduled_arrival_datetime_str,
                                                       '%d/%m/%y %H:%M:%S').replace(
        tzinfo=timezone(timedelta(hours=1)))

    time_delta = scheduled_arrival_datetime_obj - \
        current_time.replace(microsecond=0)

    # add delay to due time
    time_delta_seconds = time_delta.total_seconds() + delay
    return round(time_delta_seconds / 60)


def get_realtime_dublin_bus_delay(realtime_updates, trip_id, stop_sequence):

    # Get stop time updates for this trip or else return None
    trip_updates = next(filter(lambda trip: trip['Id'] == trip_id, realtime_updates), None)

    if trip_updates:

        stop_time_updates = trip_updates['TripUpdate'].get('StopTimeUpdate')

        if stop_time_updates:

            # Sort updates in reverse order by stop_sequence
            stop_time_updates = sorted(
                stop_time_updates,
                key=lambda update: update['StopSequence'],
                reverse=True
            )

            # Only get delay if stop_sequence of latest update is lower than the
            # stop_sequence of the requested stop
            if stop_time_updates[0]['StopSequence'] < stop_sequence:
                return stop_time_updates[0]['Departure']['Delay']

    return 0