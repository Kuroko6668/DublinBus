# Generated by Django 4.0.4 on 2022-07-07 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gtfsAPI', '0004_route'),
    ]

    operations = [
        migrations.CreateModel(
            name='StopTimes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trip_id', models.CharField(blank=True, max_length=60, null=True)),
                ('arrival_time', models.TimeField(blank=True, null=True)),
                ('departure_time', models.TimeField(blank=True, null=True)),
                ('stop_id', models.CharField(blank=True, max_length=30, null=True)),
                ('stop_sequence', models.SmallIntegerField(blank=True, null=True)),
                ('stop_headsign', models.CharField(blank=True, max_length=255, null=True)),
                ('pickup_type', models.IntegerField(blank=True, null=True)),
                ('drop_off_type', models.IntegerField(blank=True, null=True)),
                ('shape_dist_traveled', models.FloatField(blank=True, null=True)),
            ],
        ),
    ]
