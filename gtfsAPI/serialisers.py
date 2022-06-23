from rest_framework import serializers
from .models import Stops

class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stops
        fields = ('stop_id' ,'stop_name', 'stop_lat', 'stop_long')

# class ShapesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Shapes
#         fields = ('shape_id' ,'shape_pt_lat', 'shape_pt_lon', 'shape_pt_sequence','shape_dist_traveled')


