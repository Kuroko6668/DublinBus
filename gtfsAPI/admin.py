from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Stops

class StopsAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')

# class ShapesAdmin(admin.ModelAdmin):
#   list = ('title', 'description', 'completed')

admin.site.register(Stops, StopsAdmin)

# admin.site.register(Shapes,ShapesAdmin)