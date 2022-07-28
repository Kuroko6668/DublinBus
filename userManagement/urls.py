# api/urls.py

from django.urls import path, re_path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    #re_path(r'^userdata/$', views.user_data_list),
    re_path(r'^userdata/([0-9]+)$', views.user_data_detail),


   # path('user_data/', views.user_dataView.as_view({'get': 'list'}), name='user_data'),


]