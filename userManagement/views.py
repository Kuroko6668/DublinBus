#Some code adapted from:
#https://sushil-kamble.medium.com/django-rest-framework-react-authentication-workflow-2022-part-1-a21f22b3f358
#modified where necessary

from multiprocessing import context
import profile
from urllib import response
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from userManagement.serialiser import MyTokenObtainPairSerializer, RegisterSerializer, user_dataSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .models import user_data
from.serialiser import user_dataSerializer
from userManagement import serialiser


# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

#user management JWTs urls
@api_view(['GET'])
def getRoutes(request):
    print(request.user)

    routes = [
        '/userManagement/token/',
        '/userManagement/register/',
        '/userManagement/token/refresh/'
    ]
    return Response(routes)




@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_data_detail(request,pk):
    #unique_id = request._auth.payload['user_id']

    #get user favourites from the user data model
    if request.method == 'GET':
        profile_data = user_data.objects.filter(id=pk)

        serialiser = user_dataSerializer(profile_data, context = {'request': request}, many = True)
        
        return Response(serialiser.data)
    
    try:
        user_profile = user_data.objects.get(pk=pk)
    except user_data.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    #alter a user_data object 
    if request.method == 'PUT':
        serialiser = user_dataSerializer(user_profile, data=request.data,context={'request': request})
        if serialiser.is_valid():
            serialiser.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

    
class user_dataView(viewsets.ModelViewSet):  
    serializer_class = user_dataSerializer   
    queryset = user_data.objects.all() 


