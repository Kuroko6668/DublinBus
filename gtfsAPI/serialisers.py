from rest_framework import serializers
from .models import Stops,Route

class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stops
        fields = ('stop_id' ,'stop_name', 'stop_lat', 'stop_long')

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('stop_id' ,'route_short_name', 'direction_id', 'stop_sequence', 'trip_headsign')


