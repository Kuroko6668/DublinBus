from django.urls import path, re_path
from . import fake_users, views


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('createUsers/',fake_users.create_fake_user),
    re_path(r'^userdata/([0-9]+)$', views.user_data_detail),

]