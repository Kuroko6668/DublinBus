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


@api_view(['GET'])
def getRoutes(request):
    print(request.user)


    routes = [
        '/userManagement/token/',
        '/userManagement/register/',
        '/userManagement/token/refresh/'
    ]
    return Response(routes)


# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def user_data_list(request):

#     print(request.data)
            
  
#     unique_id = request._auth.payload['user_id']
#     print(unique_id)


#     if request.method == 'GET':
#         profile_data = user_data.objects.filter(pk=unique_id)
#         serialiser = user_dataSerializer(profile_data, context = {'request': request}, many = True)
#         print(serialiser.data)
#         return Response(serialiser.data)

#     elif request.method == 'POST':
#         serialiser = user_dataSerializer(data=request.data)
#         if serialiser.is_valid():
#             serialiser.save()
#             return Response(status=status.HTTP_201_CREATED)

#         return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    
#@permission_classes([IsAuthenticated])
# @api_view(['PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def user_data_detail(request, pk):

#     if request.method == 'GET':
#         profile_data = user_data.objects.filter(pk=pk)
#         serialiser = user_dataSerializer(profile_data, context = {'request': request}, many = True)
#         print(serialiser.data)
#         return Response(serialiser.data)
    

#     #unique_id = request._auth.payload['user_id']


#     try:
#         user_profile = user_data.objects.get(pk=pk)
#     except user_data.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'PUT':
#         serialiser = user_dataSerializer(user_profile, data=request.data,context={'request': request})
#         print(serialiser)
#         if serialiser.is_valid():
#             serialiser.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         user_profile.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_data_detail(request,pk):
    #unique_id = request._auth.payload['user_id']




    if request.method == 'GET':
        profile_data = user_data.objects.filter(id_id=pk)

        serialiser = user_dataSerializer(profile_data, context = {'request': request}, many = True)
        
        return Response(serialiser.data)
    
    try:
        user_profile = user_data.objects.get(pk=pk)
    except user_data.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    
    if request.method == 'PUT':
        serialiser = user_dataSerializer(user_profile, data=request.data,context={'request': request})
        print("XXXXXXXXXXXXXXXXXXX")
        print(serialiser)
        if serialiser.is_valid():
            serialiser.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

    
    



    # try:
    #     result = list(
    #         user_data.objects.filter(user_id=unique_id)
    #         .values('user_id' ,'favourite_stop_1', 'favourite_stop_2', 'favourite_stop_3')
    #     )
    #     print(result)
    # except:
    #     print("didntwork")


    

    # if request.method == 'GET':
    #     data = f"Congratulation {request.user}, your API just responded to GET request"
    #     return Response({'response': result}, status=status.HTTP_200_OK)
    # elif request.method == 'POST':
    #     text = request.POST.get('text')
    #     data = f'Congratulation your API just responded to POST request with text: {text}'
    #     return Response({'response': data}, status=status.HTTP_200_OK)
    # return Response({}, status.HTTP_400_BAD_REQUEST)


class user_dataView(viewsets.ModelViewSet):  
    serializer_class = user_dataSerializer   
    queryset = user_data.objects.all() 


# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# #


# @api_view(['GET', 'POST'])
# def handle_user_data_request(request):
#     """
#     List all code snippets, or create a new snippet.


#     """

#     user_name = request._auth.payload['user_id']

#     if request.method == 'GET':
#         snippets = Snippet.objects.all()
#         serializer = SnippetSerializer(snippets, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = SnippetSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
