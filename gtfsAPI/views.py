from django.shortcuts import render
from rest_framework import viewsets

from gtfsAPI.models import  StopTimes, Stops,Route  
from .serialisers import  StopTimesSerializer, StopsSerializer,RouteSerializer
from django.http import JsonResponse, Http404, HttpResponseBadRequest, HttpResponse
# Create your views here.

class StopsView(viewsets.ModelViewSet):  
    serializer_class = StopsSerializer   
    queryset = Stops.objects.all() 

class StopTimesView(viewsets.ModelViewSet):
    serializer_class = StopTimesSerializer
    queryset = StopTimes.objects.all() 


# def trips_by_stop(request,stop_id):
#     try:
#         result = list(
#             StopTimes.objects.filter(stop_id=stop_id)
#             .values('trip_id' ,'arrival_time', 'departure_time', 'stop_id', 'stop_sequence','stop_headsign','pickup_type','drop_off_type','shape_dist_traveled')
#         )
#     except Route.DoesNotExist as route_not_exist:
#         raise Http404("Invalid Trip ID") from route_not_exist

#     return JsonResponse(result,safe=False)
    






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


# class ShapesView(viewsets.ModelViewSet):  
#     serializer_class = ShapesSerializer   
#     queryset = Shapes.objects.all() 