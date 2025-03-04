from django.urls import path
from .views import UserDetailAPIView,UserListAPIView
urlpatterns = [
    path('users/',UserListAPIView.as_view(), name= 'users-list'),
    path('users/<int:pk>/',UserDetailAPIView.as_view(), name='user-detail'),
]
