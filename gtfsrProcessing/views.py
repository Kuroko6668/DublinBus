from django.shortcuts import render
from django.http import HttpResponse
from . import check_for_update

# Create your views here.


def journey_input(request,trip_id,stop_id):
    
    check_for_update.check_trip_for_update(trip_id,stop_id)

    
    return HttpResponse("<h1> this is journey input</h1>")
