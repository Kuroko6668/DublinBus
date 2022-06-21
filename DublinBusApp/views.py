from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

import DublinBusApp
from .serializers import DubBusAppSer
from rest_framework import viewsets      
from .models import DublinBusApp                 

class DubBusAppView(viewsets.ModelViewSet):  
    serializer_class =   DubBusAppSer
    queryset = DublinBusApp.objects.all()   