from django.contrib import admin
from . models import user_data
# Register your models here.


class user_dataAdmin(admin.ModelAdmin):
  list = ('user_id', 'favourite_stop_1', 'favourite_stop_2','favourite_stop_3')

admin.site.register(user_data, user_dataAdmin)