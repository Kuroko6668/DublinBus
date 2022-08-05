from turtle import update
from django.shortcuts import render
from django.http import HttpResponse
from . import check_for_update
from django.http import JsonResponse

# Create your views here.


def journey_input(request,trip_id,stop_id):

    
    update = check_for_update.check_trip_for_update(trip_id,stop_id)
    print(update)


    return JsonResponse(update,safe = False)

    
    #return HttpResponse("<h1>found</h1>")
