from django.urls import path
from . import views

urlpatterns = [
    path('upload', views.upload_skin_analysis),
    path('skintoneupdate/', views.skintone_update_view, name='skintone_update')
]