from django.db import models

# Create your models here.


class Stops(models.Model):
    stop_id = models.CharField(primary_key=True, max_length=30, blank=True, null=False)
    stop_name = models.CharField(max_length=255, blank=True, null=True)
    stop_lat = models.FloatField(blank=True, null=True)
    stop_long = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stops'

# class Shapes(models.Model):
#     shape_id = models.CharField(max_length=30, blank=True, null=False)
#     shape_pt_lat = models.FloatField(blank=True, null=True)
#     shape_pt_lon = models.FloatField(blank=True, null=True)
#     shape_pt_sequence = models.SmallIntegerField(blank=True, null=True)
#     shape_dist_traveled = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'shapes'

class Route(models.Model):
    stop_id = models.CharField(primary_key=True, max_length=30, blank=True, null=False)
    route_short_name = models.CharField(max_length=255, blank=True, null=True)
    direction_id = models.IntegerField(blank=True, null=True)
    stop_sequence = models.IntegerField(blank=True, null=True)
    trip_headsign = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'route_stops'

class StopTimes(models.Model):
    trip_id = models.CharField(primary_key=True,max_length=60, blank=True, null=False)
    arrival_time = models.TimeField(blank=True, null=True)
    departure_time = models.TimeField(blank=True, null=True)
    stop_id = models.CharField(max_length=30, blank=True, null=True)
    stop_sequence = models.SmallIntegerField(blank=True, null=True)
    stop_headsign = models.CharField(max_length=255, blank=True, null=True)
    pickup_type = models.IntegerField(blank=True, null=True)
    drop_off_type = models.IntegerField(blank=True, null=True)
    shape_dist_traveled = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stop_times'
