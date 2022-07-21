from rest_framework import serializers
from .models import Stops,Route,StopTimes,DailyWeather,CurrentWeather
class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stops
        fields = ('stop_id' ,'stop_name', 'stop_lat', 'stop_long')

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ('stop_id' ,'route_short_name', 'direction_id', 'stop_sequence', 'trip_headsign')


class StopTimesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StopTimes
        fields = ('trip_id' ,'arrival_time', 'departure_time', 'stop_id', 'stop_sequence','stop_headsign','pickup_type','drop_off_type','shape_dist_traveled')

class CurrentWeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurrentWeather
        fields = ('time' ,'sunrise_time', 'sunset_time', 'weather_id', 'weather_description',
        'temperture','humidity','uvi','clouds','wind_speed','visibility','pressure')

class DailyWeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyWeather
        fields = ('time' ,'sunrise_time', 'sunset_time', 'weather_id', 'weather_description',
        'temperture_max','temperture_min','humidity','uvi','clouds','wind_speed','pressure')


# class StopTimeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = StopTimes
#         fields = ('departure_time' ,'stop', 'stop_sequence', 'stop_headsign', 'pickup_type','drop_off_type','shape_dist_traveled','trip')

