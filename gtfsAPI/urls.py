from django.urls import path
from gtfsAPI import views

urlpatterns = [
    path('route/<str:route_name>/', views.stops_by_route_name, name='route'),
]