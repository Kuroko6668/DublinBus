from django.shortcuts import render
from rest_framework import viewsets

from gtfsAPI.models import  Stops   
from .serialisers import  StopsSerializer

# Create your views here.

class StopsView(viewsets.ModelViewSet):  
    serializer_class = StopsSerializer   
    queryset = Stops.objects.all() 


# class ShapesView(viewsets.ModelViewSet):  
#     serializer_class = ShapesSerializer   
#     queryset = Shapes.objects.all() 