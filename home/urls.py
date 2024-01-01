from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='index'),
    # Add more URL patterns as needed
]