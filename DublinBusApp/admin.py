from django.contrib import admin

from django.contrib import admin
from .models import DublinBusApp

class DublinBusAppAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')

admin.site.register(DublinBusApp,DublinBusAppAdmin)

# Register your models here.
