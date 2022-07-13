# Create your models here.
from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User
from sqlalchemy import ForeignKey
# from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
# # Create your models here.


class user_data(models.Model):

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    favourite_stop_1 = models.CharField(max_length = 150, null = True)
    favourite_stop_2 = models.CharField(max_length = 150, null = True)
    favourite_stop_3 = models.CharField(max_length = 150, null = True)
     

 