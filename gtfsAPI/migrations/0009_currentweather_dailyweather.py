# Generated by Django 4.0.5 on 2022-07-21 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gtfsAPI', '0008_merge_20220721_1604'),
    ]

    operations = [
        migrations.CreateModel(
            name='CurrentWeather',
            fields=[
                ('time', models.CharField(blank=True, max_length=255, primary_key=True, serialize=False)),
                ('sunrise_time', models.CharField(blank=True, max_length=255)),
                ('sunset_time', models.CharField(blank=True, max_length=255)),
                ('weather_id', models.CharField(blank=True, max_length=255)),
                ('weather_description', models.CharField(blank=True, max_length=255)),
                ('temperture', models.CharField(blank=True, max_length=255)),
                ('humidity', models.CharField(blank=True, max_length=255)),
                ('uvi', models.CharField(blank=True, max_length=255)),
                ('clouds', models.CharField(blank=True, max_length=255)),
                ('wind_speed', models.CharField(blank=True, max_length=255)),
                ('visibility', models.CharField(blank=True, max_length=255)),
                ('pressure', models.CharField(blank=True, max_length=255)),
            ],
            options={
                'db_table': 'cur_weather',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DailyWeather',
            fields=[
                ('time', models.CharField(blank=True, max_length=255, primary_key=True, serialize=False)),
                ('sunrise_time', models.CharField(blank=True, max_length=255)),
                ('sunset_time', models.CharField(blank=True, max_length=255)),
                ('weather_id', models.CharField(blank=True, max_length=255)),
                ('weather_description', models.CharField(blank=True, max_length=255)),
                ('temperture_max', models.CharField(blank=True, max_length=255)),
                ('temperture_min', models.CharField(blank=True, max_length=255)),
                ('humidity', models.CharField(blank=True, max_length=255)),
                ('uvi', models.CharField(blank=True, max_length=255)),
                ('clouds', models.CharField(blank=True, max_length=255)),
                ('wind_speed', models.CharField(blank=True, max_length=255)),
                ('pressure', models.CharField(blank=True, max_length=255)),
            ],
            options={
                'db_table': 'daily_weather',
                'managed': False,
            },
        ),
    ]