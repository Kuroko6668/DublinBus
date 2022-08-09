# Create your models here.
from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User
from sqlalchemy import ForeignKey
from django.db.models.signals import post_save
from django.dispatch import receiver
# from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
# # Create your models here.


class user_data(models.Model):
    #id is one to one field with built in Djnago User model
    id = models.OneToOneField(User, primary_key = True,on_delete=models.CASCADE)
    favourite_stop_1 = models.CharField(max_length = 150, null = True)
    favourite_stop_2 = models.CharField(max_length = 150, null = True)
    favourite_stop_3 = models.CharField(max_length = 150, null = True)
  

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        user_data.objects.create(id=instance,favourite_stop_1 = '0',favourite_stop_2 = '0', favourite_stop_3 = '0')

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.user_data.save()

     

 