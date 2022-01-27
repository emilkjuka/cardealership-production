from django.urls import path

from . import views

urlpatterns = [
    path('create_car/', views.CreateCarView.as_view(), name='create_car'),
    path('create_dealership/', views.CreateDealershipView.as_view(), name='dealerships'),
    path('list_cars/', views.ListCarView.as_view(), name='cars'),
    path('list_cars/<str:query>/', views.ListCarQueriedView.as_view(), name='query_cars'),
    path('car/<int:id>/', views.CarApiView.as_view(), name='car_object'),
    path('car_state/', views.CarByState.as_view(), name='car_object_state'),
    path('car_brand/', views.CarByBrand.as_view(), name='car_object_brand'),
    path('car_model/', views.CarByModel.as_view(), name='car_object_model'),
    path('list_dealerships/', views.ListDealershipView.as_view(), name='dealerships'),
]
