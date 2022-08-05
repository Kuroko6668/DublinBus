from django.urls import path,re_path
from gtfsAPI import views

urlpatterns = [
    path('route/<str:route_name>/', views.stops_by_route_name, name='route'),
    path('stop/<str:stop_id>/', views.stop_detail, name='stop'),
    path('prediction/<str:arrival_stop_id>/<str:departure_stop_id>/<str:timestamp>/<str:short_name>/', views.get_prediction, name='prediction'),
    path('cur_weather/', views.get_cur_weather, name='cur_weather'),
    path('stopname/<str:stop_1>/<str:stop_2>/<str:stop_3>/', views.stop_name, name = "stop_name")
]