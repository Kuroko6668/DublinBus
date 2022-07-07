from django.urls import path
from . import views

urlpatterns = [
    
    path('journeyInput/<str:trip_id>/<str:stop_id>',views.journey_input)

]