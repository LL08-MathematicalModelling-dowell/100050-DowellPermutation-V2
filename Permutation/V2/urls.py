from django.urls import path
from . import views

urlpatterns = [
    path('<str:command>/<str:api_key>/', views.permutationsAPI),
]