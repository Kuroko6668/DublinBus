from rest_framework import serializers
from .models import DublinBusApp

class DubBusAppSer(serializers.ModelSerializer):
    class Meta:
        model = DublinBusApp
        fields = ('id' ,'title', 'description', 'completed')