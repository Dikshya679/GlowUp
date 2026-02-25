from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('api/login/', views.login, name="login"),
    path('api/register/', views.register, name="register"),
    path('api/logout/', views.logout, name="logout"),
    path('api/forgot-password/', views.forgot_password, name="forgotPassword"),
    path('api/update-skin/', views.update_skin_info, name='update_skin'),
    path('api/upload-profile-pic/', views.upload_profile_pic, name='upload_pic'),
]