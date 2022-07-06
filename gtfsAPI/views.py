from django.shortcuts import render
from rest_framework import viewsets

from gtfsAPI.models import  Stops,Route  
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


# class ShapesView(viewsets.ModelViewSet):  
#     serializer_class = ShapesSerializer   
#     queryset = Shapes.objects.all() 