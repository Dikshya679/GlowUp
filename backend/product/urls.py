from django.urls import path
from . import views

urlpatterns = [
    path('dataset_load/', views.dataset_load ,name="load_dataset") ,
    path('view/', views.product_view ,name="product_view") ,
    path('view/<int:id>/', views.product_view_by_id ,name="product_view_by_id") ,
    path('update/<int:id>/', views.product_update ,name="product_update") ,
    path('delete/<int:id>/', views.product_delete ,name="product_delete") ,
]
