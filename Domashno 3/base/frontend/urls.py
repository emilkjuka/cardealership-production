from django.contrib import admin
from django.urls import path, include

from .views import index

urlpatterns = [
    path('', index),
    path('home', index),
    path('aboutus',index),
    path('contact',index),
    path('cars',index),
    path('dealerships',index),
]
