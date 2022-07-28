# Generated by Django 4.0.4 on 2022-07-28 14:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('userManagement', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_data',
            name='user_id',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
